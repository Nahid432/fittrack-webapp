// import required modules
const express = require ('express')
const ejs = require('ejs')

const session = require("express-session")

//Import mysql module
const mysql = require('mysql2')

//Express application object
const app = express()
const port = 8000

//Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

//Set up the body parser for form data
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: "fittracksecret",
    resave: false,
    saveUninitialized: false
}))

//Set up public folder (for css and static js)
app.use(express.static(__dirname + '/public'))

//Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'fittrack_app',
    password: 'qwertyuiop',
    database: 'fittrack'
})

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})

global.db = db

// Define our application-specific data
app.locals.appData = {appName: "FitTrack"}

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

const exerciseRoutes = require("./routes/exercises")
app.use('/exercises', exerciseRoutes)

const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)


// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))