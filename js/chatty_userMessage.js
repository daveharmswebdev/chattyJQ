var chatty = (function($, chat) {

    // private variables
    var messageCounter = 0,
    	elMessagesDiv = $('#messagesDiv'),
    	users = [],
    	messages = [];

    //
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
    }

    chat.setUsers = (user) => users.push(user);
    chat.getUsers = () => console.log(users);
    chat.setMessages = (message) => messages.push(message);
    chat.getMessages = () => console.log(messages);

    return chat;

})(jQuery, chatty || {});
