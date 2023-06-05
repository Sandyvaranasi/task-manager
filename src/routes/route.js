const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const  authenticateAndAuthorize  = require('../midwares/auth');

// User Routes

// User registration
router.post('/users/register', userController.registerUser);

// User login
router.post('/users/login', userController.loginUser);

// Protected routes for authenticated users

// Get current user
router.get('/users/me', authenticateAndAuthorize, userController.getCurrentUser);

// Update current user
router.put('/users/me', authenticateAndAuthorize, userController.updateCurrentUser);

// Delete current user
router.delete('/users/me', authenticateAndAuthorize, userController.deleteCurrentUser);

// Task Routes

// Create a new task
router.post('/tasks', authenticateAndAuthorize, taskController.createTask);

// Get all tasks
router.get('/tasks', authenticateAndAuthorize, taskController.getAllTasks);

// Get a specific task by ID
router.get('/tasks/:id', authenticateAndAuthorize, taskController.getTaskById);

// Update a task
router.put('/tasks/:id', authenticateAndAuthorize, taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', authenticateAndAuthorize, taskController.deleteTask);

module.exports = router;
