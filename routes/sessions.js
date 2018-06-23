var express = require("express"),
    router  = express.Router();

var Session = require("../models/session");

router.get("/",function(req, res){
    group_by_language_sum_hours(function(err, sessions){
        Session.aggregate([{
            $group: {
                _id: null,
                hours: {$sum: "$hours"}
            }
        }], function(err, hours){
            let percent = Math.round((hours[0].hours/(22*365*24)*100000))/100000
            return res.render("sessions/index", {data: sessions, percent:percent});
            
        })
    })
})

router.post("/", function(req, res){
    var l = req.body.language,
        f = req.body.framework,
        h = req.body.hours,
        t = req.body.topic;

    Session.create({
        language: l,
        framework: f,
        hours: h,
        topic: t,
    })
    res.redirect("/sessions")    
});


function group_by_language_sum_hours(callback){
    Session.aggregate([{
        $group: {
            _id: '$language',
            hours: {$sum: '$hours'}
        }
    }], callback)   
}

module.exports = router;