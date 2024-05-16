import { useState, useEffect } from "react";
// import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import AllMoviesView from "../all-movies-view/all-movies-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-ptng-d305c73322c3.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
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
            directorBio: movie.Director.Bio,
            genre: movie.Genre.Name,
            genreDescription: movie.Genre.Description
          };
        });
        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
        setMovies(moviesFromApi);
      });
  }, [token]);

// sort 'movies' alphabetically by movie.title
 movies.sort(function (x, y) {
    var titleX = x.title.toLowerCase();
    var titleY = y.title.toLowerCase();
    if (titleX < titleY) {
        return -1;
    }
    if (titleX > titleY) {
        return 1;
    }
    return 0;
});

 
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear()
        }}
      />
      <Row className="justify-content-md-center mt-md-1" >
        <Routes>
           {/* SIGNUP */}
          <Route path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="mb-5">
                    <h1>Sign Up Page</h1>
                    <p className="text-danger fw-bold"><small>All fields are required.</small></p>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* LOGIN */}
          <Route path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="mb-5">
                    <h1>Login to Movie App</h1>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} />
                    <p>Need an account ? Use our <Link to="/signup">Signup Page</Link> to create an account</p>
                  </Col>
                )}
              </>
            }
          />
           {/* SINGLE MOVIE VIEW */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
           {/* PROFILE PAGE */}
          <Route path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={10}>
                  <ProfileView user={user} token={token} movies={movies}  onSubmit={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
           {/* MOVIE CARD - ALL MOVIES */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <AllMoviesView movies={movies} user={user} />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};