import { LightningElement, api } from 'lwc';

export default class BarGraphIndex extends LightningElement {
    /*models = [
      {
        "model_name":"Adm Cert",
        "field1":1,
        "field2":1,
        "field3": 1,
        "field4": 1
      }
    ];*/
    @api models;
    @api testmodel;
      admModels = [
        {
          "model_name":"Adm Cert",
          "field1":55,
          "field2":15,
          "field3": 25,
          "field4": 2
        }
      ];

      pd1Models = [
        {
          "model_name":"Pd1 Cert",
          "field1":5,
          "field2":15,
          "field3": 25,
          "field4": 35
        }
      ];

      buttonLabel = "View Standard Bar Chart";
      renderStacked = true;
      comboBoxValue = "adm";
      renderGraphs = true;

      constructor(){
        super();
        //this.renderGraphs(this.admModels);
      }

      get options(){
        return [
            { label: 'Adm', value: 'adm' },
            { label: 'Pd1', value: 'pd1' },
            { label: 'Pd2', value: 'pd2' },
        ];
    }

      changeGraph(){
          if(this.renderStacked === true)
            this.buttonLabel = "View Stacked Chart";
        else
            this.buttonLabel = "View Standard Bar Chart";
        this.renderStacked = !this.renderStacked;
      }

      handleCertChange(event){
        this.renderGraphs = false;
        this.comboBoxValue = event.detail.value;
        if(this.comboBoxValue === "adm")
          this.models = this.admModels;
        else if(this.comboBoxValue === "pd1")
          this.models = this.pd1Models;
        setTimeout(() =>{ console.log("hello time"); this.renderGraphs = true; }, 30);
        //this.renderStacked = true;
        //this.renderStacked();
      }

      changeGraphModels(showModel){
        this.renderGraphs = false;
        this.models = showModel;
        setTimeout(() =>{ console.log("hello time"); this.renderGraphs = true; }, 3000);
      }
}