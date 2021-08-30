public with sharing class viewController {
    
    // Returns a list of all cohorts
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> getCohorts() {
        return [SELECT Start_Date__c FROM Cohort__c];
    }

    // Returns a list of all associates
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates() {
        return getAssociates(null);
    }

    // Returns a list of all associates belonging to a cohort identified by cohortId
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates(Id cohortId) {
        String query = 'SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c, Cohort__c FROM Associate__c';
        if (cohortId != null) {
            query += ' WHERE Cohort__c = :cohortId';
        }
        return Database.query(query);
    }

    // Returns a list of all vouchers belonging to an associate identified by associateId
    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getVouchers(Id associateId) {
        return [SELECT Id, Name, Certification_Type__c, Status__c, Associate__c, Associate__r.Id 
        FROM Voucher__c
        WHERE Associate__c =: associateId];
    }

    // Returns a list of all attempts made by an associate identified by associateId
    @AuraEnabled(cacheable=true)
    public static List<Attempt__c> getAttempts(Id associateId) {
        return [SELECT Id, Name, Attempt_Type__c, Voucher__c, Passed__c, Voucher__r.Associate__c 
        FROM Attempt__c
        WHERE Voucher__r.Associate__c =: associateId];
    }

}
