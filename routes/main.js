//Import Express
const express = require("express")

//Create router object for handling main site routes
const router = express.Router()

//Display home page
router.get('/',function(req, res, next){
    res.render('index.ejs', {
        loggedInUser: req.session.user
    })
})

router.get("/about", function(req, res) {
    res.render("about.ejs")
})

//Export router object
module.exports = router