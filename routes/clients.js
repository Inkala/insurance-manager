'use strict';

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

const clientsUrl = 'https://www.mocky.io/v2/5808862710000087232b75ac';

router.get('/', (req, res, next) => {
  fetch(clientsUrl)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('Data >>>>>>:\n', data);
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
