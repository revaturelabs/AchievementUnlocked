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
    
    @AuraEnabled (cacheable=true)
    public static List<Object> getScoresbyCohort(String jCohort, String jAttempt, Boolean jAverage) {
        List<Object> finalList = new List<Object>();
        String cohortOnly = '';
        if (jAverage == false) {
            cohortOnly = ' WHERE voucher__r.associate__r.cohort__r.name =: jCohort';
        }
        if (jAttempt == 'ADM') {
            finalList = Database.query('SELECT AVG(configuration_and_setup__c), AVG(object_manager_and_lightning_app_builder__c), AVG(sales_and_marketing_applications__c), AVG(service_and_support_applications__c), AVG(productivity_and_collaboration__c), AVG(data_and_analytics_management__c), AVG(workflow_process_automation__c) FROM attempt__c'+cohortOnly);
        } else if (jAttempt == 'PD1') {
           finalList = Database.query('SELECT AVG(salesforce_fundamentals__c), AVG(data_modeling_and_management__c), AVG(process_automation_and_logic__c), AVG(user_interface__c), AVG(testing_debugging_and_deployment__c) FROM attempt__c'+cohortOnly);
        } else if (jAttempt == 'Advanced ADM') {
            finalList = Database.query('SELECT AVG(security_and_access__c), AVG(extending_custom_objects_and_application__c), AVG(auditing_and_monitoring__c), AVG(sales_cloud_applications__c), AVG(service_cloud_applications__c), AVG(data_management__c), AVG(content_management__c), AVG(change_management__c), AVG(analytics_reports_and_dashboards__c), AVG(process_automation__c) FROM attempt__c'+cohortOnly);
        } else if (jAttempt == 'PD2') {
        	finalList = Database.query('SELECT AVG(salesforce_fundamentals__c), AVG(data_modeling_and_management__c), AVG(business_logic_and_process_automation__c), AVG(user_interface__c), AVG(performance__c), AVG(integration__c), AVG(testing__c), AVG(debug_and_deployment_tools__c) FROM attempt__c'+cohortOnly);
        } else if (jAttempt == 'Platform App Builder') {
            finalList = Database.query('SELECT AVG(salesforce_fundamentals__c), AVG(data_modeling_and_management__c), AVG(business_logic_and_process_automation__c), AVG(user_interface__c), AVG(app_deployment__c) FROM attempt__c'+cohortOnly);
        } else if (jAttempt == 'JS Developer 1') {
            finalList = Database.query('SELECT AVG(variables_types_and_collections__c), AVG(objects_functions_and_classes__c), AVG(browser_and_events__c), AVG(debugging_and_error_handling__c), AVG(asynchronous_programming__c), AVG(server_side_javascript__c), AVG(testing__c) FROM attempt__c'+cohortOnly);
        } else {
            finalList = [SELECT id FROM attempt__c LIMIT 1];
        }
        return finalList;
    }

}
