import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../themoviedbApi";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovie(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div className={css.containerMovie}>
      <h1 className={css.titleMovie}>Trending Today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
}
