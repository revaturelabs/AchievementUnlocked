import {LightningElement} from 'lwc';

export default class CohortView extends LightningElement {

    cohortId;
    
    displayCohort(event) {
        this.cohortId = event.detail;
        console.log('id: ' + this.cohortId);
    }
}