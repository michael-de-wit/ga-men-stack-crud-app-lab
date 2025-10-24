const dataArrayAsString = document.getElementById('dataArray').innerText;
const dataObjectArray = JSON.parse(dataArrayAsString);

// Set up dimensions
const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select("#scatter-plot-visualization")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create scales
const x = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

// Add X axis
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

// Add Y axis
svg.append("g")
  .call(d3.axisLeft(y));

// Add dots using modern join pattern
svg.append("g")
  .selectAll("circle")
  .data(dataObjectArray)
  .join("circle")
    .attr("cx", d => x(d.xPos))
    .attr("cy", d => y(d.yPos))
    .attr("r", 10)
    .attr("fill", "#69b3a2");