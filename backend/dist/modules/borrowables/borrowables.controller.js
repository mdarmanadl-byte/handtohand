"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = getItems;
exports.postItem = postItem;
exports.borrow = borrow;
exports.accept = accept;
exports.returnItem = returnItem;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const borrowables_service_1 = require("./borrowables.service");
async function getItems(_req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, borrowables_service_1.listItems)(), "Borrowable items fetched.");
}
async function postItem(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, borrowables_service_1.createItem)(req.user.id, req.body), "Item created.", 201);
}
async function borrow(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, borrowables_service_1.createBorrowRequest)(String(req.params.itemId), req.user.id, req.body.returnInDays), "Borrow request created.", 201);
}
async function accept(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, borrowables_service_1.acceptBorrowRequest)(String(req.params.transactionId), req.user.id), "Borrow request accepted.");
}
async function returnItem(req, res) {
    return (0, api_response_1.sendSuccess)(res, await (0, borrowables_service_1.returnBorrowedItem)(String(req.params.transactionId)), "Borrowable item returned.");
}
