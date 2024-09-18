import { useState } from "react";
import { Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export default function AllMoviesView ({movies, user}) {

    const [genreView, setGenreView] = useState(movies);
    console.log("genreView=", genreView)

    const handleDrama = () => {
        const dramaView = movies.filter((movie) => movie.genre === "Drama");
        setGenreView(dramaView);
      };
    
      const handleCrime = () => {
        const crimeView = movies.filter((movie) => movie.genre === "Crime");
        setGenreView(crimeView);
      };
    
      const handleScienceFiction = () => {
        const scienceFictionView = movies.filter((movie) => movie.genre === "Science Fiction");
        setGenreView(scienceFictionView);
      };
    
      const handleThriller = () => {
        const thrillerView = movies.filter((movie) => movie.genre === "Thriller");
        setGenreView(thrillerView);
      };
    
      const handleAction = () => {
        const actionView = movies.filter((movie) => movie.genre === "Action");
        setGenreView(actionView);
      };
    
      const handleAll = () => {
        setGenreView(movies);
      };
    
      return (
        <>
        <Row >
        <Col className="my-1">
        <h5 className="text-end">Filter Movies by Genre:</h5>
        </Col>
        <Col className="my-1">
        <Stack direction="horizontal" gap={2} className="justify-content-md-start">
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton id="tbg-radio-1" value={1} variant="primary"  onClick={handleAll}>
          All
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2} variant="primary" onClick={handleDrama}>
          Drama
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3} variant="primary"  onClick={handleCrime}>
          Crime
        </ToggleButton>
        <ToggleButton id="tbg-radio-4" value={4} variant="primary"  onClick={handleScienceFiction} >
          Science Fiction
        </ToggleButton>
        <ToggleButton id="tbg-radio-5" value={5} variant="primary"  onClick={handleThriller}>
          Thriller
        </ToggleButton>
        <ToggleButton id="tbg-radio-6" value={6} variant="primary"  onClick={handleAction}>
          Action
        </ToggleButton>
          </ToggleButtonGroup>
      </Stack>
        </Col>
        </Row>
        <Row>
          {genreView.map((movie) => (
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

        </>

      )

}
