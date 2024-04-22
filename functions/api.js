const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Import your Mongoose models and router
const mongoose = require('mongoose'); 
const router = require('./routes/author'); 


const app = express();

// Potentially define MongoDB connection URLs for deployment and local usage
const dbCloudUrl = 'your_cloud_mongodb_connection_string';
const dbLocalUrl = 'your_local_mongodb_connection_string';

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true })); // Commented out: Potential redundancy

async function connectToMongoDB() {
     try {
         await mongoose.connect(process.env.MONGODB_URI || 'your_local_uri', {
             useNewUrlParser: true,
             useUnifiedTopology: true
         });
         console.log('MongoDB Connected');
     } catch (err) {
         console.error('MongoDB Connection Error:', err); 
     }
  }
  
  // Call your connection function
  connectToMongoDB(); 
  
app.use('/api/.netlify/functions/', router);

module.exports.handler = serverless(app);
