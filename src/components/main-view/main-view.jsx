import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:8080/movies/', {
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
            description: movie.Genre.Description,
          },
          director: {
            name: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth,
          },
          imagePath: movie.ImagePath,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
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
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const handleSignup = () => {
    setShowLogin(true);
  };

  const handleUserUpdate = (updatedUser) => {
    fetch(`http://localhost:8080/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleDeregister = (username) => {
    fetch(`http://localhost:8080/users/${username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        handleLogout();
      })
      .catch((error) => {
        console.error('Error deregistering user:', error);
      });
  };

  const handleFavorite = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);
    const url = `http://localhost:8080/users/${user.Username}/movies/${movieId}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error updating favorites:', error);
      });
  };

  return (
    <Container>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <>
                <h1>Movie List</h1>
                <Row>
                  {movies.length === 0 ? (
                    <Col>
                      <div>The list is empty!</div>
                    </Col>
                  ) : (
                    movies.map((movie) => (
                      <Col md={4} key={movie._id}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          onFavorite={handleFavorite}
                        />
                      </Col>
                    ))
                  )}
                </Row>
              </>
            ) : (
              <Row className='justify-content-md-center'>
                <Col md={6}>
                  {showLogin ? (
                    <>
                      <LoginView onLoggedIn={handleLogin} />
                      <p>or</p>
                      <Button onClick={() => setShowLogin(false)}>
                        Sign up
                      </Button>
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
        <Route
          path='/login'
          element={
            user ? <Navigate to='/' /> : <LoginView onLoggedIn={handleLogin} />
          }
        />
        <Route
          path='/signup'
          element={
            user ? <Navigate to='/' /> : <SignupView onSignedUp={handleSignup} />
          }
        />
        <Route
          path='/movies/:movieId'
          element={
            user ? (
              <MovieView
                movies={movies}
                user={user}
                onFavorite={handleFavorite}
              />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/profile'
          element={
            user ? (
              <ProfileView
                user={user}
                movies={movies}
                onUserUpdate={handleUserUpdate}
                onDeregister={handleDeregister}
              />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
      </Routes>
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
