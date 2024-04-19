import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({user, favoriteMovies}) => {
  return (
    <Col className="mb-5">
      <h2>Favorite Movies</h2>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={6}>
            <Link to={`/movies/${movie._id}`} />
            <MovieCard
              key={movie._id}
              isFavorite={user.FavoriteMovies.includes(movie.title)}
              movie={movie}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
}
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};