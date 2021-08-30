import { LightningElement, api, wire } from 'lwc';
import getAttempts from '@salesforce/apex/attemptListController.getAttempts';


const columns = [
    {label: 'Attempt Type', fieldName: 'Attempt_Type__c', type: 'text'},
    {label: 'Passed', fieldName: 'Passed__c', type: 'boolean'},
];

export default class AttemptList extends LightningElement {
    columns = columns;
    @api voucherId;
    @wire(getAttempts, {voucherId: '$voucherId'})
    attempts;
}