import { Router } from 'express';
import { users } from '../db/index.js';
import authUser from '../middleware/auth.middleware.js';

const router = Router();

router.route('/').post(authUser, (req, res) => {
  try {
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
      if (req.username === users[i].username) {
        foundUser = users[i];
        break;
      }
    }
    if (foundUser) {
      res.json({
        username: req.username,
        courses: users.find(user => user.username === req.username).courses,
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

export { router };
