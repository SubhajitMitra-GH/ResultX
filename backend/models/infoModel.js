const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true, // Header is mandatory
        trim: true, // Remove extra spaces
    },
    subText: {
        type: String,
        required: false, // Optional field
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now, // Default to the current date and time
    },
    tag: {
        type: String,
        required: false, // Optional field
        enum: ['Work', 'Personal', 'Urgent', 'Other'], // Restrict to specific tags
        default: 'Other', // Default tag
    },
});

// Create a Task model
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
