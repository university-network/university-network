var validator = require('validator');
var validateJSON = require('jsonschema').validate;
var _ = require('lodash');

function validateMiddleware(req, next, schema) {
    var paramTypes = ['params', 'query'];
    var errors = paramTypes.map(function (paramType) {
        if (schema.hasOwnProperty(paramType)) {
            return Object.keys(schema[paramType]).map(function (paramName) {
                return Object.keys(schema[paramType][paramName]).map(function (validatorName) {
                    var valueToValidate = req[paramType][paramName];
                    var validatorArguments = schema[paramType][paramName][validatorName].options;
                    var valid = validator[validatorName](valueToValidate, validatorArguments);
                    var errorMessage = 'Invalid param: ' + paramName;
                    return {
                        valid: valid,
                        paramName: paramName,
                        errorMessage: schema[paramType][paramName][validatorName].message || errorMessage
                    };
                });
            });
        }
    }).filter(function (error) {
        return !!error;
    });

    var jsonErrors = [];

    if (schema.hasOwnProperty('body')) {
        var validationResult = validateJSON(req.body, schema.body);
        if (!validationResult.valid) {
            jsonErrors = validationResult.errors.map(function (err) {
                return err.property + " " + err.message;
            });
        }
    }

    var invalidParams = _.chain(errors).concat(jsonErrors).flattenDeep().filter(function (error) {
        return error && !error.valid;
    }).value();

    if (invalidParams.length > 0) {
        var error = new Error;
        error.status = 400;
        error.errors = invalidParams;
        return next(error);
    }
    next();
}

module.exports = validateMiddleware;
