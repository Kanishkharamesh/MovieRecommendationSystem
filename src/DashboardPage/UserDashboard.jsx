import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Assuming you have a CSS file for styling

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        // Fetch user details after login
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('/api/user/details'); // Your API endpoint to get user details
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        // Fetch watchlist for the user
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get('/api/user/watchlist'); // Your API endpoint to get user's watchlist
                setWatchlist(response.data);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            }
        };

        fetchWatchlist();
    }, []);

    const handleAddToWatchlist = async (movieId) => {
        try {
            const response = await axios.post('/api/user/watchlist/add', { movieId });
            setWatchlist((prev) => [...prev, response.data]); // Update state with the new movie added
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    };

    const handleRemoveFromWatchlist = async (movieId) => {
        try {
            await axios.post('/api/user/watchlist/remove', { movieId });
            setWatchlist((prev) => prev.filter(movie => movie.id !== movieId)); // Update state to remove the movie
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    };

    return (
        <div className="user-dashboard-container">
            <div className="user-profile-section">
                <h2>User Profile</h2>
                {user ? (
                    <>
                        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Preferences: {user.preferences.join(', ')}</p>
                        {/* Add more profile fields as needed */}
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>

            <div className="watchlist-section">
                <h2>Your Watchlist</h2>
                {watchlist.length > 0 ? (
                    <ul>
                        {watchlist.map(movie => (
                            <li key={movie.id}>
                                <span>{movie.title}</span>
                                <button onClick={() => handleRemoveFromWatchlist(movie.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your watchlist is empty.</p>
                )}
                {/* Example of adding a movie (you can implement this as needed) */}
                <button onClick={() => handleAddToWatchlist(1)}>Add Movie 1 to Watchlist</button> {/* Replace with actual movie ID */}
            </div>
        </div>
    );
};

export default UserDashboard;
