import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
    const [userName, setUserName] = useState(() => localStorage.getItem('username') || "User");
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem('email') || "user@example.com");
    const [activeTab, setActiveTab] = useState('ProfileOverview');
    const navigate = useNavigate();

    // Sync userName and userEmail with localStorage whenever they change
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserName = localStorage.getItem('username');
            const storedUserEmail = localStorage.getItem('email');

            // Only update if there's a change in localStorage
            if (storedUserName !== userName) {
                setUserName(storedUserName);
            }
            if (storedUserEmail !== userEmail) {
                setUserEmail(storedUserEmail);
            }
        };

        // Listen for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [userName, userEmail]); // Keep these dependencies to track when they change

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/login');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
                        <h3>{userName}</h3>
                        <p>Name: {userName}</p>
                        <p>Email: {userEmail}</p>
                        {/* Add more user details here if needed */}
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