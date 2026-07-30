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

router.get("/:id/add", requireLogin, function(req, res, next) {

    const workoutId = req.params.id
    const userId = req.session.user.id

    const workoutQuery = "SELECT * FROM workouts WHERE id = ? AND user_id = ?"

    db.query(workoutQuery, [workoutId, userId], function(err, workouts) {

        if (err) {
            return next(err)
        }

        if (workouts.length === 0) {
            return res.status(404).send("Workout not found")
        }

        const exerciseQuery = "SELECT * FROM exercises ORDER BY name ASC"
        

        db.query(exerciseQuery, function(err, exercises) {

            if (err) {
                return next(err)
            }

            res.render("add_workout_exercise.ejs", {
                workout: workouts[0],
                exercises: exercises
            })
        })
    })
})

router.post("/:workoutId/exercises/:exerciseId/add", requireLogin, function(req, res, next) { 

    const workoutId = req.params.workoutId
    const exerciseId = req.params.exerciseId
    const userId = req.session.user.id

    //Check that the workout belongs to the logged-in user
    const workoutQuery =
        "SELECT id FROM workouts WHERE id = ? AND user_id = ?"

    db.query(workoutQuery, [workoutId, userId], function(err, workouts) {
        if (err) {
            return next(err)
        }

        if (workouts.length === 0) {
            return res.status(404).send("Workout not found")
        }

        //Add the exercise to the workout
        const insertQuery ="INSERT INTO workout_exercises (workout_id, exercise_id) VALUES (?, ?)"

        db.query(insertQuery, [workoutId, exerciseId], function(err) {
            if (err) {
                return next(err)
            }

            res.redirect("/workouts/" + workoutId)
        })
    })
})

router.get("/:id", requireLogin, function(req, res, next) {

    const workoutId = req.params.id
    const userId = req.session.user.id

    const sqlQuery = "SELECT id, workout_name FROM workouts WHERE id = ? AND user_id = ?"

    db.query(sqlQuery, [workoutId, userId], function(err, workouts) {
        if (err) {
            return next(err)
        }

        if (workouts.length === 0) {
            return res.status(404).send("Workout not found")
        }

        const exerciseQuery = `
            SELECT exercises.name,
                   exercises.muscle_group,
                   workout_exercises.set_count,
                   workout_exercises.rep_count
            FROM workout_exercises
            JOIN exercises
              ON workout_exercises.exercise_id = exercises.id
            WHERE workout_exercises.workout_id = ?
            ORDER BY exercises.name ASC
        `

        db.query(exerciseQuery, [workoutId], function(err, exercises) {
            if (err) {
                return next(err)
            }

            res.render("workout_details.ejs", {
                workout: workouts[0],
                exercises: exercises
            })
        })
    })
})

module.exports = router