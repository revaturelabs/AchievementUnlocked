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
    @api modelarray;
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
            { label: 'Advanced Adm', value: 'adadm' },
            { label: 'Pd2', value: 'pd2' },
            { label: 'Platform App Builder', value: 'platapp' },
            { label: 'JS Developer 1', value: 'jsd1' },
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
          this.models = this.modelarray[0];
        else if(this.comboBoxValue === "pd1")
          this.models = this.modelarray[1];
        else if(this.comboBoxValue === "adadm")
          this.models = this.modelarray[2];
        else if(this.comboBoxValue === "pd2")
          this.models = this.modelarray[3];
        else if(this.comboBoxValue === "platapp")
          this.models = this.modelarray[4];
        else if(this.comboBoxValue === "jsd1")
          this.models = this.modelarray[5];
        setTimeout(() =>{ this.renderGraphs = true; }, 30);
        //this.renderStacked = true;
        //this.renderStacked();
      }

      changeGraphModels(showModel){
        this.renderGraphs = false;
        this.models = showModel;
        setTimeout(() =>{ console.log("hello time"); this.renderGraphs = true; }, 3000);
      }
}