import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import './UserDashboard.css';

const UserDashboard = () => {
    const [userName, setUserName] = useState(() => localStorage.getItem('username') || "User");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState('ProfileOverview'); // Track active tab
    const [user, setUser] = useState(null); // Track user data
    const navigate = useNavigate(); // For navigation

    // Sync userName with localStorage whenever it changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserName = localStorage.getItem('username');
            if (storedUserName && storedUserName !== userName) {
                setUserName(storedUserName);
            }
        };

        // Listen for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [userName]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Example token
                    },
                });
    
                console.log('Response status:', response.status); // Log response status
    
                // Check if the response is JSON
                if (response.ok) {
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        const fetchedUser = await response.json();
                        console.log('Fetched user:', fetchedUser); // Log the fetched data
                        setUser(fetchedUser);
                    } else {
                        throw new Error('Expected JSON, but got non-JSON response.');
                    }
                } else {
                    throw new Error(`Failed to fetch user details. Status: ${response.status}`);
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(`Error fetching user details: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserDetails();
    }, []);       

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        navigate('/login'); // Redirect to login on logout
    };

    return (
        <div className="user-dashboard-container">
            <div className="sidebar">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <h3>Dashboard</h3>
                <br></br>
                <ul className="tabs">
                    <li onClick={() => setActiveTab('ProfileOverview')}>Profile Overview</li>
                    <li onClick={() => setActiveTab('AccountSettings')}>Account Settings</li>
                    <li onClick={() => setActiveTab('Watchlist')}>Watchlist/Bookmarks</li>
                    <li onClick={() => setActiveTab('Preferences')}>Preferences</li>
                    <li onClick={() => setActiveTab('PaymentInfo')}>Payment Information</li>
                    <li onClick={() => setActiveTab('Notifications')}>Notifications</li>
                    <li onClick={() => setActiveTab('Support')}>Support</li>
                    <li onClick={() => setActiveTab('Security')}>Security</li>
                    <li onClick={() => setActiveTab('ActivityLog')}>Activity Log</li>
                </ul>
            </div>

            <div className="content-area">
                {activeTab === 'ProfileOverview' && (
                    <div className="profile-overview">
                        <h2>Profile Overview</h2>
                        {loading ? (
                            <p>Loading user details...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : user ? (
                            <>
                                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                                <h3>{user.userName}</h3>
                                <p>Name: {user.userName}</p>
                                <p>Email: {user.email}</p>
                                <p>Preferences: {user.preferences ? user.preferences.join(', ') : 'None'}</p>
                            </>
                        ) : (
                            <p>Error loading user details.</p>
                        )}
                    </div>
                )}
                {activeTab === 'AccountSettings' && <div>Account Settings Content</div>}
                {activeTab === 'Watchlist' && <div>Watchlist Content</div>}
                {activeTab === 'Preferences' && <div>Preferences Content</div>}
                {activeTab === 'PaymentInfo' && <div>Payment Information Content</div>}
                {activeTab === 'Notifications' && <div>Notifications Content</div>}
                {activeTab === 'Support' && <div>Support Content</div>}
                {activeTab === 'Security' && <div>Security Content</div>}
                {activeTab === 'ActivityLog' && <div>Activity Log Content</div>}
            </div>
        </div>
    );
};

export default UserDashboard;