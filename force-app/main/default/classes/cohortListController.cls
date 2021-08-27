public with sharing class cohortListController {
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> getCohorts() {
        return [SELECT Start_Date__c FROM Cohort__c];
    }
}
