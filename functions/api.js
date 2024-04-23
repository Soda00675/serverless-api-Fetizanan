const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your Mongoose models and router
const app = express();
const dbLocalUrl = 'mongodb://localhost:27017/express-mongo-api';
const dbCloudUrl = 'mongodb+srv://fetizananjohnkenneth:<password>@cluster0.dmpyias.mongodb.net/';

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || dbLocalUrl, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));


// Attempt MongoDB connection
app.use('/api', router);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

module.exports.handler = serverless(app);