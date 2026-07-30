const express = require("express")
const request = require("request")

const router = express.Router()

router.get("/meals", function (req, res, next) {

    let search = req.query.search_text || ""

    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(search)

    request(url, function(err, response, body){

        if(err){
           return next(err)
        }
        else{

            let mealData = JSON.parse(body)

            res.render("external_api.ejs", {
                mealData: mealData.meals,
                search: search
            })

        }

    })

})

module.exports = router