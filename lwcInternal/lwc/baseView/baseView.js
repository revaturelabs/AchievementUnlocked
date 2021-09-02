import { LightningElement, api, track } from 'lwc';

export default class BaseView extends LightningElement {
    
    @api cohortId = null;  
    @api status = null;
    @api page;
    associateId;

    @track
    selectionList = null;
 
    constructor() {
        super();
        this.page = 1;
    }

    @api 
    getAssociatesSelected(){
        return this.template.querySelector('c-associate-list').getAllSelectedRows();
    }

    showInfo(event) {
        this.associateId = event.detail;
    }
}