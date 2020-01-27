## About this test

To see this test working, clone the repository, type `npm install` from the root folder.

There is a seeds file to populate the database with the information from the provided URLs. With Mongo running, from the root folder, type  `node bin/seeds.js` and then `npm run dev`.

There is also an `Auth.postman_collection.json` file with examples for all the routes used that can be imported on Postman.

### The test

The app gets the information from the URLs and imports it in a database. From there, you can see all the clients and policies if the user's role validation is met.

You can also create users and specify their roles.

**Routes:**

- /auth/login

- /auth/logout

- /auth/signup

- /clients

- /clients/search - *Takes the name as query param*

- /clients/:id

- /policies - *Only for admin users*

- /clients/by-name - *Only for admin users. Takes the name as query param.*

- /clients/:id - *Only for admin users*

### Technologies used

For this test I chose to use [Node](https://nodejs.org/) with [Express](https://expressjs.com/) for the server side and [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for the database.

For fetching the information from the URL I used [axios](https://github.com/axios/axios) and for the encrypting of the password I use [Bcrypt](https://github.com/kelektiv/node.bcrypt.js).

### Success

All the functionalities that were added to the app are working as expected. The seeds populate the database, the creation of the users with encrypted passwords and all the fetching of the information.

### Challenges

All the asynchronous steps I had to take to properly populate and connect the two collections were quite challenging.

I also tried to add some tests with [Mocha](https://mochajs.org/), but I wasn't able to mock the connection to the database.

### What to improve

Sice all the data is in my database, I could have created a full CRUD with editing and deleting the clients or policies.

There is a lot of work to be done on the error handling for missing information or empty results. I would have also liked to add some tests.

### Additional notes

I left the `.env` out of the `.gitignore` file so you can run everything just by cloning the repo.

For the policies I removed the `inseptionDate` because my models have a `timestamp` property, but I am not sure if they mean the same thing.

Tried modifying mongo’s `_id` with the `id` from the fetched data, but wasn’t able to. So I removed the original id instead after populating the collections and creating the relationships.