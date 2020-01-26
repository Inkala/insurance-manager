'use strict';

const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.get('/', async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ clients });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/', async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    res.status(200).json({ client });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
