import { LightningElement } from 'lwc';

/* apex methods */
import associatesWithCerts from '@salesforce/apex/CertificatesChartController.associatesWithCerts';
import associatesWithoutCerts from '@salesforce/apex/CertificatesChartController.associatesWithoutCerts';
import getCertTypes from '@salesforce/apex/CertificatesChartController.getCertTypes';
import associatesWithSpecificCert from '@salesforce/apex/CertificatesChartController.associatesWithSpecificCert';
import associatesWithoutSpecificCert from '@salesforce/apex/CertificatesChartController.associatesWithoutSpecificCert';

// default label for combobox
const defaultComboboxValue = 'All';

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

	// @desc : <array> list of certifications available to filter by
	certTypes = this.toComboboxOptions([defaultComboboxValue]);

	// @desc : <string> selected combobox value
	selected = defaultComboboxValue;

	// @desc : <string> label for the combobox
	comboboxLabel = 'Select certification'

	// @desc    : converts a list of strings into a data structure that can
	//          : be used in a lightning-combobox
	// @returns : <array>
	toComboboxOptions(listOfStrings) {
		return listOfStrings.map((str) => ({
			label: str,
			value: str
		}));
	}

	// @desc : onchange event handler for combobox
	async onchange(event) {
		this.selected = event.target.value;
		const certType = (this.selected === defaultComboboxValue) ? null : this.selected;
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData(certType);
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
	async loadCertsData (certType){
		let numberWithCerts;
		let numberWithoutCerts;
		if(!certType) {
			numberWithCerts = await associatesWithCerts();
			numberWithoutCerts = await associatesWithoutCerts();
		} else {
			numberWithCerts = await associatesWithSpecificCert({ certType });
			numberWithoutCerts = await associatesWithoutSpecificCert({ certType });
		}
		return [numberWithCerts, numberWithoutCerts];
	}

	async connectedCallback() {
		const certTypes = await getCertTypes();
		this.certTypes = this.toComboboxOptions([defaultComboboxValue, ...certTypes]);
		const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData();
		this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
	}
}