import { LightningElement, api } from 'lwc';

export default class BaseView extends LightningElement {

    @api cohortId = null;
    associateId;

    showInfo(event) {
        this.associateId = event.detail;
    }

}