public with sharing class cohortListController {

    // Returns a list of all cohorts
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> getCohorts() {
        return [SELECT Start_Date__c FROM Cohort__c];
    }
}
