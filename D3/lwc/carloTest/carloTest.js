/*
Name: Carlo Mejia
Project: Achievement Unlocked -- Radar Chart
Version: 1.0.0
Description: This is a radar chart that displays the average scores of each cohort in various categories seen in Salesforce
    certification exams. It pulls from the "Attempts" Custom Object and displays data in the form of an SVG. It also features
    the ability to view overall average scores in each category among all cohorts.
*/
import { LightningElement, api, wire, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import getCerts from '@salesforce/apex/dataGrabber.getCerts';
import getCohorts from '@salesforce/apex/dataGrabber.getCohorts';
import getScoresbyCohort from '@salesforce/apex/dataGrabber.getScoresbyCohort';
import Voucher__c from '@salesforce/schema/Voucher__c';
import Certification_Type__c from '@salesforce/schema/Voucher__c.Certification_Type__c';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';
    
export default class CarloTest extends LightningElement {
    
    //the data you can search up
    @api cohortNames = [];
    @api examTypes = [];
    @api selectedCohort = '';
    @api selectedExam = '';
    @api showAverage = false;

    //getting picklist values from voucher object
    @wire (getObjectInfo, {objectApiName: Voucher__c}) voucherMetadata;
    @wire (getPicklistValues, {
        recordTypeId: '$voucherMetadata.data.defaultRecordTypeId',
        fieldApiName: Certification_Type__c
    }) certTypePicklist;

    //the function that will add the data to our HTML component
    addOptions(stringList) {
        let myMap = stringList.map((str)=>({
            label: str,
            value: str
        }));
        return myMap;
    }

    //The sample data that shows up when you first render the component
    cohortData = [
        {axis: "Security and Integration", value: 0.1},
        {axis: "API and External", value: 0.1},
        {axis: "Data and Object Management", value: 0.1},
        {axis: "Apex Triggers", value: 0.1},
        {axis: "Sales/Service Cloud", value: 0.1}
    ]
    averageData = [
        {axis: "Security and Integration", value: 0.1},
        {axis: "API and External", value: 0.1},
        {axis: "Data and Object Management", value: 0.1},
        {axis: "Apex Triggers", value: 0.1},
        {axis: "Sales/Service Cloud", value: 0.1}
    ]

    //The ultimate source of data!
    //The radar chart will always look at this array when determining what to render.
    //By default, it only has this.cohortData, but if you set this.showAverage to true, it will include this.averageData as well.
    data = [this.cohortData];

    d3Initialized = false;
    loadedRadar = 0;

    //This thing runs multiple times. If it had its way, it would create MULTIPLE radar charts at once. What a pain!
    //That's why we use loadedRadar - it automatically increases once the function is called.
    //If loadedRadar has a value greater than zero, the function won't render any more radar charts.
    async renderedCallback() {
    if (this.loadedRadar < 1) {
        if (this.d3Initialized) {
            console.log("d3Initialized is already true.");
        }
        this.d3Initialized = true;

        try{
            await loadScript(this, D3 + "/d3/d3.min.js");
            await loadScript(this, D3Scale + "/d3scale");
        } catch(e) {
            console.log("Didn't load D3.");
            console.log(e);
        }

        try{
            //setting initial radarChartOptions for our particular case
            let margin = {top: 100, bottom: 100, left: 100, right: 100},
            width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
            let radarChartOptions = {
                margin: margin,
                w: width,
                h: height,
                maxValue: 1.0,
                levels: 5,
                roundStrokes: true,
                color: d3.scaleOrdinal().range(["#39E0E6","#D92581","#94DB51"])
            };

            //render the radar chart!
                this.radarChart(".radarChart", this.data, radarChartOptions);
                console.log("Loaded radarChart()");
                this.loadedRadar++;
        } catch(e) {
            console.log("radarChart() failed.");
            console.log(e);
        }
    } else {console.log ("loadedRadar is " + this.loadedRadar)}
    } //renderedCallback closing bracket

    //This function will add all available certification types/cohorts to the comboboxes in the UI.
    async connectedCallback() {
        //setting the certification types
        const certTypes = await getCerts();
        this.examTypes = this.addOptions([...certTypes])

        //getting the cohort names
        const cohorts = await getCohorts();
        this.cohortNames = this.addOptions([...cohorts])
    }

    //This function sets showAverage to true or false -- whatever it isn't!
    @api changeAverage() {
        if (this.showAverage) {
            this.showAverage = false
        } else if (this.showAverage == false) {
            this.showAverage = true;
        } else {
            console.log("Something REALLY weird is going on...")
        }
        console.log("showAverage is now " + this.showAverage);
        this.changeInput();
    }

    //This function changes the selectedCohort and selectedExam variables seen above, according to the values you've chosen on the UI.
    @api changeInput() {
        this.selectedCohort = this.template.querySelector('.cohortSelector').value;
        this.selectedExam = this.template.querySelector('.examSelector').value;
        if (this.selectedCohort != undefined && this.selectedExam != undefined) {
            this.changeData();
        }
    }

    //A function that changes the data according to whatever the Apex finds
    //This one is a little clunky, since everything is hard-coded.
    //Most dynamic solutions ended up messing with the radar chart function..
    changeData() {
        getScoresbyCohort({ jCohort: this.selectedCohort, jAttempt: this.selectedExam, jAverage: false })
            .then((result) => {
                //This will show the scores for a single cohort -- the one that you had selected on the UI.
                if (this.selectedExam == "ADM") {
                    this.cohortData = [
                        {axis: "Configuration & Setup", value: result[0].expr0/100},
                        {axis: "Object Manager & Lightning App Builder", value: result[0].expr1/100},
                        {axis: "Sales & Marketing Applications", value: result[0].expr2/100},
                        {axis: "Service & Support Applications", value: result[0].expr3/100},
                        {axis: "Productivity & Collaboration", value: result[0].expr4/100},
                        {axis: "Data & Analytics", value: result[0].expr5/100},
                        {axis: "Workflow & Process Automation", value: result[0].expr6/100}
                    ];
                } else if (this.selectedExam == "PD1") {
                    this.cohortData = [
                        {axis: "Salesforce Fundamentals", value: result[0].expr0/100},
                        {axis: "Data Modeling and Management", value: result[0].expr1/100},
                        {axis: "Process Automation and Logic", value: result[0].expr2/100},
                        {axis: "User Interface", value: result[0].expr3/100},
                        {axis: "Testing, Debugging, and Deployment", value: result[0].expr4/100}
                    ]
                } else if (this.selectedExam == "Advanced ADM") {
                    this.cohortData = [
                        {axis: "Security and Access", value: result[0].expr0/100},
                        {axis: "Extending Custom Objects and Applications", value: result[0].expr1/100},
                        {axis: "Auditing and Monitoring", value: result[0].expr2/100},
                        {axis: "Sales Cloud Operations", value: result[0].expr3/100},
                        {axis: "Service Cloud Operations", value: result[0].expr4/100},
                        {axis: "Data Management", value: result[0].expr5/100},
                        {axis: "Content Management", value: result[0].expr6/100},
                        {axis: "Change Management", value: result[0].expr7/100},
                        {axis: "Analytics, Reports, and Dashboards", value: result[0].expr8/100},
                        {axis: "Process Automation", value: result[0].expr9/100}
                    ]
                } else if (this.selectedExam == "PD2") {
                    this.cohortData = [
                        {axis: "Salesforce Fundamentals", value: result[0].expr0/100},
                        {axis: "Data Modeling and Management", value: result[0].expr1/100},
                        {axis: "Business Logic and Process Automation", value: result[0].expr2/100},
                        {axis: "User Interface", value: result[0].expr3/100},
                        {axis: "Performance", value: result[0].expr4/100},
                        {axis: "Integration", value: result[0].expr5/100},
                        {axis: "Testing", value: result[0].expr6/100},
                        {axis: "Debug and Deployment Tools", value: result[0].expr7/100},
                    ]
                } else if (this.selectedExam == "Platform App Builder") {
                    this.cohortData = [
                        {axis: "Salesforce Fundamentals", value: result[0].expr0/100},
                        {axis: "Data Modeling and Mangement", value: result[0].expr1/100},
                        {axis: "Business Logic and Process Automation", value: result[0].expr2/100},
                        {axis: "User Interface", value: result[0].expr3/100},
                        {axis: "App Deployment", value: result[0].expr4/100}
                    ]
                } else if (this.selectedExam == "JS Developer 1") {
                    this.cohortData = [
                        {axis: "Variable Types and Collections", value: result[0].expr0/100},
                        {axis: "Objects, Functions, and Classes", value: result[0].expr1/100},
                        {axis: "Browser and Events", value: result[0].expr2/100},
                        {axis: "Debugging and Error Handling", value: result[0].expr3/100},
                        {axis: "Asynchronous Programming", value: result[0].expr4/100},
                        {axis: "Server-Side Javascript", value: result[0].expr5/100},
                        {axis: "Testing", value: result[0].expr6/100},
                    ]
                }

                this.origResult = result;
                if (result[0].expr0 == undefined) {
                    this.cohortData = [];
                }
                this.template.querySelector("svg").remove();
                //Setting radarChartOptions for our newly rendered graph!
                let margin = {top: 100, bottom: 100, left: 100, right: 100},
                width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
                height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                let radarChartOptions = {
                    margin: margin,
                    w: width,
                    h: height,
                    maxValue: 1.0,
                    levels: 5,
                    roundStrokes: true,
                    color: d3.scaleOrdinal().range(["#39E0E6","#D92581","#1D6967"])
                };
                this.data = [this.cohortData];
                this.radarChart(".radarChart", this.data, radarChartOptions);
            })
            .catch((error)=>{
                console.log(error);
            }).then(()=> {
        //If this.showAverage is true, we want to run another Apex call, this time getting the average scores, rather than the cohort scores.
        if (this.showAverage == true) {
            console.log("showAverage is true, so we'll render the averages on the chart.");
            getScoresbyCohort({ jCohort: this.selectedCohort, jAttempt: this.selectedExam, jAverage: true })
            .then((result) => {
                if (this.selectedExam == "ADM") {
                    this.averageData = [
                        {axis: "Configuration & Setup", value: result[0].expr0/100},
                        {axis: "Object Manager & Lightning App Builder", value: result[0].expr1/100},
                        {axis: "Sales & Marketing Applications", value: result[0].expr2/100},
                        {axis: "Service & Support Applications", value: result[0].expr3/100},
                        {axis: "Productivity & Collaboration", value: result[0].expr4/100},
                        {axis: "Data & Analytics", value: result[0].expr5/100},
                        {axis: "Workflow & Process Automation", value: result[0].expr6/100}
                    ];
                } else if (this.selectedExam == "PD1") {
                    this.averageData = [
                        {axis: "Salesforce Fundamentals", value: result[0].expr0/100},
                        {axis: "Data Modeling and Management", value: result[0].expr1/100},
                        {axis: "Process Automation and Logic", value: result[0].expr2/100},
                        {axis: "User Interface", value: result[0].expr3/100},
                        {axis: "Testing, Debugging, and Deployment", value: result[0].expr4/100}
                    ]
                } else if (this.selectedExam == "Advanced ADM") {
                    this.averageData = [
                        {axis: "Security and Access", value: result[0].expr0/100},
                        {axis: "Extending Custom Objects and Applications", value: result[0].expr1/100},
                        {axis: "Auditing and Monitoring", value: result[0].expr2/100},
                        {axis: "Sales Cloud Operations", value: result[0].expr3/100},
                        {axis: "Service Cloud Operations", value: result[0].expr4/100},
                        {axis: "Data Management", value: result[0].expr5/100},
                        {axis: "Content Management", value: result[0].expr6/100},
                        {axis: "Change Management", value: result[0].expr7/100},
                        {axis: "Analytics, Reports, and Dashboards", value: result[0].expr8/100},
                        {axis: "Process Automation", value: result[0].expr9/100}
                    ]
                } else if (this.selectedExam == "PD2") {
                    this.averageData = [
                        {axis: "Salesforce Fundamentals", value: result[0].expr0/100},
                        {axis: "Data Modeling and Management", value: result[0].expr1/100},
                        {axis: "Business Logic and Process Automation", value: result[0].expr2/100},
                        {axis: "User Interface", value: result[0].expr3/100},
                        {axis: "Performance", value: result[0].expr4/100},
                        {axis: "Integration", value: result[0].expr5/100},
                        {axis: "Testing", value: result[0].expr6/100},
                        {axis: "Debug and Deployment Tools", value: result[0].expr7/100},
                    ]
                } else if (this.selectedExam == "Platform App Builder") {
                    this.averageData = [
                        {axis: "Salesforce Fundamentals", value: result[0].expr0/100},
                        {axis: "Data Modeling and Mangement", value: result[0].expr1/100},
                        {axis: "Business Logic and Process Automation", value: result[0].expr2/100},
                        {axis: "User Interface", value: result[0].expr3/100},
                        {axis: "App Deployment", value: result[0].expr4/100}
                    ]
                } else if (this.selectedExam == "JS Developer 1") {
                    this.averageData = [
                        {axis: "Variable Types and Collections", value: result[0].expr0/100},
                        {axis: "Objects, Functions, and Classes", value: result[0].expr1/100},
                        {axis: "Browser and Events", value: result[0].expr2/100},
                        {axis: "Debugging and Error Handling", value: result[0].expr3/100},
                        {axis: "Asynchronous Programming", value: result[0].expr4/100},
                        {axis: "Server-Side Javascript", value: result[0].expr5/100},
                        {axis: "Testing", value: result[0].expr6/100},
                    ]
                }
                if (result[0].expr0 == undefined) {
                    this.averageData = [];
                }
                this.template.querySelector("svg").remove();
                //Setting radarChartOptions for our newly rendered graph!
                let margin = {top: 100, bottom: 100, left: 100, right: 100},
                width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
                height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                let radarChartOptions = {
                    margin: margin,
                    w: width,
                    h: height,
                    maxValue: 1.0,
                    levels: 5,
                    roundStrokes: true,
                    color: d3.scaleOrdinal().range(["#39E0E6","#D92581","#1D6967"])
                };
                this.data = [this.cohortData, this.averageData];
                this.radarChart(".radarChart", this.data, radarChartOptions);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        })
        
    }
    
    //This is the function that creates the radar chart itself.
    radarChart(id, data, options) {

        //default configuration
        let cfg = {
            w: 600,
            h: 600,
            margin: {top: 20, right: 20, bottom: 20, left: 20},
            levels: 3,
            maxValue: 1.0,
            labelFactor: 1.25,
            wrapWidth: 60,
            opacityArea: 0.35,
            dotRadius: 4,
            opacityCircles: 0.1,
            strokeWidth: 2,
            roundStrokes: false,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        //use options to adjust configuration
        if("undefined" !== typeof options) {
            for (let i in options) {
                if ("undefined" !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }

        //If the maxValue can't hold the data we give it, then we'll replace it with the highest value in our data
        let maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));

        //Dividing the circle into axes based on the number of parameters in the data
        let allAxis = data[0].map(function(i,j){return i.axis}),
            total = allAxis.length,
            radius = Math.min(cfg.w/2, cfg.h/2),
            Format = d3.format('%'),
            angleSlice = Math.PI * 2 /  total;

        //Setting the radius
        let rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, maxValue])
        
        //-----------------------------------
        // *** CREATING THE CONTAINER SVG ***
        //-----------------------------------

        //Create the SVG
        let svg = d3
            .select(this.template.querySelector(id))
            .append("svg")
            .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
            .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
            .attr("class", "radar"+id);

        //Append the G element
        let g = svg.append("g")
            .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

        //Create the wrapper for the grid and axes
        let axisGrid = g.append("g")
            .attr("class", "axisWrapper");

        // ----------------------
        // *** MAKE IT GLOW! ***
        // ----------------------

        let filter = g.append("filter")
            .attr("id", "glow"),

        feGaussianBlur = filter.append("feGaussianBlur")
            .attr("stdDeviation", "2.5")
            .attr("result", "coloredBlur"),

        feMerge = filter.append("feMerge"),

        feMergeNode_1 = feMerge.append("feMergeNode")
            .attr("in", "coloredBlur")
            .attr("in", "SourceGraphic");

        // -----------------------------------
        // *** CREATING THE CIRCULAR CHART ***
        //------------------------------------
        
        //Create the background circles
        axisGrid.selectAll(".levels")
            .data(d3.range(1,(cfg.levels+1)).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", function(d,i){return radius/cfg.levels*d;})
            .style("fill", "#CDCDCD")
            .style("stroke", "#CDCDCD")
            .style("fill-opacity", cfg.opacityCircles)
            .style("filter", "url(#glow)");

        //Text indicating the percentage of each level
        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1,(cfg.levels+1)).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("x", 4)
            .attr("y", function(d){return -d*radius/cfg.levels;})
            .attr("dy", "0.4em")
            .style("font-size", "10px")
            .attr("fill", "#737373")
            .text(function(d,i){return 100*maxValue*d/cfg.levels.toFixed(2)+"%";});

        // -------------------------
        // *** CREATING THE AXES ***
        //--------------------------

        // A bunch of straight lines
        let axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        //Appending the lines
        axis.append("line")
            .attr("x1",0)
            .attr("y1",0)
            .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		    .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		    .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        //Appending the data labels on each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		    .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		    .text(function(d){return d})
            .call(wrap, cfg.wrapWidth);

        // ---------------------------
        // *** DRAWING THE BLOBS! ***
        // ---------------------------

        // Determining the positions and angles to place the keypoints at
        let radarLine = d3.lineRadial()
            .radius(function(d){return rScale(d.value);})
            .angle((d, i) => {return i*angleSlice;});

        // Curving the lines to make it a little better-looking. If you want to, of course.
        if(cfg.roundStrokes == true) {
            let tension = 0.5;
            radarLine.curve(d3.curveCardinalClosed.tension(tension));
        }

        // Create a wrapper for the blobs. Funny word... "blob."
        let blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper")

        // Append the backgrounds
        blobWrapper.append("path")
            .attr("class", "radarArea")
            .attr("d", function(d,i){return radarLine(d);})
            .style("fill", function(d,i){return cfg.color(i);})
            .style("fill-opacity", cfg.opacityArea)
            //Makes the blob you hover over a little more visible
            .on("mouseover", function(d,i) {
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1);
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);
            })
            // When you remove the mouse from the blob, it should return to its original opacity
            .on("mouseout", function() {
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });

        // Create the outlines
        blobWrapper.append("path") 
            .attr("class", "radarStroke")
            .attr("d", function(d,i){return radarLine(d);})
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", function(d,i){return cfg.color(i);})
            .style("fill", "none")
            .style("filter", "url(#glow)");

        // Append those data dots!
        blobWrapper.selectAll(".radarCircle")
            .data(function(d,i) {return d;})
            .enter().append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		    .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		    .style("fill", function(d,i,j) {return cfg.color(j-1);})
            .style("fill-opacity", 0.8)

        // ---------------------------
        // *** CREATE THE TOOLTIP ***
        // --------------------------- 
        
        // Create a wrapper for invisible circles used for tooltip
        let blobCircleWrapper = g.selectAll(".radarCircleWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarCircleWrapper");
        
        //Append a set of invisible circles for the pop-up 
        blobCircleWrapper.selectAll(".radarInvisibleCircle")
            .data((d,i)=>{return d;})
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", cfg.dotRadius*1.5)
            .attr("cx", (d,i)=>{return rScale(d.value)*Math.cos(angleSlice*i-Math.PI/2);})
            .attr("cy", (d,i)=>{return rScale(d.value)*Math.sin(angleSlice*i-Math.PI/2);})
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", (d,i)=> {
                let newX = parseFloat(d3.select(this).attr("cx")-10);
                let newY = parseFloat(d3.select(this).attr("cy")-10);
                tooltip.attr("x", newX)
                    .attr("y", newY)
                    .text((i.value*100).toFixed(2)+"%")
                    .style("font-size", 20)
                    .style("text-align", "center")
                    .transition().duration(200)
                    .style("opacity",1);
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });

            let tooltip = g.append("text")
                .attr("class", "tooltip")
                .style("opacity", 0)

            //This function wraps up text, splitting it into different lines and preventing it from going out of bounds.
            function wrap(text, width) {
	            text.each(function() {
		            var text = d3.select(this),
			        words = text.text().split(/\s+/).reverse(),
			        word,
			        line = [],
			        lineNumber = 0,
			        lineHeight = 1.4, // ems
			        y = text.attr("y"),
			        x = text.attr("x"),
			        dy = parseFloat(text.attr("dy")),
			        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		            while (word = words.pop()) {
		                line.push(word);
		                tspan.text(line.join(" "));
		                if (tspan.node().getComputedTextLength() > width) {
			                line.pop();
			                tspan.text(line.join(" "));
			                line = [word];
			                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		                }   
		            }
	            });
	        }//wrap	closing bracket
        } //radarChart closing bracket
} //CarloTest class closing bracket