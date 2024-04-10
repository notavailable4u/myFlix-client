import React from"react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100"  border="primary" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.image} alt={`${movie.title} Movie Poster`} />
      <Card.Body>
        <Card.Title as="h3" >{movie.title}</Card.Title>
        <Card.Text>DESCRIPTION: {movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary" size="lg">Open</Button>
        </Link>
     </Card.Footer>
    </Card>
  );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
};
