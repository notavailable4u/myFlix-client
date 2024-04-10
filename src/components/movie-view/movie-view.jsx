import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container fluid="md">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={onBackClick}>Back</Button>
          </div>
          <h3>Title: {movie.title}</h3>
          <img src={movie.image} alt={`${movie.title} Movie Poster`} className="w-100" />
          <h4>Description: {movie.description}</h4>
          <h4>Genre: {movie.genre}</h4>
          <h4>Director: {movie.director}</h4>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={onBackClick}>Back</Button>
          </div>
        </Col>
      </Row>
    </Container>


  );
};
