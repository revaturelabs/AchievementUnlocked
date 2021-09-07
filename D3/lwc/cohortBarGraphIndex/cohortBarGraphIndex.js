/*
 * Name: Jacob Schwartz
 * Date: September 5, 2021
 * Project3: Achievement Unlocked
 * Description: Contains Index component that has a cohort Id setter
 * that sets the cohort Id and rerenders the graph charts.
 * rerenderChart() makes a call to the Apex controller and gets an
 * array of Salesforce Certifications and their attempts. That data is
 * then extracted in setAdmData(data) and passed to the barGraphIndex.
 * 
 * For Future update: Make sure Apex controller can get different cert
 * values for cers besides Salesforce. It currently only searches for
 * Salesforce certs specifically. 
*/

import { LightningElement, api, wire } from 'lwc';
import getCohortById from '@salesforce/apex/AttemptChartsController.getCohortById';

export default class CohortBarGraphIndex extends LightningElement {
    models = null;
    modelarray = [];

    renderBarChart = false;
    //_cohortId = 'a02S000000GyIy9IAF';
   _cohortId = '';

    @api
    get cohortId(){
        return this._cohortId;
    }
    
    set cohortId(value){
        this._cohortId = value;
        if(this._cohortId){
            console.log('bar char cohort id: ' + this._cohortId);
            this.renderBarChart = false;
            this.rerenderChart();
        }
    }//*/

    @wire(getCohortById, {cohortId: '$_cohortId'}) fun(data){
        
        //this.rerenderChart();
        this.renderTestModels();
    }//*/

    buttonTest(){
        this._cohortId = 'a02S000000GyIy9IAF';
        this.renderBarChart = false;
        //this.cohortId('a02S000000GyIy9IAF');
        this.rerenderChart();
    }

    renderAfterTime(){
        setTimeout(() =>{ this.rerenderChart(); }, 2000);
    }

    renderTestModels(){
        this.models = [
            {
              "model_name":"Adm Cert",
              "field1":35,
              "field2":25,
              "field3": 15,
              "field4": 5
            }
          ];
          this.renderBarChart = true;
    }

    rerenderChart(){
        console.log('rerenderChart value: ', this._cohortId);
        getCohortById({cohortId : this._cohortId})
            .then(r => {
                this.renderBarChart = false;
                console.log('rerendering chart');
                 console.log('r', r[0]);
                 this.models = [];
                 this.modelarray = [];
                 for(let i = 0; i < r.length; i++)
                    this.modelarray.push(this.setAdmData(r[i]));
                this.models = this.modelarray[0];
                this.renderBarChart = true;
                setTimeout(() =>{ this.renderBarChart = true; }, 30);
 
            })
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