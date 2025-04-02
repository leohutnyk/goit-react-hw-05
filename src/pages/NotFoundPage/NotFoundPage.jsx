import style from "./NotFoundPage.module.css";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>Page Not Found</h2>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFoundPage;
