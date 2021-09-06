import {LightningElement, wire} from 'lwc';
import {MessageContext, publish} from 'lightning/messageService';
import COHORT_SELECTED_CHANNEL from '@salesforce/messageChannel/CohortSelected__c';

export default class CohortView extends LightningElement {

    filter = 'active';
    cohortId = null;
    @wire(MessageContext)
    messageContext;
    
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
        const payload = {
            cohortId: this.cohortId
        };
        publish(this.messageContext, COHORT_SELECTED_CHANNEL, payload);
    }

    handleToggleSection(event) {
        const openSections = event.detail.openSections;
        if (openSections == 'cohorts') {
            this.cohortId = null;
            const payload = {
                cohortId: this.cohortId
            };
            publish(this.messageContext, COHORT_SELECTED_CHANNEL, payload);
        }
    }

    renderedCallback() {
        if (this.cohortId != null) {
            const accordion = this.template.querySelector('.accordion');
            accordion.activeSectionName = 'associates';
        }
    }

}