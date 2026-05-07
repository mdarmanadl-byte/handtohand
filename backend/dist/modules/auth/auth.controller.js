"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.me = me;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const auth_service_1 = require("./auth.service");
async function register(req, res) {
    return (0, api_response_1.sendSuccess)(res, await (0, auth_service_1.registerUser)(req.body), "Registration successful.", 201);
}
async function login(req, res) {
    return (0, api_response_1.sendSuccess)(res, await (0, auth_service_1.loginUser)(req.body), "Login successful.");
}
async function me(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, auth_service_1.getCurrentUser)(req.user.id), "Current user fetched.");
}
