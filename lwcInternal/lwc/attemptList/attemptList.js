import { LightningElement, wire, api, track } from 'lwc';
import getAttempts from '@salesforce/apex/viewController.getAttempts';

const columns = [
    { label: 'Certification', fieldName: 'Voucher__r.Certification_Type__c' },
    { label: 'Type', fieldName: 'Attempt_Type__c' },
    { label: 'Passed', fieldName: 'Passed__c', type: 'boolean' },
];

export default class AttemptList extends LightningElement {

    error;
    @track flatAttempts = [];
    @track columns = columns;

    @api associateId;
    
    //gets all of an associate's attempts when given an id, and flattens them in order to be able to display related fields in the same data table 
    @wire(getAttempts, {associateId: '$associateId'})
    attempts({error, data}){
        if(data){
            let attemptsArray = [];

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

                attemptsArray.push(flattenedRow);
            }
            this.flatAttempts = attemptsArray;
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
