import { createElement } from 'lwc';
import CertificatesChart from 'c/certificatesChart';

describe('c-certificates-chart', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should have two comboboxes', () => {
        const element = createElement('c-certificates-chart', {
            is: CertificatesChart
        });
        document.body.appendChild(element);
        
        const comboboxes = element.shadowRoot.querySelectorAll('lightning-combobox');
        expect(comboboxes.length).toBe(2);
    });
});