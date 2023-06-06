const User = require('../models/userModel');
const {createValidationSchema, loginValidationSchema, updateValidationSchema} = require('../validations/userValidation')

// User registration
const registerUser = async (req, res) => {
    try {
      const data = req.body;

      const { error, value } = createValidationSchema.validate(data, {
        abortEarly: false,
      });
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      const user = new User(data);
      await user.save();
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  };
  
  // User login
  const loginUser = async (req, res) => {
    try {
      const data = req.body;

      const { error, value } = loginValidationSchema.validate(data, {
        abortEarly: false,
      });
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }


      const user = await User.findOne({ email:data.email,isDeleted: false });
      if (!user || user.password !== data.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id,role: user.role }, 'your-secret-key');
      res.json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to login user' });
    }
  };

// Get current user
const getCurrentUser = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({_id:userId, isDeleted:false});
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
      const data = req.body;

      const { error, value } = updateValidationSchema.validate(data, {
        abortEarly: false,
      });
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }



      const user = await User.findOneAndUpdate({_id:userId,isDeleted:false},data, { new: true });
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
      const user = await User.findOneAndUpdate({_id:userId,isDeleted:false},{isDeleted:true},{new:true});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  module.exports = {registerUser, loginUser, getCurrentUser, updateCurrentUser, deleteCurrentUser};