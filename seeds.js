var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cherry Hill",
        image: "https://docnz.files.wordpress.com/2014/02/daniel-deans-camping-tent.jpg",
        description: "This large hill made of pure cherries is where the cherry on top is sweetest!"
    },
    {
        name: "Mt. Doom",
        image: "http://www.doc.govt.nz/pagefiles/150924/routeburn-flats-campsite-tahu-tk-1200-3.jpg",
        description: "Mt. Doom haunts this location by staring down the campground ominously. Don't worry, it hasn't been active for 5 years!"
    },
    {
        name: "Hobbiton",
        image: "https://mikeputnamphoto.files.wordpress.com/2008/08/lower-meadow-campsite.jpg",
        description: "Hobbiton lies off in the distance. You can hear the hobbits sing their merry songs."
    },
    {
        name: "Blood Lake",
        image: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg",
        description: "The lake full of blood has only claimed one life, but it was a bloody struggle!"
    },
    {
        name: "Quiet Forest",
        image: "http://www.nextcampsite.com/wp-content/uploads/2012/08/Big-Lagoon-County-Park-Campground-P05.jpg",
        description: "This forest is the proverbial answer to if a tree falls in the forest does it make a sound? The answer is definitively, no. Science can't explain why, but there is no sound here; it is quite peaceful."
    },
    ];

function seedDB(){
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       } else {
           console.log("All campgrounds were removed from the Database.");
           data.forEach(function(seed){
              Campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err);
                 } else {
                     console.log("Campground was added to the DB.");
                    //  Comment.create(
                    //     {
                    //         text: "This campground was stinky.",
                    //         author: "Bruce Wayne"
                    //     }, function(err, comment){
                    //       if(err){
                    //           console.log(err);
                    //       } else {
                    //           campground.comments.push(comment);
                    //           campground.save();
                    //           console.log("Created a new comment.");
                    //       }
                    //     });
                 }
              });
           });
       }
    });
}

module.exports = seedDB;