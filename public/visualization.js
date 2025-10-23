// Packages, connections
// const dotenv = require('dotenv'); // in order to use .env
// dotenv.config() // in order to use .env

// const { default: mongoose } = require('mongoose'); // in order to use mongoose to connect with MongoDB
// mongoose.connect(process.env.MONGODB_URI) // connect to MongoDBusing the info in .env
// mongoose.connection.on(`connected`, () => { // connect to MongoDB
//     console.log(`Connected to MongoDB ${mongoose.connection.name}`);
// })

// const path = require('path'); // Set up public folder
// app.use(express.static(path.join(__dirname, 'public'))); // Set up public folder

// // Schema
// const ScatterData = require(`./models/datapoints.js`) // use this MongoDB schema

// async function getScatterData() {
//   try {
//     const allData = await ScatterData.find();
//     return allData;
//   } catch (error) {
//     console.error(error);
//   }
// }

// console.log(allData);

// set the dimensions and margins of the graph

const dataArrayAsString = document.getElementById('dataArray').innerText;

const dataObjectArray = JSON.parse(dataArrayAsString)

console.log(dataObjectArray);


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



//Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function(data) {

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
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

// })