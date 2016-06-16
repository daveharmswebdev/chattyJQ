var chatty = (function($, chat) {

	function init() {
		$.ajax({
			url: 'data/users.json'
		}).done(function(usersContent) {
			var tempUsers = usersContent.users;
			tempUsers.forEach(loadOption);
			tempUsers.forEach((user) => chat.setUsers(user));
		});
		$.ajax({
			url: 'data/messages.json'
		}).done(function(messagesContent) {
			var tempMessages = messagesContent.messages;
			tempMessages = tempMessages.map(convertMessage);
			tempMessages.forEach((message) => chat.setMessages(message));
			chatty.postMessages();			
		});
	}

	function convertMessage(message) {
		var obj = {};
		obj.user = message.user;
		obj.message = message.message;
		obj.time = new Date().toUTCString();
		return obj;
	}

	function loadOption(user) {
		$('#userSelect').append(getOptionString(user));
	}

	function getOptionString(user) {
		return `<option value=${user.name}>${user.name}</option>`;
	}

	init();

	return chat;

})(jQuery, chatty || {});
