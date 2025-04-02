import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=cf90c7e71cb3b075c8b58dd255fc4b7b"
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h2 className={style.title}>Trending Today</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
