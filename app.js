//author: Group 25 
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('public')); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);
app.set('mysql', mysql);
//app.use('/leaving', require('./leaving.js')); 
//app.use('/arriving', require('./arriving.js')); 
//app.use('/waiting', require('./waiting.js')); 

//Test URL 
//http://flip1.engr.oregonstate.edu:8080/insertUserAccount?passwords=year&fname=corey&lname=broyles&picture=picture&age=99&phone=99966666&email=yeahhoo
app.get('/insertUserAccount', function(req, res, next){
	var context = {};
	
	mysql.pool.query("INSERT INTO UserAccount (fname, lname, email, phone, picture, age, passwords) VALUES (?, ?, ?, ?, ?, ?, ?)",
			 [req.query.fname, req.query.lname, req.query.email, req.query.phone, req.query.picture, req.query.age, req.query.passwords], function(err, result){
 			
			if(err){
				next(err);
				return; 
			}
			//This might have to be changed to user page once implemented 
			context.results = "Inserted id" + result.id; 
			res.render('home', context);
	
	});
});
app.get('/signup', function(req, res){
	var context = {};
	context.title = 'Signup';
	res.render('signup', context);
}); 
app.get('/insertPost', function(req, res, next){
	var context = {};
//Test URL 
//http://flip1.engr.oregonstate.edu:8080/insertPost?UserId=4&title=helphere&dateOfPost=9999-12-31&dateRequesting=9999-12-31&timeRequesting=9999-12-31&message=weareheretohelp&pets=2&offerType=shelter&space=4&city=boise&street=funstrt&state=id&zip=83714	
	mysql.pool.query("INSERT INTO Post (UserId, title, dateOfPost, dateRequesting, timeRequesting, message, pets, offerType, space, city, street, state, zip)" + 
			"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.query.UserId, req.query.title, req.query.dateOfPost, req.query.dateRequesting,
			 req.query.timeRequesting, req.query.message, req.query.pets, req.query.offerType, req.query.space, req.query.city, req.query.street,
			 req.query.state, req.query.zip], function(err, result){
	if(err){
		next(err);
		return; 
	}
	context.results = "Id =" + result.id

	res.render('home', context); 

	});
});

//Test URL
//http://flip1.engr.oregonstate.edu:8080/deleteUserAccount?UserId=4
app.get('/deleteUserAccount', function(req, res, next){
    var context = {};
    mysql.pool.query("DELETE FROM Post WHERE UserId = ?", [req.query.UserId], function(err, result){
        if(err){
            next(err);
            return;
        }
        mysql.pool.query("DELETE FROM UserAccount WHERE Id = ?", [req.query.UserId], function(err, result){
            if(err){
                next(err);
                return;
            }
            context.results = 'Deleted Row:' + result.affectedRows;

            res.render('home',context);
        })
    })
})

//Test URL
//http://flip1.engr.oregonstate.edu:8080/deletePost?PostId=3
app.get('/deletePost', function(req, res, next){
    var context = {};
    mysql.pool.query("DELETE FROM Post WHERE Id = ?", [req.query.PostId], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = 'Deleted Row:' + result.affectedRows;

        res.render('home',context);
    })
})


app.get('/', function(req, res){
    var context = {}; 
    context.title = "Evacuation App"; 
    res.render('home', context); 
}); 

app.get('/leaving', function(req, res){
    var context = {}; 
    context.jsscripts = ["displayLeavingPosts.js"]; //this script contains jquery for ajax calls
    context.title = "Leaving Forum"; 
    res.render('leaving', context); 
}); 

//Route catches Jquery ajax requests for posts and filtered searches 
//TODO: same strategy for other forums
app.get('/leavingPosts', function(req, res, next){
    var context = {}; 
	if(Object.keys(req.query).length == 0) //no query string
	{
		mysql.pool.query("SELECT * FROM Post WHERE offerType = 'ride'", function(err, results){
			if(err){
				next(err);
				return;
			}
			context.posts = results; 
			res.send(context);
		}); 
	}
	else //build the sql query based on filters
	{
		var sql = "SELECT * FROM Post WHERE offerType = 'ride'";  
		var inserts = [];
		if(req.query.city || req.query.state || req.query.passengers || req.query.pets)
		{
			sql += " AND"; 
		}
		if(req.query.city)
		{
			sql += " city = ?"; 
			inserts.push(req.query.city);
			if(req.query.state || req.query.passengers || req.query.pets) 
			{
				sql += " AND"; 
			}
		}
		if(req.query.state)
		{
			sql += " state = ?"; 
			inserts.push(req.query.state);
			if(req.query.passengers || req.query.pets) 
			{
				sql += " AND"; 
			}
		}
		if(req.query.passengers)
		{
			sql += " space >= ?"; 
			inserts.push(req.query.passengers);
			if(req.query.pets) 
			{
				sql += " AND"; 
			}
		}
		if(req.query.pets)
		{
			sql += " pets >= ?"; 
			inserts.push(req.query.pets);
		}
		mysql.pool.query(sql, inserts, function(err, results){
			if(err){
				next(err);
				return;
			}
			context.posts = results; 
			res.send(context);
		}); 
	}
}); 

app.get('/arriving', function(req, res){
    var context = {}; 
    context.title = "Arriving Forum"; 
    res.render('arriving', context); 
}); 

app.get('/waiting', function(req, res){
    var context = {}; 
    context.title = "Waiting Forum"; 
    res.render('waiting', context); 
}); 

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
