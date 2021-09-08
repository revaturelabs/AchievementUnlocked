import { LightningElement, wire, api, track } from 'lwc';
import getCertifications from '@salesforce/apex/viewController.getCertifications';

const columns = [
    { label: 'Certification', fieldName: 'Voucher__r.Certification_Type__c' },
];

export default class CertificationList extends LightningElement {

    error;
    @track flatCerts = [];
    @track columns = columns;

    @api associateId;
    
    //gets a list of certifications an associate has earned through querying for their passed certification attempts, and flattens them to be able to show them in the data table
    @wire(getCertifications, {associateId: '$associateId'})
    certs({error, data}){
        if(data){
            let certsArray = [];

            for(let row of data){
                const flattenedRow = {};
                let rowKeys = Object.keys(row);

                rowKeys.forEach((rowKey) => {
                    const singleNodeValue = row[rowKey];

                    if(singleNodeValue.constructor === Object){
                        this._flatten(singleNodeValue, flattenedRow, rowKey);
                    }else{
                        flattenedRow[rowKey] = singleNodeValue;
                    }
                });

                 certsArray.push(flattenedRow);
            }
            this.flatCerts = certsArray;
        }else if(error){
            this.error = error;
        }
    }

    _flatten = (nodeValue, flattenedRow, nodeName) => {
        let rowKeys = Object.keys(nodeValue);
        rowKeys.forEach((key) => {
            let finalKey = nodeName + '.' + key;
            flattenedRow[finalKey] = nodeValue[key];
        })
    }
}
