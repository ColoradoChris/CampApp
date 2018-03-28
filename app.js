var express = require('expres');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('landing'); 
});

app.get('/campgrounds', function(req, res){
   res.render('campgrounds'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started."); 
});