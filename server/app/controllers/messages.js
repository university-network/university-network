var messages = require('../models/messages');

function getAllMessages(req, res, next) {
    messages.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateMessage(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['message'],
            properties: {
                message: {
                    type: 'object',
                    required: ['sender_id', 'receiver_id', 'message', 'sending_time'],
                    properties: {
                        sender_id: {
                            type: 'int'
                        },
                        receiver_id: {
                            type: 'int'
                        },
                        message: {
                            type: 'string',
                            maxLength: '6000'
                        },
                        sending_time: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createMessage(req, res, next) {
    var params = {
        sender_id: req.body.message.sender_id,
        receiver_id: req.body.message.receiver_id,
        message: req.body.message.message,
        sending_time: req.body.message.sending_time
    };

    messages.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdMessage = result.rows[0];
        res.status(201).json(createdMessage);
    });
}

module.exports = {
    index: getAllMessages,
    create: [validateMessage, createMessage]
};
