import {LightningElement} from 'lwc';

export default class CohortView extends LightningElement {

    cohortId = null;
    
    displayCohort(event) {
        this.cohortId = event.detail;
    }

    handleToggleSection(event) {
        const openSections = event.detail.openSections;
        if (openSections == 'cohorts') {
            this.cohortId = null;
        }
    }

    renderedCallback() {
        if (this.cohortId != null) {
            const accordion = this.template.querySelector('.accordion');
            accordion.activeSectionName = 'associates';
        }
    }

}