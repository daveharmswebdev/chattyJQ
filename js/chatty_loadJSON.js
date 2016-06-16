var chatty = (function($, chat) {

	function init() {
		$.ajax({
			url: 'data/users.json'
		}).done(function(usersContent) {
			var tempUsers = usersContent.users;
			tempUsers.forEach(loadOption);
			tempUsers.forEach((user) => chat.users.push(user));
		});
		$.ajax({
			url: 'data/messages.json'
		}).done(function(messagesContent) {
			chat.messages = messagesContent.messages;
			chat.messages.forEach((message) => console.log(message));
		});
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
