import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';

export const MovieView = ({ movies, user, onFavorite }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(movies.find((mov) => mov._id === movieId));
  }, [movies, movieId]);

  if (!movie) return <div>Loading...</div>;

  const isFavorite = user && user.FavoriteMovies.includes(movie._id);

  return (
    <Container className="movie-view mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={movie.imagePath} alt={`${movie.title} poster`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {movie.description}
              </Card.Text>
              <Card.Text>
                <strong>Genre:</strong> {movie.genre.name}
                <br />
                <small>{movie.genre.description}</small>
              </Card.Text>
              <Card.Text>
                <strong>Director:</strong> {movie.director.name}
                <br />
                <small>{movie.director.bio}</small>
                <br />
                <small>Birth: {movie.director.birth}</small>
                <br />
                {movie.director.death && <small>Death: {movie.director.death}</small>}
              </Card.Text>
              <Button variant="primary" as={Link} to="/">
                Back
              </Button>
              {user && (
                <Button
                  variant={isFavorite ? "danger" : "success"}
                  onClick={() => onFavorite(movie._id)}
                >
                  {isFavorite ? "Unfavorite" : "Favorite"}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
    })
  ).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onFavorite: PropTypes.func.isRequired,
};
