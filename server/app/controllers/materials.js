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

module.exports = {
    index: getAllMaterials
};

