import { LightningElement, wire } from 'lwc';
import getAssociateList from '@salesforce/apex/stagingViewController.getAssociateList';

const columns = [
    { label: 'First Name', fieldName: 'First_Name__c' },
    { label: 'Last Name', fieldName: 'Last_Name__c' },
    { label: 'Status', fieldName: 'Current_Status__c' },
    { label: 'Voucher', fieldName: 'Vouchers__r.Name' },
];
export default class ApexDatatableExample extends LightningElement {

    error;
    columns = columns;

     @wire(getAssociateList)
    associates;

}