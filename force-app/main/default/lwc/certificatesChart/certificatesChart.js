import { LightningElement } from 'lwc';

/* apex methods */
import associatesWithCerts from '@salesforce/apex/CertificatesChartController.associatesWithCerts';
import associatesWithoutCerts from '@salesforce/apex/CertificatesChartController.associatesWithoutCerts';
import associatesWithSpecificCert from '@salesforce/apex/CertificatesChartController.associatesWithSpecificCert';
import associatesWithoutSpecificCert from '@salesforce/apex/CertificatesChartController.associatesWithoutSpecificCert';

import getCertTypes from '@salesforce/apex/CertificatesChartController.getCertTypes';
import getCohortNames from '@salesforce/apex/CertificatesChartController.getCohortNames';

// default label for combobox
const defaultCertValue = 'All';
const defaultCohortValue = 'All';

export default class CertificatesChart extends LightningElement {

	// @desc : <string> the stringified array of objects used to populate the chart
	chartData = '[]';
	
	// @desc : <string> the label for each piece of data
	label = 'label';

	// @desc : <string> the value for each piece of data
	value = 'total';
	
	// @desc : <string> the title of the chart
	title = 'Certificates';

	// @desc : <number> height of chart
	height = 300;

	// @desc : <number> width of chart
	width = 300;


	/* cert combobox */
	// @desc : <array> list of certifications available to filter by
	certTypes = this.toComboboxOptions([defaultCertValue]);

	// @desc : <string> selected combobox value
	selectedCert = defaultCertValue;

	// @desc : <string> label for the combobox
	certLabel = 'Select certification';

	/* cohort combobox */
	// @desc : <array> list of cohorts names 
	cohorts = this.toComboboxOptions([defaultCohortValue]);

	// @desc : <string> label for cohort combobox
	cohortLabel = 'Select cohort';

	// @desc : <string> the selected cohort
	selectedCohort = defaultCohortValue;



	// @desc    : converts a list of strings into a data structure that can
	//          : be used in a lightning-combobox
	// @returns : <array>
	toComboboxOptions(listOfStrings) {
		return listOfStrings.map((str) => ({
			label: str,
			value: str
		}));
	}

	// @desc : onchange event handler for changing cert combobox
	async changeCert(event) {
		this.selectedCert = event.target.value;
		const certType = (this.selectedCert === defaultCertValue) ? null : this.selectedCert;
		const cohortName = (this.selectedCohort === defaultCohortValue) ? null : this.selectedCohort;
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData(certType, cohortName);
		this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
	}

	// @desc : onchange handler for changing cohort combobox
	async changeCohort(event) {
		this.selectedCohort = event.target.value;
		const certType = (this.selectedCert === defaultCertValue) ? null : this.selectedCert;
		const cohortName = (this.selectedCohort === defaultCohortValue) ? null : this.selectedCohort;
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData(certType, cohortName);
		this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
	}

	// @desc : serialize the with / without data for the cart
	serializeData(numberWithCerts, numberWithoutCerts) {
		return JSON.stringify([
			{
				label: 'Associates with one or more certifications',
				total: numberWithCerts
			},
			{
				label: 'Associates without any certifications',
				total: numberWithoutCerts
			}
		]);
	}

	// @desc     : load the cert data and load it into the chartData variable
	// @certType : <string> the certification type
	// @returns  : <array> [numberWithCerts, numberWithoutCerts]
	async loadCertsData (certType, cohortName){
		let numberWithCerts;
		let numberWithoutCerts;
		
		if(certType && cohortName) {
			// TODO
		} else if(certType && !cohortName) {
			numberWithCerts = await associatesWithSpecificCert({ certType });
			numberWithoutCerts = await associatesWithoutSpecificCert({ certType });
		} else if(!certType && cohortName) {
			// TODO
		} else if(!certType && !cohortName) {
			numberWithCerts = await associatesWithCerts();
			numberWithoutCerts = await associatesWithoutCerts();
		}

		return [numberWithCerts, numberWithoutCerts];
	}

	async connectedCallback() {
		// set the cert types
		const certTypes = await getCertTypes();
		this.certTypes = this.toComboboxOptions([defaultCertValue, ...certTypes]);

		// set the chart data
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData();
		this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
		
		// set the cohort names
		const cohorts = await getCohortNames();
		this.cohorts = this.toComboboxOptions([defaultCohortValue, ...cohorts]);
	}
}