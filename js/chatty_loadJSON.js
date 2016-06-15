var chatty = (function($, chat) {

	function init() {
		$.ajax({
			url: 'data/users.json'
		}).done(function(usersContent) {
			chat.users = usersContent.users;
			chat.users.forEach(loadOption);
		});
		$.ajax({
			url: 'data/messages.json'
		}).done(function(messagesContent) {
			chat.messages = messagesContent.messages;
		});
	}

	function loadOption(user) {
		console.log(user.name, getOptionString(user));
		$('#userSelect').append(getOptionString(user));
	}

	function getOptionString(user) {
		return `<option value=${user.name}>${user.name}</option>`;
	}

	init();

	return chat;

})(jQuery, chatty || {});
