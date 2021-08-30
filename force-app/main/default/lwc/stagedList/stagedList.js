import { LightningElement, wire, api } from 'lwc';
import getAssociateList from '@salesforce/apex/stagingViewController.getAssociateList';

const columns = [
    { label: 'First Name', fieldName: 'First_Name__c' },
    { label: 'Last Name', fieldName: 'Last_Name__c' },
    { label: 'Status', fieldName: 'Current_Status__c' },
    { type: 'button', typeAttributes: { variant: 'base', label: 'View' },}
];
export default class StagingDatatable extends LightningElement {

    error;
    columns = columns;

    vrecord;
    @wire(getAssociateList)
    associates;

    handleRowAction( event ) {

        const sendId = new CustomEvent('associateselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);

    }
}