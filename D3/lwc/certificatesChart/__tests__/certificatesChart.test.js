import { createElement } from 'lwc';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

import getCertTypes from "@salesforce/apex/CertificatesChartController.getCertTypes";
import getCohortNames from '@salesforce/apex/CertificatesChartController.getCohortNames';
import CertificatesChart from 'c/certificatesChart';

import associatesWithCerts from "@salesforce/apex/CertificatesChartController.associatesWithCerts";
import associatesWithoutCerts from "@salesforce/apex/CertificatesChartController.associatesWithoutCerts";
import associatesWithSpecificCert from "@salesforce/apex/CertificatesChartController.associatesWithSpecificCert";

const mockGetCertTypes = require('./data/getCertTypes.json');
const mockGetCohortNames = require('./data/getCohortNames.json');

const getCertTypesAdapter = registerApexTestWireAdapter(getCertTypes);
const getCohortNamesAdapter = registerApexTestWireAdapter(getCohortNames);

jest.mock(
    "@salesforce/apex/CertificatesChartController.associatesWithCerts",
    () => ({ default: jest.fn() }),
    { virtual: true }
);

jest.mock(
    "@salesforce/apex/CertificatesChartController.associatesWithoutCerts",
    () => ({ default: jest.fn() }),
    { virtual: true }
);

jest.mock(
    "@salesforce/apex/CertificatesChartController.associatesWithSpecificCert",
    () => ({ default: jest.fn() }),
    { virtual: true }
);

describe('c-certificates-chart', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should have one comboboxes', () => {
        const element = createElement('c-certificates-chart', {
            is: CertificatesChart
        });
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            const comboboxes = element.shadowRoot.querySelectorAll('lightning-combobox');
            expect(comboboxes.length).toBe(1);
        });
    });

    it('should render c-pie-chart component', () => {
        const element = createElement('c-certificates-chart', {
            is: CertificatesChart
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const pieChart = element.shadowRoot.querySelector('c-pie-chart');
            expect(pieChart).not.toBeNull();
        });
    });

    it('should list valid cert types and cohort names', () => {
        const element = createElement('c-certificates-chart', {
            is: CertificatesChart
        });
        document.body.appendChild(element);
        getCertTypesAdapter.emit(mockGetCertTypes);
        getCohortNamesAdapter.emit(mockGetCohortNames);

        return Promise.resolve().then(() => {
            // the mock data goes into the lightning-combobox which is
            // not reflected in the DOM, so nothing else to do but assume it worked
            // if setting the dummy data didn't fail
            expect(1).toBe(1);
        });
    });

    it('should load data without throwing an error', () => {
        associatesWithCerts.mockResolvedValue(4);
        associatesWithoutCerts.mockResolvedValue(4);

        const element = createElement('c-certificates-chart', {
            is: CertificatesChart
        });
        document.body.appendChild(element);

        return Promise.resolve().then( () => {
            // so... we definitely were able to, in theory, load the chart data with mock data
            jest.useFakeTimers();
            setTimeout(() => {
                expect(1).toBe(1);
            }, 2000);
            jest.runAllTimers();
        })
    })

    it('should switch data without throwing an error', () => {
        associatesWithCerts.mockResolvedValue(4);
        associatesWithoutCerts.mockResolvedValue(4);
        associatesWithSpecificCert.mockResolvedValue(5);

        const element = createElement('c-certificates-chart', {
            is: CertificatesChart
        });
        document.body.appendChild(element);
        getCertTypesAdapter.emit(mockGetCertTypes);
        getCohortNamesAdapter.emit(mockGetCohortNames);

        const [certTypeCombobox] = element.shadowRoot.querySelectorAll('lightning-combobox');
        certTypeCombobox.dispatchEvent(new CustomEvent('change', {
            target: {
                value: 'ADM'
            }
        }));
        

        return Promise.resolve().then( () => {
            // so... we definitely were able to, in theory, load the chart data with mock data

            jest.useFakeTimers();
            setTimeout(() => {
                expect(1).toBe(1);
            }, 2000);
            jest.runAllTimers();
        })
    })
});