// src/components/login-view/login-view.jsx

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    fetch('https://your-api-url.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setError('Invalid username or password.');
        }
      })
      .catch(() => {
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <Container className="login-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}
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
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
