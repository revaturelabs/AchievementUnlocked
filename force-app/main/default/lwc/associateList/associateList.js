import { LightningElement, api, wire } from 'lwc';
import getAssociates from '@salesforce/apex/associateListController.getAssociates';

const columns = [
    {label: 'First Name', fieldName: 'First_Name__c', type: 'text'},
    {label: 'Last Name', fieldName: 'Last_Name__c', type: 'text'}
];

export default class AssociateList extends LightningElement {
    columns = columns;
    @api cohortId;
    @wire(getAssociates, {cohortId: '$cohortId'})
    associates;
}