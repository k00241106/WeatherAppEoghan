const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '1130def5ace6f4036326c8555c0567de';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//renders homepage
app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
})
//renders FIND page
app.get('/find', function (req, res) {
    res.render('find', { weather: null, error: null });
})
//renders CURRENTWEATHER page
app.get('/currentweather-result', function (req, res) {
    res.render('currentweather', { weather: null, error: null });
})
//renders CURRENTWIND page
app.get('/currentwind', function (req, res) {
    res.render('currentwind', { weather: null, error: null });
})
//renders CURRENTDETAILEDWEATHER page
app.get('/currentdetailedweather', function (req, res) {
    res.render('currentdetailedweather', { weather: null, error: null });
})
//renders CURRENTCITYDETAILS page
app.get('/currentcity', function (req, res) {
    res.render('currentcity', { weather: null, error: null });
})
//renders CURRENTWIND-RESULT page
app.get('/currentwind-result', function (req, res) {
    res.render('currentwind-result', { weather: null, error: null });
})
//renders CURRENTCITY-RESULT page
app.get('/currentcity-result', function (req, res) {
    res.render('currentcity-result', { weather: null, error: null });
})
//renders ERROR page
app.get('/error', function (req, res) {
    res.render('error', { weather: null, error: null });
})
app.get('/google', function (req, res) {
    res.render('google', { weather: null, error: null });
})
//recieves and processes find post request for FIND page goes to currentweather page
//check if both post action are matching eg. '/find' must match to '/find', cant be '/' and '/find'
app.post('/currentweather-result', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
            } else {
                //by changing the find in res.render it will change where the result will be displayed
                let weatherText = `It's ${Math.round((weather.main.temp - 32) * 5 / 9)} degrees in ${weather.name}! .The feels like temperature is ${Math.round((weather.main.feels_like - 32) * 5 / 9)}!`;
                res.render('currentweather', { weather: weatherText, error: null });
            }
        }
    });
})
app.post('/currentwind-result', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
            } else {
                //by changing the find in res.render it will change where the result will be displayed
                let weatherText = `The speed of the wind is ${weather.wind.speed} m/s and is blowing in the direction ${weather.wind.deg}°. 
                Check out the legend for the direction the wind is blowing in.`;
                res.render('currentwind-result', { weather: weatherText, error: null });
            }
        }
    });
})
app.post('/currentdetailedweather-result', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
            } else {
                //by changing the find in res.render it will change where the result will be displayed
                let weatherText = `Humidity is ${weather.main.humidity}%. The minimum temperature is ${Math.round((weather.main.temp_min - 32) * 5 / 9)}. 
                The maximum temperature is ${Math.round((weather.main.temp_max - 32) * 5 / 9)}. The cloudiness is ${weather.clouds.all}%. The current pressure is ${weather.main.pressure}hpa.`;
                res.render('currentdetailedweather-result', { weather: weatherText, error: null });
            }
        }
    });
})
app.post('/currentcity-result', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('error', { weather: null, error: 'OOps!!!, we couldnt find the city you were looking for. Please try again by clicking the find button.' });
            } else {
                //by changing the find in res.render it will change where the result will be displayed
                let weatherText = `Timezone shift is ${weather.timezone} seconds! . The city id is ${weather.id}. 
                The country code is ${weather.sys.country}. 
                Sunrise time is ${weather.sys.sunrise} in unix time.
                Sunset time is ${weather.sys.sunset} in unix time.`;
                res.render('currentcity-result', { weather: weatherText, error: null });
            }
        }
    });
})
//listener for port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})