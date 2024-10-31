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
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url.png'}
                        alt={movie.title}
                        className="movie-results-classname-movie-image"
                    />
                    <div className="movie-results-classname-title">{movie.title}</div>
                    <div className="movie-results-classname-description">{movie.overview || 'No description available.'}</div>
                    <div className="movie-results-classname-release-year">Release Year: {new Date(movie.release_date).getFullYear()}</div>
                    <div className="movie-results-classname-language">Language: {movie.original_language}</div>
                    <div className="movie-results-classname-rating">Rating: {movie.vote_average}</div>

                    {/* Cast Section */}
                    <div className="movie-results-classname-cast">
                        <div className="movie-results-classname-cast-title">Cast</div>
                        <div className="movie-results-classname-cast-list">
                            {movie.credits.cast.slice(0, 5).map((actor) => (
                                <div key={actor.id} className="movie-results-classname-cast-member">
                                    <img
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'placeholder-image-url.png'}
                                        alt={actor.name}
                                        className="movie-results-classname-cast-image"
                                    />
                                    <div>{actor.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Watch Providers Section */}
                    {movie.watch_providers && movie.watch_providers.results && (
                        <div className="movie-results-classname-watch-providers">
                            <div className="movie-results-classname-watch-providers-title">Available on</div>
                            <div className="movie-results-classname-watch-list">
                                {movie.watch_providers.results.map(provider => (
                                    <div key={provider.provider_id} className="movie-results-classname-provider">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                            alt={provider.provider_name}
                                            className="movie-results-classname-provider-image"
                                        />
                                        <div>{provider.provider_name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Videos Section */}
                    {movie.videos && movie.videos.results.length > 0 && (
                        <div className="movie-results-classname-videos">
                            <div className="movie-results-classname-videos-title">Watch Trailers</div>
                            <div className="movie-results-classname-video-list">
                                {movie.videos.results.map(video => (
                                    <div key={video.id} className="movie-results-classname-video">
                                        <iframe
                                            className="movie-results-classname-video-iframe"
                                            src={`https://www.youtube.com/embed/${video.key}`}
                                            title={video.name}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ))}
                            </div>
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