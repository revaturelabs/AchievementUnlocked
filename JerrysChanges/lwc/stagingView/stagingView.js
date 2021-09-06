import { LightningElement, wire, api } from 'lwc';

export default class StagingView extends LightningElement {

    constructor() {
        super();
        this.status = 'Staging'
    }
}