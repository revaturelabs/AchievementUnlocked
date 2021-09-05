import { LightningElement, api, wire } from 'lwc';
import getCohortById from '@salesforce/apex/AttemptChartsController.getCohortById';

export default class CohortBarGraphIndex extends LightningElement {
    models = null;
    modelarray = [];
    //NEED TO CHANGE ARRAY TO DYNAMICALLY GET EXAM TYPES
    certTypes = 'PD1';
    renderBarChart = false;
    @wire(getCohortById, {cohortId: 'a02S000000GyIy9IAF'}) fun(data){
        //console.log("wiring" + this.value);
        if(data.data != undefined){
            console.log(data.data[0]);
            console.log(data.data[1]);
            //this.models = data.data[0];
            for(let i = 0; i < data.data.length; i++)
                this.modelarray.push(this.setAdmData(data.data[i]));
            this.models = this.modelarray[0];
            this.renderBarChart = true;
            //console.log(data.data[0].Vouchers__r[0].Number_of_Attempts__c);
            //this.setAdmData(data.data);
        }
    }

    setAdmData(data){
        let f1 = data.field1;
        let f2 = data.field2;
        let f3 = data.field3;
        let f4 = data.field4;
        let model_name = data.model_name;
        return [
            {
                "model_name": model_name,
                "field1": f1,
                "field2": f2,
                "field3": f3,
                "field4": f4
            }
        ];
    }
}