var express    = require("express"),
    app        = express(),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser"),
    Session = require("./models/session");


var sessionRoutes = require("./routes/sessions"),
    indexRoutes   = require("./routes/index")

mongoose.connect("mongodb://localhost/programming");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use(indexRoutes);
app.use(sessionRoutes);

app.listen(8000, function(){
    console.log("Hours of programming app!");
});



