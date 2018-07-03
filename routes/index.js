var express = require("express"),
    router = express.Router();

var Session = require("../models/session");

router.get("/", function(req, res) {
    Session.aggregate([{
        $group: {
            _id: null,
            hours: {$sum: "$hours"}
        }
    }], function(err, hours){
        // console.log(hours);
        if (err) {
            return res.redirect("/");
        } else {
            return res.render("index", {data:hours});
        }
    })
});

module.exports = router;