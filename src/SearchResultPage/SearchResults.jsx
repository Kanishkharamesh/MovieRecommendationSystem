// src/SearchResultsPage/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const movies = [
    {
        id: 1,
        title: "The Lion King",
        rating: "8.0",
        image: "https://th.bing.com/th/id/OIP.vJxcpf437GmnbjY-aONxkwHaKS?rs=1&pid=ImgDetMain",
        watchLink: "#movie1",
    },
    {
        id: 2,
        title: "Spirited Away",
        rating: "7.5",
        image: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        watchLink: "#movie2",
    },
    {
        id: 3,
        title: "The Invisible Man",
        rating: "9.0",
        image: "https://images.moviesrankings.com/image/thumb/Video113/v4/2e/b4/3f/2eb43f1c-0b37-ad5d-8cd1-9f63a1f9a232/pr_source.lsr/900x900bb.jpg",
        watchLink: "#movie3",
    },
    {
        id: 4,
        title: "Parasite",
        rating: "8.5",
        image: "https://image.tmdb.org/t/p/original/xJgHg0pHphLsqTTEdzaJe0M25kT.jpg",
        watchLink: "#movie4",
    },
    {
        id: 5,
        title: "A Man Called Ove",
        rating: "7.8",
        image: "https://th.bing.com/th/id/OIP.ZAa2QqFWyLUtx-Xfv4VAaQHaLH?rs=1&pid=ImgDetMain",
        watchLink: "#movie5",
    },
    {
        id: 6,
        title: "Tomb Raider",
        rating: "8.3",
        image: "https://image.tmdb.org/t/p/original/iWFeyCxwmVMgZyGFWF2riynKrJ5.jpg",
        watchLink: "#movie6",
    },
    {
        id: 7,
        title: "The Secret Garden",
        rating: "8.1",
        image: "https://static.metacritic.com/images/products/movies/1/a94c8d1b6aa07973dfcb38fd5b0aa287.jpg",
        watchLink: "#movie7",
    },
    {
        id: 8,
        title: "Mowgli: Legend of the Jungle",
        rating: "7.9",
        image: "https://th.bing.com/th/id/OIP.vwNpQqAVrFpbPH1C6AxRCQHaK-?rs=1&pid=ImgDetMain",
        watchLink: "#movie8",
    },
    {
        id: 9,
        title: "Life Is Beautiful",
        rating: "8.6",
        image: "https://www.themoviedb.org/t/p/original/aQkjmmWBcj3NI8MUmT0k28vH49p.jpg",
        watchLink: "#movie9",
    },
    {
        id: 10,
        title: "My Neighbor Totoro",
        rating: "9.1",
        image: "https://www.themoviedb.org/t/p/original/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
        watchLink: "#movie10",
    },
];

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query') || "";
    const [filteredMovies, setFilteredMovies] = useState(movies);

    useEffect(() => {
        const results = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(results);
    }, [searchQuery]);

    return (
        <div className="search-results-container">
            <h1>Search Results for "{searchQuery}"</h1>
            <input
                type="text"
                className="search-input"
                placeholder="Refine your search..."
                value={searchQuery}
                readOnly
            />
            <div className="results-list">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img src={movie.image} alt={movie.title} className="movie-image" />
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-rating">Rating: {movie.rating}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
