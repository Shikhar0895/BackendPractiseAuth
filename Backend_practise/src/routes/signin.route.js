import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../db/index.js';
import { ApiError } from '../utils/ApiError.js';
const router = Router();


const generateAccessToken = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

router.route('/').post((req, res) => {
  try {
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].username === req.body.username &&
        users[i].password === req.body.password
      ) {
        foundUser = users[i];
        break;
      }
    }

    if (foundUser) {
      const token = generateAccessToken({
        username: req.body.username,
      });
      console.log('these are the users:', users);
      res.status(200).json({
        username: foundUser.username,
        token,
      });
    } else {
      res.status(403).send({
        message: 'Invalid user',
      });
    }
  } catch (error) {
    console.error('message:----->', error.message);
    console.error('cause:----->', error.cause);
    console.error('code:----->', error.code);
    console.log('stacktrace:------------>', error.stack);
    // throw new Error(error);
    res.send({
      message: error.message,
    });
  }
});

export { router };
