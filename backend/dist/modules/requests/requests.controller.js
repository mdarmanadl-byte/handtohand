"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequests = getRequests;
exports.getRequest = getRequest;
exports.postRequest = postRequest;
exports.accept = accept;
exports.patchStatus = patchStatus;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const requests_service_1 = require("./requests.service");
async function getRequests(_req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, requests_service_1.listRequests)(), "Requests fetched.");
}
async function getRequest(req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, requests_service_1.findRequest)(String(req.params.requestId)), "Request fetched.");
}
async function postRequest(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, requests_service_1.createRequest)(req.user.id, req.body), "Request created.", 201);
}
async function accept(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, requests_service_1.acceptRequest)(String(req.params.requestId), req.user.id), "Request accepted.");
}
async function patchStatus(req, res) {
    return (0, api_response_1.sendSuccess)(res, await (0, requests_service_1.updateRequestStatus)(String(req.params.requestId), req.body.status), "Request status updated.");
}
