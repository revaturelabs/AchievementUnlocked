public with sharing class stagingViewController {
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociateList() {
        return [SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c
        FROM Associate__c LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getVoucherList(Id AssocID) {
        return [SELECT Id, Name, Certification_Type__c, Status__c, Associate__c, Associate__r.Id 
        FROM Voucher__c
        WHERE Associate__c =: AssocID];
    }

    @AuraEnabled(cacheable=true)
    public static List<Attempt__c> getAttemptList(Id AssocID) {
        return [SELECT Id, Name, Attempt_Type__c, Voucher__c, Voucher__r.Associate__c 
        FROM Attempt__c
        WHERE Voucher__r.Associate__c =: AssocID];
    }
}
