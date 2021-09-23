'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());
server.get('/test', (req, res) => {
    res.send('api is working')
})

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

// http://localhost:3005/getWeatherInfo?nameCity=Amman
server.get('/getWeatherInfo', (req, res) => {
    try {
        let wCity = req.query.nameCity;

        let infoCity = weatherData.find((item) => {
            if (item.city_name === wCity) {
                return item
            }

        });
        let wArray = infoCity.data.map(element => {
            return new Forecast(element.datetime, element.weather.description);

        });
        res.status(200).send(wArray);
    } catch (err) {
        res.status(404).send("error : Something went wrong.");
    }
});

// localhost:3005/ANYTHINGgg
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})