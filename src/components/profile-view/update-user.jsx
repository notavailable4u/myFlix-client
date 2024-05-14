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
                <Card.Text>Only fill out the fields which pertain to the information you wish to change. Any information you wish to remain the same, leave the field unchanged.</Card.Text>
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

                    <Form.Group className="mb-3" controlId="formEmail">
                       <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.Email}
                                onChange={(e) => handleUpdate(e)}
                                placeholder="Enter new email here. Ex:name@example.com"
                            />
                    </Form.Group>
                    <Card.Footer className="text-center">
                    <Button variant="primary"  type="submit">Update</Button>
                    </Card.Footer>
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