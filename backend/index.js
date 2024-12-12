const express = require('express');
const connectToDatabase = require('./db'); // Import the db.js
require('dotenv').config(); 
const Task = require('./models/infoModel'); // Import the Task model


const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(express.json());

// Example Route
app.post('/tasks', async (req, res) => {
    try {
        const { header, subText, date, tag } = req.body; // Destructure fields from the request body

        // Create a new task using the schema
        const newTask = new Task({
            header,
            subText,
            date,
            tag,
        });

        // Save the task to the database
        const savedTask = await newTask.save();
        res.status(201).json({
            message: 'Task created successfully',
            task: savedTask,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating task',
            error: error.message,
        });
    }
});

// GET Request: Retrieve all tasks
app.get('/tasks', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
