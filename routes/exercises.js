//Import Express
const express = require("express")

//Create a router for exercise-related routes
const router = express.Router()

router.get('/list', function(req,res, next) {

  // Retrieve values from the URL query string
  const name = req.query.exercise_name || ""
  const muscleGroup = req.query.muscle_group || ""

  let sqlQuery = "SELECT * FROM exercises WHERE 1 = 1"

  const queryValues = []

  // Search by exercise name
  if (name !== "") {
    sqlQuery += " AND name LIKE ?"
    queryValues.push("%" + name + "%")
  }

  // Filter by muscle group
  if (muscleGroup !== "") {
    sqlQuery += " AND muscle_group = ?"
    queryValues.push(muscleGroup)
  }

  db.query(sqlQuery, queryValues, function(err, results) {
    if (err) {
        return next(err)
    }

    res.render("exercise_list.ejs", {
      availableExercises: results,
      exerciseName: name,
    })
  })
})

module.exports = router