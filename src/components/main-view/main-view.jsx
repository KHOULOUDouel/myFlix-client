import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view'; // Import the LoginView component

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null); // Added missing user state

  useEffect(() => {
    fetch("https://khouloud-movies-c211078f4ca4.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => { // Removed .docs since it's not part of the API response
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

  if (!user) {
    return <LoginView />; // Render the LoginView component if no user is logged in
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
  }
  
  return (
    <div>
      <h1>Movie List</h1>
      <button onClick={() => { setUser(null); }}>Logout</button> {/* Logout Button */}
      <div>
        {movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
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
      poster: PropTypes.string.isRequired,
      director: PropTypes.string
    })
  ).isRequired,
  selectedMovie: PropTypes.object,
  setSelectedMovie: PropTypes.func,
};
