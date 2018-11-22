function buildQueryString()
{
    var city = 'city=' + document.getElementById('city').value + '&'; 
    var state = 'state=' + document.getElementById('state').value + '&'; 
    var passengers = 'passengers=' + document.getElementById('passengers').value + '&'; 
    var pets = 'pets=' + document.getElementById('pets').value + '&'; 
    return city + state + passengers + pets; 
}

$(document).ready(function(){
        $.get("leavingPosts", function(data, status){ //make ajax call to the forum, gets all posts
            data.posts.forEach((ride) => { //display results
                var $post = $("<div id='"+ ride.name + "'>" + ride.name + "</div>"); 
                $("#postsDiv").append($post); 
            })
    }); 
}); 

$(document).ready(function(){
    $("#search").click(function(){
            var query = "leavingPosts?" + buildQueryString(); 
            $.get(query, function(data, status){ //make ajax call to the forum
                console.log(data); 
                $("#postsDiv").empty(); 
                data.posts.forEach((ride) => { //display results
                    var $post = $("<div id='"+ ride.name + "'>" + ride.name + "</div>"); //build divs based on db results
                    $("#postsDiv").append($post); 
                })
        }); 
    }); 
}); 
