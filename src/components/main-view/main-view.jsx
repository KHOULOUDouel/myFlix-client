// src/components/main-view/main-view.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch('https://khouloud-movies-c211078f4ca4.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          poster: movie.ImagePath,
          director: movie.Director.Name
        }));
        setMovies(moviesFromApi);
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
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row className="movie-list">
        {movies.map((movie) => (
          <Col md={4} key={movie.id}>
            <MovieCard movie={movie} onMovieClick={onMovieClick} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
