import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class D3Example extends LightningElement {
    svgWidth = 400;
    svgHeight = 400;
    str = "hello d3";
    d3Initialized = false;

    async renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        try{
            await loadScript(this, D3 + '/d3/d3.min.js');
            await loadScript(this, D3Scale + '/d3scale');
            //console.log(d3.scaleBand);
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

        const t = d3
                .select(this.template.querySelector('div'))
                .selectAll('p')
                .data([1, 2, 3])
                .enter()
                .append('p')
                .text(dta => dta);
    }
}