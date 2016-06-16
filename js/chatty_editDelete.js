var chatty = (function($, chat) {

	chat.editMessage = () => console.log('edit');
	chat.deleteMessage = () => console.log('delete');

	return chat;

})(jQuery, chatty || {});