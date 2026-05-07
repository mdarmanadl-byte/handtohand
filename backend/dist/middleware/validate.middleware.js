"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const app_error_1 = require("../utils/app-error");
function validate(schema) {
    return (req, _res, next) => {
        try {
            if (schema.body) {
                req.body = schema.body.parse(req.body);
            }
            if (schema.params) {
                req.params = schema.params.parse(req.params);
            }
            if (schema.query) {
                req.query = schema.query.parse(req.query);
            }
            return next();
        }
        catch (error) {
            return next(new app_error_1.AppError(400, "Validation failed.", error));
        }
    };
}
