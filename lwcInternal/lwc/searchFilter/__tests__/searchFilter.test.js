import { createElement } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SEARCH_MESSAGE from '@salesforce/messageChannel/SearchMessage__c';
import SearchFilter from 'c/searchFilter';
import {
    registerLdsTestWireAdapter,
    registerTestWireAdapter
} from '@salesforce/sfdx-lwc-jest';

registerTestWireAdapter(MessageContext);

describe('c-search-filter', () => {
    beforeEach(() => {
        // Reset timer mocks
        jest.useFakeTimers();
    });
    
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('sends message when search value changes', () => {
        const expectedSearchKey = 'search string';
        const element = createElement('c-search-filter', {
            is: SearchFilter
        });
        console.log(element);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const searchInput = element.shadowRoot.querySelector('lightning-input');
            searchInput.value = expectedSearchKey;
            searchInput.dispatchEvent(new CustomEvent('change'));
            // Run timers eg setTimeout()
            jest.runAllTimers();
    
            // Only verify the relevant params
            const expectedFilters = {
                filters: {
                    searchKey: expectedSearchKey
                }
            };
            expect(publish).toHaveBeenCalledWith(
                undefined,
                SEARCH_MESSAGE,
                expect.objectContaining(expectedFilters)
            );
        } )
        
    });
});