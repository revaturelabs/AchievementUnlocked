import {LightningElement} from 'lwc';

export default class CohortView extends LightningElement {

    filter = 'active';
    cohortId = null;
    
    handleChange(event) {
        this.filter = event.detail.value;
    }

    get options() {
        return [
            {label: 'All', value: 'all'},
            {label: 'Active', value: 'active'},
            {label: 'Inactive', value: 'inactive'}
        ]
    }

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