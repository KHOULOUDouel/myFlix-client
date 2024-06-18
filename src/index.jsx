import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss';

const App = () => {
  return (
    <Router>
      <MainView />
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
