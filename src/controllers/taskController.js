const Task = require('../models/taskModel');
const jwt = require('jsonwebtoken');

// Create a new task
const createTask = async (req, res) => {
  try {
    // Get the user ID from the JWT
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your-secret-key');
    const userId = decodedToken.userId;

    const { title, description, status, priority, dueDate, assignee } = req.body;
    const task = new Task({ title, description, status, priority, dueDate, assignee, createdBy: userId });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Check if the user has permission to access the task
    if (!canAccessTask(req.userId, task)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, assignee } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Check if the user has permission to update the task
    if (!canUpdateTask(req.userId, task)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;
    task.assignee = assignee;
    
    const updatedTask = await task.save();
    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Check if the user has permission to delete the task
    if (!canDeleteTask(req.userId, task)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Helper function to check if the user can access the task
const canAccessTask = (userId, task) => {
  // Check if the user is the creator or the assignee of the task
  return task.createdBy.equals(userId) || task.assignee.equals(userId);
};

// Helper function to check if the user can update the task
const canUpdateTask = (userId, task) => {
  // Check if the user is the creator of the task
  return task.createdBy.equals(userId);
};

// Helper function to check if the user can delete the task
const canDeleteTask = (userId, task) => {
  // Check if the user is the creator of the task
  return task.createdBy.equals(userId);
};

module.exports = {createTask, getAllTasks, getTaskById, updateTask, deleteTask}