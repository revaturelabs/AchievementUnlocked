import { LightningElement, api, wire } from 'lwc';
import getAssociates from '@salesforce/apex/associateListController.getAssociates';

const columns = [
    {label: 'First Name', fieldName: 'First_Name__c', type: 'text'},
    {label: 'Last Name', fieldName: 'Last_Name__c', type: 'button', typeAttributes: {variant: 'base', label: {fieldName: 'Last_Name__c'}}},
    {label: 'Status', fieldName: 'Current_Status__c', type: 'text'}
];

export default class AssociateList extends LightningElement {
    columns = columns;
    @api cohortId;
    @wire(getAssociates, {cohortId: '$cohortId'})
    associates;

    showVoucher(event) {
        const sendId = new CustomEvent('associateselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }
}