public with sharing class attemptListController {


    @AuraEnabled(cacheable=true)
    public static List<Attempt__c> getAttempts(Id voucherId) {
        return [SELECT Attempt_Type__c, Passed__c FROM Attempt__c WHERE Voucher__c = :voucherId];
    }
}
