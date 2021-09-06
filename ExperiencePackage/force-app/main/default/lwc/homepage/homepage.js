import { LightningElement, api, wire, track} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


import REVATURE_LOGO from '@salesforce/resourceUrl/RevatureLogo';
import ADM_LOGO from '@salesforce/resourceUrl/AdmLogo';
import ADVANCED_ADM_LOGO from "@salesforce/resourceUrl/AdvancedAdmLogo";
import JAVASCRIPT_LOGO from "@salesforce/resourceUrl/JavscriptDevLogo";
import PD1 from "@salesforce/resourceUrl/Pd1Logo";
import PD2 from "@salesforce/resourceUrl/Pd2Logo";
import PAB from "@salesforce/resourceUrl/platformappbuilder";

import Id from '@salesforce/user/Id';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
    import NAME_FIELD from '@salesforce/schema/Account.Name';
    import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
    import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';


import ASSOCIATE_OBJECT from '@salesforce/schema/Associate__c';
    import ASSOCIATE_FIRSTNAME from '@salesforce/schema/Associate__c.First_Name__c';
    import ASSOCIATE_LASTNAME from '@salesforce/schema/Associate__c.Last_Name__c';
    import ASSOCIATE_NICKNAME from '@salesforce/schema/Associate__c.Nickname__c';
    import ASSOCIATE_EMAIL from '@salesforce/schema/Associate__c.Email__c';    
   // import VOUCHER_CERTIFICATIONTYPE from '@salesforce/schema/Associate__c.Voucher__c.Certification_Type__c';
import VOUCHER_OBJECT from '@salesforce/schema/Voucher__c';
    import VOUCHER_CERTIFICATIONTYPE from '@salesforce/schema/Voucher__c.Certification_Type__c';
    import VOUCHER_DUEDATE from '@salesforce/schema/Voucher__c.Due_Date__c';
    import VOUCHER_EXPIRATIONDATE from '@salesforce/schema/Voucher__c.Expiration_Date__c';
    import VOUCHER_STATUS from '@salesforce/schema/Voucher__c.Status__c';
    import VOUCHER_VOUCHERCODE from '@salesforce/schema/Voucher__c.Voucher_Code__c';
    import VOUCHER_VOUCHERTYPE from '@salesforce/schema/Voucher__c.Voucher_Type__c';



import ATTEMPT_OBJECT from '@salesforce/schema/Attempt__c';


const upcomingExamsColumn = [
    { label: '', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

const examResultsColumn = [
    { label: "Attempt Type", fieldName: "Attempt_Type__c", type: "picklist" },
  { label: "Passed?", fieldName: "Passed__c", type: "checkbox" },
  { label: "Practice Score", fieldName: "Practice_Score__c", type: "percent" },
];




export default class Homepage extends LightningElement{
   
    upcomingExamsColumn = upcomingExamsColumn;
    examResultsColumn = examResultsColumn;
    userId = Id;
    @api Id_test = "a003F000005ETORQA4";
    data;
    error;
    //@wire(getRecord, { recordId: Id_test, fields: [ASSOCIATE_FIRSTNAME, ASSOCIATE_LASTNAME, ASSOCIATE_EMAIL, VOUCHER_CERTIFICATIONTYPE] })
    //associate_test;
    




    //error check
    wiredAccount({data, error}) {
        console.log('Execute logic each time a new value is provisioned');
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
  
    //  objectApiNamey = ACCOUNT_OBJECT;
  //  fieldsy = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
   @api objectApiName;


 

  
  handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }



    
    adm_logo = ADM_LOGO;


    
//@api userId = USER_ID;

  @api associate = ASSOCIATE_OBJECT;
  @api associateFields = [ASSOCIATE_FIRSTNAME, ASSOCIATE_LASTNAME, ASSOCIATE_NICKNAME, ASSOCIATE_EMAIL];
 //@api testName = ASSOCIATE_FIRSTNAME;
 // @track voucher = VOUCHER_OBJECT;
 // @track voucherFields = [VOUCHER_CERTIFICATIONTYPE, VOUCHER_DUEDATE, VOUCHER_EXPIRATIONDATE, VOUCHER_STATUS, VOUCHER_VOUCHERCODE, VOUCHER_VOUCHERTYPE];
   
   @track attempt=ATTEMPT_OBJECT;
  //  @wire voucherCode = VOUCHER_VOUCHERCODE;

    
}
