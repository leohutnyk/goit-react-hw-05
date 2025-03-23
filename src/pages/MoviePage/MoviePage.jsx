import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesByQuery } from "../../themoviedbApi";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Formik, Form, Field } from "formik";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [debounceQuery] = useDebounce(query, 300);

  const changeSearchText = (values) => {
    const nextParams = new URLSearchParams(searchParams);

    if (values.query.trim() !== "") {
      nextParams.set("query", values.query);
    } else {
      nextParams.delete("query");
    }
    setSearchParams(nextParams);
  };

  useEffect(() => {
    if (!debounceQuery) return;
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesByQuery(debounceQuery);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [debounceQuery]);

  return (
    <div className={css.containerMovisPage}>
      <h2 className={css.searchSubtitle}>Search Movies</h2>
      <Formik
        className={css.formik}
        initialValues={{ query }}
        enableReinitialize
        onSubmit={changeSearchText}
      >
        {({ values, handleChange }) => (
          <Form>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="on"
              autoFocus
              value={values.query}
              onChange={handleChange}
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        )}
      </Formik>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
}
