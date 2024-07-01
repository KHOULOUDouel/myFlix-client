import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { SearchBar } from '../searchbar-view/searchbar-view';
import { FilterView } from '../filter-view/filter-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDirector, setSelectedDirector] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!token) return;

    fetch('https://khouloud-movies-c211078f4ca4.herokuapp.com/movies/', {
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
    fetch(`https://khouloud-movies-c211078f4ca4.herokuapp.com/users/${user.Username}`, {
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
    fetch(`https://khouloud-movies-c211078f4ca4.herokuapp.com/users/${username}`, {
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
    const url = `https://khouloud-movies-c211078f4ca4.herokuapp.com/users/${user.Username}/movies/${movieId}`;
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

  // Filter movies based on the selected genre, director, and search term
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre ? movie.genre.name === selectedGenre : true) &&
      (selectedDirector ? movie.director.name === selectedDirector : true) &&
      movie.title.toLowerCase().includes(filter.toLowerCase())
    );
  });

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
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <FilterView onFilter={setFilter} />
                <Form>
                  <Form.Group controlId="formGenre">
                    <Form.Label>Filter by Genre</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                      <option value="">All</option>
                      {Array.from(new Set(movies.map((movie) => movie.genre.name))).map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formDirector">
                    <Form.Label>Filter by Director</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedDirector}
                      onChange={(e) => setSelectedDirector(e.target.value)}
                    >
                      <option value="">All</option>
                      {Array.from(new Set(movies.map((movie) => movie.director.name))).map((director) => (
                        <option key={director} value={director}>
                          {director}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
                <Row>
                  {filteredMovies.length === 0 ? (
                    <Col>
                      <div>The list is empty!</div>
                    </Col>
                  ) : (
                    filteredMovies.map((movie) => (
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
