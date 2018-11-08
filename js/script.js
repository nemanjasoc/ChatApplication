var data = [];
var userIndex;

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/chat/1", true);
xhr.onload = function() {
	data = JSON.parse(xhr.responseText).data;
	showUsers();
}
xhr.send();

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

	resetUserMessages();

	for (var i = 0; i < user.messages.length; i++) {
		var message = user.messages[i];
		var messageType = message.type;
		var classType = "";

		if (messageType == 'received') {
			classType = 'received';
		} else {
			classType = 'sent';
		}
		
		messagesContent.innerHTML += `<div class="messages-${classType}">` +
										`<div class="message-${classType}-content">${message.content}</div>` +
										`<div class="message-${classType}-date">` + new Date(message.time).toLocaleTimeString() +`</div>` +
									`</div>`;
	}

	updateScroll();
}

function resetUserMessages() {
	document.getElementById("messages-content").innerHTML = '';
}

function updateScroll(){
	var element = document.getElementById("messages-content");
	element.scrollTop = element.scrollHeight;
}

function sendMessage() {
	var inputValue = document.getElementById("text-message").value;

	data[userIndex].messages.push({
		"time": Date.now(),
		"content": inputValue,
		"type": "sent"
	});

	var obj = {
		data: data
	};

	xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://localhost:3000/chat/1", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			data = JSON.parse(xhr.responseText).data;
			showUserMessages(userIndex);
		}
	}    
	xhr.send(JSON.stringify(obj));

	document.getElementById("text-message").value = '';
}
