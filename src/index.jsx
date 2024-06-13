// Import the createRoot function from the 'react-dom/client' package
import { createRoot } from 'react-dom/client';

// Import the MainView component from the specified path
import { MainView } from './components/main-view/main-view.jsx';

// Import Container from React Bootstrap
import Container from 'react-bootstrap/Container';

// Import statement to include the styles from `./index.scss`
import "./index.scss";
import '~bootstrap/scss/bootstrap.scss';

// Define the main App component, which will eventually include all other components
const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Select the root DOM element where the React app will be rendered
const container = document.querySelector("#root");

// Create a root for React rendering using the selected DOM element
const root = createRoot(container);

// Render the App component into the root DOM element
root.render(<App />);
