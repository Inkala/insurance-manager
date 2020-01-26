'use strict';

const mongoose = require('mongoose');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const Client = require('../models/Client');
const Policy = require('../models/Policy');

const clientsInstance = axios.create({
  baseURL: 'https://www.mocky.io/v2/5808862710000087232b75ac',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const policiesInstance = axios.create({
  baseURL: 'https://www.mocky.io/v2/580891a4100000e8242b75c5',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const populateDatabase = () => {
  const updatePolicies = addData().then(res => {
    const policies = res[1];

    return policies.map(policy =>
      Client.findOne({ id: policy.clientId })
        .then(client => {
          policy.client = client._id;
          policy.save();
        })
        .catch(err => console.log(err))
    );
  });

  updatePolicies
    .then(updatePolicies => Promise.all(updatePolicies))
    .then(() => {
      console.log('Fetched data inserted');
      // mongoose.connection.close()
    })
    .catch(err => console.log(err));
};

// Empty the DB to prevent duplications
const dropTheCollections = () => {
  const pr1 = Client.collection.drop();
  const pr2 = Policy.collection.drop();

  Promise.all([pr1, pr2])
    .then(() => {
      console.log('Collections dropped');
      populateDatabase();
    })
    .catch(err => console.log(err));
};

// Add something to the DB so the Drop won't fail if collection is empty
const insertFirst = () => {
  const pr1 = Client.create({
    id: 'Drop',
    name: 'Drop',
    email: 'Drop'
  });
  const pr2 = Policy.create({
    amountInsured: 12345,
    email: 'Drop',
    installmentPayment: true
  });

  Promise.all([pr1, pr2])
    .then(() => {
      console.log('Dummy data inserted');
      dropTheCollections();
    })
    .catch(err => console.log(err));
};

const addData = () => {
  const pr1 = clientsInstance
    .get('/')
    .then(res => Client.create(res.data.clients));
  const pr2 = policiesInstance
    .get('/')
    .then(res => Policy.create(res.data.policies));
  return Promise.all([pr1, pr2])
    .then(res => res)
    .catch(err => console.log(err));
};

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => insertFirst())
  // .then(() => mongoose.connection.close())
  .catch(err => console.log(err));

// const insertSeed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     await insertFirst();
//     // mongoose.connection.close();
//   } catch (error) {
//     console.log(error);
//   }
// };

// insertSeed();
