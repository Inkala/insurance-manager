'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Policy = require('../models/Policy');
const Client = require('../models/Client');

const { isLoggedIn, isAdmin } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), isAdmin(), async (req, res, next) => {
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
      console.log(client);
      
      return Policy.find({ client: ObjectId(client._id) }).populate('client');
    });
    const solvedPromises = await Promise.all(policiesArr);
    const policies = solvedPromises.filter(policy => policy)
    res.status(200).json({ policies });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/', isLoggedIn(), isAdmin(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const policy = await Policy.findById(id).populate('client');
    if (!policy) {
      next(createError(404));
    } else {
      // Returns all the information about the policy
      res.status(200).json({ policy });

      // // Returns only the client linked to the policy
      // res.status(200).json({ client: policy.client });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
