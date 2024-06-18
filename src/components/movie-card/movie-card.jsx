import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <strong>Director:</strong> {movie.director.name}
          <br />
          <strong>Genre:</strong> {movie.genre.name}
        </Card.Text>
        <Button variant="link" onClick={() => onMovieClick(movie)}>
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string,
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
