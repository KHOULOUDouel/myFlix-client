import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: {
            name: movie.Genre.Name,
            description: movie.Genre.Description
          },
          director: {
            name: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth
          },
          imagePath: movie.ImagePath
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleSignup = () => {
    setShowLogin(true);
  };

  return (
    <Container>
      <Router>
        <NavigationBar user={user} onLoggedOut={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <h1>Movie List</h1>
                  <Button onClick={handleLogout}>Logout</Button>
                  <Row>
                    {movies.length === 0 ? (
                      <Col>
                        <div>The list is empty!</div>
                      </Col>
                    ) : (
                      movies.map((movie) => (
                        <Col md={4} key={movie._id}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))
                    )}
                  </Row>
                </>
              ) : (
                <Row className="justify-content-md-center">
                  <Col md={6}>
                    {showLogin ? (
                      <>
                        <LoginView onLoggedIn={handleLogin} />
                        <p>or</p>
                        <Button onClick={() => setShowLogin(false)}>Sign up</Button>
                      </>
                    ) : (
                      <>
                        <SignupView onSignedUp={handleSignup} />
                        <p>or</p>
                        <Button onClick={() => setShowLogin(true)}>Log in</Button>
                      </>
                    )}
                  </Col>
                </Row>
              )
            }
          />
          <Route path="/login" element={<LoginView onLoggedIn={handleLogin} />} />
          <Route path="/signup" element={<SignupView onSignedUp={handleSignup} />} />
          <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />
          {/* Placeholder for Profile view */}
          <Route path="/profile" element={<div>Profile View (to be implemented)</div>} />
        </Routes>
      </Router>
    </Container>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
        birth: PropTypes.string,
      }).isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};
