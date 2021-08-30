import { LightningElement, api, wire } from 'lwc';
import getVouchers from '@salesforce/apex/voucherListController.getVouchers';

const columns = [
    {label: 'Voucher Number', fieldName: 'Name', type: 'button', typeAttributes: {variant: 'base', label: {fieldName: 'Name'}}},
    {label: 'Certification Type', fieldName: 'Certification_Type__c', type: 'text'},
    {label: 'Voucher Type', fieldName: 'Voucher_Type__c', type: 'text'},
];

export default class VoucherList extends LightningElement {
    columns = columns;
    @api associateId;
    @wire(getVouchers, {associateId: '$associateId'})
    vouchers;

    showAttempt(event) {
        const sendId = new CustomEvent('voucherselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }
}