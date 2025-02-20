const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require("cors")
const authenticate = require('./middlewares/authMiddleware'); // Import the authentication middleware
const employeeRoutes = require('./routes'); // Import your employee routes

dotenv.config();

const app = express();
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}))
app.use(express.json());

// MongoDB connection (adjust connection URL to your environment)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


// Mount routes
app.use('/api/employees', employeeRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
