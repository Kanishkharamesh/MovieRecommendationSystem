import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieResults.css';

const API_KEY = "5c49b6e2a36066a5b1491648804ef4c1";

const MovieResults = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers,reviews`);
                if (!response.ok) throw new Error('Failed to fetch movie details.');
                const data = await response.json();
                setMovie(data);
                setReviews(data.reviews.results || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleCastClick = (personId) => {
        navigate(`/person/${personId}`);
    };

    return (
        <div className="movie-results-classname-container">
            {loading ? (
                <p className="movie-results-classname-loading">Loading movie details, please wait...</p>
            ) : error ? (
                <p className="movie-results-classname-error">{error}</p>
            ) : movie ? (
                <div className="movie-results-classname-content">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url.png'}
                                        alt={movie.title}
                                        className="movie-results-classname-movie-image"
                                    />
                                </td>
                                <td style={{ paddingLeft: '20px' }}>
                                    <div className="movie-results-classname-title">{movie.title}</div>
                                    <div className="movie-results-classname-description">{movie.overview || 'No description available.'}</div>
                                    <div className="movie-results-classname-release-year">Release Year: {new Date(movie.release_date).getFullYear()}</div>
                                    <div className="movie-results-classname-language">Language: {movie.original_language}</div>
                                    <div className="movie-results-classname-rating">Rating: {movie.vote_average}</div>
                                    <div className="movie-results-classname-runtime">Runtime: {movie.runtime} minutes</div>
                                    <div className="movie-results-classname-genres">
                                        Genres: {movie.genres.map(genre => genre.name).join(', ')}
                                    </div>
                                    <div className="movie-results-classname-production">
                                        Production Companies: {movie.production_companies.map(company => company.name).join(', ')}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Cast Section */}
                    <div className="movie-results-classname-cast">
                        <div className="movie-results-classname-cast-title">Cast</div>
                        <div className="movie-results-classname-cast-list">
                            {movie.credits.cast.slice(0, 5).map((actor) => (
                                <div
                                    key={actor.id}
                                    className="movie-results-classname-cast-member"
                                    onClick={() => handleCastClick(actor.id)}
                                    style={{ cursor: 'pointer' }}
                                >
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
                    {movie["watch/providers"] && movie["watch/providers"].results ? (
                        <div className="movie-results-classname-watch-providers">
                            <div className="movie-results-classname-watch-providers-title">Available on</div>
                            <div className="movie-results-classname-watch-list">
                                {Object.values(movie["watch/providers"].results).flatMap(provider =>
                                    provider.flatrate ? provider.flatrate : []
                                ).reduce((unique, service) => {
                                    if (!unique.some(item => item.provider_id === service.provider_id)) {
                                        unique.push(service);
                                    }
                                    return unique;
                                }, []).map(service => (
                                    <div key={service.provider_id} className="movie-results-classname-provider">
                                        <a
                                            href={`https://www.themoviedb.org/network/${service.provider_id}`} // Corrected URL
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="movie-results-classname-provider-link"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                src={service.logo_path ? `https://image.tmdb.org/t/p/w500${service.logo_path}` : 'placeholder-image-url.png'}
                                                alt={service.provider_name}
                                                className="movie-results-classname-provider-image"
                                            />
                                            <div style={{ color: 'white', textDecoration: 'none' }}>{service.provider_name}</div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="movie-results-classname-no-providers">No watch providers available for this movie.</p>
                    )}

                    <br></br>
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

                    <br></br>
                    <br></br>
                    {/* Reviews Section */}
                    <div className="movie-results-classname-reviews">
                        <div className="movie-results-classname-reviews-title"><strong style={{ color: 'red', fontSize: '24px' }}>Reviews </strong></div>
                        <br></br>
                        {reviews.length > 0 ? (
                            reviews.slice(0, 3).map(review => (
                                <div key={review.id} className="movie-results-classname-review">
                                    <div className="movie-results-classname-review-author"><strong style={{ color: 'red', fontSize: '18px'}}>Author:</strong> {review.author}</div>
                                    <p className="justified-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{review.content}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available for this movie.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="movie-results-classname-no-results">No movie found.</p>
            )}
        </div>
    );
};

export default MovieResults;