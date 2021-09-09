/*
 * Name: Jacob Schwartz
 * Date: September 9, 2021
 * Project3: Achievement Unlocked
 * Description: Component used for testing purposes in displaying a stacked chart with the D3 library. 
 *
 * Can be used as a reference but NOT PRODUCTION READY!!!! 
*/

import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class StackedBarChart extends LightningElement {
    svgWidth = 700;
    svgHeight = 700;
    str = "hello d3";
    d3Initialized = false;

    models = [
        {
          "model_name":"Adm Cert",
          "field1":39,
          "field2":83
        },
        {
          "model_name":"PD1 Cert",
          "field1":67,
          "field2":93
        },
        {
          "model_name":"PD2 Cert",
          "field1":50,
          "field2":30
        },
      ];

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
        var margin = {top: 10, right: 30, bottom: 20, left: 50},
            width = 400 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        const svg = d3.select(this.template.querySelector('svg'))
                    .classed('container', true)
                    .style('border', '1px solid red')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        let subgroups = ["field1", "field2"];

        //let groups = d3.map(this.models, function(d){return(d.model_name)}).keys();
        let groups = ["Adm Cert", "PD1 Cert", "PD2 Cert"];
        //console.log(this.models);
        //console.log("groups");
        //console.log(groups);
          // Add X axis
        var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));
        
        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c','#377eb8']);

        //stack the data? --> stack per subgroup
        var stackedData = d3.stack()
            .keys(subgroups)
            (this.models);

          // Show the bars
        svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.model_name); })
        .attr("width",x.bandwidth())
        .attr("y", height - margin.top - margin.bottom)
        .transition()
        .duration(1000)
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        ;

    }
}
