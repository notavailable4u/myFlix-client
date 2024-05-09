import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import { Card } from "react-bootstrap";
import {Stack} from "react-bootstrap";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Container fluid="md">
      <Row className="justify-content-md-center">
        <Col md={8}>
        <Card style={{ width: '100%' }}>
            <Card.Header as="h3">{movie.title}</Card.Header>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div><Image src={movie.image} alt={`${movie.title} Movie Poster`} rounded /></div>
                <div>
                  <Card.Text as="h4">Director: {movie.director}</Card.Text>
                  <Card.Text as="h4">Genre: {movie.genre}</Card.Text>
                  </div>
              </Stack>
              <Card.Text as="h4">Description: {movie.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
            <Link to={`/`}>
            <Button variant="primary" size="lg" className="back-button">Back to Movie List</Button>
          </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>


  );
};
