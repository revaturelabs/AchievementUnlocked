import { track, wire, LightningElement } from 'lwc';
import getAttempts from '@salesforce/apex/UserAttempt.getAttempts';

const columns = [
    { label: 'View', type: 'button-icon', initialWidth: 75, 
    typeAttributes: {iconName: 'action:preview', title: 'preview', 
    variant: 'border-filled', alternativeText: 'View'}},
    { label: 'Certification', fieldName: 'Certification_Type'},
    { label: 'Attempt Type', fieldName: 'AttemptType' },
    { label: 'Date', fieldName: 'Date', type: 'date' },
    { label: 'Result', fieldName: 'Result', type: 'formula(percent)' },
];

export default class AttemptsPage extends LightningElement {
    columns = columns;
    userName;
    filterType = "All";
    initialData;

    @track
    currentAttempt;

    @track
    attempts;

    @wire(getAttempts)
    DoAttempts({ error, data }) {
        if (data) {
            console.log(data);
            this.attempts = data;
            this.userName = data[0].Voucher__r.Associate__r.First_Name__c;
            let preparedAttempts = [];
            data.forEach(attempt => {
                console.log(attempt);
                let preparedAttempt = {};
                preparedAttempt.Name = attempt.Name;
                preparedAttempt.Certification_Type = attempt.Voucher__r.Certification_Type__c;
                preparedAttempt.Date= attempt.Date__c;
                preparedAttempt.AttemptType = attempt.Attempt_Type__c;
                preparedAttempt.Result = attempt.Weighted__c.toFixed(2) + "%";
                preparedAttempts.push(preparedAttempt);
            });
            this.attempts = preparedAttempts;
            this.initialData = preparedAttempts;
        } else if (error) {
            console.log(error);
        }
    }

    handleFilterClick(event) {
        switch(this.filterType){
            case "All":
                this.filterType = "ADM";
                break;
            case "ADM":
                this.filterType = "Advanced ADM";
                break;
            case "Advanced ADM":
                this.filterType = "PD1";
                break;
            case "PD1":
                this.filterType = "PD2";
                break;
            case "PD2":
                this.filterType = "JS Developer 1";
                break;
            case "JS Developer 1":
                this.filterType = "Platform App Builder";
                break;
            case "Platform App Builder":
                this.filterType = "All";
                break;
        }

        event.target.label = "Certification: " + this.filterType;

        let allAttempts = this.initialData;
        let filtered = [];

        if(this.filterType != "All"){
            for(let att of allAttempts){
                if(att.Certification_Type == this.filterType){
                    filtered.push(att);
                }
            }
            if(filtered.length < 1){
                this.attempts = [];
            }
            else {
                this.attempts = filtered;
            }
        }
        else {
            this.attempts = allAttempts;
        }
    }
}