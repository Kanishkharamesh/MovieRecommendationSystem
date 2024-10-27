// src/TopRatedList/TopRatedMovies.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRatedMovies = () => {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        // Replace 'YOUR_API_KEY' with your actual API key
        axios
            .get('https://api.themoviedb.org/3/movie/top_rated?api_key=22741e403faf9947cd315c65fbb0e763')
            .then((response) => setTopMovies(response.data.results))
            .catch((error) => console.error('Error fetching top rated movies:', error));
    }, []);

    return (
        <div className="top-rated-movies">
            <h2>Top Rated Movies</h2>
            <ul>
                {topMovies.slice(0, 10).map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>Rating: {movie.vote_average}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopRatedMovies;
