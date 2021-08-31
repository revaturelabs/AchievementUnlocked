import { LightningElement } from 'lwc';

/* apex methods */
import associatesWithCerts from '@salesforce/apex/CertificatesChartController.associatesWithCerts';
import associatesWithoutCerts from '@salesforce/apex/CertificatesChartController.associatesWithoutCerts';
import associatesWithSpecificCert from '@salesforce/apex/CertificatesChartController.associatesWithSpecificCert';
import associatesWithoutSpecificCert from '@salesforce/apex/CertificatesChartController.associatesWithoutSpecificCert';
import associatesInCohortWithCerts from '@salesforce/apex/CertificatesChartController.associatesInCohortWithCerts';
import associatesInCohortWithoutCerts from '@salesforce/apex/CertificatesChartController.associatesInCohortWithoutCerts';
import associatesInCohortWithSpecificCert from '@salesforce/apex/CertificatesChartController.associatesInCohortWithSpecificCert';
import associatesInCohortWithoutSpecificCert from '@salesforce/apex/CertificatesChartController.associatesInCohortWithoutSpecificCert';

import getCertTypes from '@salesforce/apex/CertificatesChartController.getCertTypes';
import getCohortNames from '@salesforce/apex/CertificatesChartController.getCohortNames';

// default label for comboboxes
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

	// @desc : update the chart
	async onchange() {
		const certType = (this.selectedCert === defaultCertValue) ? null : this.selectedCert;
		const cohortName = (this.selectedCohort === defaultCohortValue) ? null : this.selectedCohort;
		console.log(certType, cohortName);
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData(certType, cohortName);
		this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
	}

	// @desc  : onchange event handler for changing cert combobox
	// @event : <event>
	changeCert(event) {
		this.selectedCert = event.target.value;
		this.onchange();
	}

	// @desc  : onchange handler for changing cohort combobox
	// @event : <event>
	changeCohort(event) {
		this.selectedCohort = event.target.value;
		this.onchange();
	}

	// @desc : serialize the with / without data for the cart
	serializeData(numberWithCerts, numberWithoutCerts) {
		return JSON.stringify([
			{
				label: 'Associates with certification',
				total: numberWithCerts
			},
			{
				label: 'Associates without certification',
				total: numberWithoutCerts
			}
		]);
	}

	// @desc       : load the cert data and load it into the chartData variable
	// @certType   : <string> the certification type (optional)
	// @cohortName : <string> name of specific cohort (optional)
	// @returns    : <array> [numberWithCerts, numberWithoutCerts]
	async loadCertsData (certType, cohortName){
		let numberWithCerts;
		let numberWithoutCerts;

		if(certType && cohortName) {
			console.log(certType, cohortName);
			numberWithCerts = await associatesInCohortWithSpecificCert({ cohortName, certType });
			console.log(certType, cohortName);
			numberWithoutCerts = await associatesInCohortWithoutSpecificCert({ cohortName, certType });
			console.log(numberWithoutCerts);
		} else if(certType && !cohortName) {
			numberWithCerts = await associatesWithSpecificCert({ certType });
			numberWithoutCerts = await associatesWithoutSpecificCert({ certType });
		} else if(!certType && cohortName) {
			numberWithCerts = await associatesInCohortWithCerts({ cohortName });
			numberWithoutCerts = await associatesInCohortWithoutCerts({ cohortName });
		} else if(!certType && !cohortName) {
			numberWithCerts = await associatesWithCerts();
			numberWithoutCerts = await associatesWithoutCerts();
		}

		console.log(numberWithCerts, numberWithoutCerts);

		return [numberWithCerts, numberWithoutCerts];
	}

	async connectedCallback() {
		// set the cert types
		const certTypes = await getCertTypes();
		this.certTypes = this.toComboboxOptions([defaultCertValue, ...certTypes]);

		// set the cohort names
		const cohorts = await getCohortNames();
		this.cohorts = this.toComboboxOptions([defaultCohortValue, ...cohorts]);

		// set the chart data
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData();
		this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
	}
}