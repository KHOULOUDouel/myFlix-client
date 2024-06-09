 React-Bootstrap
// src/components/main-view/main-view.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './main-view.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
 main

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
 React-Bootstrap
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

 main
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

  useEffect(() => {
    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            poster: movie.poster, // Assuming your API provides a poster URL
            director: movie.director,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

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
 React-Bootstrap
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

    <div>
      <h1>Movie List</h1>
      <div>
        {movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Define PropTypes for MainView
MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.string
    })
  ).isRequired,
  selectedMovie: PropTypes.object,
  setSelectedMovie: PropTypes.func
};
 main
