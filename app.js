var express    = require("express"),
    app        = express(),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/programming");

var sessionSchema = new mongoose.Schema({
    language: String,
    framework: String,
    hours: Number,
    topic: String
})

var session = mongoose.model("session", sessionSchema);

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/hours", function(req, res){
    var l = req.body.language,
        f = req.body.framework,
        h = req.body.hours,
        t = req.body.topic;

    session.create({
        language: l,
        framework: f,
        hours: h,
        topic: t,
    })

    console.log(l + " " + f + " " + h + " " + t);
    res.redirect("results")    
});

app.get("/results",function(req, res){    
    session.find({}, function(err, sessions){
        if (err) {
            res.redirect("/")
        } else {
            res.render("results", {data: lanDict(sessions)});
        }
    })
  })

function lanDict(arr){
    aggregate = {}
    for (const lan of arr) {
        if (!(lan.language in aggregate)) {
            aggregate[lan.language] = lan.hours
        } else {
            aggregate[lan.language] += lan.hours
        }
    }
    return aggregate
}

app.listen(8000, function(){
    console.log("Hours of programming app!");
});