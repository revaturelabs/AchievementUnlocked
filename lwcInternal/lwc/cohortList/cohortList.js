import { LightningElement, api, wire } from 'lwc';
import getFilteredCohorts from '@salesforce/apex/viewController.getFilteredCohorts';

const columns = [
    {label: 'Start Date', fieldName: 'Start_Date__c', type: 'date'},
    {label: 'End Date', fieldName: 'End_Date__c', type: 'date'},
    {type: 'button', typeAttributes: {variant: 'base', label: 'View'}}
];

export default class CohortList extends LightningElement {
    columns = columns;
    cohortId;
    @api filter = 'Active';
    
    //gets a list of active cohorts to display in the data table
    @wire(getFilteredCohorts, {filter: '$filter'})
    cohorts;

    //sends a cohort id to the associates list to display all of the associates in that cohort in another component
    showCohort(event) {
        const sendId = new CustomEvent('cohortselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }
}
