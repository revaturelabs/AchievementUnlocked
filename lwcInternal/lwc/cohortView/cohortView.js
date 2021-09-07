import {LightningElement, track} from 'lwc';

export default class CohortView extends LightningElement {

    @track
    cohortId = null;

    potato = null;

    @track
    selectionList = null;

    handleSelectedRequest(event){
        try{
            this.selectionList = this.template.querySelector('c-base-view').getAssociatesSelected();
            console.log('rows assigned');
            //this.template.querySelector('c-assignment-bar').callAssign();
        } catch(error){
            this.selectionList = [];
        }
    }
    
    displayCohort(event) {
        this.cohortId = event.detail;
    }
}