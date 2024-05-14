import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table';

import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ token, user, movies, onSubmit }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);

    const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));
    console.log("favoriteMovies=", favoriteMovies)
    console.log("user.FavoriteMovies=", user.FavoriteMovies)
   
    const formData = {
        Username: username,
        Email: email
    };

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
            default:
        }
    }

    const handleCancelAccount = () => {
        // implement the API call to delete the user's account
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
        <Container >
            <Row>
                <Col>
                    <Card border="primary" className="h-100" style={{ width: '100%' }}>
                        <Card.Header as="h2">Profile Information</Card.Header>
                        <Card.Body>

                            <Table striped="columns" bordered >
                                <tbody>
                                    <tr>
                                        <td>Username: </td>
                                        <td>{username}</td>
                                    </tr>
                                    <tr>
                                        <td>Email: </td>
                                        <td>{email}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Card.Text>Use the Update Profile form located on this page to change any of your profile information. </Card.Text>
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
              <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
            </Row>
         </Container >
    );
};
