import React from 'react';
import './Homepage.css';

const movies = [
    {
        id: 1,
        title: "Movie Title 1",
        rating: "8.0",
        image: "https://via.placeholder.com/200x300?text=Movie+1",
        watchLink: "#movie1", // Link to the movie page
    },
    {
        id: 2,
        title: "Movie Title 2",
        rating: "7.5",
        image: "https://via.placeholder.com/200x300?text=Movie+2",
        watchLink: "#movie2",
    },
    {
        id: 3,
        title: "Movie Title 3",
        rating: "9.0",
        image: "https://via.placeholder.com/200x300?text=Movie+3",
        watchLink: "#movie3",
    },
    {
        id: 4,
        title: "Movie Title 4",
        rating: "8.5",
        image: "https://via.placeholder.com/200x300?text=Movie+4",
        watchLink: "#movie4",
    },
    {
        id: 5,
        title: "Movie Title 5",
        rating: "7.8",
        image: "https://via.placeholder.com/200x300?text=Movie+5",
        watchLink: "#movie5",
    },
    {
        id: 6,
        title: "Movie Title 6",
        rating: "8.3",
        image: "https://via.placeholder.com/200x300?text=Movie+6",
        watchLink: "#movie6",
    },
];

const Homepage = () => {
    return (
        <div className="homepage-container">
            {/* Navigation Bar */}
            <nav className="navbar-container">
                <div className="navbar-logo">MovieFinder</div>
                <div className="navbar-links">
                    <a href="#login" className="navbar-link">Login</a>
                    <a href="#signup" className="navbar-link">Sign Up</a>
                    <a href="#profile" className="navbar-link">Profile</a>
                </div>
                <div className="navbar-search">
                    <input type="text" className="search-input" placeholder="Search for movies..." />
                    <button type="button" className="search-button">Search</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-container">
                <h1 className="hero-title">Discover Your Next Favorite Movie Now</h1>
                <p className="hero-subtitle">Explore a world of movies tailored just for you!</p>
            </div>

            {/* Featured Movies Section */}
            <div className="featured-movies-container">
                <h2 className="featured-title">Featured Movies</h2>
                <div className="movies-carousel">
                    {movies.map((movie) => (
                        <a href={movie.watchLink} className="movie-card" key={movie.id}>
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="movie-image"
                            />
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-rating">Rating: {movie.rating}</p>
                            <p className="movie-watch-link">Where to Watch: {movie.watchLink}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-container">
                <p className="footer-text">&copy; 2024 MovieFinder. All rights reserved.</p>
                <div className="footer-links-container">
                    <a href="#contact" className="footer-link">Contact</a>
                    <a href="#terms" className="footer-link">Terms of Use</a>
                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
