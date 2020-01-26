'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Policy = require('../models/Policy');
const Client = require('../models/Client');

const { isLoggedIn, isAdmin } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const policies = await Policy.find().populate('client');
    res.status(200).json({ policies });
  } catch (error) {
    next(error);
  }
});

router.get('/by-client/', isLoggedIn(), isAdmin(), async (req, res, next) => {
  // Name should be sent as a query (Ex: /policies/by-client?name=mar)
  const { name } = req.query;

  try {
    const clients = await Client.find({ name: new RegExp(name, 'i') });
    const policiesArr = clients.map(client => {
      return Policy.find({ client: ObjectId(client._id) }).populate('client')
    });
    const policies = await Promise.all(policiesArr);
    res.status(200).json({ policies });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const policy = await Policy.findOne({ _id: id }).populate('client');
    console.log(policy);
    res.status(200).json({ policy });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
