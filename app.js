//author: Group 25 
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        selected: function(a,b) {
            if (a == b) { return 'selected="selected"'; }
            return '';
        }
    }
});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('public')); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8081);
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
	mysql.pool.query("INSERT INTO Post (UserId, title, street, city, state, zip, dateRequesting, timeRequesting,  pets, offerType, space, message, dateOfPost)" + 
			"VALUES ((SELECT Id FROM UserAccount WHERE email=?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())", [req.query.email, req.query.title, req.query.street, req.query.city, req.query.state, req.query.zip, req.query.dateRequesting,
			 req.query.timeRequesting, req.query.pets, req.query.offerType, req.query.space, req.query.message], function(err, result){
	if(err){
		next(err);
		return; 
	}
	context.results = "Id =" + result.id

	res.render('home', context); 

	});
});
app.get('/makepost', function(req, res){
	var context = {};
	context.title = "MakePost";
	res.render('makepost', context);
});

app.get('/deleteAccount', function(req, res, next){
    var context = {};
    res.render('deleteaccount',context);
})

//Test URL
//http://flip1.engr.oregonstate.edu:8081/deleteUserAccount?UserId=4
app.get('/deleteUserAccount', function(req, res, next){
    var context = {};
    mysql.pool.query("DELETE FROM Post WHERE UserId = (SELECT Id FROM UserAccount WHERE email=?)", [req.query.email], function(err, result){
        if(err){
            next(err);
            return;
        }
        mysql.pool.query("DELETE FROM UserAccount WHERE email = ?", [req.query.email], function(err, result){
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
//http://flip1.engr.oregonstate.edu:8081/editPost?PostId=1
app.get('/editPost', function(req, res, next){
    var context = {};
    mysql.pool.query("SELECT * FROM Post WHERE Id = ?", [req.query.PostId], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.post = result;
        context.states = [
            { name: "Alabama"},
            { name: "Alaska"},
            { name: "Arizona"},
            { name: "Arkansas"},
            { name: "California"},
            { name: "Colorado"},
            { name: "Connecticut"},
            { name: "Delaware"},
            { name: "District of Columbia"},
            { name: "Florida"},
            { name: "Georgia"},
            { name: "Hawaii"},
            { name: "Idaho"},
            { name: "Illinois"},
            { name: "Indiana"},
            { name: "Iowa"},
            { name: "Kansas"},
            { name: "Kentucky"},
            { name: "Louisiana"},
            { name: "Maine"},
            { name: "Maryland"},
            { name: "Massachussets"},
            { name: "Michigan"},
            { name: "Minnesota"},
            { name: "Mississippi"},
            { name: "Missouri"},
            { name: "Montana"},
            { name: "Nebraska"},
            { name: "Nevada"},
            { name: "New Hampshire"},
            { name: "New Jersey"},
            { name: "New Mexico"},
            { name: "New York"},
            { name: "North Carolina"},
            { name: "North Dakota"},
            { name: "Ohio"},
            { name: "Oklahoma"},
            { name: "Oregon"},
            { name: "Pennsylvania"},
            { name: "Rhode Island"},
            { name: "South Carolina"},
            { name: "South Dakota"},
            { name: "Tennessee"},
            { name: "Texas"},
            { name: "Utah"},
            { name: "Vermont"},
            { name: "Virginia"},
            { name: "Washington"},
            { name: "West Virginia"},
            { name: "Wisconsin"},
            { name: "Wyoming"}
        ];
        res.render('editpost',context);
    })
})

app.get('/updatePost', function(req, res, nexxt){
    var context = {};
    mysql.pool.query("UPDATE Post SET title = ?, street = ?, city = ?, state = ?, zip = ?, dateRequesting = ?, timeRequesting = ?, pets = ?, offerType = ?, space = ?, message = ? WHERE Id = ?",
        [req.query.title, req.query.street, req.query.city, req.query.state, req.query.zip, req.query.dateRequesting, req.query.timeRequesting, req.query.pets, req.query.offerType, req.query.space, req.query.message, req.query.postId],function(err, result){
        if(err){
            next(err);
            return;
        }
        res.render('home',context);
    })
})

//Test URL
//http://flip1.engr.oregonstate.edu:8081/deletePost?PostId=3
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
	context.forum = "landing";
	context.title = "Evacuation App"; 
	context.layout = "landing-layout"
    res.render('landing', context); 
}); 

app.get('/home', function(req, res){
    var context = {}; 
	context.forum = "home";
    context.title = "Evacuation App"; 
    res.render('home', context); 
}); 

app.get('/leaving', function(req, res){
    var context = {}; 
	context.forum = "leaving"; //variable to indicate which posts to display
    context.title = "Leaving Forum"; 
    res.render('leaving', context); 
}); 

app.get('/arriving', function(req, res){
    var context = {}; 
	context.forum = "arriving";
    context.title = "Arriving Forum"; 
    res.render('arriving', context); 
}); 

app.get('/waiting', function(req, res){
    var context = {}; 
	context.forum = "waiting";
    context.title = "Waiting Forum"; 
    res.render('waiting', context); 
}); 

//Route catches Jquery ajax requests for posts and filtered searches 
app.get('/posts', function(req, res, next){
    var context = {}; 
	if(Object.keys(req.query).length == 1) //no query string, just forum title, get all posts of type ride, or shelter, or donation
	{
		var inserts = [req.query.offer]; 
		mysql.pool.query("SELECT * FROM Post WHERE offerType = ?", inserts, function(err, results){
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
		var sql = "SELECT * FROM Post WHERE offerType = ?"; 
		var inserts = [req.query.offer];
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
