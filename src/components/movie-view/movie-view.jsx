import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import { Accordion, Card } from "react-bootstrap";

//import { Stack } from "react-bootstrap";
//import { Accordion } from "react-bootstrap";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Container fluid="md">
      <Row >
        <Col md={10}>
          <Card className="mb-3" style={{ width: '100%' }}>
            <Row>
              <Col>
                <Card.Header as="h3" className="text-center">{movie.title}</Card.Header>
              </Col>
            </Row>
            <Row className="g-0">
              <Col className="md-4">
                <Card.Body>
                  <Image src={movie.image} alt={`${movie.title} Movie Poster`} fluid rounded />
                </Card.Body>
              </Col>
              <Col className="md-8">
                <Card.Body className="ps-md-0">
                  <Card.Text as="h4" className="text-start">Description: </Card.Text>
                  <Card.Text>{movie.description}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Body>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header><h5>Director: {movie.director}</h5> </Accordion.Header>
                      <Accordion.Body>{movie.directorBio}</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header><h5>Genre: {movie.genre} </h5></Accordion.Header>
                      <Accordion.Body>{movie.genreDescription} </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Footer className="text-center">
                  <Link to={`/`}>
                    <Button variant="primary" size="lg" className="back-button">Back to Movie List</Button>
                  </Link>
                </Card.Footer>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
