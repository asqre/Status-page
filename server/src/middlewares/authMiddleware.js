import JWT from "jsonwebtoken";
import { UserRoles } from "../data/Enums.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send({
      success: false,
      message: "No token provided or invalid token format",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    JWT.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Invalid or expired token. Please log in again.",
          error: err.message,
        });
      }

      if (req.body.userId !== decoded.userId) {
        return res.status(403).send({
          success: false,
          message: "Unauthorized Access",
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send({
      success: false,
      message: "Error in authentication middleware",
      error: error.message,
    });
  }
};

export const authorizeUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "Authentication required",
      });
    }

    const allowedRoles = [UserRoles.OWNER, UserRoles.ADMIN, UserRoles.MEMBER];

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
        requiredRoles: allowedRoles,
        userRole: req.user.role,
      });
    }

    next();
  } catch (error) {
    console.error("Permission check error:", error);
    res.status(500).send({
      success: false,
      message: "Error checking permissions",
      error: error.message,
    });
  }
};
