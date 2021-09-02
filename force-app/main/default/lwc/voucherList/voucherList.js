import { LightningElement, api, wire } from 'lwc';
import getVouchers from '@salesforce/apex/viewController.getVouchers';

const columns = [
    { label: 'Voucher', fieldName: 'Name' },
    { label: 'Certification', fieldName: 'Certification_Type__c'},
    { label: 'Voucher Type', fieldName: 'Voucher_Type__c' },
    { label: 'Status', fieldName: 'Status__c' },
];

export default class VoucherList extends LightningElement {
    columns = columns;
    @api associateId;
    @wire(getVouchers, {associateId: '$associateId'})
    vouchers;
}