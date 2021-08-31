import { LightningElement, wire, api } from 'lwc';
import getAttempts from '@salesforce/apex/viewController.getAttempts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Attempt_Type__c' },
    { label: 'Passed', fieldName: 'Passed__c', type: 'boolean' },
];

export default class AttemptList extends LightningElement {

    error;
    columns = columns;

    @api associateId;
    @wire(getAttempts, {associateId: '$associateId'})
    attempts;
}