const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // make sure this path is correct

// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, phone, email, password, musicBackground } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      musicBackground
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Search Users
router.post('/search', async (req, res) => {
  const { keyword } = req.body;

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: keyword, $options: 'i' } },
        { lastName: { $regex: keyword, $options: 'i' } },
        { musicBackground: { $regex: keyword, $options: 'i' } }
      ]
    }).select('-password');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Mark interest in another user
router.post('/interested', async (req, res) => {
  const { userId, targetUserId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.interested.includes(targetUserId)) {
      user.interested.push(targetUserId);
      await user.save();
    }

    res.status(200).json({ message: 'User marked as interested' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark interest' });
  }
});


// Logout
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = router;
