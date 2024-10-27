// src/SearchResultsPage/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const API_KEY = "22741e403faf9947cd315c65fbb0e763";
const genreMap = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Thriller: 53,
    Crime: 80,
    Romance: 10749,
};

// Expanded languageMap with various languages
const languageMap = {
    English: 'en',
    Hindi: 'hi',
    Bengali: 'bn',
    Telugu: 'te',
    Marathi: 'mr',
    Tamil: 'ta',
    Urdu: 'ur',
    Gujarati: 'gu',
    Malayalam: 'ml',
    Kannada: 'kn',
    Punjabi: 'pa',
    Assamese: 'as',
    Nepali: 'ne',
    Thai: 'th',
    Chinese: 'zh',
    Japanese: 'ja',
    Korean: 'ko',
    Vietnamese: 'vi',
    French: 'fr',
    German: 'de',
    Spanish: 'es',
    Russian: 'ru',
    Italian: 'it',
};

const yearMap = Array.from({ length: 51 }, (_, i) => 1970 + i); // Years from 1970 to 2020

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQueryParam = queryParams.get('query') || "";
    
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState(null);
    const [language, setLanguage] = useState(null);
    const [year, setYear] = useState(null); // Year state
    const [searchQuery, setSearchQuery] = useState(searchQueryParam);

    // Fetch movies from API
    const fetchMovies = async () => {
        const genreQuery = genre ? `&with_genres=${genre}` : "";
        const languageQuery = language ? `&language=${language}` : "";
        const yearQuery = year ? `&primary_release_year=${year}` : ""; // Year filter query
        
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}${genreQuery}${languageQuery}${yearQuery}`
        );
        const data = await response.json();
        setMovies(data.results || []);
    };

    useEffect(() => {
        if (searchQuery) fetchMovies();
    }, [searchQuery, genre, language, year]); // Added year to dependency array

    const handleGenreClick = (selectedGenre) => {
        // Toggle genre selection
        if (genre === genreMap[selectedGenre]) {
            setGenre(null); // Deselect if already selected
        } else {
            setGenre(genreMap[selectedGenre]);
        }
        // Do NOT reset the search query here
        // This allows the search query to remain the same
        fetchMovies(); // Re-fetch movies with the updated genre
    };

    const handleSearch = () => {
        fetchMovies(); // Fetch movies based on the current search query and filters
    };

    return (
        <div className="search-results-container">
            <h1 className="search-results-title">
                Search Results for <span className="search-results-keyword">"{searchQuery}"</span>
            </h1>
            
            {/* Filter Buttons and Search Bar */}
            <div className="search-results-filter-bar">
                {Object.keys(genreMap).map((genreName) => (
                    <button
                        key={genreName}
                        onClick={() => handleGenreClick(genreName)}
                        className={`search-results-filter-button ${genre === genreMap[genreName] ? 'active' : ''}`}
                    >
                        {genreName}
                    </button>
                ))}

                <div className="search-results-language-dropdown">
                    <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                        <option value="">Select Language</option>
                        {Object.keys(languageMap).map((langName) => (
                            <option key={langName} value={languageMap[langName]}>
                                {langName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="search-results-year-dropdown">
                    <select onChange={(e) => setYear(e.target.value)} value={year}>
                        <option value="">Select Year</option>
                        {yearMap.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="search-results-search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            
            {/* Movie Results */}
            <div className="search-results-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="search-results-movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="search-results-movie-image"
                            />
                            <h3 className="search-results-movie-title">{movie.title}</h3>
                            <p className="search-results-movie-rating">Rating: {movie.vote_average}</p>
                        </div>
                    ))
                ) : (
                    <p className="search-results-no-results">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;