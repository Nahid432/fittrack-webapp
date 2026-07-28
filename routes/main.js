// Import Express module
const express = require("express")

// Create router object for handling main site routes
const router = express.Router()

// Display home page
router.get('/',function(req, res, next){
    res.render('index.ejs')
})


// Export router object
module.exports = router