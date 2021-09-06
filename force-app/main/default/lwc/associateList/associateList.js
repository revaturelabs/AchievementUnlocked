import { LightningElement, api, wire, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
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
    count;
    @api status = null;
    @api page;
    @api cohortId = null;
    @track
    selectionList;
    
    @wire(getAssociates, {cohortId: '$cohortId', filters: '$filters', sortingField: '$sortField', dir: '$sortDirection', pageNum: '$page'})
    associates;
    
    @wire(getAssociateCount, {filters: '$filters'})
    wiredFunction({ error, data }) {
        if (data) {
            this.count = data;
            console.log(JSON.stringify(data));
        } else if (error) {
            console.log(error);
        }
    }


    constructor() {
        super();
        this.sortField = 'Last_Name__c';
        this.sortDirection = 'ASC';
        this.count = 0;
        this.page = 1;
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
        this.clearAssociate();
    }

    handlePrev(){
        if(this.page > 1){
            let currentPage = this.page;
            this.page = currentPage - 1;
            this.clearAssociate();
        }
    }

    handleNext(){
        if((this.page * 10) < this.count){
            let currentPage = this.page;
            this.page = currentPage + 1;
            this.clearAssociate();
        }
    }

    clearAssociate() {
        const sendId = new CustomEvent('associateselected', {
            detail: null
        });
        this.dispatchEvent(sendId);
    }

    rowsSelected(event){
        console.log('rows selected');
        //this.dispatchEvent( new CustomEvent('getdemassociates', event ));
        this.selectionList = this.getAllSelectedRows();
        publish(this.messageContext, SELECTED_ROWS , {
            selectedList:this.selectionList
        });
    }

    getAllSelectedRows(){
        console.log('rows returned');
        return this.template.querySelector('lightning-datatable').getSelectedRows();
    }
}