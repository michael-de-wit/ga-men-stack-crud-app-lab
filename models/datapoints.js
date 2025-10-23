const { default: mongoose } = require('mongoose');

const scatterDataSchema = new mongoose.Schema({
    xPos: Number,
    yPos: Number,
})

const ScatterData = mongoose.model(`ScatterData`, scatterDataSchema)

module.exports = ScatterData