import { LightningElement, wire, api } from 'lwc';
import getAttemptList from '@salesforce/apex/stagingViewController.getAttemptList';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Attempt_Type__c' },
];

export default class AttemptsDatatable extends LightningElement {

    error;
    columns = columns;

    @api vrecord;
    @wire(getAttemptList, {AssocID: '$vrecord'})
    attempts;
}