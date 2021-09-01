import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
//import USER_ID from '@salesforce/user/Id';

import REVATURE_LOGO from '@salesforce/resourceUrl/RevatureLogo';
import ADM_LOGO from '@salesforce/resourceUrl/AdmLogo';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
    import NAME_FIELD from '@salesforce/schema/Account.Name';
    import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
    import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

/*
import ASSOCIATE_OBJECT from '@salesforce/schema/Associate';
    import ASSOCIATE_FIRSTNAME from '@salesforce/schema/Associate.First_Name';
    import ASSOCIATE_LASTNAME from '@salesforce/schema/Associate.Last_Name';
    import ASSOCIATE_NICKNAME from '@salesforce/schema/Associate.Nickname';    

import VOUCHER_OBJECT from '@salesforce/schema/Voucher';
    import VOUCHER_CERTIFICATIONTYPE from '@salesforce/schema/Voucher.Certification_Type';
    import VOUCHER_DUEDATE from '@salesforce/schema/Voucher.Due_Date';
    import VOUCHER_EXPIRATIONDATE from '@salesforce/schema/Voucher.Expiration_Date';
    import VOUCHER_STATUS from '@salesforce/schema/Voucher.Status';
    import VOUCHER_VOUCHERCODE from '@salesforce/schema/Voucher.Voucher_Code';
    import VOUCHER_VOUCHERTYPE from '@salesforce/schema/Voucher.Voucher_Type';

import ATTEMPT_OBJECT from '@salesforce/schema/Attempt';
*/
export default class Homepage extends LightningElement{
    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    account;
    
    rev_logo = REVATURE_LOGO;
    adm_logo = ADM_LOGO;


    
   /* @wire userId = USER_ID;

    @wire name = ASSOCIATE_FIRSTNAME;
    @wire voucherCode = VOUCHER_VOUCHERCODE;
    */
    
}
