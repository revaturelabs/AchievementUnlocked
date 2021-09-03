import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class TreeMap extends LightningElement {
    svgWidth = 700;
    svgHeight = 700;
    str = "hello d3";
    d3Initialized = false;

   /*models = [
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
      ];*/
      @api models;
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
        console.log('data ni tree: ', this.models);
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 745 - margin.left - margin.right,
        height = 745 - margin.top - margin.bottom;
        const svg = d3.select(this.template.querySelector('svg'))
                    .classed('container', true)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        // stratify the data: reformatting for d3.js
        var root = d3.stratify()
        .id(function(d) { return d.model_name; })   // Name of the entity (column name is name in csv)
        .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
        (this.models);
        root.sum(function(d) { return +d.field1 });

        d3.treemap()
        .size([width, height])
        .padding(4)
        (root);

        console.log(this.models);
        console.log(root.leaves());

        svg
        .selectAll("rect")
        .data(root.leaves(), function(d){return d.data})
        .enter()
        .append("rect")
        .attr('x', function (d) { return d.x0/2; })
        .attr('y', function (d) { return d.y0/2; })
        .attr("pointer-events","visible")
        .on("mouseover", (d, i) => d3.select(d.currentTarget).transition()
            .duration(50)
            .style('opacity', 0.5))
        .on("mouseout", (d, i) => d3.select(d.currentTarget).transition()
            .duration(50)
            .style('opacity', 1))
        .on("mousedown", (d, i) => this.handlemouse(d, i))//this.handlemouse)//function(d, i){console.log(i);this.handlemouse();})
        .transition()
        .duration(1000)
        .attr('width', function (d) {console.log('d', d); console.log('d.x: ', d.x1 - d.x0); return (d.x1 - d.x0)/2; })
        .attr('height', function (d) { console.log('d.y', d.y1 - d.y0); return (d.y1 - d.y0)/2; })
        .style("stroke", "black")
        .style("fill", "#402D54");
        //.style("opacity", 0.5);

        svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function(d){ return (d.x0+10)/2})    // +10 to adjust position (more right)
        .attr("y", function(d){ return (d.y0+30)/2})    // +20 to adjust position (lower)
        .text(function(d){/*console.log('ssss' + d.data);*/ return d.data.model_name})
        //.on("mousedown", function(d, i){console.log(i.data.model_name)})
        .attr("font-size", "15px")
        .attr("fill", "white");
    }

    handlemouse(d, i){
      //this.testEvent();
      console.log("mouse is running");
      //console.log(d);
      console.log(i.data);
      console.log("test event function being called");
      //this.test();
      //this.testEvent();
      const event = new CustomEvent('child', {
         //detail contains only primitives
        detail: {key1:i.data.model_name, key2:"Das", data: i.data}
        });
       this.dispatchEvent(event);

    }

    
        
}