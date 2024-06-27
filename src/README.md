# myFlix

myFlix is a movie information application built using React, React-Bootstrap, and React Router. Users can browse movies, view details about them, sign up, log in, and manage their profile, including adding and removing favorite movies.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication (sign up, log in, log out)
- Browse a list of movies
- View detailed information about each movie
- Add or remove movies from favorites
- View and update user profile information
- Responsive design using React-Bootstrap
- Client-side routing with React Router

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Getting Started

1. Clone the repository:
    ```sh
    git clone https://github.com/KHOULOUDouel/myFlix-client.git
    cd myFlix-client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `netlify.toml` file in the root of the project with the following content:
    ```toml
    [[redirects]]
      from = "/*"
      to = "/"
      status = 200
    ```

4. Start the development server:
    ```sh
    npm start
    ```

5. Open your browser and navigate to `http://localhost:1234`.

