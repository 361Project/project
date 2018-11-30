//checks that all form inputs have values
function checkValues() 
{
	var idx; 
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
