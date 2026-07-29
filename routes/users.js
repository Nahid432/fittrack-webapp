//Import required modules
const express = require("express")
const bcrypt = require("bcrypt")

//Create a router
const router = express.Router()

//Display the registration page
router.get("/register", (req, res) => {
    res.render("register");
});

//Handle registration form submission
router.post("/registered", (req, res, next) => {

    //Retrieve values submitted through form
    const firstName = req.body.first
    const lastName = req.body.last
    const username = req.body.username
    const email = req.body.email
    const plainPassword = req.body.password

    //Number of rounds used to generate the password hash
    const saltRounds = 10

    //Hash the password before storing into database
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if(err) {
            return next(err)
        }

        //Insert the new user into database
        const sqlQuery = "INSERT INTO users (username, first_name, last_name, email, hashed_Password) VALUES (?, ?, ?, ?, ?)"

        const queryValues = [
          username,
          firstName,
          lastName,
          email,
          hashedPassword
        ]

        db.query(sqlQuery, queryValues, function(err, result) {
            if (err) {
                return next(err)
            }
            res.send("Registered successfully")
        })
    })
    
})

//Export the router
module.exports = router;