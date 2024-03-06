const express = require('express')
const mongoose = require('mongoose')
const Weather = require("./models/weatherbase")
const  bodyParser= require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/weathers')
console.log("Database Connected");
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    res.render('index', { weatherData: {} })
})

app.post('/weatherpost', async (req, res) => {
    const city = req.body.temparature;
    const newWeather = await Weather.create({
        city: city
    });
    const APIkey = 'b11a49a372096cd4959351832e7dcd25';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        console.log(response)
        // res.render('index', { weatherData });
        res.render('index2', { weatherData });
    } catch (err) {
        res.render('index', { error: 'Failed to retrieve weather data', weatherData: null });
    }


});



app.listen(8080, () => {
    console.log("Connected to port 8080");
})

