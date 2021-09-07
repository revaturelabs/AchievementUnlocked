import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';
//import getRecords from '@salesforce/apex/ProjectLightController.getRecords';

const FIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email',
];

export default class DataImportTest extends LightningElement {

    svgWidth = 400;
    svgHeight = 400;
    str = "hello d3";
    d3Initialized = false;
    ol = null;

    //@wire(getRecords) contacts;
    contacts = [];

    async renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;
        
        try{
            await loadScript(this, D3 + '/d3/d3.min.js');
            await loadScript(this, D3Scale + '/d3scale');
            await getRecords({objectName : this.objectList})
                    .then(r => {
                        this.ol = r;
                        console.log('r', r);
                    })
            console.log(this.ol);
            this.initializeD3();
            
        }catch(e){
            console.error(e, 'd3scaled failed');
            
        }
    }

    initializeD3(){
        /*const svg = d3.select(this.template.querySelector('svg'))
                    .classed('container', true)
                    .style('border', '1px solid red');
        */
        //console.log('list of contacts');
        //console.log(this.contacts);
        const t = d3
                .select(this.template.querySelector('div'))
                .selectAll('p')
                .data([1, 2, 3])
                .enter()
                .append('p')
                .text(dta => dta);
    }
}