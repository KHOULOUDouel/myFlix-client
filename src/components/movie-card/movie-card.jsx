// src/components/movie-card/movie-card.jsx

import React from 'react';
 React-Bootstrap
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './movie-card.scss';

import PropTypes from 'prop-types'; // Import PropTypes
 main

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="movie-card" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.poster} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};
 React-Bootstrap


// Define PropTypes for MovieCard
 main
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
 React-Bootstrap
    poster: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

    image: PropTypes.string.isRequired,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
 main
