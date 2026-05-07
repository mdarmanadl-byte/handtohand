"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUser = getUser;
const api_response_1 = require("../../utils/api-response");
const users_service_1 = require("./users.service");
async function getUsers(_req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, users_service_1.listUsers)(), "Users fetched.");
}
async function getUser(req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, users_service_1.getUserProfile)(String(req.params.userId)), "User fetched.");
}
