import { createElement } from 'lwc';
import AssociateList from 'c/associateList';
import { CurrentPageReference } from 'lightning/navigation';
import { registerTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

// Mock realistic data
const mockCurrentPageReference = require('./data/CurrentPageReference.json');

// Register a standard test wire adapter.
const currentPageReferenceAdapter = registerTestWireAdapter(
    CurrentPageReference
  );

describe('c-associate-list', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        const element = createElement('c-associate-list', {
            is: AssociateList
        });
        document.body.appendChild(element);
        expect(1).toBe(2);
    });

    it('renders the current page reference in <pre> tag', () => {
        const element = createElement('c-associate-list', {
          is: AssociateList
        });
        document.body.appendChild(element);
          
        // Select element for validation
        const preElement = element.shadowRoot.querySelector('pre');
        expect(preElement).not.toBeNull();
          
        // Emit data from @wire
        currentPageReferenceAdapter.emit(mockCurrentPageReference);
          
        return Promise.resolve().then(() => {
          expect(preElement.textContent).toBe(
            JSON.stringify(mockCurrentPageReference, null, 2)
          );
        });
      });
});