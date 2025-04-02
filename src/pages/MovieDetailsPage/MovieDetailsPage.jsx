import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  const locationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=cf90c7e71cb3b075c8b58dd255fc4b7b`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBackLocation = locationRef.current;

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <button
        className={style.goBackButton}
        onClick={() => navigate(goBackLocation)}
      >
        Go Back
      </button>

      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className={style.movieInfo}>
          <h1>{movie.title}</h1>

          <div>
            <p className={style.details}>
              <strong>User Score:</strong> {movie.vote_average * 10}%
            </p>
            <p className={style.details}>
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p className={style.details}>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <p className={style.addInfo}>Additional information</p>
      <div className={style.links}>
        <NavLink
          to={`/movies/${movieId}/cast`}
          className={({ isActive }) =>
            isActive ? style.activeLink : style.inactiveLink
          }
        >
          Cast
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          className={({ isActive }) =>
            isActive ? style.activeLink : style.inactiveLink
          }
        >
          Reviews
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
