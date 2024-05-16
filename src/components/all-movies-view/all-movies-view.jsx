import { useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";

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
        <Stack direction="horizontal" gap={2}>
          <div className="text-nowrap"><h5>Filter Movies by Genre:</h5></div>
        <Button variant="primary" onClick={handleDrama}>
          Drama
        </Button>
        <Button variant="primary"  onClick={handleCrime}>
          Crime
        </Button>
        <Button variant="primary" className="text-nowrap" onClick={handleScienceFiction} >
          Science Fiction
        </Button>
        <Button variant="primary" c onClick={handleThriller}>
          Thriller
        </Button>
        <Button variant="primary"  onClick={handleAction}>
          Action
        </Button>
        <Button variant="secondary"  onClick={handleAll}>
          All
        </Button>
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
