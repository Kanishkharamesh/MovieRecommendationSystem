import React, { useEffect, useRef } from 'react';
import './Homepage.css';

const movies = [
    {
        id: 1,
        title: "The Lion King",
        rating: "8.0",
        image: "https://th.bing.com/th/id/OIP.vJxcpf437GmnbjY-aONxkwHaKS?rs=1&pid=ImgDetMain",
        watchLink: "#movie1", // Link to the movie page
    },
    {
        id: 2,
        title: "Spitited Away",
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

const Homepage = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });

                if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }
        }, 3000); // Delay in milliseconds (3000 ms = 3 seconds)

        return () => clearInterval(scrollInterval); // Cleanup the interval on component unmount
    }, []);

    return (
        <div className="homepage-container">
            {/* Navigation Bar */}
            <nav className="navbar-container">
                <div className="navbar-logo">MovieFinder</div>
                <div className="navbar-search">
                    <input type="text" className="search-input" placeholder="Search for movies..." />
                    <button type="button" className="search-button">Search</button>
                </div>
                <div className="navbar-links">
                    <button className="navbar-button">Login</button>
                    <button className="navbar-button">Sign Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-container">
                <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
                <p className="hero-subtitle">Explore a world of movies tailored just for you!</p>
            </div>

            {/* Featured Movies Section */}
            <div className="featured-movies-container">
                <h2 className="featured-title">Featured Movies</h2>
                <div className="movies-carousel" ref={carouselRef}>
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
