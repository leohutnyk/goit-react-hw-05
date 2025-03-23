import { Link, useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useEffect } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={css.notFoundContainer}>
      <p className={css.notFoundText}>
        404 Not Found Page <br />
        Please follow this
      </p>
    </div>
  );
}
