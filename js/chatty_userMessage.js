var chatty = (function($, chat) {

    // private variables
    var messageCounter,
    	$elMessagesDiv = $('#messagesDiv'),
    	$elMessageInput = $('#messageInput'),
    	idToEdit,
    	editEnabled = false;
    	users = [],
    	messages = [],
    	archive = [];

    $elMessagesDiv.on('click', '.btnDelete', function(event) {
    	var idToDelete = parseInt(event.target.id.split('--')[1]);
    	event.target.closest('.message').remove();
    	chat.removeFromMessages(idToDelete);
    });

    $elMessagesDiv.on('click', '.btnEdit', function(event) {
    	editEnabled = true;
    	idToEdit = parseInt(event.target.id.split('--')[1]);
    	$elMessageInput.val($(`#content--${idToEdit}`).text().split('posted@')[0]);
    	$elMessageInput.focus();
    });

    $elMessageInput.on('keydown', function(event) {
    	if (event.keyCode === 13) {
			let editTime = new Date().toUTCString();
    		if (editEnabled === true) {
    			let newMessage = $elMessageInput.val() + ' posted@ ' + editTime + '(edit)';
    			let indexToEdit = getIndex(idToEdit);
    			messages[indexToEdit].message = newMessage;
    			$(`#content--${idToEdit}`).text(newMessage);
    			editEnabled = false;
    		} else {
    			messages.push(getMessageObj($elMessageInput.val()));
    			let x = messages.length - 1;
    			chatty.renderMessage(
    				messages[x].user,
    				messages[x].message,
    				messages[x].time,
    				messages[x].id
    				);
    		}
    	$elMessageInput.val('');
    	}
    });

    function getIndex(id) {
    	return messages.findIndex((message) => message.id === id);
    }

    function getMessageObj(message) {
    	messageCounter++
    	var obj = {};
		obj.id = messageCounter;
		obj.user = $('#userSelect').val();
		obj.message = message;
		obj.time = new Date().toUTCString();
		return obj;
    }

    chat.renderMessage = function(user, message, time, id) {
        var elMessDiv = $('<div/>').attr({
            id: `message--${id}`,
            class: 'message'
        }).appendTo($elMessagesDiv);
        var elPUser = $('<p/>').attr({
            id: `user--${id}`,
            class: 'user'
        }).text(user).appendTo(elMessDiv);
        var elPMessage = $('<p/>').attr({
            id: `content--${id}`,
            class: 'content'
        }).text(`${message} posted@ ${time}`).appendTo(elMessDiv);
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
    chat.getMessageCounter = () => messageCounter;

    return chat;

})(jQuery, chatty || {});
