var chatty = (function($, chat) {

    // private variables
    var messageCounter = 0,
    	elMessagesDiv = $('#messagesDiv'),
    	users = [],
    	messages = [];

    elMessagesDiv.on('click', '.btnDelete', function(event) {
    	var idToDelete = event.target.id.split('--')[1];
    	event.target.closest('.message').remove();
    	chat.removeFromMessages(idToDelete);
    });

    chat.renderMessage = function(user, message, time) {
        messageCounter++;
        var elMessDiv = $('<div/>').attr({
            id: `message--${messageCounter}`,
            class: 'message'
        }).appendTo(elMessagesDiv);
        var elPUser = $('<p/>').attr({
            id: `user--${messageCounter}`,
            class: 'user'
        }).text(user).appendTo(elMessDiv);
        var elPMessage = $('<p/>').attr({
            id: `content--${messageCounter}`,
            class: 'content'
        }).text(message).appendTo(elMessDiv);
        var elSpanTime = $('<span/>').attr({
            class: 'time'
        }).text(time).appendTo(elPMessage);
        var elBtnDelete = $('<button/>;').attr({
        	id: `delete--${messageCounter}`,
        	class: 'btnDelete'
        }).text('Delete').appendTo(elMessDiv);
        var elBtnEdit = $('<button/>;').attr({
        	id: `edit--${messageCounter}`,
        	class: 'btnEdit'
        }).text('Edit').appendTo(elMessDiv);
    };
    chat.postMessages = function() {
    	messages.forEach((message) => chat.renderMessage(message.user, message.message, message.time));
    };
    chat.setUsers = (user) => users.push(user);
    chat.getUsers = () => users;
    chat.setMessages = (message) => messages.push(message);
    chat.getMessages = () => messages;
    chat.removeFromMessages = function(id) {
    	messages.findIndex(function(message) {
    		return message.id === id;
    	});
    };

    return chat;

})(jQuery, chatty || {});
