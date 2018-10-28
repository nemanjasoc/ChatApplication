var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		document.getElementById('main-content').innerHTML = myObj;
	}
}
xmlhttp.open("GET", conversation.json, true);
xmlhttp.send();
