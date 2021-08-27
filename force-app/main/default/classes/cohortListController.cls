public with sharing class cohortListController {
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates() {
        return [SELECT First_Name__c, Last_Name__C FROM Associate__c];
    }
}
