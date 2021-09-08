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
    { type: 'button', typeAttributes: { variant: 'base', label: 'View' }, cellAttributes: { alignment: "center", iconName: "utility:chart" }},
];

export default class AssociateList extends LightningElement {

    //data table properties
    columns = columns;
    sortField;
    sortDirection;
    count;
    
    //properties to be passed into the getAssociates method
    filters = {};
    @api status = null;
    @api page;
    @api cohortId = null;
    
    @track
    selectionList;
    
    //gets all of the associates that meet the specified criteria
    @wire(getAssociates, {cohortId: '$cohortId', filters: '$filters', sortingField: '$sortField', dir: '$sortDirection', pageNum: '$page'})
    associates;
    
    //gets the total amount of associates that meet the specified criteria
    @wire(getAssociateCount, {filters: '$filters'})
    wiredFunction({ error, data }) {
        if (data) {
            this.count = data;
            console.log(JSON.stringify(data));
        } else if (error) {
            console.log(error);
        }
    }

    //initializes the component with values upon creation
    constructor() {
        super();
        this.sortField = 'Last_Name__c';
        this.sortDirection = 'ASC';
        this.count = 0;
        this.page = 1;
    }

    //fires off an event whenever an associate is selected that sends the id to the other components
    showInfo(event) {
        const sendId = new CustomEvent('associateselected', {
            detail: event.detail.row.Id
        });
        this.dispatchEvent(sendId);
    }

    

    // Load context for Lightning Messaging Service
    @wire(MessageContext) messageContext;

    // Subscription for searchMessage Lightning message
    searchTermSubscription;

    connectedCallback() {
        // Subscribe to ProductSelected message
        this.searchTermSubscription = subscribe(
            this.messageContext,
            SEARCH_MESSAGE,
            (message) => this.handleSearchFilter(message)
        );
    }

    //sets the filters property in this component to the filters sent from the searchFilter component
    handleSearchFilter(message){
        this.filters = { ...message.filters };
        this.page = 1;
        
    }

    updateColumnSorting(event) {
        this.sortField = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }

    //pagination handlers
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

    //clears the associate info from the other components whenever called
    clearAssociate() {
        const sendId = new CustomEvent('associateselected', {
            detail: null
        });
        this.dispatchEvent(sendId);
    }

    //sends the selected rows to the voucher assignment component
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
