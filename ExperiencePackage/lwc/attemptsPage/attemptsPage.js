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
    certFilterType = "All";
    attemptFilterType = "Both";
    initialData;    
    
    get attemptOptions() {
        return [
                 { label: '--Both--', value: 'Both' },
                 { label: 'Practice', value: 'Practice' },
                 { label: 'Certification', value: 'Certification' },
               ];
    }
        
    get certOptions() {
        return [
                 { label: '--All--', value: 'All' },
                 { label: 'ADM', value: 'ADM' },
                 { label: 'Advanced ADM', value: 'Advanced ADM' },
                 { label: 'PD1', value: 'PD1' },
                 { label: 'PD2', value: 'PD2' },
                 { label: 'JS Developer 1', value: 'JS Developer 1' },
                 { label: 'Platform App Builder', value: 'Platform App Builder' },
               ];
    }

    @track certValue = 'All';

    @track attemptValue = 'Both';

    @track currentAttempt;

    @track attempts;

    @wire(getAttempts)
    DoAttempts({ error, data }) {
        if (data) {
            this.attempts = data;
            this.userName = data[0].Voucher__r.Associate__r.First_Name__c;
            let preparedAttempts = [];
            data.forEach(attempt => {
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

    handleFilterClick() {

        let allAttempts = this.initialData;
        let filtered = [];

        // Filter by certification type
        if(this.certFilterType != "All"){
            for(let att of allAttempts){
                if(att.Certification_Type == this.certFilterType){
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

        //Filter by attempt type
        let currentList = [];
        if(this.attemptFilterType != "Both"){
            for(let attempt of this.attempts){
                if(attempt.AttemptType == this.attemptFilterType){
                    currentList.push(attempt);
                }
            }
            this.attempts = currentList;
        }
        else {
            currentList = this.attempts;
        }
    }
    
    handleCertTypeChange(event) {
        this.certFilterType = event.detail.value;
    }

    handleAttemptTypeChange(event){
        this.attemptFilterType = event.detail.value;
    }
}