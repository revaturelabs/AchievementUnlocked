import { LightningElement, api, wire } from 'lwc';
import getAssociates from '@salesforce/apex/viewController.getAssociates';

const columns = [
    { label: 'First Name', fieldName: 'First_Name__c' },
    { label: 'Last Name', fieldName: 'Last_Name__c' },
    { label: 'Status', fieldName: 'Current_Status__c' },
    { type: 'button', typeAttributes: { variant: 'base', label: 'View' },}
];

export default class AssociateList extends LightningElement {
    columns = columns;
    @api cohortId = null;
    @wire(getAssociates, {cohortId: '$cohortId'})
    associates;

    showInfo(event) {
        const sendId = new CustomEvent('associateselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }
}