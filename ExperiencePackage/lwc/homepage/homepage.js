import { LightningElement, api, wire, track} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAttempts from '@salesforce/apex/UserAttempt.getAttempts';
import getVouchers from '@salesforce/apex/UserAttempt.getVouchers';


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


const upcomingExamsColumn = [
    { label: 'Certification', fieldName: 'CertificationType'},
    { label: 'Due Date', fieldName: 'DueDate', type: 'date'  },
    { label: 'Voucher Code', fieldName: 'VoucherCode'},

];


const examResultsColumn = [
    { label: 'Certification', fieldName: 'Certification_Type'},
   // { label: 'Attempt Type', fieldName: 'AttemptType' },
    { label: 'Date', fieldName: 'Date', type: 'date' },
    { label: 'Passed?', fieldName: 'Passed', type: 'boolean' },
    { label: 'Result', fieldName: 'Result', type: 'formula(percent)' },
];

const certificationBlankColumn = [];


export default class Homepage extends LightningElement{
    adm_logo = ADM_LOGO;
    certificationBlankColumn = certificationBlankColumn;
    upcomingExamsColumn = upcomingExamsColumn;
    examResultsColumn = examResultsColumn;
    userId = Id;
    //@api Id_test = "a003F000005ETORQA4";
    data;
    error;
    //@wire(getRecord, { recordId: Id_test, fields: [ASSOCIATE_FIRSTNAME, ASSOCIATE_LASTNAME, ASSOCIATE_EMAIL, VOUCHER_CERTIFICATIONTYPE] })
    //associate_test;
    attemptFilterType = "Certification";
    get attemptOptions() {
        return [
                 { label: '--Both--', value: 'Both' },
                 { label: 'Practice', value: 'Practice' },
                 { label: 'Certification', value: 'Certification' },
               ];
            }


    @track currentVoucher;
    @track vouchers;
    @track currentAttempt;
    @track attempts;
    @wire(getAttempts)
    ShowExamResults({ error, data }) {
        if (data) {
            
            this.attempts = data;
            this.userName = data[0].Voucher__r.Associate__r.First_Name__c;
            
            let examResults = [];

            data.forEach(attempt => {
                
                let examResult = {};
                
                examResult.Certification_Type = attempt.Voucher__r.Certification_Type__c;
                examResult.AttemptType = attempt.Attempt_Type__c;
                examResult.Date= attempt.Date__c;
                examResult.Passed = attempt.Passed__c;
                examResult.Result = attempt.Weighted__c.toFixed(2) + "%";
             
                    
                if(examResult.AttemptType == this.attemptFilterType){
                    examResults.push(examResult);
                }
                
            });

            this.attempts = examResults;
            this.initialData = examResults;

        } else if (error) {
            console.log(error);
        }
    }
   


    data;
    error;

    @track currentVoucher;
    @track vouchers;
    //Get Exam Resultsfron Apex Class
    @wire(getVouchers)
    ShowUpcomingExams({ error, data }) {
        if (data) {
           
            this.vouchers = data;
            
            let voucherResults = [];

            data.forEach(voucher => {
                
                let voucherResult = {};
                
                voucherResult.CertificationType= voucher.Certification_Type__c;
                voucherResult.DueDate = voucher.Due_Date__c;
                voucherResult.VoucherCode = voucher.Voucher_Code__c;
            
                voucherResults.push(voucherResult);
               
                
            });

            this.vouchers = voucherResults;

        } else if (error) {
            console.log(error);
        }
    }

}

/*
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
  */
    //  objectApiNamey = ACCOUNT_OBJECT;
  //  fieldsy = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
   // @api objectApiName;


 

  



    
    


    
//@api userId = USER_ID;

 // @api associate = ASSOCIATE_OBJECT;
 // @api associateFields = [ASSOCIATE_FIRSTNAME, ASSOCIATE_LASTNAME, ASSOCIATE_NICKNAME, ASSOCIATE_EMAIL];
 //@api testName = ASSOCIATE_FIRSTNAME;
 // @track voucher = VOUCHER_OBJECT;
 // @track voucherFields = [VOUCHER_CERTIFICATIONTYPE, VOUCHER_DUEDATE, VOUCHER_EXPIRATIONDATE, VOUCHER_STATUS, VOUCHER_VOUCHERCODE, VOUCHER_VOUCHERTYPE];
   
 //  @track attempt=ATTEMPT_OBJECT;
 //  @wire voucherCode = VOUCHER_VOUCHERCODE;

    

