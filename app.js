var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');

var indexRoutes = require('./routes/index');
var campgroundRoutes = require('./routes/campgrounds');
var commentsRoutes = require('./routes/comments');

//seedDB();

//Passport Config
app.use(require('express-session')({
   secret: "There is another skywalker.",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MongoDB Connection
mongoose.connect('mongodb://localhost/camp_app');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Pass in user data for all templates
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//Routes
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments',commentsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started."); 
});