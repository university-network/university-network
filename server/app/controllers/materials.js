var materials = require('../models/materials');

function getAllMaterials(req, res, next) {
    materials.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateMaterial(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['material'],
            properties: {
                material: {
                    type: 'object',
                    required: ['name', 'link', 'discipline_id'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 255
                        },
                        link: {
                            type: 'string',
                            format: 'uri',
                            minLength: 5,
                            maxLength: 255
                        },
                        discipline_id: {
                            type: 'int'
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createMaterial(req, res, next) {
    var params = {
        name: req.body.material.name,
        link: req.body.material.link,
        discipline_id: req.body.material.discipline_id
    };

    materials.create(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.status(201);
        res.json(result.rows[0]);
    });
}

module.exports = {
    index: getAllMaterials,
    create: [validateMaterial, createMaterial]
};

