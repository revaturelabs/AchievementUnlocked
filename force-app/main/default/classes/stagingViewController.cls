public with sharing class stagingViewController {
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociateList() {
        return [SELECT Id, Current_Status__c, First_Name__c, Last_Name__c, User__c,
        (SELECT Id, Name FROM Vouchers__r)
        FROM Associate__c LIMIT 10];
    }
}
