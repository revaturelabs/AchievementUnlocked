/*
 * Name: Jacob Schwartz
 * Date: September 5, 2021
 * Project3: Achievement Unlocked
 * Description: Contains bar chart based on attempts. Takes in a parameter
 * in json array format and renders the graph accordingly.c/d3Example
 * 
 * For Future update: Make individual bars render dynamically based on 
 * input from the array.
 */

import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class AttemptBarChart extends LightningElement {
    svgWidth = 600;
    svgHeight = 600;
    width = 520;
    height = 520;
    margin = {top: 30, right: 20, bottom: 30, left: 50};
    svg = null;
    xScale0 = null;
    xScale1 = null;
    yScale = null;
    model_name = null;
    str = "hello d3";
    d3Initialized = false;
    yArr = [];
    yMap = {};
    y1 = 0;
    y2 = 0;
    yIncrementer = 0.366666;
    renderExample = false;

    /*models = [
        {
          "model_name":"Adm Cert",
          "field1":39,
          "field2":83,
          "field3":79,
          "field4": 10
        }
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

        /*var models = [
            {
              "model_name":"Adm Cert",
              "field1":39,
              "field2":83
            }
          ];*/

          //console.log(models);

          //console.log("ymap");
          //console.log(this.yMap);
           this.setBarChart(this.models);
           //this.setBarFields(this.models2);
           this.setBarFields(this.models);
           //this.setBarChart(this.models2);
           //this.transitionTest();

           /*for( let i = 0; i < models.length; i++){
                //this.yArr.push(0);
                //console.log(models[i]);
                this.yMap[models[i].model_name] = {"field1": models[i].field1, "field2": models[i].field2};
                models[i].field1 = 100;
                models[i].field2 = 100;
          }*/
          //this.callTime2(models);
            //this.callTime(models);
    }

    setBarChart(models){
        let container = d3.select(this.template.querySelector('svg')),
                    width = this.width,
                    height = this.height,
                    margin = this.margin,
                    barPadding = .2,
                    axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
                    this.svg = container
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);
        
                    this.xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
                    this.xScale1 = d3.scaleBand();
                    this.yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
        
                    var xAxis = d3.axisBottom(this.xScale0).tickSizeOuter(axisTicks.outerSize);
                    var yAxis = d3.axisLeft(this.yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
        
                    this.xScale0.domain(models.map(d => d.model_name));
                    this.xScale1.domain(['field1', 'field2', 'field3', 'field4']).range([0, this.xScale0.bandwidth()]);
                    //this.yScale.domain([0, d3.max(models, d => d.field1 > d.field2 ? d.field1 : d.field2)]);
                    //console.log('beforeuscale', models);
                    this.yScale.domain([0, d3.max(models, d => (d.field1 + d.field2 + d.field3 + d.field4))]);
        
                    //this.setBarFields(models);
                    // Add the X Axis
                    
                    this.svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
                    .call(xAxis);
                    // Add the Y Axis
                    this.svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                    //this.setBarFields(models);
    }

    setBarFields(models){
        this.model_name = this.svg.selectAll(".model_name")
                    .data(models)
                    .enter().append("g")
                    .attr("class", "model_name")
                    .attr("transform", d => `translate(${this.xScale0(d.model_name)},0)`);
        
                    /* Add field1 bars */
                    this.model_name.selectAll(".bar.field1")
                    .data(d => [d])
                    .enter()
                    .append("rect")
                    //.merge(this.model_name)
                    //.transition()
                    //.duration(1000)
                    .attr("class", "bar field1")
                    .style("fill","#90EE90")
                    .attr("x", d => this.xScale1('field1'))
                    //.attr("y", d => this.yScale(d.field1))
                    .attr("y", this.height - this.margin.top - this.margin.bottom)
                    .attr("width", this.xScale1.bandwidth())
                    .transition()
                    .duration(1000)
                    .attr("y", d => this.yScale(d.field1))
                    .attr("height", d => {
                    return this.height - this.margin.top - this.margin.bottom - this.yScale(d.field1)
                    }); 
        
                    /* Add field2 bars */
                    this.model_name.selectAll(".bar.field2")
                    .data(d => [d])
                    .enter()
                    .append("rect")
                    .attr("class", "bar field2")
                    .style("fill","#20B2AA")
                    .attr("x", d => this.xScale1('field2'))
                    .attr("y", this.height - this.margin.top - this.margin.bottom)
                    .attr("width", this.xScale1.bandwidth())
                    .transition()
                    .duration(1000)
                    .attr("y", d => this.yScale(d.field2))
                    .attr("height", d => {
                        return this.height - this.margin.top - this.margin.bottom - this.yScale(d.field2)
                });

                /* Add field2 bars */
                this.model_name.selectAll(".bar.field3")
                .data(d => [d])
                .enter()
                .append("rect")
                .attr("class", "bar field3")
                .style("fill","#87CEFA")
                .attr("x", d => this.xScale1('field3'))
                .attr("y", this.height - this.margin.top - this.margin.bottom)
                .attr("width", this.xScale1.bandwidth())
                .transition()
                .duration(1000)
                .attr("y", d => this.yScale(d.field3))
                .attr("height", d => {
                    return this.height - this.margin.top - this.margin.bottom - this.yScale(d.field3)
            });

            /* Add field2 bars */
            this.model_name.selectAll(".bar.field4")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar field4")
            .style("fill","#9370DB")
            .attr("x", d => this.xScale1('field4'))
            .attr("y", this.height - this.margin.top - this.margin.bottom)
            .attr("width", this.xScale1.bandwidth())
            .transition()
            .duration(1000)
            .attr("y", d => this.yScale(d.field4))
            .attr("height", d => {
                return this.height - this.margin.top - this.margin.bottom - this.yScale(d.field4)
        });
    }

   /* callTime(models){
        setTimeout(() => {
            //models[0].field1 = 55;
            //models[0].field2 = 2;
            console.log("time");
            //models = [];
            this.model_name.data([]).exit().remove(); 
            let stopCall = this.setChartYValues(models);
            this.setBarFields(models);
            if(stopCall){
                //this.renderExample = true;
                this.transitionTest();
                return;
            }
            this.callTime(models);
        }, 4);

    }

    callTime2(models){
        setTimeout(() => {
            this.setBarFields(models);
        }, 4000);

    }

    setChartYValues(models){
        //models[0] = {"model_name":"Adm Cert", "field1": this.y1 += this.yIncrementer, "field2": this.y2 += this.yIncrementer};
        let boolVal = true;
        for(let i = 0; i < models.length; i++){
            if(models[i].field1 < this.yMap[models[i].model_name].field1)
                models[i].field1 += this.yIncrementer;
            if(models[i].field2 < this.yMap[models[i].model_name].field2)
                models[i].field2 += this.yIncrementer;
            
            if(models[i].field1 < this.yMap[models[i].model_name].field1)
                boolVal = false;
            if(models[i].field2 < this.yMap[models[i].model_name].field2)
                boolVal = false;
        }

        return boolVal;
    }

    transitionTest(){
        console.log("transitoin test is running");
        this.xScale0.domain(this.models2.map(d => d.model_name));
        this.xScale1.domain(['field1', 'field2']).range([0, this.xScale0.bandwidth()]);
        this.yScale.domain([0, d3.max(this.models2, d => d.field1 > d.field2 ? d.field1 : d.field2)]);
        //this.model_name.data([]).exit().remove();
        this.model_name = this.svg.selectAll(".model_name")
                    .data(this.models2)
                    .enter().append("g")
                    .attr("class", "model_name")
                    .attr("transform", d => `translate(${this.xScale0(d.model_name)},0)`);
        
                    /* Add field1 bars */
                    /*this.model_name.selectAll(".bar.field1")
                    .data(d => [d])
                    .enter()
                    .append("rect")
                    .merge(this.model_name)
                    .transition()
                    .duration(1000)
                    .attr("class", "bar field1")
                    .style("fill","#7a7aff")
                    .attr("x", d => this.xScale1('field1'))
                    .attr("y", d => this.yScale(d.field1))
                    .attr("width", this.xScale1.bandwidth())
                    .attr("height", d => {
                    return this.height - this.margin.top - this.margin.bottom - this.yScale(d.field1)
                    });

    }*/

}