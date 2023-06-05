const User = require('../models/userModel');

// User registration
const registerUser = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const user = new User({ username, email, password, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  };
  
  // User login
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');
      res.json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to login user' });
    }
  };

// Get current user
const getCurrentUser = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };
  
  // Update current user
  const updateCurrentUser = async (req, res) => {
    try {
      const userId = req.userId;
      const { username, email, password } = req.body;
      const user = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };
  
  // Delete current user
  const deleteCurrentUser = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  module.exports = {registerUser, loginUser, getCurrentUser, updateCurrentUser, deleteCurrentUser};