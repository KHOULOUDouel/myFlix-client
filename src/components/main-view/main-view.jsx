// src/components/main-view/main-view.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Container, Row, Col, Button } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null); // Updated to use stored user
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, [token]);

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const onBackClick = () => {
    setSelectedMovie(null);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  if (!user) {
    return (
      <Container>
        <Row>
          <Col>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
          </Col>
        </Row>
        <Row>
          <Col>
            or
          </Col>
        </Row>
        <Row>
          <Col>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <Container>
        <Row>
          <Col>
            <MovieView movie={selectedMovie} onBackClick={onBackClick} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>Movie List</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        {movies.length === 0 ? (
          <Col>
            <div>The list is empty!</div>
          </Col>
        ) : (
          movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

// Define PropTypes for MainView
MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      director: PropTypes.string
    })
  ),
  selectedMovie: PropTypes.object,
  setSelectedMovie: PropTypes.func,
};
