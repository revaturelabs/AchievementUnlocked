public with sharing class cohortListController {

    // Returns a list of associates belonging to a cohort given by cohortId
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates(Id cohortId) {
        return [SELECT First_Name__c, Last_Name__c, Current_Status__c FROM Associate__c WHERE Cohort__c = :cohortId];
    }
}
