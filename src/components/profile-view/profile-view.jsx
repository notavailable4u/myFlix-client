import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table';
import { useEffect } from "react";

import { UpdateUser } from "./update-user";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ token, user, onSubmit }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.UserName);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [password, setPassword] = useState("");
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
                genre: movie.Genre.Name
              };
            });
            localStorage.setItem("movies", JSON.stringify(moviesFromApi));
            setMovies(moviesFromApi);
          });
      }, [token]);
  
    const favoriteMovies = user.FavoriteMovies

  function findFavoriteMovies(movies, favoriteMovies) {
    return movies.filter(movie => favoriteMovies.includes(movie.id));
  }

const favoriteMoviesView = findFavoriteMovies(movies, favoriteMovies);
console.log(favoriteMoviesView);
   
  

    const formData = {
        UserName: username,
        Email: email,
        Password: password
    };

    formData.Birthday = birthday ? new Date(birthday).toISOString().substring(0, 10) : null;

    const handleSubmit = (event) => {
        event.preventDefault(event);

        fetch(`https://movie-api-ptng-d305c73322c3.herokuapp.com/users/${storedUser.Username}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                if (response.ok) {
                    alert("Update successful");
                    return response.json();
                }
                alert("Update failed");
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                onSubmit(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUpdate = (e) => {
        switch (e.target.type) {
            case "text":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "date":
                setBirthday(e.target.value);
                break;
            default:
        }
    }

    const handleCancelAccount = () => {
        // need to implement the API call to delete the user's account
        console.log("Canceling account...");
        fetch(`https://movie-api-ptng-d305c73322c3.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert('Your account has been successfully deleted."');
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong.");
            }
        })
    };

    return (
        <Container fluid className="py-2">
            <Row>
                <Col>
                    <Card border="primary" className="h-100" style={{ width: '100%' }}>
                        <Card.Header as="h2">Profile Information</Card.Header>
                        <Card.Body>

                            <Table striped="columns" bordered >
                                <tbody>
                                    <tr>
                                        <td>Username: </td>
                                        <td>{user.Username}</td>
                                    </tr>
                                    <tr>
                                        <td>Email: </td>
                                        <td>{user.Email}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth:</td>
                                        <td>{new Date(user.Birthday).toDateString()}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Card.Text>Use the Update Profile form located on this page to change any of your profile information. Only fill out the fields which pertain to the information you wish to change. Any information you wish to remain the same, leave the field unchanged.</Card.Text>
                            <Card.Text>Use the DELETE ACCOUNT button below to close your account. This action cannot be undone.</Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="primary" onClick={handleCancelAccount}>Delete Account</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <UpdateUser
                        formData={formData}
                        handleUpdate={handleUpdate}
                        handleSubmit={handleSubmit}
                    />
                </Col>
            </Row>
            <Row>
                <Col><h2>Favorite Movies</h2></Col>
                </Row>
                <Row>
                {favoriteMoviesView.map((movie) => (
                      <Col key={movie.id}>

                        <MovieCard
                          movie={movie} />
                      </Col>
                    ))}
            </Row>
           
        </Container >
    );
};

