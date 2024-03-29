import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {
    const [movies] = useState([
        {
            id: 1,
            title: "The Shawshank Redemption",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            imagePath: "the-shawshank-redemption.jpg",
            genre: "Drama",
            director: "Frank Darabont"
        },
        {
            id: 2,
            title: "Pulp Fiction",
            description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            imagePath: "pulpfiction.png",
            genre: "Crime",
            director: "Quentin Tarantino"
        },
        {
            id: 3,
            title: "Inception",
            description: "Description of movie goes here.",
            imagePath: "inception.png",
            genre: "Science Fiction",
            director: "Christopher Nolan"
        },
    ]); 

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
      return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
    }
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }
  
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  };


