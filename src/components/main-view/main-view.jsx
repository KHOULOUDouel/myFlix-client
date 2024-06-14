import React, { useState, useEffect } from 'react';
 Task-5
import PropTypes from 'prop-types';

import PropTypes from 'prop-types'; // Import PropTypes
 main

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
 Task-5
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");


 main
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: {
            name: movie.Genre.Name,
            Description: movie.Genre.Description
          },
          director: {
            name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth
          },
          imagePath: movie.ImagePath
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:8080/movies/")
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

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
  }

  return (
    <div>
      <h1>Movie List</h1>
 Task-5
      <button onClick={handleLogout}>Logout</button>

 main
      <div>
        {movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
 Task-5
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}

              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
 main
            />
          ))
        )}
      </div>
    </div>
  );
 Task-5
};

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
