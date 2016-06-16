var chatty = (function($, chat) {

    // private variables
    var messageCounter = 0,
    	elMessagesDiv = $('#messagesDiv'),
    	users = [],
    	messages = [],
    	archive = [];

    elMessagesDiv.on('click', '.btnDelete', function(event) {
    	var idToDelete = parseInt(event.target.id.split('--')[1]);
    	event.target.closest('.message').remove();
    	chat.removeFromMessages(idToDelete);
    });

    chat.renderMessage = function(user, message, time, id) {
        var elMessDiv = $('<div/>').attr({
            id: `message--${id}`,
            class: 'message'
        }).appendTo(elMessagesDiv);
        var elPUser = $('<p/>').attr({
            id: `user--${id}`,
            class: 'user'
        }).text(user).appendTo(elMessDiv);
        var elPMessage = $('<p/>').attr({
            id: `content--${id}`,
            class: 'content'
        }).text(message).appendTo(elMessDiv);
        var elSpanTime = $('<span/>').attr({
            class: 'time'
        }).text(time).appendTo(elPMessage);
        var elBtnDelete = $('<button/>;').attr({
        	id: `delete--${id}`,
        	class: 'btnDelete'
        }).text('Delete').appendTo(elMessDiv);
        var elBtnEdit = $('<button/>;').attr({
        	id: `edit--${id}`,
        	class: 'btnEdit'
        }).text('Edit').appendTo(elMessDiv);
    };
    chat.postMessages = function() {
    	messages.forEach((message) => chat.renderMessage(message.user, message.message, message.time, message.id));
    };
    chat.setUsers = (user) => users.push(user);
    chat.getUsers = () => users;
    chat.setMessages = (message) => messages.push(message);
    chat.getMessages = () => messages;
    chat.removeFromMessages = function(id) {
    	let deleteIndex = messages.findIndex(function(message) {
    		return message.id === id;
    	});
    	archive.push(messages.splice(deleteIndex, 1));
    	console.log(archive);
    };
    chat.setMessageCounter = (num) => messageCounter = num;

    return chat;

})(jQuery, chatty || {});
