import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

// MainView component
export const MainView = () => {
  // Retrieve stored user and token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State hooks
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showLogin, setShowLogin] = useState(true);

  // Fetch movies from API when token is available
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
            description: movie.Genre.Description
          },
          director: {
            name: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth
          },
          imagePath: movie.ImagePath
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  // Fetch movies from API without token (public access)
  useEffect(() => {
    fetch("http://localhost:8080/movies/")
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
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Handle login
  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  // Handle signup
  const handleSignup = () => {
    setShowLogin(true);
  };

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
  );
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
