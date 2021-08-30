public with sharing class associateListController {

    // Returns a list of associates that belong to a cohort identified by cohortId
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates(Id cohortId) {
        return [SELECT First_Name__c, Last_Name__c FROM Associate__c WHERE Cohort__c = :cohortId] ;
    }
}
