import React from 'react';
import './ProfileOverview.css';

const ProfileOverview = ({
  userName,
  userEmail,
  profilePictureUrl,
  handleFileChange,
  userBio,
  setUserBio,
  userDob,
  setUserDob,
  userAddress,
  setUserAddress,
  handleUpdate
}) => {
  return (
    <div className="profile-overview-container">
      <h2>Profile Overview</h2>
      <h3>Welcome {userName}</h3>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>

      <div className="profile-overview-picture-container">
        <div className="profile-overview-picture">
          <img
            src={profilePictureUrl || 'default-profile.jpg'}
            alt="Profile"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
        </div>
        <label
          htmlFor="file-upload"
          style={{ marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}
        >
          Choose a file
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Bio */}
      <div className="profile-overview-bio">
        <h4>Bio</h4>
        <textarea
          value={userBio}
          placeholder="Add your bio"
          onChange={(e) => setUserBio(e.target.value)}
        />
      </div>

      {/* Date of Birth */}
      <div className="profile-overview-dob">
        <h4>Date of Birth</h4>
        <input
          type="date"
          value={userDob}
          onChange={(e) => setUserDob(e.target.value)}
        />
      </div>

      {/* User's Address */}
      <div className="profile-overview-address">
        <h4>Address</h4>
        <input
          type="text"
          value={userAddress}
          placeholder="Enter your address"
          onChange={(e) => setUserAddress(e.target.value)}
        />
      </div>

      {/* Account Creation Date */}
      <p>Account Created: {new Date().toLocaleDateString()}</p>

      {/* Activity Stats */}
      <div className="profile-overview-stats">
        <h4>Activity Stats</h4>
        <p>Posts: 25</p>
        <p>Comments: 45</p>
        <p>Purchases: 10</p>
      </div>

      {/* Update Button */}
      <div className="profile-overview-update-button">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ProfileOverview;