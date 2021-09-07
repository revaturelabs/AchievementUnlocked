// Author: Zackary Frazier
// Last Modify Date: 9/7/2021
// Description: component to render a generic pie chart

import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

/* static resources */
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class PieChart extends LightningElement {
	// @type: <string>
	@api id = 'pie-chart';
	// @type: <number>
	@api width = 150;
	// @type: <number>
	@api height = 150;

	// @type : <number>
	// @desc : to turn this into a donut chart, provide an inner radius
	@api innerRadius = 0;

	// @type: <string> private variable, stringified array of JSON objects
	_chartData = JSON.stringify([
		{states: "UP", percent: "80.00"},
		{states: "Maharastra", percent: "70.00"},
		{states: "Bihar", percent: "65.0"},
		{states: "MP", percent: "60.00"},
		{states: "Gujarat", percent: "50.0"},
		{states: "WB", percent: "49.0"},
		{states: "TN", percent: "35.0"}
	]);

	// @desc   : getter for _chartData
	// @return : <string>
	@api get chartData() {
		return this._chartData;
	}

	// @desc  : setter for _chartData, sets the value then reloads the chart
	// @value : <string> JSON stringified string 
	set chartData(value) {
		this._chartData = value;
		if(this.d3Initialized) {
			this.initializeD3();
		}
	}

	// @type: <string> the value attribute of the data for the chart
	@api value = 'percent';

	// @type: <string> the label attribute of the data for the chart
	@api label = 'states';

	// @type: (optional) <string> the title of the chart
	@api title;


	// @type: <string> the array of colors for the chart to display
	@api colors = JSON.stringify(['green', 'red', 'gray', 'blue', 'brown', 'orange', 'yellow', 'purple']);


	// @desc : <bool> whether or not there was an error,
	//       : whether or not the error message should display
	hasError = false;

	// @desc : <string> the message associated with an error
	errorMessage = '';

	// @type: <bool> whether d3 successfully initialized or not
    d3Initialized = false;

	// @desc : set an error message on failure
	setError(message) {
		this.hasError = true;
		this.errorMessage = message;
	}

	// @desc : load the d3 scripts then attempt to initialize the chart
    async renderedCallback() {
        if (this.d3Initialized) {
            return;
        }

        try {
			await loadScript(this, D3 + '/d3/d3.min.js');
            await loadScript(this, D3Scale + '/d3scale');
			this.d3Initialized = true;
        } catch(e){
			this.setError('Error: Unable to load D3');
        }
    }


	// @desc         : renders the legend for the pie chart
	// @chartWrapper : <d3.selection>
	// @data         : <array>
	// @colors       : <array>
	renderLegend(chartWrapper, data, colors) {

		// delete any old legend
		chartWrapper.select('#legend')
			.remove();

		// append labels
		const legend = chartWrapper.append('g')
			.attr('id', 'legend');
		const labelWidth = 10;
		const labelHeight = 10;
		const legendTitle = 'Legend';

		// add colored rect for clarity
		legend.attr('transform', `translate(${this.width + 20}, 20)`)
			.selectAll('.label')
				.data(data)
				.enter()
				.append('rect')
					.attr('width', labelWidth)
					.attr('height', labelHeight)
					.attr('fill', (data, index) => colors[index])
					.attr('transform', (data, index) => `translate(0, ${20 + index * 20})`);
		
		// add title
		legend.append('text')
			.text(legendTitle);

		// label the colored rects
		legend.selectAll('.label')
				.data(data)
				.enter()
				.append('text')
					.attr('transform', (item, index) => `translate(${labelHeight + 10}, ${20 + labelHeight + index * 20})`)
					.text((item) => item[this.label]);
	}

	// @desc         : render the title onto the screen
	// @chartWrapper : <d3.selection>
	renderTitle(chartWrapper) {
		chartWrapper.append('g')
		.attr('transform', `translate(${this.width / 2 - 120},20)`)
		.append('text')
			.text(this.title)
			.classed('title', true);
	}

	// @desc         : render the chart onto its wrapper
	// @chartWrapper : <d3.selection>
	// @data         : <array>
	// @colors       : <array>
	renderChart(chartWrapper, data, colors) {
		const radius = Math.min(this.width, this.height) / 2;
			
		// setting up the chart's wrapper
		chartWrapper
			.attr('width', this.width * 2)
			.attr('height', this.height)
			.attr('viewbox', `0 0 ${this.width * 2} ${this.height}`)
		
		const group = chartWrapper.append('g')
			.attr('transform', `translate(${this.width / 2}, ${this.height/2})`);
		
		const color = d3.scaleOrdinal(colors);
		
		// create the pie chart generator
		const pie = d3.pie()
			.value(item => item[this.value]); 
		
		const path = d3.arc()
			.outerRadius(radius - 10)
			.innerRadius(this.innerRadius);
		
		const label = d3.arc()
			.outerRadius(radius)
			.innerRadius(radius - 80);
		
		const arc = group.selectAll(".arc")
			.data(pie(data))
			.enter()
			.append("g")
			.classed("arc", true);
		
		arc.append("path")
			.attr("d", path)
			.attr("fill", (item) => color(item.data[this.label]));
		
		const sum = data.reduce( (acc, item) => acc + item[this.value], 0);
		
		arc.append("text")
			.attr("transform", (item) => `translate(${label.centroid(item)})`)
			.text((item) => item.data[this.value] !== 0 ? `${(100 * (item.data[this.value] / sum)).toFixed(1)}%`: '')
				.attr('font-size', '0.9rem')
				.attr('fill', '#0D3B66');
	}

	// @desc : sets up the chart wrapper to be written to
	setupChartWrapper() {
		// configuration
		const svg = this.template.querySelector('svg');
		svg.innerHTML = '';
		const chartWrapper = d3.select(svg);
		
		// setting up the chart's wrapper
		chartWrapper
			.attr('width', this.width * 2)
			.attr('height', this.height)
			.attr('viewbox', `0 0 ${this.width * 2} ${this.height}`);
		
		return chartWrapper;
	}

	// @desc : renders the d3 chart onto the svg element
    initializeD3() {
		let data, colors;
		try {
			data = JSON.parse(this.chartData);
		} catch(e) {
			this.setError('Error: Inappropriate graph data');
			return;
		}

		try {
			colors = JSON.parse(this.colors);
		} catch(e) {
			this.setError('Error: Inappropriate colors data');
			return;
		}

		const chartWrapper = this.setupChartWrapper();
		this.renderChart(chartWrapper, data, colors);
		
		// apply title if it's been passed to the component
		if(this.title) {
			this.renderTitle(chartWrapper);
		}

		this.renderLegend(chartWrapper, data, colors);
    }

}
