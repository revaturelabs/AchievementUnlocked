public with sharing class associateListController {
    @AuraEnabled(cacheable=true)
    public static List<Associate__c> getAssociates(Id cohortId) {
        return [SELECT First_Name__c, Last_Name__c FROM Associate__c WHERE Cohort__c = :cohortId] ;
    }
}
