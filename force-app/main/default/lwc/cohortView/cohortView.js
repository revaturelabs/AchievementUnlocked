import {LightningElement} from 'lwc';

export default class CohortView extends LightningElement {
    cohortId;
    associateId;
    voucherId;
    displayCohort(event) {
        this.cohortId = event.detail;
    }

    displayVouchers(event) {
        this.associateId = event.detail;
    }

    displayAttempts(event) {
        this.voucherId = event.detail;
    }
}