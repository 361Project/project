//checks that all form inputs have values
function checkPostForm() 
{
	var idx;
	var sync = "waiting"; 
	var end = "waiting"; 
	var validEmail; 
	
	function checkEmail(){
		var email = document.getElementById("email").value; 
		var xhttp = new XMLHttpRequest(); 
		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200)
			{
				if(xhttp.responseText.length == 0)
				{
					end = "done"; 
					return false; 
				}
				else
				{
					end = "done"; 
					return true; 
				}
			}
		}
	
		xhttp.open("GET", "checkEmail?email=" + email, true); 
		xhttp.send(); 
	}

	console.log("before"); 
	validEmail = checkEmail(); 
	while(sync != "done")
	{
		sync = end; 
		console.log(sync); 
	}

	if(!checkEmail())
	{
		 document.getElementById("alert_message").innerHTML = "Invalid email, please sign up before posting"; 
		 document.getElementById("alert_message").style.visibility = "visible"; 
		 return false; 
	}

	var inputs = document.getElementsByTagName('input'); 
	for(idx = 0; idx < inputs.length; idx++)
	{
		if(inputs[idx].value == "")
		{
		 document.getElementById("alert_message").style.visibility = "visible"; 
			return false; 
		}
	}
	return true; 
}

