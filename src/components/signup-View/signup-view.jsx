import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

  const data = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday,
  };

  fetch("https://movie-api-ptng-d305c73322c3.herokuapp.com/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    if (response.ok) {
      alert("Signup successful.");
      navigate("/login", {replace: true});
    } else {
      alert("Signup failed");
    }
  });
  };


  return (
    <Container style={{border: "3px solid SeaGreen", borderRadius: "5px"}} className="py-2">
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label> Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          aria-describedby="usernameHelpBlock"
        />
        <Form.Text id="usernameHelpBlock">Username must be a minimum of 5 characters (letters and /or numbers) and contain at least 1 capital letter.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock">Password must be a minimum of 8 characters in length, contain at least 1 number and 1 letter, and cannot use any special characters or punctuation marks.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
        />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday">
      <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
    <p className="text-end">Already have an account ? <Link to={`/`}>Login here.</Link></p>
    </Container>
  );
};