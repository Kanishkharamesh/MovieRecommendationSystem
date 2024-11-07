import React, { useState, useEffect } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [language, setLanguage] = useState('English');
    const [region, setRegion] = useState('US');

    // Fetch user data from local storage or API
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) setEmail(savedEmail);

        // Mock fetching 2FA and region settings
        const saved2FA = localStorage.getItem('is2FAEnabled') === 'true';
        setIs2FAEnabled(saved2FA);
        setLanguage(localStorage.getItem('language') || 'English');
        setRegion(localStorage.getItem('region') || 'US');
    }, []);

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }
        alert('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEmailUpdate = () => {
        localStorage.setItem('email', email);
        alert('Email updated successfully!');
    };

    const handle2FAToggle = () => {
        setIs2FAEnabled(!is2FAEnabled);
        localStorage.setItem('is2FAEnabled', !is2FAEnabled);
        alert(`Two-Factor Authentication ${!is2FAEnabled ? 'enabled' : 'disabled'}.`);
    };

    const handleAccountDeletion = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deleted successfully.'); // Here you would implement deletion logic.
        }
    };

    const handleLanguageRegionChange = () => {
        localStorage.setItem('language', language);
        localStorage.setItem('region', region);
        alert('Language and region settings updated.');
    };

    return (
        <div className="account-details-container">
            <h2 className="account-details-title">Account Settings</h2>

            {/* Change Password */}
            <div className="account-details-section">
                <h3 className="account-details-subtitle">Change Password</h3>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="account-details-input"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="account-details-input"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="account-details-input"
                />
                <button onClick={handlePasswordChange} className="account-details-button">Change Password</button>
            </div>

            {/* Update Email */}
            <div className="account-details-section">
                <h3 className="account-details-subtitle">Update Email</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="account-details-input"
                />
                <button onClick={handleEmailUpdate} className="account-details-button">Update Email</button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="account-details-section">
                <h3 className="account-details-subtitle">Two-Factor Authentication</h3>
                <label className="account-details-label">
                    <input
                        type="checkbox"
                        checked={is2FAEnabled}
                        onChange={handle2FAToggle}
                    />
                    Enable Two-Factor Authentication
                </label>
            </div>

            {/* Account Deletion */}
            <div className="account-details-section">
                <h3 className="account-details-subtitle">Account Deletion</h3>
                <button onClick={handleAccountDeletion} className="account-details-button delete-button">Delete Account</button>
            </div>

            {/* Language and Region Settings */}
            <div className="account-details-section">
                <h3 className="account-details-subtitle">Language and Region Settings</h3>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="account-details-select">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                </select>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="account-details-select">
                    <option value="US">United States</option>
                    <option value="EU">Europe</option>
                    <option value="ASIA">Asia</option>
                </select>
                <button onClick={handleLanguageRegionChange} className="account-details-button">Update Settings</button>
            </div>
        </div>
    );
};

export default AccountSettings;
