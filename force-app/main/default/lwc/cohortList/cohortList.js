import { LightningElement, api, wire } from 'lwc';
import getCohorts from '@salesforce/apex/viewController.getCohorts';

const columns = [
    {label: 'Start Date', fieldName: 'Start_Date__c', type: 'button', typeAttributes: {variant: 'base', label: {fieldName: 'Start_Date__c'}}},
];

export default class CohortList extends LightningElement {
    columns = columns;
    cohortId;
    @wire(getCohorts)
    cohorts;

    showCohort(event) {
        const sendId = new CustomEvent('cohortselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }
}