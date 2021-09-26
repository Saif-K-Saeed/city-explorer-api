'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios')
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const getWeatherHandler = require('./modules/weather.js');

const getMovieHandler = require('./modules/movies.js');

// Routes
server.get('/', homeRouteHandler);
server.get('/getWeatherInfo', getWeatherHandler);
server.get("/movies", getMovieHandler);
server.get('*', notFoundHandler);

// Function Handlers
function homeRouteHandler(req, res) {
    res.send('home route')
}


function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!!')
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})



