const express = require('express');
const connectToDatabase = require('./db'); // Import the db.js
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
    res.send('MongoDB connection established!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
