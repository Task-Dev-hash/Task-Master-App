const Task = require('../models/Task');
const User = require('../models/User');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, deadline } = req.body;

        // Check if the user is authenticated and get user ID
        if (!req.userId) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        // Create a new task
        const newTask = new Task({
            title,
            description,
            priority,
            deadline,
            user: req.userId  // Associate task with the logged-in user
        });

        await newTask.save();  // Save task to the database

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        // Get all tasks for the authenticated user
        const tasks = await Task.find({ user: req.userId }).sort({ deadline: 1 });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task by ID and ensure it belongs to the authenticated user
        const task = await Task.findOne({ _id: id, user: req.userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, deadline } = req.body;

        // Find task by ID and ensure it belongs to the authenticated user
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.userId },
            { title, description, priority, deadline },
            { new: true } // Return the updated task
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized to update' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task by ID and ensure it belongs to the authenticated user
        const task = await Task.findOneAndDelete({ _id: id, user: req.userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

// Filter tasks by priority (optional)
const filterTasksByPriority = async (req, res) => {
    try {
        const { priority } = req.query;

        if (!['low', 'medium', 'high'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority filter' });
        }

        const tasks = await Task.find({ user: req.userId, priority })
            .sort({ deadline: 1 });  // Sort by deadline

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error filtering tasks by priority:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

// Filter tasks by deadline (optional)
const filterTasksByDeadline = async (req, res) => {
    try {
        const { deadline } = req.query;

        const tasks = await Task.find({
            user: req.userId,
            deadline: { $lte: new Date(deadline) }  // Filter tasks due before or on the given date
        }).sort({ deadline: 1 });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error filtering tasks by deadline:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    filterTasksByPriority,
    filterTasksByDeadline
};
