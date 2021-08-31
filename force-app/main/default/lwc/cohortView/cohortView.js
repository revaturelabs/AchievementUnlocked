import {LightningElement} from 'lwc';

export default class CohortView extends LightningElement {

    cohortId = null;
    
    displayCohort(event) {
        this.cohortId = event.detail;
    }
}