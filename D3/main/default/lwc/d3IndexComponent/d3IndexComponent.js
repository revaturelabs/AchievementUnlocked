import { LightningElement } from 'lwc';

export default class D3IndexComponent extends LightningElement {
    value = "overview";
    renderBarChart = true;
    renderTreeMap = false;
    renderStackedBarChart = false;

    constructor() {
        super();
        this.template.addEventListener('child', evt => {
            console.log('Notification event', evt);
        });
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
    }

    setValue(){
        this.renderBarChart = false;
        this.renderTreeMap = false;
        this.renderStackedBarChart = false;

        if(this.value === "overview")
            this.renderBarChart = true;
        else if(this.value === "cohort view")
            this.renderTreeMap = true;
        else if(this.value === "cohort graph")
            this.renderStackedBarChart = true;
    }

    childEvent(event){
        console.log("child event has been fired");
        console.log(event.detail.key1);

        this.value = "cohort graph";
        this.setValue();
        }

}