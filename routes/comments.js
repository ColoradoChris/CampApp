var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//Comments Routes
router.get('/new', middleware.isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         req.flash('error', 'Apologies - Something went wrong.');
         res.redirect('back');
         console.log(err);
      } else {
         res.render('comments/new', {campground: campground});
      }
   });
});

router.post('/', function(req, res){
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
         req.flash('error', 'Apologies - Something went wrong.');
         res.redirect('/campgrounds');
      } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
               console.log(err);
               req.flash('error', 'Apologies - Something went wrong.');
               res.redirect('/campgrounds');
            } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash('success', 'New comment created! Check it out!');
               res.redirect('/campgrounds/' + campground._id);
            }
         });
      }
   });
});

//Comment Edit Route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, comment){
      if(err){
         console.log(err);
         req.flash('error', 'Apologies - Something went wrong.');
         res.redirect('back');
      } else {
         res.render('comments/edit', {campground_id: req.params.id, comment: comment}); 
      }
   });
});

//Comment Update Route
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
         console.log(err);
         req.flash('error', 'Apologies - Something went wrong.');
         res.redirect('back');
      } else {
         req.flash('success', 'Successfully edited your comment! Check it out!');
         res.redirect('/campgrounds/' + req.params.id);
      }
   });
});

//Comment Delete Route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
         req.flash('error', 'Apologies - Something went wrong.');
         res.redirect('back');
      } else {
         req.flash('success', 'Successfully deleted your comment!');
         res.redirect('/campgrounds/' + req.params.id);
      }
   });
});

module.exports = router;