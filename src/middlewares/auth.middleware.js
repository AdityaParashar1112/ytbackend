import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
    console.log(`Token: ${token}`);

    if (!token) {
      return errorHandler(res, 404, 'Token not provided');
    }

    // Verify token
    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(`Decoded User: ${JSON.stringify(decodedUser)}`);

    // Find user by ID
    const user = await User.findById(decodedUser.id);
    
    if (!user) {
      return errorHandler(res, 404, 'Unauthorized token');
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error(`Authorization failed: ${error.message}`);
    return errorHandler(res, 500, 'Authorization failed');
  }
});

export { verifyJWT };
