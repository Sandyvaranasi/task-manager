const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {createValidationSchema, loginValidationSchema, updateValidationSchema, duplicateKey} = require('../validations/userValidation')

// User registration
const registerUser = async (req, res) => {
    try {
      const data = req.body;

      // Validations ===>
      const { error, value } = createValidationSchema.validate(data, {
        abortEarly: false,
      });
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      //=============================

      //Duplicate key ===>
      let duplicate = await duplicateKey(data)
      if(duplicate) return res.status(400).json({message:duplicate})
      //===============================

      //Hash password ===>
      data.password = await bcrypt.hash(data.password,12)
      //===============================

      const user = new User(data);
      await user.save();
      res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user '+ error.message  });
    }
  };
  
  // User login
  const loginUser = async (req, res) => {
    try {
      const data = req.body;

      // Validations ===>
      const { error, value } = loginValidationSchema.validate(data, {
        abortEarly: false,
      });
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      //=====================================
      
      // Checking credentials ===>
      const user = await User.findOne({ email:data.email,isDeleted: false });
      if (!user ) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }else {
        const passMatching = await bcrypt.compare(data.password,user.password)
        if(!passMatching) return res.status(401).json({message:'Invalid credentials'}) 
      }
      //=============================================

      // Token generation ===>
      const token = jwt.sign({ userId: user._id,role: user.role }, 'your-secret-key');
      res.json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login user '+ error.message  });
    }
  };

// Get current user
const getCurrentUser = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({_id:userId, isDeleted:false});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve user '+ error.message  });
    }
  };
  
  // Update current user
  const updateCurrentUser = async (req, res) => {
    try {
      const userId = req.userId;
      const data = req.body;

      // Validations ===>
      const { error, value } = updateValidationSchema.validate(data, {
        abortEarly: false,
      });
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
     //============================

      //Duplicate key ===>
          let duplicate = await duplicateKey(data)
          if(duplicate) return res.status(400).json({message:duplicate})
      //===============================

      //Password hashing ===>
      if(data.password){
        data.password = await bcrypt.hash(data.password,12)
      }
      //=================================


      const user = await User.findOneAndUpdate({_id:userId,isDeleted:false},data, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully', data: user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user '+ error.message  });
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
      res.status(500).json({ error: 'Failed to delete user '+ error.message });
    }
  };

  module.exports = {registerUser, loginUser, getCurrentUser, updateCurrentUser, deleteCurrentUser};