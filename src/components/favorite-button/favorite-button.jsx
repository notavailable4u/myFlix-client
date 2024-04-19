//import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function FavoriteButton(movieId) {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const user = (storedUser ? storedUser : null);
  const token = (storedToken ? storedToken : null);
 // const [movies, setMovies] = useState([]);

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
            genre: movie.Genre.Name
          };
        });
        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
        //setMovies(moviesFromApi);
      });
  }, [token]);

  const handleAddFavorite = () => {
    let singleMovie = movieId.movieId;
    console.log(singleMovie);
  // API call
  console.log("Adding movie to Favorites...");
  fetch(`https://movie-api-ptng-d305c73322c3.herokuapp.com/users/${storedUser.Username}/movies/${singleMovie}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    if (response.ok) {
      alert('This movie has been successfully added to your favorites."');
      window.location.reload();
    } else {
      alert("Something went wrong.");
    }
  })
};

const handleRemoveFavorite = () => {
  let singleMovie = movieId.movieId;
    console.log(singleMovie);
  // need to implement the API call to delete the user's account
  console.log("Removing favorite...");
  fetch(`https://movie-api-ptng-d305c73322c3.herokuapp.com/users/${storedUser.Username}/movies/${singleMovie}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }
  }).then((response) => {
      if (response.ok) {
          alert('This movie has been successfully removed from your Favorites."');
          window.location.reload();
      } else {
          alert("Something went wrong.");
      }
  }).then (checkMovieId)
};

const favoriteMovies = user.FavoriteMovies;
console.log(favoriteMovies);
console.log(movieId);

function checkMovieId(object, array) {
  return array.includes(object.movieId);
}

const isMatching = checkMovieId(movieId, favoriteMovies);
console.log(isMatching);

return (
  <>
{isMatching ? (
  <Button onClick={handleRemoveFavorite} variant="primary" size="sm" value="Remove Favorite">
    Remove from Favorites
  </Button>
) : (
  <Button onClick={handleAddFavorite} variant="primary" size="sm" value="Add to Favorites">
    Add to Favorites
  </Button>
)}
</>
);
}