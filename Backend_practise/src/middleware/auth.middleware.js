import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
const authUser = (req, res, next) => {
  try {
    console.log(req.headers.token);
    // const authHeader = req.headers['authorization'];
    // const token = authHeader.split(' ')[1];
    const decodedInfo = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    if (decodedInfo.username) {
      req.username = decodedInfo.username;
      next();
    } else {
      res.json({
        message: 'No such user logged in',
      });
    }
  } catch (error) {
    throw new ApiError(500, `From authMiddleware: ${error.message}`);
  }
};

export default authUser;
