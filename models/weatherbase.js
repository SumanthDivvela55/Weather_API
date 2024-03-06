const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("weather", weatherSchema)