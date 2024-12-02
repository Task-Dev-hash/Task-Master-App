// src/routes/task.js
const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Task
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    const task = new Task({ title, description, priority, deadline, userId: req.userId });
    await task.save();
    res.status(201).json(task);
});

// Get Tasks
router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});

// Update Task
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, priority, deadline }, { new: true });
    res.json(task);
});

// Delete Task
router.delete('/:id', authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send('Task deleted');
});

module.exports = router;
