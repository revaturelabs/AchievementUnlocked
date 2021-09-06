import { LightningElement, api,wire } from "lwc";
import ATTEMPT_OBJECT from "@salesforce/schema/Attempt__c";
import ANALYTICS_FIELD from "@salesforce/schema/Attempt__C.Analytics_Reports_and_Dashboards__c";
import APP_DEPLOYMENT_FIELD from "@salesforce/schema/Attempt__c.App_Deployment__c";
import ASYN_PROGRAMMING_FIELD from "@salesforce/schema/Attempt__c.Asynchronous_Programming__c";
import ATTEMPT_TYPE_FIELD from "@salesforce/schema/Attempt__c.Attempt_Type__c";
import AUDITING_FIELD from "@salesforce/schema/Attempt__c.Auditing_and_Monitoring__c";
import BROWSER_FIELD from "@salesforce/schema/Attempt__c.Browser_and_Events__c";
import BUSINESS_LOGIC_FIELD from "@salesforce/schema/Attempt__c.Business_Logic_and_Process_Automation__c";
import CHANGE_MANAGEMENT_FIELD from "@salesforce/schema/Attempt__c.Change_Management__c";
import CONFIG_SETUP_FIELD from "@salesforce/schema/Attempt__c.Configuration_and_Setup__c";
import CONTENT_MANAGEMENT_FIELD from "@salesforce/schema/Attempt__c.Content_Management__c";
import DATA_ANALYTICS_MANAGEMENT_FIELD from "@salesforce/schema/Attempt__c.Data_and_Analytics_Management__c";
import DATA_MANAGEMENT_FIELD from "@salesforce/schema/Attempt__c.Data_Management__c";
import DATA_MODELING_MANAGEMENT_FIELD from "@salesforce/schema/Attempt__c.Data_Modeling_and_Management__c";
import DATE_FIELD from "@salesforce/schema/Attempt__c.Date__c";
//import DATE_TEXT_FIELD from '@salesforce/schema/Attempt__c.textDate__c'
import DEBUG_DEPLOYMENT_FIELD from "@salesforce/schema/Attempt__c.Debug_and_Deployment_Tools__c";
import DEBUG_ERROR_HANDLING_FIELD from "@salesforce/schema/Attempt__c.Debugging_and_Error_Handling__c";
import EXTENDING_CUSTOM_OBJECTS_FIELD from "@salesforce/schema/Attempt__c.Extending_Custom_Objects_and_Application__c";
import INTEGRATION_FIELD from "@salesforce/schema/Attempt__c.Integration__c";
import OBJECT_MANAGER_FIELD from "@salesforce/schema/Attempt__c.Object_Manager_and_Lightning_App_Builder__c";
import OBJECT_FUNCTIONS_CLASSES_FIELD from "@salesforce/schema/Attempt__c.Objects_Functions_and_Classes__c";
import PASSED_FIELD from "@salesforce/schema/Attempt__c.Passed__c";
import PERFORMANCE_FIELD from "@salesforce/schema/Attempt__c.Performance__c";
import PRACTICE_SCORE_FIELD from "@salesforce/schema/Attempt__c.Performance__c";
import PROCESS_AUTOMATION_FIELD from "@salesforce/schema/Attempt__c.Process_Automation__c";
import PROCESS_AUTOMATION_LOGIC_FIELD from "@salesforce/schema/Attempt__c.Process_Automation_and_Logic__c";
import PRODUCTIVITY_FIELD from "@salesforce/schema/Attempt__c.Productivity_and_Collaboration__c";
import RECORD_TYPE_FIELD from "@salesforce/schema/Attempt__c.RecordTypeId";
import SALES_MARKETING_FIELD from "@salesforce/schema/Attempt__c.Sales_and_Marketing_Applications__c";
import SALES_CLOUD_FIELD from "@salesforce/schema/Attempt__c.Sales_Cloud_Applications__c";
import SALESFORCE_FUNDAMENTALS_FIELD from "@salesforce/schema/Attempt__c.Salesforce_Fundamentals__c";
import SECURITY_ACCESS_FIELD from "@salesforce/schema/Attempt__c.Security_and_Access__c";
import SERVER_SIDE_JS_FIELD from "@salesforce/schema/Attempt__c.Server_Side_Javascript__c";
import SERVICE_SUPPORT_APP_FIELD from "@salesforce/schema/Attempt__c.Service_and_Support_Applications__c";
import SERVICE_CLOUD_FIELD from "@salesforce/schema/Attempt__c.Service_Cloud_Applications__c";
import TESTING_FIELD from "@salesforce/schema/Attempt__c.Testing__c";
import TESTING_DEB_DEPLOY_FIELD from "@salesforce/schema/Attempt__c.Testing_Debugging_and_Deployment__c";
import USER_INTERFACE_FIELD from "@salesforce/schema/Attempt__c.User_Interface__c";
import VARIABLES_TYPES_COLLECTIONS_FIELD from "@salesforce/schema/Attempt__c.Variables_Types_and_Collections__c";
import VOUCHER_FIELD from "@salesforce/schema/Attempt__c.Voucher__c";
import WORKFLOW_FIELD from "@salesforce/schema/Attempt__c.Workflow_Process_Automation__c";

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class AttemptsInputModal extends LightningElement {
  // Setting Object Name and Fields for the Edit Form from imports
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
  date = DATE_FIELD;
  //textDate = DATE_TEXT_FIELD;
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
  recordType = RECORD_TYPE_FIELD;
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


  @api
  currentVoucherType;
  @api
  certVoucherId;
  @api
  practiceVoucherId;
  @api
  recordTypeId;
  adm;
  advAdm;
  pd1;
  pd2;
  js;
  pab;

  @wire(getObjectInfo, {objectApiName : ATTEMPT_OBJECT})
  attemptInfo;

  handleAttemptSubmit(event) {
    event.preventDefault();
    const fields = event.detail.fields;
    if(fields.Attempt_Type__c == "Practice") {
      fields.Voucher__r = this.practiceVoucherId;
    } else if (fields.Attempt_Type__c == 'Certfication') {
      fields.Voucher__r = this.certVoucherId;
    }
    this.template.querySelector('lightning-record-edit-form').submit(fields);
  }

  handleCancel(event) {
    this.dispatchEvent(new CustomEvent("close"));
  }

  handleSuccess(event) {
    console.log("successful?")
    this.dispatchEvent(new CustomEvent("close"));
    const toastEvent = new ShowToastEvent({
      title: "Successful Submit",
      message: "Attempt Submitted!",
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }

  handleErrors(event){
    console.log("in errors function",event);
  }

  connectedCallback() {
    switch (this.currentVoucherType) {
      case "Adm":
        this.adm = true;
        break;
      case "Advanced Adm":
        this.advAdm = true;
        break;
      case "PD1":
        this.pd1 = true;
        break;
      case "PD2":
        this.pd2 = true;
        break;
      case "Javascript":
        this.js = true;
        break;
      case "Platform App Builder":
        this.pab = true;
        break;
      default:
        break;
    }
  }

}