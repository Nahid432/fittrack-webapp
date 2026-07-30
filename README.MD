# FitTrack

FitTrack is a web application developed as part of a university coursework project. It allows users to search for exercises, create personalised workout plans, and discover meal ideas. The application was built using Node.js, Express, EJS, and MySQL, with user authentication and session management to provide a secure experience.

## Technologies Used

* Node.js
* Express
* EJS
* MySQL
* bcrypt
* express-session
* express-validator
* request

## Running the Application

1. Clone or download this repository.
2. Open the project in Visual Studio Code or your preferred code editor.
3. Install the required dependencies:

```bash
npm install
```

4. Create a MySQL database named `fittrack`.
5. Import the provided SQL file into the database.
6. If required, update the database connection settings in `index.js` to match your MySQL configuration.
7. Start the application:

```bash
node index.js
```

8. Open your web browser and go to:

```
http://localhost:8000
```

## Features

* Register for a new account
* Secure user login and logout
* Search for exercises by name or muscle group
* Create and manage personalised workout plans
* Add and remove exercises from workout plans
* Browse meal ideas using TheMealDB API
* Access exercise data through a JSON API endpoint

## API Endpoint

```
/api/exercises
```

This endpoint returns all exercise records stored in the database in JSON format.

## External API

FitTrack uses the TheMealDB API to retrieve meal information, including the meal name, category, cuisine, and other recipe details, allowing users to discover meal ideas alongside their workout plans.
