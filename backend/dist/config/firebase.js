"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseApp = getFirebaseApp;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
let initialized = false;
function getFirebaseApp() {
    if (!env_1.env.FCM_ENABLED) {
        return null;
    }
    if (!initialized) {
        try {
            firebase_admin_1.default.initializeApp();
            initialized = true;
        }
        catch (error) {
            logger_1.logger.warn("Firebase admin initialization skipped", error);
        }
    }
    return initialized ? firebase_admin_1.default.app() : null;
}
