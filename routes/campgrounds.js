var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');
var date = require('date-and-time');

router.get('/', function(req, res){
   Campground.find({}, function(err, allCampgrounds){
      if(err){
         console.log(err);
      } else {
         res.render('campgrounds/index', {campgrounds: allCampgrounds}); 
      }
   });
});

router.post('/', middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   };
   var newCampground = {name: name, price: price, image: image, description: desc, author: author};
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
         console.log(err);
         req.flash('error', 'Something went wrong; could not create the campground.');
         res.redirect('back');
      } else {
         req.flash('success', 'Created a new campground! Check it out!');
         res.redirect('/campgrounds');
      }
   });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('campgrounds/new');
});

router.get('/:id', function(req, res){
   Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
      if(err){
         console.log(err);
         req.flash('error', 'Could not find the requested campground.');
         res.redirect('back');
      } else {
         res.render('campgrounds/show', {campground: foundCampground, date: date});
      }
   });
});

//Edit Campground Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
         req.flash('error', 'Could not find the requested campground.');
         res.redirect('back');
      } else {
         res.render('campgrounds/edit', {campground: foundCampground}); 
      }
   });
});

//Update Campground Route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
         console.log(err);
         req.flash('error', 'Could not update the selected campground.');
         res.redirect('/campgrounds');
      } else {
         req.flash('success', 'Updated the campground! Check it out!');
         res.redirect('/campgrounds/' + req.params.id);
      }
   });
});

//Destroy Campground Route
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
         console.log(err);
         req.flash('error', 'Could not delete the selected campground.');
         res.redirect('/campgrounds');
      } else {
         req.flash('success', 'Successfully deleted the campground!');
         res.redirect('/campgrounds');
      }
   });
});

module.exports = router;