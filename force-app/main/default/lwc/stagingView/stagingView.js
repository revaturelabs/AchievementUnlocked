import { LightningElement, wire, api } from 'lwc';

export default class StagingDatatable extends LightningElement {

    vrecord;
    handleSelection( event ) {

        this.vrecord = event.detail;

    }
}