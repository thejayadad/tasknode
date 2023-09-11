
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json({ message: 'Task created successfully' });
});
app.delete('/api/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(400).json({ message: 'Invalid task index' });
    }
});

app.put('/api/tasks/:index/complete', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        res.json({ message: 'Task marked as completed' });
    } else {
        res.status(400).json({ message: 'Invalid task index' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
