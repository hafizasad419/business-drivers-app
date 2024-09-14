import { apiError } from "../utils/apiError";

// Middleware to check if user has a specific role
export const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json(new apiError(403, "Acess Denied."))
        }
    };
};
