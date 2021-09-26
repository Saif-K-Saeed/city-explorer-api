'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios')
const server = express();
// const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());

// Routes
server.get('/', homeRouteHandler);
server.get('/getWeatherInfo', getWeatherHandler);
// server.get("/movies", getmovieHandler);
server.get('*', notFoundHandler);

// Function Handlers
function homeRouteHandler(req, res) {
    res.send('home route')
}

class Forecast {
    constructor(element) {
        this.date = element.valid_date;
        this.description = element.weather.description;
    }

}

class Movies {
    constructor(element){
        this.title = element.title;
        this.overview= element.overview;
        this.average_votes= element.vote_average;
        this.total_votes = element.vote_count;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        this.popularity = element.popularity;
        this.released_on = element.release_date;
        
    }
}

function getWeatherHandler(req, res) {
    let weatherQuery = req.query.city;
    // console.log(req.query);
    // http://localhost:3004/getWeatherInfo?city=Amman
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}`
console.log(weatherQuery);
    axios
        .get(url)
        .then(weatherData => {
            console.log(weatherData);
            let newWeatherArray = weatherData.data.data.map(element => {
                return new Forecast(element)
            })
            res.send(newWeatherArray)
        }).catch(error => {
            res.send(error)
        })
}

function getmovieHandler(req, res) {
    let movieQuery = req.query.city;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;
    console.log(movieQuery);
    axios.get(URL).then(movieResults => {
    
       let  newArray = movieResults.data.results.map(element => {
               return new AllMovie(element)
            })
               res.send(newArray)
           }).catch(error =>{
               res.send(error)
           })
    
    }

function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!!')
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})



