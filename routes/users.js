//Import Express
const express = require("express")

//Create a router
const router = express.Router()

//Display the registration page
router.get("/register", (req, res) => {
    res.render("register");
});

//Handle registration form submission
router.post("/registered", (req, res) => {
    res.send("Registered")
})

//Export the router
module.exports = router;