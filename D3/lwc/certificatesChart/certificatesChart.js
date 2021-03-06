// Author: Zackary Frazier
// Last Modify Date: 9/7/2021
// Description: component to render a pie chart for certification data with components to filter the data

import { LightningElement, wire, api } from "lwc";

/* apex methods */
import associatesWithCerts from "@salesforce/apex/CertificatesChartController.associatesWithCerts";
import associatesWithoutCerts from "@salesforce/apex/CertificatesChartController.associatesWithoutCerts";
import associatesWithSpecificCert from "@salesforce/apex/CertificatesChartController.associatesWithSpecificCert";
import associatesWithoutSpecificCert from "@salesforce/apex/CertificatesChartController.associatesWithoutSpecificCert";
import associatesInCohortWithCerts from "@salesforce/apex/CertificatesChartController.associatesInCohortWithCerts";
import associatesInCohortWithoutCerts from "@salesforce/apex/CertificatesChartController.associatesInCohortWithoutCerts";
import associatesInCohortWithSpecificCert from "@salesforce/apex/CertificatesChartController.associatesInCohortWithSpecificCert";
import associatesInCohortWithoutSpecificCert from "@salesforce/apex/CertificatesChartController.associatesInCohortWithoutSpecificCert";

import getCohortName from '@salesforce/apex/CertificatesChartController.getCohortName';
import getCertTypes from "@salesforce/apex/CertificatesChartController.getCertTypes";
import getCohortNames from "@salesforce/apex/CertificatesChartController.getCohortNames";

// default label for comboboxes
const defaultCertValue = "All";
const defaultCohortValue = "All";

export default class CertificatesChart extends LightningElement {


  // @desc : <string> the id of a cohort passed in from the top-down
  _cohortId = '';

  @api 
  get cohortId() {
    return this._cohortId;
  }
  set cohortId(value) {
    // hacky last-minute fix to allow
    // other components to update this one
    // without using messaging service
    this._cohortId = value;
    if(this._cohortId) {
      getCohortName({id: value})
      .then((cohortName) => {
        this.selectedCohort = cohortName;
        this.onchange();
      })
      .catch(console.error);
    } else {
      this.selectedCohort = defaultCohortValue;
      this.onchange();
    }
  }

  // @desc : <string> the stringified array of objects used to populate the chart
  chartData = '[]';

  // @desc : <object> caches the results of Apex API calls
  cachedChartData = {}

  // @desc : <string> the label for each piece of data
  label = "label";

  // @desc : <string> the value for each piece of data
  value = "total";

  // @desc : <string> the title of the chart
  title = "Certificates";

  // @desc : <number> height of chart
  height = 300;

  // @desc : <number> width of chart
  width = 300;

  // @desc : <object> mapping of colors
  colorPalette = {
    "Eton Blue": "#8CC7A1",
    "Chinese Violet": "#816E94",
  };

  // @desc : <string> colors for the chart
  colors = JSON.stringify([
    this.colorPalette["Eton Blue"],
    this.colorPalette["Chinese Violet"],
  ]);

  // @desc : <array> list of all possible certification types
  certTypes = this.toComboboxOptions([defaultCertValue]);

  @wire(getCertTypes)
  getCertTypes({data, error}) {
    if(!error && data) {
      this.certTypes = this.toComboboxOptions([defaultCertValue, ...data]);
    }
  }

  // @desc : <string> selected combobox value
  selectedCert = defaultCertValue;

  // @desc : <string> label for the combobox
  certLabel = "Select certification";

  /* cohort combobox */
  // @desc : <array> list of cohorts names
  cohorts = this.toComboboxOptions([defaultCohortValue]);

  @wire(getCohortNames)
  getCohortNames({data, error}) {
    if(!error && data) {
      this.cohorts = this.toComboboxOptions([defaultCohortValue, ...data]);
    }
  }

  // @desc : <string> label for cohort combobox
  cohortLabel = "Select cohort";

  // @desc : <string> the selected cohort
  selectedCohort = defaultCohortValue;

  // @desc : <bool> whether the lightning-input-field is required
  required = false;

  // @desc         : converts a list of strings into a data structure that can
  //               : be used in a lightning-combobox
  // @listOfString : <array>
  // @returns      : <array>
  toComboboxOptions(listOfStrings) {
    return listOfStrings.map((str) => ({
      label: str,
      value: str,
    }));
  }

  // @desc       : creates an index for our cache
  // @cohortName : <string>
  // @certType   : <string>
  // @returns    : <string>
  toCacheIndex(cohortName, certType) {
    return `${cohortName},${certType}`;
  }

  // @desc : update the chart
  async onchange() {
    const certType = (this.selectedCert === defaultCertValue) ? null : this.selectedCert;
    const cohortName = (this.selectedCohort === defaultCohortValue) ? null : this.selectedCohort;
    const cacheIndex = this.toCacheIndex(cohortName, certType);
    
    if(this.cachedChartData[cacheIndex]) {
      this.chartData = this.cachedChartData[cacheIndex];
    } else {
      const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData(certType, cohortName);
      this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);
      this.cachedChartData[cacheIndex] = this.chartData;
    }
  }

  // @desc  : onchange event handler for changing cert combobox
  // @event : <event>
  changeCert(event) {
    this.selectedCert = event.target.value;
    this.onchange();
  }

  // @desc   : retrieve the cohort name, then update the chart
  // @event  : <event>
  async changeCohort(event) {
    // @deprecated : refactor the apex controller to work with the Id
    if(event.target.value) {
      this.cohortId = event.target.value;
    } else {
      this.cohortId = '';
    }
  }

  // @desc : serialize the with / without data for the cart
  serializeData(numberWithCerts, numberWithoutCerts) {
    return JSON.stringify([
      {
        label: "Associates with certification",
        total: numberWithCerts,
      },
      {
        label: "Associates without certification",
        total: numberWithoutCerts,
      },
    ]);
  }

  // @desc       : load the cert data and load it into the chartData variable
  // @certType   : <string> the certification type (optional)
  // @cohortName : <string> name of specific cohort (optional)
  // @returns    : <array> [numberWithCerts, numberWithoutCerts]
  async loadCertsData(certType, cohortName) {
    let numberWithCerts;
    let numberWithoutCerts;

    if (certType && cohortName) {
      numberWithCerts = await associatesInCohortWithSpecificCert({ cohortName, certType });
      numberWithoutCerts = await associatesInCohortWithoutSpecificCert({ cohortName, certType });
    } else if (certType && !cohortName) {
      numberWithCerts = await associatesWithSpecificCert({ certType });
      numberWithoutCerts = await associatesWithoutSpecificCert({ certType });
    } else if (!certType && cohortName) {
      numberWithCerts = await associatesInCohortWithCerts({ cohortName });
      numberWithoutCerts = await associatesInCohortWithoutCerts({ cohortName });
    } else if (!certType && !cohortName) {
      numberWithCerts = await associatesWithCerts();
      numberWithoutCerts = await associatesWithoutCerts();
    }

    return [numberWithCerts, numberWithoutCerts];
  }

  async connectedCallback() {
    // set the chart data
    try {
      if(this.cohortId) {
        this.selectedCohort = await getCohortName({id: this.cohortId});
        await this.onchange();
      } else {
        const [numberWithCerts, numberWithoutCerts] = await this.loadCertsData();
        this.chartData = this.serializeData(numberWithCerts, numberWithoutCerts);

        // cache initial retrieval
        const cacheIndex = this.toCacheIndex(null, null);
        this.cachedChartData[cacheIndex] = this.chartData;
      }
    } catch(err) {
      this.chartData = this.serializeData(0, 0);
    }
  }
}
