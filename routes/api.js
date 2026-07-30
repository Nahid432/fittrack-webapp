//import required modules
const express = require("express")

//creates router object for handling routes
const router = express.Router()

router.get('/exercises', function (req, res, next) {

    //Query database to get all the exercises
    let sqlquery = "SELECT * FROM exercises"

    //Execute the sql query
    db.query(sqlquery, (err, result) => {

        //Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})

module.exports = router