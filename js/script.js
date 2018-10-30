var parsedData = [];

var myRequest = new XMLHttpRequest();
myRequest.open("GET", "json/conversations.json", true);
myRequest.onload = function() {
	parsedData = JSON.parse(myRequest.responseText);
	showUsers();
}
myRequest.send();

function showUsers() {
	for (var i = 0; i < parsedData.length; i++) {
		var user = parsedData[i];

		document.getElementById("aside").innerHTML += '<div id="user-image" onclick="showUserMessages()"><img src="img/'+ user.name +'.jpg"><div class="user-data">' +
		'<div class="user-name">' + user.name +'</div><div class="user-status">'+ user.status +'</div></div></div>'
	}
}
