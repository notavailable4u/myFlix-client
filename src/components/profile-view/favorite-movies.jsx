import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({user, favoriteMovies}) => {
    const numberOfMovies = favoriteMovies.length;
    return (
      <Col className="mb-5">
        <h3>Favorite Movies</h3>
        <h4>Number of movies currently in your Favorite Movie List: {numberOfMovies} </h4>
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie.id} md={6}>
              <Link to={`/movies/${movie.id}`} />
              <MovieCard
                key={movie.id}
                isFavorite={user.FavoriteMovies.includes(movie.id)}
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