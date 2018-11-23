function buildQueryString()
{
    var city = 'city=' + document.getElementById('city').value + '&'; 
    var state = 'state=' + document.getElementById('state').value + '&'; 
    var passengers = 'passengers=' + document.getElementById('passengers').value + '&'; 
    var pets = 'pets=' + document.getElementById('pets').value; 
    return city + state + passengers + pets; 
}

$(document).ready(function(){
        $.get("leavingPosts", function(data, status){ //make ajax call to the forum, gets all posts
            data.posts.forEach((ride) => { //display results
                var $post = $("<div class='list-group-item' id='"+ ride.UserId + "'>" 
				+ "<p>Address: " + ride.street + "</p>" 
				+ "<p>State: " + ride.state + "</p>"
				+ "<p>City: " + ride.city + "</p>" 
				+ "<p>Space: " + ride.space + "</p>" 
				+ "<p>Pets: " + ride.pets + "</p>" 
				+ "<p>Message: " + ride.message + "</p>" 
				+ "</div>"); 
                $("#postsDiv").append($post); 
            })
    }); 
}); 

$(document).ready(function(){
    $("#search").click(function(){
            var query = "leavingPosts?" + buildQueryString(); 
            $.get(query, function(data, status){ //make ajax call to the forum
                $("#postsDiv").empty(); 
                data.posts.forEach((ride) => { //display results
					var $post = $("<div class='list-group-item' id='"+ ride.UserId + "'>" 
					+ "<p>Address: " + ride.street + "</p>" 
					+ "<p>State: " + ride.state + "</p>"
					+ "<p>City: " + ride.city + "</p>" 
					+ "<p>Space: " + ride.space + "</p>" 
					+ "<p>Pets: " + ride.pets + "</p>" 
					+ "<p>Message: " + ride.message + "</p>" 
					+ "</div>"); 
					$("#postsDiv").append($post); 
                }); 
        }); 
    }); 
}); 
