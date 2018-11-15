//author: Group 25

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
//var mysql = require('./dbcon.js'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('public')); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6045);
//app.set('mysql', mysql);
//app.use('/leaving', require('./leaving.js')); 
//app.use('/arriving', require('./arriving.js')); 
//app.use('/waiting', require('./waiting.js')); 

app.get('/', function(req, res){
    var context = {}; 
    context.header = "Evacuation App"; 
    res.render('home', context); 
}); 

//app.use(function(req,res){
//  res.status(404);
//  res.render('404');
//});
//
//app.use(function(err, req, res, next){
//  console.error(err.stack);
//  res.type('plain/text');
//  res.status(500);
//  res.render('500');
//});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
