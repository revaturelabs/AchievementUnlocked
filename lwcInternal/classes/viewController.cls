public with sharing class viewController {
    
    // Returns a list of all cohorts
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> getCohorts() {
        return [SELECT Start_Date__c, End_Date__c FROM Cohort__c];
    }

    // Returns a list of cohorts filtered by the parameter filter
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> getFilteredCohorts(String filter) {
        String query = 'SELECT Start_Date__c, End_Date__c FROM Cohort__c';
        Date d = Date.today();
        if (filter == 'active') {
            query += ' WHERE Start_Date__c <= :d AND End_Date__c >= :d';
        } else if (filter == 'inactive') {
            query += ' WHERE Start_Date__c > :d OR End_Date__c < :d';
        }
        return Database.query(query);
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
        @AuraEnabled
        public String[] certs { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates(String cohortId, Filters filters, String sortingField, String dir, Integer pageNum) {
        Integer ofst = (pageNum - 1) * 10;
        Set<Id> ids = new Set<Id>();
        if (filters != null && filters.certs != null) {
            List<Attempt__c> attempts = [SELECT Id, Attempt_Type__c, Voucher__c, Passed__c, Voucher__r.Associate__c, Voucher__r.Certification_Type__c 
        									FROM Attempt__c
        									WHERE Voucher__r.Certification_Type__c IN :filters.certs AND Passed__c = true AND Attempt_Type__c = 'Certification'];
            // A map of associate id -> list of certification filters
            // Each unique id is given a list of all requested cert types
            // Whenever an attempt with that cert type is found, it is removed
            // from that associate's list
            // An associate with an empty list has all the required certs and
            // is added to the list of ids to be searched for
            Map<Id,List<String>> filterMap = new Map<Id,List<String>>();
            for (Attempt__c att : attempts) {
                if (!filterMap.containsKey(att.Voucher__r.Associate__c)) {
                    List<String> certList = new List<String>();
                    for (String certType : filters.certs) {
                        certList.add(certType);
                    }
                    filterMap.put(att.Voucher__r.Associate__c, certList);
                }
                Integer certListIndex = filterMap.get(att.Voucher__r.Associate__c).indexOf(att.Voucher__r.Certification_Type__c);
                if (certListIndex != -1) {
                    filterMap.get(att.Voucher__r.Associate__c).remove(certListIndex);
                }
                if (filterMap.get(att.Voucher__r.Associate__c).isEmpty()) {
                    ids.add(att.Voucher__r.Associate__c);
                }
            }
        }
        String query = 'SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c, Cohort__c FROM Associate__c ';
        Boolean needAnd = false;
        if (cohortId != null || (filters != null && (filters.statuses != null || filters.searchKey != null || filters.certs != null))) {
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
            if (filters.certs != null) {
                if (needAnd) {
                    query += 'AND ';
                }
                query += 'Id IN :ids ';
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
        Set<Id> ids = new Set<Id>();
        if (filters != null && filters.certs != null) {
            List<Attempt__c> attempts = [SELECT Id, Attempt_Type__c, Voucher__c, Passed__c, Voucher__r.Associate__c, Voucher__r.Certification_Type__c 
        								FROM Attempt__c
        								WHERE Voucher__r.Certification_Type__c IN :filters.certs AND Passed__c = true AND Attempt_Type__c = 'Certification'];
            // A map of associate id -> list of certification filters
            // Each unique id is given a list of all requested cert types
            // Whenever an attempt with that cert type is found, it is removed
            // from that associate's list
            // An associate with an empty list has all the required certs and
            // is added to the list of ids to be searched for
            Map<Id,List<String>> filterMap = new Map<Id,List<String>>();
            for (Attempt__c att : attempts) {
                if (!filterMap.containsKey(att.Voucher__r.Associate__c)) {
                    List<String> certList = new List<String>();
                    for (String certType : filters.certs) {
                        certList.add(certType);
                    }
                    filterMap.put(att.Voucher__r.Associate__c, certList);
                }
                Integer certListIndex = filterMap.get(att.Voucher__r.Associate__c).indexOf(att.Voucher__r.Certification_Type__c);
                if (certListIndex != -1) {
                    filterMap.get(att.Voucher__r.Associate__c).remove(certListIndex);
                }
                if (filterMap.get(att.Voucher__r.Associate__c).isEmpty()) {
                    ids.add(att.Voucher__r.Associate__c);
                }
            }
        }
        
        Boolean needAnd = false;
        String associates = 'SELECT COUNT() ' + 
        'FROM Associate__c ';
        if (filters.statuses != null || filters.searchKey != null || filters.certs != null) {
            associates += 'WHERE ';        
        }
        if (!String.isEmpty(filters.searchKey)) {
            String key = '%' + filters.searchKey + '%';
            associates += 'Last_Name__c LIKE :key ';
            needAnd= true;
        }
        if (filters.certs != null) {
            if (needAnd) {
                associates += 'AND ';
            }
            associates += 'Id IN :ids ';
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