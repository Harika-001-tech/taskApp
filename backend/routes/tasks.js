const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    priority: req.body.priority,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch('/:id', getTask, async (req, res) => {
  if (req.body.name != null) {
    res.task.name = req.body.name;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }
  if (req.body.dueDate != null) {
    res.task.dueDate = req.body.dueDate;
  }
  if (req.body.status != null) {
    res.task.status = req.body.status;
  }
  if (req.body.priority != null) {
    res.task.priority = req.body.priority;
  }

  try {
    const updatedTask = await res.task.save();
    res.json({
        message: 'Task updated successfully',
        task: updatedTask,
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.deleteOne();
    res.json({ message: 'Task Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get task by ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;