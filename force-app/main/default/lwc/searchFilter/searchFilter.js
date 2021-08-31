import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Associate__c.Current_Status__c';
import { publish, MessageContext } from 'lightning/messageService';
import SEARCH_MESSAGE from '@salesforce/messageChannel/SearchMessage__c';





// The delay used when debouncing event handlers before firing the event
const DELAY = 350;



export default class SearchFilter extends LightningElement {
    searchKey = '';
    

    filters = {
        searchKey: '',
       
    };


   // @wire(MessageContext)
   // messageContext;


    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS_FIELD
    })
    statuses;


    
    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event) {
        if (!this.filters.statuses) {
            // Lazy initialize filters with all values initially set
            this.filters.statuses = this.statuses.data.values.map(
                (item) => item.value
            );
           
        }
        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];
        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                (item) => item !== value
            );
        }
        // Published ProductsFiltered message
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