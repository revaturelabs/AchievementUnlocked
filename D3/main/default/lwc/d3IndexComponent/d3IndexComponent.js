import { LightningElement, api, wire } from 'lwc';
import getAdmRecords from '@salesforce/apex/AttemptChartsController.getADMOverview';
import getCohorts from '@salesforce/apex/AttemptChartsController.getCohorts';

export default class D3IndexComponent extends LightningElement {
    value = "overview";
    renderBarChart = false;
    renderTreeMap = false;
    renderStackedBarChart = false;

    //@wire(getAdmRecords) admOverview;

    models = null;
    treemodels = [
        {"model_name": "origin", "parent": '', "field1": ''},
        {
          "model_name":"Cohort 1",
          "parent": "origin",
          "field1":39,
          "field2":83
        },
        {
          "model_name":"Cohort 2",
          "parent": "origin",
          "field1":67,
          "field2":93
        },
        {
          "model_name":"Cohort 3",
          "parent": "origin",
          "field1":50,
          "field2":30
        },
      ];;
    testmodel = "testmodel run";

    @wire(getAdmRecords) fun(data){
        console.log("wiring" + this.value);
        if(data.data != undefined){
            //console.log(data.data);
            //console.log(data.data[0].Vouchers__r[0].Number_of_Attempts__c);
            this.setAdmData(data.data);
        }
    }

    constructor() {
        super();
        this.template.addEventListener('child', evt => {
            console.log('Notification event', evt);
        });
        //this.setCohortData();
        //console.log("in index controller");
        //console.log(this.admOverview);
      }

    get options(){
        return [
            { label: 'overview', value: 'overview' },
            { label: 'Cohort View', value: 'cohort view' },
            { label: 'Cohort graph', value: 'cohort graph' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;

        this.setValue();

        console.log(this.admOverview);
    }

    setValue(){
        this.renderBarChart = false;
        this.renderTreeMap = false;
        this.renderStackedBarChart = false;

        if(this.value === "overview")
            this.renderBarChart = true;
        else if(this.value === "cohort view")
            this.setCohortData();//this.renderTreeMap = true;
        else if(this.value === "cohort graph")
            this.renderStackedBarChart = true;
    }

    childEvent(event){
        console.log("child event has been fired");
        console.log(event.detail.key1);

        //this.value = "cohort graph";
        //this.setValue();
        this.setBarChartsFromCohort(event.detail.data);
        }

    setAdmData(data){
        let field1 = 0, field2 = 0, field3 = 0, field4 = 0;
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].Vouchers__r.length; j++){
                let k = data[0].Vouchers__r[0].Number_of_Attempts__c;
                if(k === 1) field1++;
                else if(k === 2) field2++;
                else if(k === 3) field3++;
                else if(k === 4) field4++;

            }
        }
        this.models = [
            {
                "model_name":"Adm Cert",
                "field1":field1,
                "field2":field2,
                "field3": field3,
                "field4": field4
              }
        ];
        this.renderBarChart = true;
    }

    setCohortData(){
        console.log("setting cohort dta");
        getCohorts({objectName : this.selectedSo})
            .then(r => {
                 console.log('r', r[0]);
                 console.log('tree: ', this.treemodels);
                 this.treemodels = [];
                 for(let i = 0; i < r.length; i++){
                     console.log('a', r[i]);
                    this.treemodels.push(r[i]);
                 }
                 console.log('after r tree: ', this.treemodels);
                 this.renderTreeMap = true;
            })
    }

    setBarChartsFromCohort(data){
        console.log('from narcharts: ', data.originalTarget);
        this.models = [
            {
                "model_name":"Adm Cert",
                "field1":data.field1,
                "field2": data.field2,
                "field3": data.field3,
                "field4": data.field4
              }
        ];
        this.renderTreeMap = false;
        this.renderBarChart = true;
    }

}