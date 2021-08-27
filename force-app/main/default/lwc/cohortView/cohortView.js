import {LightningElement} from 'lwc';

export default class CohortView extends LightningElement {
    cohortId;
    handleSelection(event) {
        this.cohortId = event.detail;
    }
}