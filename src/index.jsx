import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainView } from './components/main-view/main-view';
import { MovieView } from './components/movie-view/movie-view';
import { SignupView } from './components/signup-view/signup-view';
import { LoginView } from './components/login-view/login-view';
import Container from 'react-bootstrap/Container';
import './index.scss';

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/movies/:movieId" element={<MovieView />} />
        </Routes>
      </Container>
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
