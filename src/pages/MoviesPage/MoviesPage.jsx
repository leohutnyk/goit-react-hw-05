import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import style from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (searchQuery) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=cf90c7e71cb3b075c8b58dd255fc4b7b`
      );
      setMovies(response.data.results);
    } catch (error) {
      setError("Error fetching movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (query !== queryParam) {
      setSearchParams({ query });
    }
  };

  // фикс
  useEffect(() => {
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [queryParam]);

  return (
    <div className={style.container}>
      <form onSubmit={handleSearch} className={style.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={style.input}
        />
        <button type="submit" className={style.button}>
          Search
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
