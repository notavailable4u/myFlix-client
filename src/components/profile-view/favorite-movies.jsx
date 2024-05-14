import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';


import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({user, favoriteMovies}) => {
    const numberOfMovies = favoriteMovies.length;
    return (
      <Container  className="mt-md-2">
      <Col className="mb">
        <h3 className="text-center">Favorite Movies</h3>
        <h5 className="text-center">Current number of Favorite Movies: {numberOfMovies} </h5>
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie.id} md={4} className="mb-5">
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
      </Container>
    );
  }
  FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  };