import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com//movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies: ", data);
        const moviesFromApi = data.map((movie) => ({
          id: movie._id.$oid,
          title: movie.Title,
          description: movie.Description,
          genre: {
            name: movie.Genre.Name,
            description: movie.Genre.Description
          },
          director: {
            name: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth,
            death: movie.Director.Death,
          },
          imagePath: movie.ImagePath,
          featured: movie.Featured,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
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

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleSignup = () => {
    setShowLogin(true);
  };

  if (!user) {
    return (
      <Container>
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
      </Container>
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
  }

  return (
    <Container>
      <h1>Movie List</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Row>
        {movies.length === 0 ? (
          <Col>
            <div>The list is empty!</div>
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={4} key={movie.id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
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
      imagePath: PropTypes.string.isRequired,
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
      description: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    })
  ),
  selectedMovie: PropTypes.object,
  setSelectedMovie: PropTypes.func,
};
