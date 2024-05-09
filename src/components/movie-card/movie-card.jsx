import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//import FavoriteButton from "../favorite-view/favorite-button";
// import FavoriteToggle from "../favorite-button/favorite-toggle";


export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser? storedUser: null);
  const token = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");
  console.log("movie.id=", movie.id)

  //ADD MOVIES TO FAVORITE
useEffect(() => {
  const addToFavorites = () => {

  fetch (
    `https://movie-api-ptng-d305c73322c3.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`,
    {
    method: 'POST',
    // body: JSON.stringify(favoriteMoviesData),
    headers: { "Authorization": `Bearer ${storedToken}`,
      'Content-Type': 'application/json'}
    },
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to add movie to favorites.");
    }
    alert("Movie added to favorites successfully!");
    window.location.reload();
    return response.json()
  })
  .then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
    }

  })
  .catch((error) => {
    console.error(error);
  });
};

const removeFromFavorites = () => {

  fetch (
    `https://movie-api-ptng-d305c73322c3.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`,
    {
    method: 'DELETE',
    headers: { "Authorization": `Bearer ${storedToken}`,
      'Content-Type': 'application/json'}
    },
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to remove movie from favorites.");
    }
    alert("Movie removed from favorites successfully!");
    window.location.reload();
    return response.json()
  })
  .then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
    }

  })
  .catch((error) => {
    console.error(error);
  });
};

if (addTitle) {
  addToFavorites();
}
if (delTitle) {
  removeFromFavorites();
}
}, [addTitle, delTitle, movie.id, storedToken, storedUser.Username, token, user.Username]);

const handleAddToFavorites = () => {
  setAddTitle(movie.title)
 }; 

 const handleRemoveFromFavorites = () => {
  setDelTitle(movie.title)
 }; 

 
  return (
    <Card className="h-100" border="primary" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.image} alt={`${movie.title} Movie Poster`} />
      <Card.Body>
        <Card.Title as="h3" >{movie.title}</Card.Title>
        <Card.Text>DESCRIPTION: {movie.description}</Card.Text>
        {/* <Card.Text><FavoriteToggle movieId={movie.id}/></Card.Text> */}
        <Card.Title>{isFavorite ? ( 
      <Button variant="primary"  onClick={handleRemoveFromFavorites}>Remove from favorites</Button>
    ) : (
      <Button variant="primary" onClick={handleAddToFavorites}>Add to favorites</Button>  
    )}</Card.Title>
      </Card.Body>
      <Card.Footer className="text-center">
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary" size="lg">View Details</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
};
