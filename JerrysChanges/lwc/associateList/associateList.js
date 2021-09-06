import { LightningElement, track, api, wire } from 'lwc';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import SEARCH_MESSAGE from '@salesforce/messageChannel/SearchMessage__c';
import getAssociates from '@salesforce/apex/viewController.getAssociates';
import getAssociateCount from '@salesforce/apex/viewController.getAssociateCount';
import SELECTED_ROWS from '@salesforce/messageChannel/Selected_Rows__c';

const columns = [
    { label: 'First Name', fieldName: 'First_Name__c', sortable: true},
    { label: 'Last Name', fieldName: 'Last_Name__c', sortable: true},
    { label: 'Status', fieldName: 'Current_Status__c', sortable: true},
    { type: 'button', typeAttributes: { variant: 'base', label: 'View' },}
];

export default class AssociateList extends LightningElement {

    columns = columns;
    sortField;
    sortDirection;
    filters = {};

    @track
    selectionList;

    @api status = null;
    @api page;
    @api cohortId = null;
    @wire(getAssociates, {cohortId: '$cohortId', filters: '$filters', sortingField: '$sortField', dir: '$sortDirection', pageNum: '$page'})
    associates;
    @wire(getAssociateCount, {stat: '$filters'})
    assocCount;

    constructor() {
        super();
        this.sortField = 'Last_Name__c';
        this.sortDirection = 'ASC';
    }

    showInfo(event) {
        const sendId = new CustomEvent('associateselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }

    /** Load context for Lightning Messaging Service */
    @wire(MessageContext) messageContext;

    /** Subscription for ProductSelected Lightning message */
    searchTermSubscription;

    /** retrieves a list of selected rows and publishes them in response to an event */
    rowsSelected(event){
        console.log('rows selected');
        //this.dispatchEvent( new CustomEvent('getdemassociates', event ));
        this.selectionList = this.getAllSelectedRows();
        publish(this.messageContext, SELECTED_ROWS , {
            selectedList:this.selectionList
        });
    }

    connectedCallback() {
        // Subscribe to ProductSelected message
        this.searchTermSubscription = subscribe(
            this.messageContext,
            SEARCH_MESSAGE,
            (message) => this.handleSearchFilter(message)
        );
    }

    handleSearchFilter(message){
        this.filters = { ...message.filters };
        this.page = 1;
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