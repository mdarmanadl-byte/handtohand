"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const app_error_1 = require("../utils/app-error");
const jwt_1 = require("../utils/jwt");
function requireAuth(req, _res, next) {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
        return next(new app_error_1.AppError(401, "Missing Bearer token."));
    }
    const token = authorization.slice("Bearer ".length);
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        };
        return next();
    }
    catch {
        return next(new app_error_1.AppError(401, "Invalid or expired token."));
    }
}
function requireRole(...roles) {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new app_error_1.AppError(401, "Authentication required."));
        }
        if (!roles.includes(req.user.role)) {
            return next(new app_error_1.AppError(403, "Insufficient role permissions."));
        }
        return next();
    };
}
