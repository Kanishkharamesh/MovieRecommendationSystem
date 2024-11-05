import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('ProfileOverview');
    const [userName, setUserName] = useState(() => localStorage.getItem('username') || "User");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/user'); // Fetching user data from the user page
                if (response.status === 200) {
                    setUser(response.data);
                    setUserName(response.data.userName);
                    localStorage.setItem('username', response.data.userName);
                    console.log("Fetched user data:", response.data);
                }
            } catch (error) {
                console.error('Error fetching user details:', error.response?.data || error.message);
                navigate('/login'); // Redirecting to login if there is an error
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
    
        fetchUserDetails(); // Call the function to fetch user details
    }, [navigate]); // Re-run this effect only if navigate changes

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserName = localStorage.getItem('username');
            if (storedUserName && storedUserName !== userName) {
                setUserName(storedUserName);
            }
        };

        // Listen for changes in local storage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [userName]); // Dependency array only includes userName

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