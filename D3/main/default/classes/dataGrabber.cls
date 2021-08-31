public with sharing class dataGrabber {
    
    @AuraEnabled (cacheable=true)
    public static List<String> getCerts(){
        Schema.describeFieldResult fieldResult = Voucher__c.Certification_Type__c.getDescribe();
        List<Schema.PicklistEntry> entries = fieldResult.getPicklistValues();
        List<String>picklistLabels = new List<String>();
        for(Schema.PicklistEntry newEntry : entries) {
            picklistLabels.add(newEntry.getLabel());
        }
        return picklistLabels;
    }

    @AuraEnabled (cacheable=true)
    public static List<String> getCohorts() {
        List<String> cohorts = new List<String>();
        List<Cohort__c> objects = [SELECT name FROM cohort__c];
        for (Cohort__c co : objects) {
            cohorts.add(co.name);
        }
        return cohorts;
    }

}
