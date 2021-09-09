/*
Name: cohortView
Author(s): Greg Mannerberg
Description: Client side controller for the cohort view.
*/
import {LightningElement, wire} from 'lwc';
/* These import statements can be used to enable Lightning Message Service to
 * communicate with D3 charts. This was not completed in the initial iteration.
 * The messageChannel CohortSelected__c may have been lost in a branch
 * that was not merged before a code freeze and then deleted. This messageChannel was
 * in the D3 package to maintain the dependence direction of lwcInternal being
 * dependent on D3. A copy can be found at:
 * https://github.com/revaturelabs/AchievementUnlocked/pull/167/files
 */
//import {MessageContext, publish} from 'lightning/messageService';
//import COHORT_SELECTED_CHANNEL from '@salesforce/messageChannel/CohortSelected__c';

export default class CohortView extends LightningElement {

    filter = 'active';
    cohortId = null;
    //@wire(MessageContext)
    //messageContext;
    
    handleChange(event) {
        this.filter = event.detail.value;
    }

    // Gets the combobox options for the cohort filter
    get options() {
        return [
            {label: 'All', value: 'all'},
            {label: 'Active', value: 'active'},
            {label: 'Inactive', value: 'inactive'}
        ]
    }

    // An event handler for when a cohort is selected that sets cohortId to the selected
    // cohort's id.
    displayCohort(event) {
        this.cohortId = event.detail;
        /*const payload = {
            cohortId: this.cohortId
        };
        publish(this.messageContext, COHORT_SELECTED_CHANNEL, payload);
        */
    }

    // An event handler for when an accordion section is selected. Clears cohortId if 
    // the cohorts section is selected.
    handleToggleSection(event) {
        const openSections = event.detail.openSections;
        if (openSections == 'cohorts') {
            this.cohortId = null;
            /*const payload = {
                cohortId: this.cohortId
            };
            publish(this.messageContext, COHORT_SELECTED_CHANNEL, payload);
            */
        }
    }

    // Lifecycle function. Sets the associates accordion section to display 
    // if cohortId is set to an id.
    renderedCallback() {
        if (this.cohortId != null) {
            const accordion = this.template.querySelector('.accordion');
            accordion.activeSectionName = 'associates';
        }
    }

}
