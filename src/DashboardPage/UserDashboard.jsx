import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import Watchlist from "../WatchListPage/Watchlist";
import AccountSettings from '../AccountSettingsPage/AccountSettings';

const UserDashboard = () => {
    const [userName, setUserName] = useState(() => localStorage.getItem('username') || "User");
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem('email') || "user@example.com");
    const [userBio, setUserBio] = useState(""); // Bio input field
    const [userDob, setUserDob] = useState(""); // Date of Birth input field
    const [userAddress, setUserAddress] = useState(""); // Address input field
    const [profilePictureUrl, setProfilePictureUrl] = useState(""); // Profile picture URL input field
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

    const handleUpdate = () => {
        // Logic to handle the update can go here
        // For now, we will log the updated values
        console.log("Profile Updated:", {
            userName,
            userEmail,
            userBio,
            userDob,
            userAddress,
            profilePictureUrl
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePictureUrl(reader.result); // Set the uploaded image URL
            };
            reader.readAsDataURL(file); // Convert the file to a data URL
        }
    };

    return (
        <div className="user-dashboard-container">
            <div className="user-dashboard-sidebar">
                <button className="user-dashboard-logout-button" onClick={handleLogout}>Logout</button>
                <h3>Dashboard</h3>
                <ul className="user-dashboard-tabs">
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

            <div className="user-dashboard-content-area">
                {activeTab === 'ProfileOverview' && (
                    <div className="user-dashboard-profile-overview">
                        <h2>Profile Overview</h2>
                        <h3>Welcome {userName}</h3>
                        <p>Name: {userName}</p>
                        <p>Email: {userEmail}</p>

                        <div className="user-dashboard-profile-picture-container">
                            <div className="user-dashboard-profile-picture">
                                <img
                                    src={profilePictureUrl || 'default-profile.jpg'}
                                    alt="Profile"
                                    style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                                />
                            </div>
                            <label
                                htmlFor="file-upload"
                                style={{ marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}  // Reduced font size
                            >
                            Choose a file
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"  // Only allow image files
                                onChange={handleFileChange}
                                style={{ display: 'none' }}  // Hide the default file input
                            />
                        </div>

                        {/* Bio */}
                        <div className="user-dashboard-user-bio">
                            <h4>Bio</h4>
                            <textarea
                                value={userBio}
                                placeholder="Add your bio"
                                onChange={(e) => setUserBio(e.target.value)}
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="user-dashboard-user-dob">
                            <h4>Date of Birth</h4>
                            <input
                                type="date"
                                value={userDob}
                                onChange={(e) => setUserDob(e.target.value)}
                            />
                        </div>

                        {/* User's Address */}
                        <div className="user-dashboard-user-address">
                            <h4>Address</h4>
                            <input
                                type="text"
                                value={userAddress}
                                placeholder="Enter your address"
                                onChange={(e) => setUserAddress(e.target.value)}
                            />
                        </div>

                        {/* Account Creation Date */}
                        <p>Account Created: {new Date().toLocaleDateString()}</p>  {/* Simulating account creation date */}

                        {/* Activity Stats */}
                        <div className="user-dashboard-user-stats">
                            <h4>Activity Stats</h4>
                            <p>Posts: 25</p>
                            <p>Comments: 45</p>
                            <p>Purchases: 10</p>
                        </div>

                        {/* Update Button */}
                        <div className="user-dashboard-update-button">
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                )}
                {activeTab === 'Watchlist' && <Watchlist />} {/* Show Watchlist component */}
                {activeTab === 'AccountSettings' && <AccountSettings/>}
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
