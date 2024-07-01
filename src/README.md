myFlix-client
Objective
The myFlix-client is the client-side for an app called myFlix, which is based on existing server-side code (REST API and database). The main goal is to create a single-page, responsive app with routing, rich interactions, several interface views, and a polished user experience.

Context
Client-side development has become increasingly prominent with the advent of modern browsers and libraries such as React. The myFlix app aims to provide movie enthusiasts with access to information about different movies, allowing them to save data about their favorite movies.

Technologies
React
ES2015+
Bootstrap
Parcel
Features
Main View
Returns ALL movies to the user (each movie item with an image, title, and description)
Filtering the list of movies with a “search” feature
Ability to select a movie for more details
Ability to log out
Ability to navigate to Profile view
Single Movie View
Returns data (description, genre, director, image) about a single movie to the user
Allows users to add a movie to their list of favorites
Login View
Allows users to log in with a username and password
Signup View
Allows new users to register (username, password, email, date of birth)
Profile View
Displays user registration details
Allows users to update their info (username, password, email, date of birth)
Displays favorite movies
Allows users to remove a movie from their list of favorites
Allows existing users to deregister
Installation and Usage
Clone the repository: git clone https://github.com/KHOULOUDouel/myFlix-client.git
Navigate to the project directory: cd myflix-client
Install dependencies: npm install
Start the development server: npm start (The server runs by default on port 8080)
Contributing
Please read the contribution guidelines before contributing.

License
This project is licensed under the MIT License.

Project URL
myFlix
Github Client Side