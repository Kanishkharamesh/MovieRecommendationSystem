import React, { useState, useEffect } from 'react';
import { Button, Box, Container, Typography, RadioGroup, FormControlLabel, Radio, LinearProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FaFilm, FaSmile, FaSadTear, FaClock, FaCheck, FaRedoAlt } from 'react-icons/fa';
import './GetRecommendation.css';
const theme = createTheme();

const GetRecommendation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState([]);
  const [error, setError] = useState('');

  const questions = [
    {
      question: "I'm watching with...",
      options: [
        { label: "Netflix", icon: <FaFilm /> },
        { label: "Amazon Prime", icon: <FaFilm /> },
        { label: "Hulu", icon: <FaFilm /> },
        { label: "Disney+", icon: <FaFilm /> },
        { label: "Apple TV", icon: <FaFilm /> },
        { label: "HBO Max", icon: <FaFilm /> },
        { label: "Let me pick specifically", icon: <FaCheck /> },
        { label: "I don't care", icon: <FaSmile /> },
      ],
    },
    {
      question: "I feel like...",
      options: [
        { label: "Dramatic (Action, Adventure, Drama)", icon: <FaFilm /> },
        { label: "Intense (Horror, Thriller)", icon: <FaSadTear /> },
        { label: "Gentle (Comedy, Family, Romance)", icon: <FaSmile /> },
        { label: "Curious (History, Mystery)", icon: <FaFilm /> },
        { label: "Out of this world (Fantasy, Science-Fiction)", icon: <FaFilm /> },
        { label: "Realistic (Documentary)", icon: <FaCheck /> },
        { label: "Let me pick specifically", icon: <FaFilm /> },
        { label: "I don't care", icon: <FaSmile /> },
      ],
    },
    {
      question: "When from...?",
      options: [
        { label: "This year", icon: <FaClock /> },
        { label: "Last few years", icon: <FaClock /> },
        { label: "Last 10 years", icon: <FaClock /> },
        { label: "Last 25 years", icon: <FaClock /> },
        { label: "Last 100 years", icon: <FaClock /> },
        { label: "Let me pick specifically", icon: <FaCheck /> },
        { label: "I still don't care", icon: <FaSmile /> },
      ],
    },
    {
      question: "And is...",
      options: [
        { label: "Highly rated (Over 7/10)", icon: <FaCheck /> },
        { label: "At least average (Over 5/10)", icon: <FaSmile /> },
        { label: "I don't mind", icon: <FaFilm /> },
      ],
    },
    {
      question: "For how long...",
      options: [
        { label: "A shorter film (-90 minutes)", icon: <FaClock /> },
        { label: "Average length (1.5 to 2.5 hours)", icon: <FaClock /> },
        { label: "A long film (2.5 hours+)", icon: <FaClock /> },
        { label: "Time is relative", icon: <FaClock /> },
      ],
    },
  ];

  useEffect(() => {
    if (movieResults.length === 0) {
      fetchRecommendations();
    }
  }, [movieResults]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate an API call (replace with real API for movie recommendations)
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=5c49b6e2a36066a5b1491648804ef4c1');
      const data = await response.json();
      setMovieResults(data.results);
    } catch (err) {
      setError('Failed to fetch recommendations');
    }
    setLoading(false);
  };

  const handleAnswerChange = (event) => {
    setAnswers({ ...answers, [currentQuestion]: event.target.value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show recommendations after answering all questions
      fetchRecommendations();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReRoll = () => {
    setMovieResults([]);
    fetchRecommendations(); // Re-fetch the recommendations
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setMovieResults([]);
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="get-recom-container">
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h4" className="get-recom-title">Movie Recommendation</Typography>
          {currentQuestion < questions.length ? (
            <>
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6" className="get-recom-question">{questions[currentQuestion].question}</Typography>
                <RadioGroup
                  value={answers[currentQuestion] || ''}
                  onChange={handleAnswerChange}
                  className="get-recom-radio-group"
                >
                  {questions[currentQuestion].options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={option.label}
                      control={<Radio color="primary" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {option.icon}
                          <Typography sx={{ marginLeft: 1 }} className="get-recom-option-text">{option.label}</Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="secondary" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ marginTop: 3 }}>
              {loading && <LinearProgress />}
              {error && <Typography sx={{ color: 'red', marginTop: 3 }} className="get-recom-error">{error}</Typography>}
              {movieResults.length > 0 && (
                <>
                  <Typography variant="h5" sx={{ marginBottom: 2 }} className="get-recom-recommendations-title">
                    Movie Recommendations
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className="get-recom-movie-container">
                    {movieResults.slice(0, 1).map((movie) => (
                      <Box key={movie.id} sx={{ width: 200, marginRight: 2, marginBottom: 2 }} className="get-recom-movie-card">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="get-recom-movie-poster"
                        />
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: 1 }} className="get-recom-movie-title">
                          {movie.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button variant="contained" color="primary" onClick={handleReRoll} sx={{ marginTop: 2 }} className="get-recom-button">
                    Re-roll
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleRestart} sx={{ marginTop: 2, margnLeft: 2 }} className="get-recom-button">
                    Restart
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GetRecommendation;