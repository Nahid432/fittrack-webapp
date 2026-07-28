//Import Express
const express = require("express")

//Create a router for exercise-related routes
const router = express.Router()

router.get('/list', function(req,res, next) {
  const sqlQuery = "SELECT * FROM exercises"

  db.query(sqlQuery, function(err, results) {
    if (err) {
        return next(err)
    }

    res.render("exercise_list.ejs", {availableExercises: results})
  })
})

module.exports = router