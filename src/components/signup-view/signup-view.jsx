// src/components/signup-view/signup-view.jsx

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://your-api-url.com/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
