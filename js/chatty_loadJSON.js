var chatty = (function($) {

	var users,
		messages;

	function init() {
		$.ajax({
			url: 'data/users.json'
		}).done(function(usersContent) {
			users = usersContent.users;
		});
		$.ajax({
			url: 'data/messages.json'
		}).done(function(messagesContent) {
			messages = messagesContent.messages;
		})
	}

	init();

	return {
		getUsers: () => users,
		getMessages: () => messages
	};

})(jQuery);
