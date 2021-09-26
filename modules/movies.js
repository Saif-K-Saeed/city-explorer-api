'use strict';
const axios = require('axios')
let cacheMemory = {};

function getMovieHandler(req, res) {
    let movieQuery = req.query.city;
    // https://api.themoviedb.org/3/search/movie?api_key=2fc7598c13abfeccf26f4b472a70dd95&query=Amman
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;

    if (cacheMemory[movieQuery] !== undefined) {
        res.send(cacheMemory[movieQuery]);
    }
    else {
        try {
            axios.get(url).then(movieResults => {

                let newWeatherArray = movieResults.data.data.map(element => {
                    return new Movie(element)
                });
                cacheMemory[movieQuery] = newWeatherArray;
                res.send(newWeatherArray)
            });
        }
        catch (error) {
            res.send(error);
        }
    }

}


class Movie {
    constructor(element) {
        this.title = element.title;
        this.overview = element.overview;
        this.average_votes = element.vote_average;
        this.total_votes = element.vote_count;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        this.popularity = element.popularity;
        this.released_on = element.release_date;

    }
}
module.exports = getMovieHandler;