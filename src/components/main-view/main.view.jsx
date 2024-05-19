import React, { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image: "https://image-url-1.com",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "The Matrix",
      image: "https://image-url-2.com",
      director: "The Wachowskis"
    },
    {
      id: 3,
      title: "Interstellar",
      image: "https://image-url-3.com",
      director: "Christopher Nolan"
    },
    {
      id: 4,
      title: "The Dark Knight",
      image: "https://image-url-4.com",
      director: "Christopher Nolan"
    },
    {
      id: 5,
      title: "Fight Club",
      image: "https://image-url-5.com",
      director: "David Fincher"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const onBackClick = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onMovieClick={onMovieClick} 
        />
      ))}
    </div>
  );
};
