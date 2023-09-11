// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// In-memory storage for tasks (replace this with a database in production)
const tasks = [];

// API endpoint to get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// API endpoint to create a new task
app.post('/api/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json({ message: 'Task created successfully' });
});

// API endpoint to delete a task by its index
app.delete('/api/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(400).json({ message: 'Invalid task index' });
    }
});

// API endpoint to mark a task as completed
app.put('/api/tasks/:index/complete', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        res.json({ message: 'Task marked as completed' });
    } else {
        res.status(400).json({ message: 'Invalid task index' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
