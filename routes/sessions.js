var express = require("express"),
    router  = express.Router();

var Session = require("../models/session");

router.get("/",function(req, res){
    Session.aggregate([{
        $group: {
            _id: '$language',
            hours: {$sum: '$hours'}
        }
    }],function(err, sessions){
        Session.aggregate([{
            $group: {
                _id: null,
                hours: {$sum: "$hours"}
            }
        }], function(err, hours){
            let percent = Math.round((hours[0].hours/(22*365*24)*100000))/100000
            if (err) {
                res.redirect("/")
            } else {
                console.log(sessions);
                
                return res.render("sessions/index", {data: sessions, percent:percent});
            }
            
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
    }, function(err){
        if(err){
            res.redirect("/")
        } else {
            res.redirect("/sessions")    
        }
    })
});

module.exports = router;