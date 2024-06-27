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

// MainView component
export const MainView = () => {
 Task-5
  // Retrieve stored user and token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State hooks

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

 main
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);

  // Fetch movies from API when token is available
  useEffect(() => {
    if (!token) return;

 Task-6
    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com//movies/", {

 Task-5
    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com//movies/", {

    fetch('http://localhost:8080/movies/', {
 main
 main
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
 Task-5
            description: movie.Genre.Description

            description: movie.Genre.Description,
 main
          },
          director: {
            name: movie.Director.Name,
            bio: movie.Director.Bio,
 Task-5
            birth: movie.Director.Birth

            birth: movie.Director.Birth,
 main
          },
          imagePath: movie.ImagePath,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);

 Task-5
  // Fetch movies from API without token (public access)
  useEffect(() => {
    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com//movies/")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          director: movie.director,
        }));

        setMovies(moviesFromApi);
      });
  }, []);

  // Handle movie click
  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle back button click in MovieView
  const onBackClick = () => {
    setSelectedMovie(null);
  };

  // Handle logout

 main
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Handle login
  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  // Handle signup
  const handleSignup = () => {
    setShowLogin(true);
  };

 Task-5
  // Render login/signup view if user is not logged in
  if (!user) {
    return (
      <div>
        {showLogin ? (
          <>
            <LoginView onLoggedIn={handleLogin} />
            <p>or</p>
            <button onClick={() => setShowLogin(false)}>Sign up</button>
          </>
        ) : (
          <>
            <SignupView onSignedUp={handleSignup} />
            <p>or</p>
            <button onClick={() => setShowLogin(true)}>Log in</button>
          </>
        )}
      </div>
    );
  }

  // Render MovieView if a movie is selected
  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
  }

  // Render movie list
  return (
    <div>
      <h1>Movie List</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
            />
          ))
        )}
      </div>
    </div>

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
 main
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
