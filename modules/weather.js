'use strict';
const axios = require('axios')

let cacheMemory ={};
console.log(cacheMemory);
function getWeatherHandler(req, res) {
    let weatherQuery = req.query.city;
    // http://localhost:3004/getWeatherInfo?city=Amman
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}`

    if (cacheMemory[weatherQuery] !== undefined) {
        res.send(cacheMemory[weatherQuery]);
    }
    else {
        try {
            axios.get(url).then(weatherData => {

                let newWeatherArray = weatherData.data.data.map(element => {
                    return new Forecast(element)
                });
                cacheMemory[weatherQuery] = newWeatherArray;
                res.send(newWeatherArray)
            });
        }
        catch (error) {
            res.send(error);
        }
    }

}


class Forecast {
    constructor(element) {
        this.date = element.valid_date;
        this.description = element.weather.description;
    }

}
module.exports = getWeatherHandler;