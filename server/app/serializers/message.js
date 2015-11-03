function serializeMessage(message) {
    return {
        id: message.id,
        sender: message.sender,
        receiver: message.receiver,
        message: message.message,
        sending_time: message.sending_time,
    };
}

function serializeMessages(messages) {
    return messages.map(function (message) {
        return serializeMessage(message);
    });
}

module.exports = {
    serializeOne: serializeMessage,
    serializeMany: serializeMessages
};
