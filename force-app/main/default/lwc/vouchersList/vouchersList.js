import { LightningElement, wire, api } from 'lwc';
import getVoucherList from '@salesforce/apex/stagingViewController.getVoucherList';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Certification', fieldName: 'Certification_Type__c' },
    { label: 'Status', fieldName: 'Status__c' },
];

export default class VoucherDatatable extends LightningElement {

    error;
    columns = columns;

    @api vrecord;
    @wire(getVoucherList, {AssocID: '$vrecord'})
    vouchers;
}