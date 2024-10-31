import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieResults.css'; // Make sure to include this CSS file for styling

const API_KEY = "5c49b6e2a36066a5b1491648804ef4c1";

const MovieResults = () => {
    const { id } = useParams(); // Get the movie ID from the URL parameters
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`);
                if (!response.ok) throw new Error('Failed to fetch movie details.');
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div className="movie-results-classname-container">
            {loading ? (
                <p className="movie-results-classname-loading">Loading movie details, please wait...</p>
            ) : error ? (
                <p className="movie-results-classname-error">{error}</p>
            ) : movie ? (
                <div className="movie-results-classname-content">
                    <h1 className="movie-results-classname-title">{movie.title}</h1>
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url.png'}
                        alt={movie.title}
                        className="movie-results-classname-movie-image"
                    />
                    <p className="movie-results-classname-description">{movie.overview || 'No description available.'}</p>
                    <p className="movie-results-classname-release-year">Release Year: {new Date(movie.release_date).getFullYear()}</p>
                    <p className="movie-results-classname-language">Language: {movie.original_language}</p>
                    <p className="movie-results-classname-rating">Rating: {movie.vote_average}</p>

                    {/* Fetch and display cast */}
                    <div className="movie-results-classname-cast">
                        <h4 className="movie-results-classname-cast-title">Cast:</h4>
                        <div className="movie-results-classname-cast-list">
                            {movie.credits.cast.slice(0, 5).map((actor) => (
                                <div key={actor.id} className="movie-results-classname-cast-member">
                                    <img
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'placeholder-image-url.png'}
                                        alt={actor.name}
                                        className="movie-results-classname-cast-image"
                                    />
                                    <p className="movie-results-classname-actor-name">{actor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Display watch providers */}
                    {movie.watch_providers && movie.watch_providers.results && (
                        <div className="movie-results-classname-watch-providers">
                            <h4 className="movie-results-classname-watch-providers-title">Available on:</h4>
                            <div className="movie-results-classname-watch-list">
                                {movie.watch_providers.results.map(provider => (
                                    <div key={provider.provider_id} className="movie-results-classname-provider">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                            alt={provider.provider_name}
                                            className="movie-results-classname-provider-image"
                                        />
                                        <span>{provider.provider_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Display videos */}
                    {movie.videos && movie.videos.results.length > 0 && (
                        <div className="movie-results-classname-videos">
                            <h4 className="movie-results-classname-videos-title">Videos:</h4>
                            {movie.videos.results.map(video => (
                                <div key={video.id} className="movie-results-classname-video">
                                    <h5>{video.name}</h5>
                                    <iframe
                                        className="movie-results-classname-video-iframe"
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p className="movie-results-classname-no-results">No movie found.</p>
            )}
        </div>
    );
};

export default MovieResults;