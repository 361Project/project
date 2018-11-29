function buildQueryString()
{
    var city = 'city=' + document.getElementById('city').value + '&'; 
    var state = 'state=' + document.getElementById('state').value + '&'; 
    var passengers = 'passengers=' + document.getElementById('passengers').value + '&'; 
    var pets = 'pets=' + document.getElementById('pets').value; 
    return city + state + passengers + pets; 
}

//onload function that displays posts based on the forum user clicked
function displayPosts(forum)
{
	if(forum != "home")
	{
		var route = "posts"; 
		switch(forum)
		{
			case "leaving":
				route += "?offer=ride"; 
				break; 
			case "arriving": 
				route += "?offer=shelter"; 
				break; 
			case "waiting":
				route += "?offer=donation"; 
				break; 
		}
    	$.get(route, function(data, status){ //make ajax call to the forum, gets all posts
    	        data.posts.forEach((post) => { //display results
    	            var $post = $("<div class='list-group-item' id='"+ post.UserId + "'>" 
					+ "<p>Address: " + post.street + "</p>" 
					+ "<p>State: " + post.state + "</p>"
					+ "<p>City: " + post.city + "</p>" 
					+ "<p>Space: " + post.space + "</p>" 
					+ "<p>Pets: " + post.pets + "</p>" 
					+ "<p>Message: " + post.message + "</p>" 
                    + "<form method='get'>"
                    + "<input type='hidden' name='PostId' value='" + post.Id + "'>"
                    + "<button type='submit' formaction='/viewPost'>View Post</button>"
                    + "<button type='submit' formaction='/editPost'>Edit</button>"
                    + "<button type='submit' formaction='/deletePost'>Delete</button>"
                    + "</form>"
					+ "</div>"); 
    	            $("#postsDiv").append($post); 
    	        })
    	}); 
	}
}

//filtered search button, argument determines which type of posts we filter: ride, shelter, or donation
function filterSearch(offer)
{
	var route = "posts"; 
	switch(offer)
	{
		case "leaving":
			route += "?offer=ride"; 
			break; 
		case "arriving": 
			route += "?offer=shelter"; 
			break; 
		case "waiting":
			route += "?offer=donation"; 
			break; 
	}
	route += "&" + buildQueryString(); 
    $.get(route, function(data, status){ //make ajax call to the forum
        $("#postsDiv").empty(); 
        data.posts.forEach((post) => { //display results
			var $post = $("<div class='list-group-item' id='"+ post.UserId + "'>" 
			+ "<p>Address: " + post.street + "</p>" 
			+ "<p>State: " + post.state + "</p>"
			+ "<p>City: " + post.city + "</p>" 
			+ "<p>Space: " + post.space + "</p>" 
			+ "<p>Pets: " + post.pets + "</p>" 
			+ "<p>Message: " + post.message + "</p>" 
            + "<form method='get'>"
            + "<input type='hidden' name='PostId' value='" + post.Id + "'>"
            + "<button type='submit' formaction='/editPost'>Edit</button>"
            + "<button type='submit' formaction='/deletePost'>Delete</button>"
            + "</form>"
			+ "</div>"); 
			$("#postsDiv").append($post); 
        }); 
	}); 
}
