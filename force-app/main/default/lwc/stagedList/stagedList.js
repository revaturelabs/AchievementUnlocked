import { LightningElement, wire, api } from 'lwc';
import getAssociateList from '@salesforce/apex/stagingViewController.getAssociateList';
import getAssociateCount from '@salesforce/apex/stagingViewController.getAssociateCount';

const columns = [
    { label: 'First Name', fieldName: 'First_Name__c' },
    { label: 'Last Name', fieldName: 'Last_Name__c', sortable: 'true'},
    { label: 'Status', fieldName: 'Current_Status__c' },
    { type: 'button', typeAttributes: { variant: 'base', label: 'View' },}
];
export default class StagingDatatable extends LightningElement {

    error;
    columns = columns;   
    sortField;
    sortDirection;

    vrecord;
    @api
    status;
    @api
    page;

    constructor() {
        super();
        this.sortField = 'Last_Name__c';
        this.sortDirection = 'ASC';
    }
    

    @wire(getAssociateList, {stat: '$status', sortingField: '$sortField', dir: '$sortDirection', pageNum: '$page'})
    associates;
    @wire(getAssociateCount, {stat: '$status'})
    assocCount;

    handleRowAction( event ) {

        const sendId = new CustomEvent('associateselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);

    }

    updateColumnSorting(event) {
        this.sortField = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }

    handleFirst(){
        this.page = 1;
    }

    handlePrev(){
        if(this.page > 1){
            currentPage = this.page;
            this.page = currentPage - 1;
        }
    }

    handleNext(){
        if(((this.page -1) * 10) + 10 < this.assocCount){
            currentPage = this.page;
            this.page = currentPage + 1;
        }
    }
}