const express = require("express")
const request = require("request")

const router = express.Router()

router.get("/meals", function (req, res, next) {

    let search = req.query.search_text || ""

    //The request URL for TheMealDB API using the user's search term
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(search)

    //Send a request to the external API and retrieve meal information
    request(url, function(err, response, body){

        if(err){
           return next(err)
        }
        else{
            
            //Convert the JSON response into a JavaScript object
            let mealData = JSON.parse(body)

            res.render("external_api.ejs", {
                mealData: mealData.meals,
                search: search
            })

        }

    })

})

module.exports = router