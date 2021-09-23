'use strict'

const axios = require('axios');
module.exports = getWeatherdata;


function getWeatherdata(request, response) {

    const searchQuery = request.query.cityName

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`

    axios
        .get(url)
        .then(weatherData => {

            response.status(200).send(weatherData.data.data.map(day => {
                return new Forecast(day)
            }))

        })
        .catch(error => {
            response.status(500).send(error)
        })


};

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}