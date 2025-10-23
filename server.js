// Packages, connections
const dotenv = require('dotenv'); // in order to use .env
dotenv.config() // in order to use .env

const express = require(`express`) // in order to use Express
const app = express() // in order to use Express

const { default: mongoose } = require('mongoose'); // in order to use mongoose to connect with MongoDB
mongoose.connect(process.env.MONGODB_URI) // connect to MongoDBusing the info in .env
mongoose.connection.on(`connected`, () => { // connect to MongoDB
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})
const methodOverride = require(`method-override`) // to make DELETE, PUT requests work
// const morgan = require(`morgan`) // for HTML request info in the console

app.use(express.urlencoded({ extended: false })); // expect user input data from forms
app.use(methodOverride(`_method`)) // to make DELETE, PUT requests work
// app.use(morgan(`dev`)) // for HTML request info in the console

// Schema
const ScatterData = require(`./models/datapoints.js`) // use this MongoDB schema

// Connections
app.get (`/`, async (req, res) => { // GET request for the index route
    res.render(`home.ejs`)
})

app.get(`/scatterplot`, async (req,res) => { // GET request for index route all fruit documents / records (i.e. not a post request)
    const allData = await ScatterData.find()
    res.render(`scatterdata/index.ejs`, {
        dataPoints: allData,
    })
})

app.get(`/scatterplot/new`, async (req, res) => {
    res.render(`scatterdata/new.ejs`)
})

app.post(`/scatterplot`, async (req, res) => { // POST request to the fruits new route (i.e. not a get request)
    await ScatterData.create(req.body)
    
    res.redirect(`/scatterplot`) // redirect to the GET fruits index route after the post fruits processing has run
    
})

app.get(`/scatterplot/:dataPointId/edit`, async (req, res) => {
    const foundDataPoint = await ScatterData.findById(req.params.dataPointId)
    res.render(`scatterdata/edit.ejs`, {
        dataPoint: foundDataPoint,
    })
})

app.put(`/scatterplot/:dataPointId`, async (req, res) => { // need a form for a put request
    await ScatterData.findByIdAndUpdate(req.params.dataPointId, req.body)
    res.redirect(`/scatterplot`)
})

app.delete(`/scatterplot/:dataPointId`, async (req, res) => { // DELETE request
    await ScatterData.findByIdAndDelete(req.params.dataPointId)
    res.redirect(`/scatterplot`)

})

app.get(`/scatterplot/:dataPointId`, async (req, res) => { // GET request for show route
    const foundDataPoint = await ScatterData.findById(req.params.dataPointId)
    res.render(`scatterdata/show.ejs` , {
        dataPoint: foundDataPoint
    })
})

// Listening
const portNumber = 3003
app.listen(portNumber, () => {
    console.log(`Listening on port ${portNumber}`);
})