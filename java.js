let data = [{year: 2015, no_of_suicides: 3246, crude_suicide_rate: 4.15}
    ,{year: 2016, no_of_suicides: 3193, crude_suicide_rate: 4.03}
    ,{year: 2017, no_of_suicides: 3168, crude_suicide_rate: 3.94}
    ,{year: 2018, no_of_suicides: 3342, crude_suicide_rate: 4.11}
    ,{year: 2019, no_of_suicides: 3476, crude_suicide_rate: 4.21}
    ,{year: 2020, no_of_suicides: 3710, crude_suicide_rate: 4.45}
    ,{year: 2021, no_of_suicides: 4194, crude_suicide_rate: 4.98}
    ,{year: 2022, no_of_suicides: 4146, crude_suicide_rate: 4.88}];

   

// Configuration for the chart
const svgWidth = 800;
const svgHeight = 600;
const barWidth = 60; // width of each bar
const barSpacing = 20; // space between bars
const maxBarHeight = 500; // maximum height a bar can take up in the SVG
const yAxisPadding = 50; // space to leave at the bottom for year labels



const maxSuicides = Math.max(...data.map(d => d.no_of_suicides));
const scalingFactor = maxBarHeight / maxSuicides;

const maxRate = Math.max(...data.map(d => d.crude_suicide_rate));
const scalingFactor2 = maxBarHeight / maxRate;




// Reference to SVG
const svg = document.getElementById('bar-chart');

const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
yAxis.setAttribute('x1', yAxisPadding -10); // A bit to the left from where my bars start
yAxis.setAttribute('y1', svgHeight - yAxisPadding+40);
yAxis.setAttribute('x2', yAxisPadding-10 );
yAxis.setAttribute('y2', 60);
yAxis.setAttribute('stroke', 'black');
yAxis.setAttribute('stroke-width', '2');
svg.appendChild(yAxis);

const rightYAxisPadding = 50;  
const rightYAxisXPos = svgWidth - rightYAxisPadding + 10;

const rightYAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
rightYAxis.setAttribute('x1', rightYAxisXPos-20);
rightYAxis.setAttribute('y1', svgHeight - yAxisPadding + 40);  
rightYAxis.setAttribute('x2', rightYAxisXPos-20);
rightYAxis.setAttribute('y2', 60);  
rightYAxis.setAttribute('stroke', 'black');
rightYAxis.setAttribute('stroke-width', '2');
svg.appendChild(rightYAxis);





const interval = 1000;
for (let i = 0; i <= maxSuicides; i += interval) {
    const yPosition = svgHeight - (i * scalingFactor) - yAxisPadding;
    
    // Small tick mark
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', yAxisPadding - 15);
    tick.setAttribute('y1', yPosition);
    tick.setAttribute('x2', yAxisPadding +10);
    tick.setAttribute('y2', yPosition);
    tick.setAttribute('stroke', 'black');
    tick.setAttribute('stroke-width', '2');
    svg.appendChild(tick);

    // Number label
    const numberLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    numberLabel.setAttribute('x', yAxisPadding - 50); 
    numberLabel.setAttribute('y', yPosition + 5); 
    numberLabel.textContent = i;
    svg.appendChild(numberLabel);
}

const interval2 = 0.5;


for (let i = 0; i <= maxRate; i += interval2) {
    const yPosition = svgHeight - (i * scalingFactor2) - yAxisPadding;

    // Small tick mark for right axis
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', svgWidth - yAxisPadding + 5);
    tick.setAttribute('y1', yPosition);
    tick.setAttribute('x2', svgWidth - yAxisPadding - 20);
    tick.setAttribute('y2', yPosition);
    tick.setAttribute('stroke', 'black');
    tick.setAttribute('stroke-width', '2');
    svg.appendChild(tick);

    // Number label for right axis
    const numberLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    numberLabel.setAttribute('x', svgWidth - yAxisPadding + 20);
    numberLabel.setAttribute('y', yPosition + 5); 
    numberLabel.textContent = i.toFixed(2);
    svg.appendChild(numberLabel);
}








const yAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
yAxisLabel.setAttribute('x', 0);
yAxisLabel.setAttribute('y', 15);
yAxisLabel.setAttribute('font-weight', 'bold');
yAxisLabel.textContent = "Number of Suicides";
svg.appendChild(yAxisLabel);

const yAxisRightLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
yAxisRightLabel.setAttribute('x', svgWidth - 5); 
yAxisRightLabel.setAttribute('y', 15);
yAxisRightLabel.setAttribute('font-weight', 'bold');
yAxisRightLabel.setAttribute('text-anchor', 'end'); // Right-align the text
yAxisRightLabel.textContent = "Crude Suicide Rate";
svg.appendChild(yAxisRightLabel);

const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
title.setAttribute('x', 250);
title.setAttribute('y', 15);
title.setAttribute('font-weight', 'bold');
title.textContent = "Number of Suicides and Suicide Rate 2015-2022";
svg.appendChild(title);







// For some reason even if I used maxRate for my calculations, 
//when I delete this line everything goes bad, so i didnt delete it.
const maxCrudeRate = Math.max(...data.map(d => d.crude_suicide_rate));
const rateScalingFactor = maxBarHeight / maxCrudeRate;


data.forEach((datum, index) => {
    // Calculate x position, height and scaled height for the bar
    const x = yAxisPadding + index * (barWidth + barSpacing) + barSpacing; 

    const barHeight = datum.no_of_suicides * scalingFactor;
    // Calculate y position for the bar (it starts from the top in SVG, so need to invert)
    const y = svgHeight - barHeight - yAxisPadding;
    // Create the bar element
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', x);
    bar.setAttribute('y', y);
    bar.setAttribute('width', barWidth);
    bar.setAttribute('height', barHeight);
    bar.setAttribute('fill', '#3498db'); // you can set any color you prefer for the bars

    // Append the bar to the SVG
    svg.appendChild(bar);

    // Create label for the year below the bar
    const yearLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yearLabel.setAttribute('x', x + barWidth / 2);
    yearLabel.setAttribute('y', svgHeight - 20); 
    yearLabel.setAttribute('text-anchor', 'middle'); // to center the text
    yearLabel.textContent = datum.year;
    svg.appendChild(yearLabel);

    // Add data value inside the bar
const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
valueLabel.setAttribute('x', x + barWidth / 2);
valueLabel.setAttribute('y', y + 20); 
valueLabel.setAttribute('text-anchor', 'middle'); 
valueLabel.setAttribute('fill', 'white'); // set font color to white for visibility against bar color
valueLabel.textContent = datum.no_of_suicides;
svg.appendChild(valueLabel);
});

let polylinePoints = "";
data.forEach((datum, index) => {
    const x = yAxisPadding+ index * (barWidth + barSpacing) + barSpacing + (barWidth / 2);  // center of the bar
    const rateHeight = datum.crude_suicide_rate * rateScalingFactor;
    const y = svgHeight - rateHeight - yAxisPadding; 

    polylinePoints += `${x},${y} `;
});

const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
polyline.setAttribute('points', polylinePoints.trim()); 
polyline.setAttribute('fill', 'none');  
polyline.setAttribute('stroke', 'red'); 
polyline.setAttribute('stroke-width', '2'); 
svg.appendChild(polyline);

data.forEach((datum, index) => {
    const x = yAxisPadding+ index * (barWidth + barSpacing) + barSpacing + (barWidth / 2);  
    const rateHeight = datum.crude_suicide_rate * rateScalingFactor;
    const y = svgHeight - rateHeight - yAxisPadding; 

    // Create the circle for each data point
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', '5'); // radius of the circle
    circle.setAttribute('fill', 'red');
    svg.appendChild(circle);

    // Add text label above the circle to show the value
    const rateLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    rateLabel.setAttribute('x', x);
    rateLabel.setAttribute('y', y - 10); 
    rateLabel.setAttribute('text-anchor', 'middle'); // to center the text
    rateLabel.setAttribute('font-size', '12px');
    rateLabel.textContent = datum.crude_suicide_rate.toFixed(2); 
    svg.appendChild(rateLabel);
});

// Determine the position for the legend
const legendX = (svgWidth / 2) - 200; // Adjust this for exact positioning
const legendY = svgHeight - 15; // Positioning it 30 units from the bottom

// Create the blue rectangle
const legendRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
legendRect.setAttribute('x', legendX);
legendRect.setAttribute('y', legendY);
legendRect.setAttribute('width', 15); // Size of the rectangle
legendRect.setAttribute('height', 15); // Size of the rectangle
legendRect.setAttribute('fill', '#3498db'); 
svg.appendChild(legendRect);

// Create the label text
const legendText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
legendText.setAttribute('x', legendX + 20); // 20 units away from the rectangle for some spacing
legendText.setAttribute('y', legendY + 12); // Adjust for visual alignment
legendText.textContent = "Number of Suicides";
svg.appendChild(legendText);

// Determine the position for the suicide rate legend
const rateLegendX = (svgWidth / 2) + 60; // This moves it slightly to the right of the blue bars' legend
const rateLegendY = svgHeight - 15; // Positioning it 30 units from the bottom

// Create the red line indicator
const rateLegendLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
rateLegendLine.setAttribute('x1', rateLegendX);
rateLegendLine.setAttribute('y1', rateLegendY + 7.5); // vertically centering the line
rateLegendLine.setAttribute('x2', rateLegendX + 15); // Length of the line indicator
rateLegendLine.setAttribute('y2', rateLegendY + 7.5);
rateLegendLine.setAttribute('stroke', 'red'); 
rateLegendLine.setAttribute('stroke-width', '2');
svg.appendChild(rateLegendLine);

// Create the label text for suicide rate
const rateLegendText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
rateLegendText.setAttribute('x', rateLegendX + 20); // 20 units away from the line for some spacing
rateLegendText.setAttribute('y', rateLegendY + 12); // Adjust for visual alignment
rateLegendText.textContent = "Suicide Rate";
svg.appendChild(rateLegendText);








    









