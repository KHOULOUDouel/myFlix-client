// src/components/movie-card/movie-card.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './movie-card.scss';

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

// Define PropTypes for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
