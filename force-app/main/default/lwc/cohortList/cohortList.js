import { LightningElement, wire } from 'lwc';
import getAssociates from '@salesforce/apex/cohortListController.getAssociates';

const columns = [
    {label: 'First Name', fieldName: 'First_Name__c', type: 'text'},
    {label: 'Last Name', fieldName: 'Last_Name__c', type: 'text'}
];

export default class CohortList extends LightningElement {
    columns = columns;
    @wire(getAssociates)
    associates;
}