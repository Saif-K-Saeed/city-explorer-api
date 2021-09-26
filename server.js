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
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

// class Movies {
//     constructor(
//         title,
//         overview,
//         released_on,
//         average_votes,
//         total_votes,
//         popularity,
//         poster_path
//     ) {
//         this.title = title;
//         this.overview = overview;
//         this.released_on = released_on;
//         this.average_votes = average_votes;
//         this.total_votes = total_votes;
//         this.image_url = "https://image.tmdb.org/t/p/w500/" + poster_path;
//         this.popularity = popularity;
//     }
// }

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

// function getmovieHandler(req, res) {
//     let movieQuery = req.query.cityName;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;
//     console.log(movieQuery);
//     axios
//         .get(url)
//         .then((moviesData) => {
//             res.status(200).send(
//                 moviesData.data.results.map((movie) => {
//                     return new Movies(
//                         movie.title,
//                         movie.overview,
//                         movie.release_date,
//                         movie.vote_average,
//                         movie.vote_count,
//                         movie.popularity,
//                         movie.poster_path
//                     );
//                 })
//             );
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };

function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!!')
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})



