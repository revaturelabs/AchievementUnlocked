/* attemptsPage.js
* Created: 8/23/2021
* Last Modified: 9/7/2021
* Authors: Evan DeVizio, Nouh Anies
* Purpose: JavaScript client-side controller for attemptsPage LWC.
           Provides properties, event handlers, and functionality for the view.
*/

// *****************************************************************************************************
// ******************************** BEGIN IMPORT SECTION ***********************************************
// LWC import
import { track, wire, LightningElement, api } from 'lwc';

// APEX import
import getAttempts from '@salesforce/apex/UserAttempt.getAttempts';

// Object import
import ATTEMPT_OBJECT from '@salesforce/schema/Attempt__c';

// Field imports
import ANALYTICS_FIELD from '@salesforce/schema/Attempt__C.Analytics_Reports_and_Dashboards__c';
import APP_DEPLOYMENT_FIELD from '@salesforce/schema/Attempt__c.App_Deployment__c';
import ASYN_PROGRAMMING_FIELD from '@salesforce/schema/Attempt__c.Asynchronous_Programming__c';
import ATTEMPT_TYPE_FIELD from '@salesforce/schema/Attempt__c.Attempt_Type__c';
import AUDITING_FIELD from '@salesforce/schema/Attempt__c.Auditing_and_Monitoring__c';
import BROWSER_FIELD from '@salesforce/schema/Attempt__c.Browser_and_Events__c';
import BUSINESS_LOGIC_FIELD from '@salesforce/schema/Attempt__c.Business_Logic_and_Process_Automation__c';
import CHANGE_MANAGEMENT_FIELD from '@salesforce/schema/Attempt__c.Change_Management__c';
import CONFIG_SETUP_FIELD from '@salesforce/schema/Attempt__c.Configuration_and_Setup__c';
import CONTENT_MANAGEMENT_FIELD from '@salesforce/schema/Attempt__c.Content_Management__c';
import DATA_ANALYTICS_MANAGEMENT_FIELD from '@salesforce/schema/Attempt__c.Data_and_Analytics_Management__c';
import DATA_MANAGEMENT_FIELD from '@salesforce/schema/Attempt__c.Data_Management__c';
import DATA_MODELING_MANAGEMENT_FIELD from '@salesforce/schema/Attempt__c.Data_Modeling_and_Management__c';
import DATE_TEXT_FIELD from '@salesforce/schema/Attempt__c.textDate__c';
import DEBUG_DEPLOYMENT_FIELD from '@salesforce/schema/Attempt__c.Debug_and_Deployment_Tools__c';
import DEBUG_ERROR_HANDLING_FIELD from '@salesforce/schema/Attempt__c.Debugging_and_Error_Handling__c';
import EXTENDING_CUSTOM_OBJECTS_FIELD from '@salesforce/schema/Attempt__c.Extending_Custom_Objects_and_Application__c';
import INTEGRATION_FIELD from '@salesforce/schema/Attempt__c.Integration__c';
import OBJECT_MANAGER_FIELD from '@salesforce/schema/Attempt__c.Object_Manager_and_Lightning_App_Builder__c';
import OBJECT_FUNCTIONS_CLASSES_FIELD from '@salesforce/schema/Attempt__c.Objects_Functions_and_Classes__c';
import PASSED_FIELD from '@salesforce/schema/Attempt__c.Passed__c';
import PERFORMANCE_FIELD from '@salesforce/schema/Attempt__c.Performance__c';
import PRACTICE_SCORE_FIELD from '@salesforce/schema/Attempt__c.Performance__c';
import PROCESS_AUTOMATION_FIELD from '@salesforce/schema/Attempt__c.Process_Automation__c';
import PROCESS_AUTOMATION_LOGIC_FIELD from '@salesforce/schema/Attempt__c.Process_Automation_and_Logic__c';
import PRODUCTIVITY_FIELD from '@salesforce/schema/Attempt__c.Productivity_and_Collaboration__c';
import RECORD_TYPE_FIELD from '@salesforce/schema/Attempt__c.RecordTypeId';
import SALES_MARKETING_FIELD from '@salesforce/schema/Attempt__c.Sales_and_Marketing_Applications__c';
import SALES_CLOUD_FIELD from '@salesforce/schema/Attempt__c.Sales_Cloud_Applications__c';
import SALESFORCE_FUNDAMENTALS_FIELD from '@salesforce/schema/Attempt__c.Salesforce_Fundamentals__c';
import SECURITY_ACCESS_FIELD from '@salesforce/schema/Attempt__c.Security_and_Access__c';
import SERVER_SIDE_JS_FIELD from '@salesforce/schema/Attempt__c.Server_Side_Javascript__c';
import SERVICE_SUPPORT_APP_FIELD from '@salesforce/schema/Attempt__c.Service_and_Support_Applications__c';
import SERVICE_CLOUD_FIELD from '@salesforce/schema/Attempt__c.Service_Cloud_Applications__c';
import TESTING_FIELD from '@salesforce/schema/Attempt__c.Testing__c';
import TESTING_DEB_DEPLOY_FIELD from '@salesforce/schema/Attempt__c.Testing_Debugging_and_Deployment__c';
import USER_INTERFACE_FIELD from '@salesforce/schema/Attempt__c.User_Interface__c';
import VARIABLES_TYPES_COLLECTIONS_FIELD from '@salesforce/schema/Attempt__c.Variables_Types_and_Collections__c';
import VOUCHER_FIELD from '@salesforce/schema/Attempt__c.Voucher__c';
import WORKFLOW_FIELD from '@salesforce/schema/Attempt__c.Workflow_Process_Automation__c';
// ******************************** END IMPORT SECTION *************************************************
// *****************************************************************************************************

// *****************************************************************************************************
// ******************************* BEGIN AttemptsPage Class ********************************************
const columns = [ // columns for the attempt datatable
    { label: 'View', type: 'button-icon', initialWidth: 75, 
    typeAttributes: {iconName: 'action:preview', title: 'preview', 
    variant: 'border-filled', alternativeText: 'View'}},
    { label: 'Certification', fieldName: 'CertificationType'},
    { label: 'Attempt Type', fieldName: 'AttemptType' },
    { label: 'Date', fieldName: 'Date', type: 'text' },
    { label: 'Result', fieldName: 'Result', type: 'formula(percent)' },
];

// AttemptsPage class definition
export default class AttemptsPage extends LightningElement {
    @api recordId;
    // Store imported schema info into variables
    objectApiName = ATTEMPT_OBJECT;
    analyticsReportsField = ANALYTICS_FIELD;
    appDeploy = APP_DEPLOYMENT_FIELD;
    asyncProgramming = ASYN_PROGRAMMING_FIELD;
    attemptType = ATTEMPT_TYPE_FIELD;
    auditingMonitoring = AUDITING_FIELD;
    browserEvents = BROWSER_FIELD;
    businessLogic = BUSINESS_LOGIC_FIELD;
    changeManagement = CHANGE_MANAGEMENT_FIELD;
    configSetup = CONFIG_SETUP_FIELD;
    contentManagement = CONTENT_MANAGEMENT_FIELD;
    dataAnalyticsManagement = DATA_ANALYTICS_MANAGEMENT_FIELD;
    dataManagement = DATA_MANAGEMENT_FIELD;
    dataModeling = DATA_MODELING_MANAGEMENT_FIELD;
    date = DATE_TEXT_FIELD;
    debugDeploy = DEBUG_DEPLOYMENT_FIELD;
    debugError = DEBUG_ERROR_HANDLING_FIELD;
    extendingCustomObjects = EXTENDING_CUSTOM_OBJECTS_FIELD;
    integration = INTEGRATION_FIELD;
    objectManager = OBJECT_MANAGER_FIELD;
    objectsFunctionsClasses = OBJECT_FUNCTIONS_CLASSES_FIELD;
    passedCheckbox = PASSED_FIELD;
    performance = PERFORMANCE_FIELD;
    practiceScore = PRACTICE_SCORE_FIELD;
    processAutomation = PROCESS_AUTOMATION_FIELD;
    processAutomationAndLogic = PROCESS_AUTOMATION_LOGIC_FIELD;
    productivityCollab = PRODUCTIVITY_FIELD;
    recordType = RECORD_TYPE_FIELD
    salesMarketing = SALES_MARKETING_FIELD;
    salesCloud = SALES_CLOUD_FIELD;
    salesforceFundamentals = SALESFORCE_FUNDAMENTALS_FIELD;
    securityAccess = SECURITY_ACCESS_FIELD;
    serverSideJs = SERVER_SIDE_JS_FIELD;
    serviceAndSupport = SERVICE_SUPPORT_APP_FIELD;
    serviceCloud = SERVICE_CLOUD_FIELD;
    testing = TESTING_FIELD;
    testingDebugDeploy = TESTING_DEB_DEPLOY_FIELD;
    userInterface = USER_INTERFACE_FIELD;
    variablesTypesCollections = VARIABLES_TYPES_COLLECTIONS_FIELD;
    voucher = VOUCHER_FIELD;
    workflow = WORKFLOW_FIELD;

    columns = columns; // set the columns for the datatable
    userName; // for displaying the user's name at the top of the page
    certFilterType = "All"; // default cert type. used in filter combobox
    attemptFilterType = "Both"; // default attempt type. used in filter combobox
    initialData; // temp variable for saving a reference to the full set of attempts

    get attemptOptions() { // return values for attempt type combobox
        return [
                 { label: '--Both--', value: 'Both' },
                 { label: 'Practice', value: 'Practice' },
                 { label: 'Certification', value: 'Certification' },
               ];
    }

    get certOptions() { // returns values for cert type combobox
        return [
                 { label: '--All--', value: 'All' },
                 { label: 'ADM', value: 'ADM' },
                 { label: 'Advanced ADM', value: 'Advanced ADM' },
                 { label: 'PD1', value: 'PD1' },
                 { label: 'PD2', value: 'PD2' },
                 { label: 'JS Developer 1', value: 'JS Developer 1' },
                 { label: 'Platform App Builder', value: 'Platform App Builder' },
               ];
    }

    @track
    currentAttempt; // current attempt of a specific row in the datatable

    @track
    showModal = false; // boolean for displaying the attempt modal

    @track
    attempts; // property that responds to APEX

    @wire(getAttempts) // wire the Apex controller
    DoAttempts({ error, data }) { 
        if (data) { 
            this.attempts = data; 
            // get the first name of the first attempt retrieved
            this.userName = data[0].Voucher__r.Associate__r.First_Name__c;
            
            // prepare the data to use in the datatable if data exists
            let preparedAttempts = [];
            data.forEach(attempt => { // on every attempt, set the fields
                let preparedAttempt = {};
                preparedAttempt.Id = attempt.Id
                preparedAttempt.Name = attempt.Name;
                preparedAttempt.CertificationType = attempt.Voucher__r.Certification_Type__c;
                preparedAttempt.Date= attempt.textDate__c;
                preparedAttempt.AttemptType = attempt.Attempt_Type__c;
                preparedAttempt.Result = attempt.Weighted__c.toFixed(2) + "%";
                preparedAttempts.push(preparedAttempt);
            });
            this.attempts = preparedAttempts; // set the full list
            this.initialData = preparedAttempts; // set the temp list
        } else if (error) { // no data
            console.log(error);
        }
    }
    // ******************************** END AttemptsPage Class *********************************************
    // *****************************************************************************************************
    
    // *****************************************************************************************************
    // ******************************** BEGIN FUNCTION SECTION *********************************************
    
    handleFilterClick() { // fired when the Filter button is clicked
        // set temporary variable that holds all of attempts for the associate
        let allAttempts = this.initialData;
        let filtered = []; // list to hold the matched attempts

        // Filter by certification type
        if(this.certFilterType != "All"){
            // check the list and match attempts based on cert 
            for(let att of allAttempts){
                if(att.CertificationType == this.certFilterType){
                    filtered.push(att);
                }
            }
            if(filtered.length < 1){ // empty table if no matches
                this.attempts = [];
            }
            else { // set the datatable equal to the list of matches
                this.attempts = filtered;
            }
        }
        else { // if the filter is set to "All", show all the cert types
            this.attempts = allAttempts;
        }

        //Filter by attempt type
        let currentList = []; // blank list to add the found matches
        if(this.attemptFilterType != "Both"){
            // check the list and match attempts based on attempt type
            for(let attempt of this.attempts){
                if(attempt.AttemptType == this.attemptFilterType){
                    currentList.push(attempt);
                }
            }
            this.attempts = currentList; // change the datatable to the new list
        }
        else {
            currentList = this.attempts; // revert the list to show both types
        }
    }

    handleRowAction(event) { // fired when the View button is clicked
        this.showModal = true; // show the modal
        this.currentAttempt = event.detail.row; // set the currentAttempt to the row that was clicked

        // switch the result based on the cert type
        switch (this.currentAttempt.CertificationType) {
            case 'ADM':
                this.adm = true;
                break;
            case 'Advanced ADM':
                this.advAdm = true;
                break;
            case 'PD1':
                this.pd1 = true;
                break;
            case 'PD2':
                this.pd2 = true;
                break
            case 'JS Developer 1':
                this.js = true;
                break;
            case 'Platform App Builder':
                this.pab = true;
                break;
            default:
        }
    }
    
    handleCertTypeChange(event) { // cert type combobox action
        // set cert type property to combobox value
        this.certFilterType = event.detail.value; 
    }

    handleAttemptTypeChange(event){ // attempt type combobox action
        // set attempt type property to combobox value
        this.attemptFilterType = event.detail.value;
    }
    
    closeModalAction() { // fires when Close button is clicked in the modal
        // closes modal and resets cert types
        this.showModal = false;
        this.adm = false;
        this.advAdm = false;
        this.pd1 = false;
        this.pd2 = false;
        this.js = false;
        this.pab = false;
    }
}
// ******************************** END FUNCTION SECTION *********************************************
// ***************************************************************************************************
