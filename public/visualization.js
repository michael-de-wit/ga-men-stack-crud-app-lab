const dataArrayAsString = document.getElementById('dataArray').innerText; // Get the semi-cleaned data in string format, structured as an array of objects, so it can be parsed

const dataObjectArray = JSON.parse(dataArrayAsString) // parse the string-format array of objects into an array data type

// Template from https://d3-graph-gallery.com/graph/scatter_basic.html
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter-plot-visualization")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(dataObjectArray)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.xPos); } )
      .attr("cy", function (d) { return y(d.yPos); } )
      .attr("r", 10)
      .style("fill", "#69b3a2")

// })