import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap'; // Import Button from React Bootstrap

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

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

    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        director: movie.director,
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
      <div>
        {showLogin ? (
          <>
            <LoginView onLoggedIn={handleLogin} />
            <p>or</p>
            <Button onClick={() => setShowLogin(false)}>Sign up</Button> {/* Using Bootstrap Button */}
          </>
        ) : (
          <>
            <SignupView onSignedUp={handleSignup} />
            <p>or</p>
            <Button onClick={() => setShowLogin(true)}>Log in</Button> {/* Using Bootstrap Button */}
          </>
        )}
      </div>
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
  }

  return (
    <div>
      <h1>Movie List</h1>
      <Button onClick={handleLogout}>Logout</Button> {/* Using Bootstrap Button */}
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
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      director: PropTypes.string,
    })
  ),
  selectedMovie: PropTypes.object,
  setSelectedMovie: PropTypes.func,
};
