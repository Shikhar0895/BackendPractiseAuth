import { Router } from 'express';
import { users } from '../db/index.js';

const router = Router();

router.route('/').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const courses = req.body.courses;

  users.push({
    username: username,
    password: password,
    courses: courses,
  });

  res.status(200).json({
    message: 'you are signed up',
  });

  console.log(users);
});

export { router };
