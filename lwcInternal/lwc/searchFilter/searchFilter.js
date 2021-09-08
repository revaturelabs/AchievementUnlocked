import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Associate__c.Current_Status__c';
import CERT_FIELD from '@salesforce/schema/Voucher__c.Certification_Type__c';
import { publish, MessageContext } from 'lightning/messageService';
import SEARCH_MESSAGE from '@salesforce/messageChannel/SearchMessage__c';





// The delay used when debouncing event handlers before firing the event
const DELAY = 350;



export default class SearchFilter extends LightningElement {
    //create String searchkey
    searchKey = '';

    //Create filters object
    filters = {
        searchKey: ''     
    };

    //Wire Message context object
    @wire(MessageContext)
    messageContext;

    //get all picklist values from record type STATUS_FIELD and add it to form
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS_FIELD
    })
    statuses;
    //get all picklist values from record type CERT_FIELD and add it to form
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CERT_FIELD
    })
    certs;

    certFilter = false;

    certFiltering(event) {
        this.certFilter = event.target.checked;
        if (event.target.checked == false) {
            this.filters.certs = null;
        } else {
            this.filters.certs = [];
        }
        this.delayedFireFilterChangeEvent();
    }
    //Get changed value from search filter and add it to filters object
    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }
    
    //handle checkbox change event add all changed filters to filter object
    handleCheckboxChange(event) {
        
        //if this.filters.statuses are null then initialize all values for initial view
        if (!this.filters.statuses) {
            // Lazy initialize filters with all values initially set
            this.filters.statuses = this.statuses.data.values.map(
                (item) => item.value
            );
        }
        
        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];
        if (event.target.checked) {
            
            //get current filter value and add it to array
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                (item) => item !== value
            );
        }
        // Published updated this.filters to Search Message
        publish(this.messageContext, SEARCH_MESSAGE, {
            filters: this.filters
        });
    }


    delayedFireFilterChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            // Published ProductsFiltered message
            publish(this.messageContext, SEARCH_MESSAGE, {
                filters: this.filters
            });
        }, DELAY);
    }
}
