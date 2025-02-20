const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path=require("path")
const cors=require("cors")
const authenticate = require('./middlewares/authMiddleware'); // Import the authentication middleware
const employeeRoutes = require('./routes'); // Import your employee routes

dotenv.config();

const app = express();
app.use(cors({
  origin:["http://localhost:5173","http://localhost:5000"],
  credentials:true
}))
app.use(express.json());

// MongoDB connection (adjust connection URL to your environment)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


// Mount routes
app.use('/api/employees', employeeRoutes);


app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler to send index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
