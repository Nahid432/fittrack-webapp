//Import Express
const express = require("express")

//Create router object for handling main site routes
const router = express.Router()

//Middleware to restrict workout pages to logged-in users
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/users/login")
    }

    next()
}

//Display all workouts belonging to the logged-in user
router.get("/", requireLogin, function(req, res, next) {

  //Retrieve the currently logged-in user's ID
  const userId = req.session.user.id

  const sqlQuery = "SELECT * FROM workouts WHERE user_id = ? ORDER BY created_at DESC"

  db.query(sqlQuery, [userId], function(err, workouts) {
      if (err) {
        return next(err)
      }

      res.render("workout_plans.ejs", { workouts: workouts })
  })
})

router.get("/create", requireLogin, function (req, res) {
    res.render("create_workout")
})

router.post("/created", requireLogin, function (req, res, next) {

    const workoutName = req.body.workout_name
    const userId = req.session.user.id

    //Check whether the user already has a workout with same name
    const checkQuery = "SELECT id FROM workouts WHERE user_id = ? AND workout_name = ?"

    db.query(checkQuery, [userId, workoutName], function(err, results) { 
        if (err) {
            return next(err)
        }

        if (results.length > 0) {
            return res.send("You already have a workout with this name")
        }
        
        //Insert the new workout into the database
        const insertQuery = "INSERT INTO workouts (user_id, workout_name) VALUES (?,?)"

        db.query(insertQuery, [userId, workoutName], function(err, result) {
            if (err) {
                return next(err)
            }

            res.redirect("/workouts")
        })
      })


})

module.exports = router