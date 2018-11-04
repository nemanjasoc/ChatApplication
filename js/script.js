var data = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "json/conversations.json", true);
xhr.onload = function() {
	data = JSON.parse(xhr.responseText);
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
							'</div>'
	}
}

function showUserMessages(currentUser) {
	console.log("currentUser: ", currentUser);
	var selectAll = document.querySelectorAll(".user-content");
	var messagesContent = document.getElementById("messages-content");
	var user;

	for (var i = 0; i < selectAll.length; i++) {
		var select = selectAll[i];
	
		if (select) {
			select.classList.remove('active');
		}
	}
	
	document.getElementById(`user-content-${currentUser}`).classList.add("active");
	
	for (var i = 0; i < data.length; i++) {
		if (i == currentUser) {
			user = data[i];
		}
	}

	resetUserMessages();

	for (var j = 0; j < user.messages.length; j++) {
		var message = user.messages[j];
		var messagesType = message.type;
		var classType = "";

		if (messagesType == 'received') {
			classType = 'received';
		} else {
			classType = 'sent';
		}
		
		messagesContent.innerHTML += `<div class="messages-${classType}">` +
										`<div class="message-${classType}-content">${message.content}</div>` +
										`<div class="message-${classType}-date">` + new Date(message.time).toLocaleTimeString() +`</div>` +
									`</div>`;
	}
}

function resetUserMessages() {
	document.getElementById("messages-content").innerHTML = '';
}

function sendMessage() {
	var inputValue = document.getElementById("text-message").value;

	var newMessages = data;
	// todo
	var newData = JSON.stringify(newMessages);

    xhr = new XMLHttpRequest();
    xhr.open("POST", "json/conversations.json", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
            showUserMessages();
        }
    }    
    xhr.send(newData);
}
