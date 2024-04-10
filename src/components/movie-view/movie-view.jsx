import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Container fluid="md">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h3>Title: {movie.title}</h3>
          <img src={movie.image} alt={`${movie.title} Movie Poster`} className="w-100" />
          <h4>Description: {movie.description}</h4>
          <h4>Genre: {movie.genre}</h4>
          <h4>Director: {movie.director}</h4>
          <Link to={`/`}>
            <Button variant="primary" size="lg" className="back-button">Back</Button>
          </Link>
        </Col>
      </Row>
    </Container>


  );
};
