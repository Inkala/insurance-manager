'use strict';

const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    next(createError(422));
  } else {
    next();
  }
};

exports.isAdmin = () => (req, res, next) => {
  if (req.session.currentUser) {
    console.log("From middleware", req.session.currentUser);
    
    next();
  } else {
    next(createError(401));
  }
};
