import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class SideStackedChart extends LightningElement {
    svgWidth = 400;
    svgHeight = 400;
    str = "hello d3";
    d3Initialized = false;

    /*models = [
        {
          "model_name":"Adm Cert",
          "field1":35,
          "field2":25,
          "field3": 15,
          "field4": 5
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
        const svg = d3.select(this.template.querySelector('svg'))
                    .classed('container', true),
                    margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = +svg.attr("width") - margin.left - margin.right,
                    height = +svg.attr("height") - margin.top - margin.bottom,
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    var y = d3.scaleBand()			// x = d3.scaleBand()	
                    .rangeRound([0, height])	// .rangeRound([0, width])
                    .paddingInner(0.05)
                    .align(0.1);

                    var x = d3.scaleLinear()		// y = d3.scaleLinear()
                    .rangeRound([0, width]);	// .rangeRound([height, 0]);

                    var z = d3.scaleOrdinal()
                    .range(["#1414ff", "#2e2eff", "#4747ff", "#6161ff"]);
                    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                    let keys = ["field4", "field3", "field2", "field1"];
                    y.domain(this.models.map(function(d) { return d.model_name; }));					// x.domain...
                    x.domain([0, d3.max(this.models, function(d) { return d.field1 + d.field2 + d.field3 + d.field4; })]).nice();	// y.domain...
                    //console.log("xydomaing: " + x + " " + y);
                    z.domain(keys);
                    //console.log("y.bandiwih: ", y.bandwidth());

                     // create a tooltip
                    var Tooltip = //d3.select(this.template.querySelector("div"))
                    svg
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .style("opacity", 1)
                    //.attr("class", "tooltip")
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px");

                    //g.append(Tooltip);

                    g
                    .append("g")
                    .selectAll("g")
                    .data(d3.stack().keys(keys)(this.models))
                    .enter().append("g")
                    .attr("fill", function(d) { return z(d.key); })
                    .selectAll("rect")
                    .data(function(d) {console.log("it is running before: " + d); return d; })
                    .enter().append("rect")
                    .on("mouseover", (d, i) => {
                        console.log(i.data);
                        console.log(i);
                        let rectVar = i[1] - i[0];
                        let total = i.data.field1 + i.data.field2 + i.data.field3 + i.data.field4;
                        let per = (rectVar/total) * 100;
                        l.attr("x", d.x - 100);
                        //legend2.html("helo html");
                        t.attr("x", d.x)
                        .text(rectVar + " out of " + total);
                        t2.attr("x", d.x)
                        .text(per + "%");
                        legend2
                        .style("opacity", 1);
                    })
                    .on("mouseout", (d, i) => {
                        legend2.style("opacity", 0);
                    })
                    .attr("y", function(d) {console.log(y(d.data.model_name)); return y(d.data.model_name) + 125; })//+ 125 for single 
                    .attr("x", 0)//.attr("x", function(d) {console.log("dx: " + x(d[0])); return x(d[0]); })
                    .attr("height", y.bandwidth() - 200)//-200
                    .transition()
                    .duration(1000)
                    .attr("x", function(d) {console.log("dx: " + x(d[0])); return x(d[0]); })			
                    .attr("width", function(d) { console.log(x(d[1]) - x(d[0]));return x(d[1]) - x(d[0]); })
                    ;	
                    
                    /*g.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0,0)") 						//  .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisLeft(y));	*/								//   .call(d3.axisBottom(x));

                    g.append("g")
                    .attr("class", "axis")
	                .attr("transform", "translate(0,"+height+")")				// New line
                    .call(d3.axisBottom(x).ticks(null, "s"))					//  .call(d3.axisLeft(y).ticks(null, "s"))
                    .append("text")
                    .attr("y", 2)												//     .attr("y", 2)
                    .attr("x", x(x.ticks().pop()) + 0.5) 						//     .attr("y", y(y.ticks().pop()) + 0.5)
                    .attr("dy", "0.32em")										//     .attr("dy", "0.32em")
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")
                    .text("Associates")
	                .attr("transform", "translate("+ (-width) +",-10)");

                    var legend = g.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 12)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data(keys.slice().reverse())
                    .enter().append("g")
                    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	                .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });

                    legend.append("rect")
                    .attr("x", 20)
                    .attr("y", -275)
                    .attr("width", 19)
                    .attr("height", 19)
                    .attr("fill", z);

                    legend.append("text")
                    .attr("x", 112)
                    .attr("y", -263)
                    .attr("dy", "0.32em")
                    .text( (d) => { return this.getLegendSymbols(d); });

                    var legend2 = g.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 15)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data([1])
                    .enter().append("g")
                    .style('border', '1px solid red')
                    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	                .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });
                    
                    var l = legend2.append("rect")
                    .attr("x", 215)
                    .attr("y", -300)
                    .attr("width", 140)
                    .attr("height", 119)
                    .attr("fill", "white")
                    .attr("rx", 15)
                    .style("stroke", "black")
       			    .style("stroke-width", 3);

                    var t = legend2.append("text")
                       .attr("x", 215)
                       .attr("y", -270)
                       .attr("width", 120)
                       .attr("height", 109)
                       //.attr("dy", "1.32em")
                       .text("hello pi");

                    var t2 = legend2.append("text")
                       .attr("x", 215)
                       .attr("y", -250)
                       .attr("width", 120)
                       .attr("height", 109)
                       //.attr("dy", "1.32em")
                       .text("hello pi");

                    
                    legend2.style("opacity", 0);
                    /*legend2.append("rect")
                    .attr("x", 220)
                    .attr("y", -295)
                    .attr("width", 110)
                    .attr("height", 99)
                    .attr("fill", "white");*/
        

    }

    getLegendSymbols(d){
        if(d === "field1") return "1st Attempt";
        else if(d === "field2") return " 2nd Attempt";
        else if(d === "field3") return "3rd Attempt";
        else if(d === "field4") return ">= 4 Attempts";
    }
}