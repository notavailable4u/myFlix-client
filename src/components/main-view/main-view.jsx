import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-View/signup-view";  

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]); 
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(( )=> {
      if (!token) {
        return;
      }
      fetch("https://movie-api-ptng-d305c73322c3.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          director: movie.Director.Name,
          genre: movie.Genre.Name
          };
        });
        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
        setMovies(moviesFromApi);
      });
    }, [token]);

    if (!user) {
      return (
      <><p>LOGIN</p>
        <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <p>or SIGN UP Below</p>
        <p>Username- 5 character minimum --- Password- 8 character minimum</p>
        <SignupView />
        </>
      );
    }

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
          <button
            onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout
          </button>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => 
              setSelectedMovie(newSelectedMovie)}
          />
        ))}
      </div>
    );
  };


