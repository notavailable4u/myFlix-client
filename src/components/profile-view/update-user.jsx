import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {

    return (
        <Card>
            <Card.Header as="h2">Update Profile</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.Username}
                                onChange={(e) => handleUpdate(e)}
                                minLength="5"
                                aria-describedby="usernameHelpBlock"
                                placeholder="Enter new Username here."
                            />
                        <Form.Text id="usernameHelpBlock">Username must be a minimum of 5 characters (letters and /or numbers) and contain at least 1 capital letter.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                       <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={formData.Password}
                                onChange={(e) => handleUpdate(e)}
                                minLength="8"
                                placeholder="Enter new password Here"
                                aria-describedby="passwordHelpBlock"
                            />
                            <Form.Text id="passwordHelpBlock">Password must be a minimum of 8 characters in length, contain at least 1 number and 1 letter, and cannot use any special characters or punctuation marks.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                       <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.Email}
                                onChange={(e) => handleUpdate(e)}
                                placeholder="Enter new email here. Ex:name@example.com"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.Birthday}
                                onChange={(e) => handleUpdate(e)}
                                placeholder="Enter new date of birth here."
                            />
                    </Form.Group>

                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
UpdateUser.propTypes = {
    formData: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};