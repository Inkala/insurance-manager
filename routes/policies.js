'use strict';

const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');

router.get('/', async (req, res, next) => {
  try {
    const policies = await Policy.find().populate('client');
    res.status(200).json({ policies });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/', async (req, res, next) => {
  const { id } = req.params;
  try {
    const policy = await Policy.findById(id).populate('client');
    console.log(policy);
    res.status(200).json({ policy });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
