import { LightningElement, api } from 'lwc';

export default class BaseView extends LightningElement {

    @api cohortId = null;  
    @api status;
    @api page;
    associateId;
 
    constructor() {
        super();
        this.status = 'Staging';
        this.page = '1';
    }

    showInfo(event) {
        this.associateId = event.detail;
    }
}