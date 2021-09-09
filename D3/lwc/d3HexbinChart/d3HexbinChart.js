/*
 * Name: Jacob Schwartz
 * Date: September 9, 2021
 * Project3: Achievement Unlocked
 * Description: Test component for creating a hexbin shape.
 
 * Component WAS NOT USED!!!!
*/

import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';
import D3Scale from '@salesforce/resourceUrl/d3scale';

export default class D3HexbinChart extends LightningElement {

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
        const svg = d3.select(this.template.querySelector('svg'))
                    .classed('container', true);

                    const width = svg.attr('width');
                    const height = svg.attr('height');
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const numPoints = 6;
                    const radius = height / 3;
                    
                    const points = d3.range(numPoints)
                      .map(i => {
                        const angle = i / numPoints * Math.PI * 2 + Math.PI;
                        return {
                          x: Math.sin(angle) * radius + centerX,
                          y: Math.cos(angle) * radius + centerY
                        };
                      });
                    
                    const spokes = points.map(point => ({
                      x1: centerX,
                      y1: centerY,
                      x2: point.x,
                      y2: point.y
                    }));
                    
                    const wheelLines = d3.range(numPoints).map(i => ({
                      x1: points[i].x,
                      y1: points[i].y,
                      x2: points[(i + 1) % numPoints].x,
                      y2: points[(i + 1) % numPoints].y
                    }));
                    
                    const lines = wheelLines;//spokes.concat(wheelLines);
                    console.log(lines);
                    svg.selectAll('line').data(lines)
                      .enter().append('line')
                        .attr('x1', d => d.x1)
                        .attr('y1', d => d.y1)
                        .attr('x2', d => d.x2)
                        .attr('y2', d => d.y2)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 3);
    }
}
