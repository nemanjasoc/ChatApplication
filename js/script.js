var data = [];
var userIndex;

function getUserData() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText);
			showUsers();
		}
	}
	xhttp.open("GET", "json/conversations.json", true);
	xhttp.send();
}
console.log("data: ", data);

function showUsers() {
	var aside = document.getElementById("aside");

	for (var i = 0; i < data.length; i++) {
		var user = data[i];
		
		aside.innerHTML += '<div class="user-content" id="user-content-'+ i +'" onclick="showUserMessages('+ i +')">' +
								'<img src="img/'+ user.name.toLowerCase() +'.jpg">' +
								'<div class="user-data">' + 
									'<div class="user-name">' + user.name +'</div>' +
									'<div class="user-status">'+ user.status +'</div>' +
								'</div>' +
							'</div>';
	}
}

function showUserMessages(currentUser) {
	console.log("currentUser: ", currentUser);
	var selectAll = document.querySelectorAll(".user-content");
	var messagesContent = document.getElementById("messages-content");

	for (var i = 0; i < selectAll.length; i++) {
		var select = selectAll[i];
	
		if (select) {
			select.classList.remove('active');
		}
	}
	
	document.getElementById(`user-content-${currentUser}`).classList.add("active");

	var user = data[currentUser];
	userIndex = currentUser;
	console.log("global: ", userIndex);

	for (var i = 0; i < user.messages.length; i++) {
		var message = user.messages[i];
		
		messagesContent.innerHTML += getMessageTemplate(message);
	}

	updateScroll();
}

function getMessageTemplate(message) {
	var messageType = message.type;
	var classType = "";

	if (messageType == 'received') {
		classType = 'received';
	} else {
		classType = 'sent';
	}

	var template = `<div class="messages-${classType}">` +
						`<div class="message-${classType}-content">${message.content}</div>` +
						`<div class="message-${classType}-date">` + new Date(message.time).toLocaleTimeString() +`</div>` +
					`</div>`;
			   
	return template;
}

function sendMessage() {
	var inputElement = document.getElementById('text-message');
	var messagesContent = document.getElementById('messages-content');

	var sentMessage = {
		"time": new Date().getTime(),
		"content": inputElement.value,
		"type": "sent"
	};

	messagesContent.innerHTML = messagesContent.innerHTML + getMessageTemplate(sentMessage);
	
	inputElement.value = "";

	updateScroll();
}

function updateScroll(){
	var element = document.getElementById("messages-content");
	element.scrollTop = element.scrollHeight;
}

getUserData();
