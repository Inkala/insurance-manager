'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post(
  '/login',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { name, password } = req.body;

    try {
      const user = await User.findOne({ name });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res
          .status(200)
          .json(`User ${user.name} has logged in successfully`);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { name, password, email, role } = req.body;

    try {
      const user = await User.findOne({ name }, 'name');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          name,
          password: hashPass,
          email,
          role
        });
        req.session.currentUser = newUser;
        res
          .status(200)
          .json(`New User user ${newUser.name} has been created`);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(200).json('User logged out');
});

module.exports = router;
