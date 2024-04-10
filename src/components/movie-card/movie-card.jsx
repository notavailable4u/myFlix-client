import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100"  border="primary" style={{ width: '18rem' }} onClick={() => onMovieClick(movie)} >
      <Card.Img variant="top" src={movie.image} alt={`${movie.title} Movie Poster`} />
      <Card.Body>
        <Card.Title as="h3" >{movie.title}</Card.Title>
        <Card.Text>DESCRIPTION: {movie.description}</Card.Text>
      </Card.Body>
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
  onMovieClick: PropTypes.func.isRequired,
};
