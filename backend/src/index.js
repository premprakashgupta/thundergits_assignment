const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path=require("path")
const cors=require("cors")
const bodyParser = require("body-parser");
const cloudinary = require('cloudinary').v2;
const studentRoutes = require('./routes'); // Import your employee routes
const fileupload = require("express-fileupload");

dotenv.config();

const app = express();
app.use(cors({
  origin:["http://localhost:5173","http://localhost:5000","https://k-and-a-assignment.onrender.com"],
  credentials:true
}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

// MongoDB connection (adjust connection URL to your environment)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

  // cloudinary configuration 
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_DBNAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });

// Mount routes
app.use('/api', studentRoutes);


app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Catch-all handler to send index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
