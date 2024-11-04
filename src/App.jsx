// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './HomePage/Homepage';
import Login from './LoginPage/Login';
import SignUp from './SignUpPage/SignUp';
import SearchResults from './SearchResultPage/SearchResults';
import MovieResults from './MovieResultsPage/MovieResults';
import UserPage from './UserPage/Userpage';
import UserDashboard from './DashboardPage/Userdashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieResults />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
