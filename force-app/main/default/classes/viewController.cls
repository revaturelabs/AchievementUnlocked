public with sharing class viewController {
    
    // Returns a list of all cohorts
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> getCohorts() {
        return [SELECT Start_Date__c, End_Date__c FROM Cohort__c];
    }

    // Returns a list of all associates
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAllAssociates() {
        return getCohortAssociates(null);
    }

    // Returns a list of all associates belonging to a cohort identified by cohortId
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getCohortAssociates(Id cohortId) {
        String query = 'SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c, Cohort__c FROM Associate__c';
        if (cohortId != null) {
            query += ' WHERE Cohort__c = :cohortId';
        }
        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getStatusAssociates(String stat, String sortingField, String dir, Integer pageNum) {
        Integer ofst = (pageNum - 1) * 10;
        String associates = 'SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c, Cohort__c ' + 
        'FROM Associate__c ' + 
        'WHERE Current_Status__c = \'' + stat + '\' ' + 
        'ORDER BY ' + sortingField + ' ' + dir + ' ' + 
        'LIMIT 10 ' + 
        'OFFSET ' + ofst;
        return Database.query(associates);
    }

    public class Filters {
        @AuraEnabled
        public String searchKey { get; set; }
        @AuraEnabled
        public String[] statuses { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates(String cohortId, Filters filters, String sortingField, String dir, Integer pageNum) {
        Integer ofst = (pageNum - 1) * 10;
        String query = 'SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c, Cohort__c ' + 
        'FROM Associate__c ';
        Boolean needAnd = false;
        if (cohortId != null || (filters != null && (filters.statuses != null || filters.searchKey != null))) {
            query += 'WHERE ';
        }
        if (filters != null) {
            if (!String.isEmpty(filters.searchKey)) {
                String key = '%' + filters.searchKey + '%';
                query += 'Last_Name__c LIKE :key ';
                needAnd= true;
            }
            if (filters.statuses != null) {
                if (needAnd) {
                    query += 'AND ';
                }
                String[] statuses = filters.statuses;
                query += 'Current_Status__c IN : statuses ';
                needAnd= true;
            }
        }
        if (cohortId != null) {
            if (needAnd) {
                query += 'AND ';
            }
            query += 'Cohort__c = :cohortId ';
        }
        if (sortingField != null) {
            query += 'ORDER BY ' + sortingField + ' ';
            if (dir != null) {
                query += dir + ' ';
            }
        }
        query += 'LIMIT 10 ' + 'OFFSET ' + ofst;
        return Database.query(query);
    }

    // Returns a list of all vouchers belonging to an associate identified by associateId
    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getVouchers(Id associateId) {
        return [SELECT Id, Name, Certification_Type__c, Status__c, Associate__c, Voucher_Type__c 
        FROM Voucher__c
        WHERE Associate__c =: associateId
        ORDER BY Certification_Type__c];
    }

    // Returns a list of all attempts made by an associate identified by associateId
    @AuraEnabled(cacheable=true)
    public static List<Attempt__c> getAttempts(Id associateId) {
        return [SELECT Id, Name, Attempt_Type__c, Voucher__c, Passed__c, Voucher__r.Associate__c,  Voucher__r.Name, Voucher__r.Certification_Type__c 
        FROM Attempt__c
        WHERE Voucher__r.Associate__c =: associateId
        ORDER BY Voucher__r.Certification_Type__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Attempt__c> getCertifications(Id associateId) {
        return [SELECT Id, Attempt_Type__c, Voucher__c, Passed__c, Voucher__r.Associate__c, Voucher__r.Certification_Type__c 
        FROM Attempt__c
        WHERE Voucher__r.Associate__c =: associateId AND Passed__c = true
        ORDER BY Voucher__r.Certification_Type__c];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getAssociateCount(Filters filters) {
        Boolean needAnd = false;
        String associates = 'SELECT COUNT() ' + 
        'FROM Associate__c ';
        if (filters.statuses != null || filters.searchKey != null) {
            associates += 'WHERE ';        
        }
        if (!String.isEmpty(filters.searchKey)) {
            String key = '%' + filters.searchKey + '%';
            associates += 'Last_Name__c LIKE :key ';
            needAnd= true;
        }
        if (filters.statuses != null) {
            if (needAnd) {
                associates += 'AND ';
            }
            String[] statuses = filters.statuses;
            associates += 'Current_Status__c IN : statuses ';
            needAnd= true;
        }
        return Database.countQuery(associates);
    }
}