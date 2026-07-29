//Import required modules
const express = require("express")
const bcrypt = require("bcrypt")
const {body, validationResult} = require("express-validator")

//Create a router
const router = express.Router()

//Display the registration page
router.get("/register", (req, res) => {
    res.render("register");
});

//Display the login page
router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/loggedin", function (req,res, next) {
    //retrieve login details
    const username = req.body.username
    const password = req.body.password

  // Find the user in the database
    const sqlQuery = "SELECT id, username, hashed_Password FROM users WHERE username = ?"

    db.query(sqlQuery, [username], function (err, user) {
        if (err) {
          return next(err)
        }

        //if no matching username was found
        if (user.length === 0) {
            return res.send("Incorrect username or password")
        }

        const hashedPassword = user[0].hashed_Password

        //Compare hashed passwords
        bcrypt.compare(password, hashedPassword, function (err, passwordMatches) {
            if (err) {
              return next(err)
            }

            if (passwordMatches) {
              return res.send("Logged in successfully")
            }

            res.send("Incorrect username or password")
        })
    })
})

//Handle registration form submission
router.post("/registered",
  //Validate registration form input 
  [
    body("first").notEmpty(),
    body("last").notEmpty(),
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty()
  ], 
function (req, res, next) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.redirect("/users/register")
    }

    //Retrieve values submitted through form
    const firstName = req.body.first
    const lastName = req.body.last
    const username = req.body.username
    const email = req.body.email
    const plainPassword = req.body.password

    //Checks for duplicate user entry
    const checkUserQuery = "SELECT id FROM users WHERE username = ? OR email = ?"

    db.query(checkUserQuery, [username, email], function(err, results) {
        if (err) {
            return next(err)
        }
        
        if (results.length > 0) {
          return res.send("Username or Email already exists")
        }

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
})

//Export the router
module.exports = router;