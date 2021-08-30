import { LightningElement, wire, api } from 'lwc';

export default class StagingDatatable extends LightningElement {

<<<<<<< HEAD
    vrecord;
    status;
    page;
    constructor() {
        super();
        this.status = 'Staging';
        this.page = '1';
    }

    handleSelection( event ) {

        this.vrecord = event.detail;

    }
=======
>>>>>>> base-view
}