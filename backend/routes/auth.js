const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// REGISTER Endpoint
router.post('/register', async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      displayName: displayName,
      email: email,
      password: hashedPassword,
      skills: [],
      lookingFor: [],
      matchedUsers: [],
      interestedUsers: [],
      imageUrl: '',
      audioUrl: ''
    });

    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      userID: newUser._id,
      displayName: displayName,
      email: email,
      skills: [],
      lookingFor: [],
      matchedUsers: [],
      interestedUsers: [],
      imageUrl: '',
      audioUrl: ''
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// LOGIN Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Login successful',
      userID: user._id,
      displayName: user.displayName,
      email: user.email,
      skills: user.skills,
      lookingFor: user.lookingFor,
      matchedUsers: user.matchedUsers,
      interestedUsers: user.interestedUsers,
      imageUrl: user.imageUrl,
      audioUrl: user.audioUrl
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// SEARCH USER Endpoint
router.post('/search', async (req, res) => {
  const { keyword } = req.body;

  try {
    const users = await User.find({
      $or: [
        { displayName: { $regex: keyword, $options: 'i' } },
        { skills: { $regex: keyword, $options: 'i' } }
      ]
    }).select('-password');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// INTERESTED Endpoint
router.post('/interested', async (req, res) => {
  const { userId, targetUserId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.interestedUsers.includes(targetUserId)) {
      user.interestedUsers.push(targetUserId);
      await user.save();
    }

    res.status(200).json({ message: 'User marked as interested' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark interest' });
  }
});


// LOGOUT Endpoint
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = router;