import React, { useState } from "react";
import { getTrendingMovies } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies.results.map((m) => m.id));
  }

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };
  console.log(myReviews);


  return (
    <MoviesContext.Provider
      value={{
        trendingMovies,
        favorites,
        myReviews,
        fetchTrendingMovies,
        addToFavorites,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
