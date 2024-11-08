import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileOverview.css';
import GenreSelector from '../GenreSelectPage/GenreSelector'; // Import the GenreSelector

const ProfileOverview = ({
  userName,
  userEmail,
  profilePictureUrl,
  handleFileChange,
  userBio,
  setUserBio,
  userDob,
  setUserDob,
  selectedGenres,
  setSelectedGenres,
  handleUpdate,
}) => {
  const [genres, setGenres] = useState([]);

  // Fetch genres from API
  useEffect(() => {
    axios.get('https://api.example.com/genres', { headers: { 'Authorization': 'Bearer 5c49b6e2a36066a5b1491648804ef4c1' } })
      .then(response => {
        setGenres(response.data.genres); // assuming response has a `genres` array
      })
      .catch(error => console.error("Error fetching genres:", error));
  }, []);

  return (
    <div className="profile-overview-container">
      <h2 style={{ fontWeight: 'bold', color: 'white' }}>Profile Overview</h2>
      <h3>Welcome {userName}</h3>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>

      {/* Profile Picture */}
      <div className="profile-overview-picture-container">
        <div className="profile-overview-picture">
          <img
            src={profilePictureUrl || 'default-profile.jpg'}
            alt="Profile"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
        </div>
        <label htmlFor="file-upload" style={{ marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}>
          Choose a file
        </label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      {/* Bio */}
      <div className="profile-overview-bio">
        <h4>Bio</h4>
        <textarea value={userBio} placeholder="Add your bio" onChange={(e) => setUserBio(e.target.value)} />
      </div>

      {/* Date of Birth */}
      <div className="profile-overview-dob">
        <h4>Date of Birth</h4>
        <input type="date" value={userDob} onChange={(e) => setUserDob(e.target.value)} />
      </div>

      {/* Genre Selection - Replaced with GenreSelector */}
      <div className="profile-overview-genres">
        <h4>Genres of Interest</h4>
        <GenreSelector
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </div>

      {/* Update Button */}
      <div className="profile-overview-update-button">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ProfileOverview;