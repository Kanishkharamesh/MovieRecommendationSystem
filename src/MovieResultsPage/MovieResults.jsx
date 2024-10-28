import React, { useState, useEffect } from 'react';
import './MovieResults.css';

const API_KEY = "5c49b6e2a36066a5b1491648804ef4c1";

const MovieResults = ({ movieId }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [cast, setCast] = useState([]);
    const [watchProviders, setWatchProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }

                const data = await response.json();
                setMovieDetails(data);

                const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
                const castData = await castResponse.json();
                setCast(castData.cast.slice(0, 10));

                const watchProvidersResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
                const watchData = await watchProvidersResponse.json();
                setWatchProviders(watchData.results?.US?.flatrate || []);

            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return <p className="movie-results-loading">Loading movie details...</p>;
    }

    if (!movieDetails) {
        return <p className="movie-results-error">Movie details not found.</p>;
    }

    return (
        <div className="movie-results-container">
            <img
                src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : 'path-to-your-placeholder-image.png'}
                alt={movieDetails.title}
                className="movie-results-movie-image"
            />

            <div className="movie-results-content">
                <h1 className="movie-results-title">{movieDetails.title}</h1>
                <p className="movie-results-description">{movieDetails.overview || "No description available."}</p>
                <p className="movie-results-release-year">Release Year: {new Date(movieDetails.release_date).getFullYear()}</p>

                <div className="movie-results-genre">
                    <strong>Genre: </strong>
                    {movieDetails.genres.map((genre) => genre.name).join(', ')}
                </div>

                <div className="movie-results-language">
                    <strong>Language: </strong>
                    {movieDetails.original_language.toUpperCase()}
                </div>

                <div className="movie-results-rating">
                    <strong>Rating: </strong>
                    {movieDetails.vote_average}
                </div>

                <div className="movie-results-cast">
                    <h3>Cast</h3>
                    <div className="movie-results-cast-list">
                        {cast.map((member) => (
                            <div key={member.id} className="movie-results-cast-member">
                                <img
                                    src={member.profile_path ? `https://image.tmdb.org/t/p/w185${member.profile_path}` : 'path-to-your-placeholder-profile-image.png'}
                                    alt={member.name}
                                    className="movie-results-cast-image"
                                />
                                <p className="movie-results-cast-name">{member.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="movie-results-watch-providers">
                    <h3>Available on</h3>
                    <div className="movie-results-watch-list">
                        {watchProviders.length > 0 ? (
                            watchProviders.map((provider) => (
                                <div key={provider.provider_id} className="movie-results-provider">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        className="movie-results-provider-image"
                                    />
                                    <p className="movie-results-provider-name">{provider.provider_name}</p>
                                </div>
                            ))
                        ) : (
                            <p>Not available on streaming platforms.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieResults;