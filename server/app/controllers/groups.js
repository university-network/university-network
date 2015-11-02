var groups = require('../models/groups');
var validator = require('../../lib/validator');

function getAllGroups(req, res, next) {
    groups.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateGroup(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['group'],
            properties: {
                group: {
                    type: 'object',
                    required: ['cipher', 'mentor_id'],
                    properties: {
                        cipher: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 20
                        },
                        mentor_id: {
                            type: 'int'
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createGroup(req, res, next) {
    var params = {
        cipher: req.body.group.cipher,
        mentor_id: req.body.group.mentor_id
    };

    groups.create(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.status(201);
        res.json(result.rows[0]);
    });
}

module.exports = {
    index: getAllGroups,
    create: [validateGroup, createGroup]
};

