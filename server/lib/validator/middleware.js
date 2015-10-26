var validator = require('validator');

function validateMiddleware(req, next, schema) {
    var paramTypes = ['params', 'query', 'body'];
    var errors = paramTypes.map(function (paramType) {
        if (Object.hasOwnProperty(paramType)) {
            return Object.keys(schema[paramType]).map(function (paramName) {
                return Object.keys(schema[paramName]).map(function (validatorName) {
                    var valueToValidate = req[paramType][paramName];
                    var validatorArguments = schema[paramName][validatorName].options;
                    var valid = validator[validatorName](valueToValidate, validatorArguments);
                    var errorMessage = 'Invalid param: ' + paramName;
                    return {
                        valid: valid,
                        paramName: paramName,
                        errorMessage: schema[paramName][validatorName].message || errorMessage
                    };
                });
            });
        }
    });
    var flattenErrors = [].concat.apply([], errors);
    var invalidParams = flattenErrors.filter(function (error) {
        return error && !error.valid;
    });
    if (invalidParams.length > 0) {
        var error = new Error;
        error.status=400;
        error.errors=invalidParams;
        return next(error);
    }
    next();
}

module.exports = validateMiddleware;
