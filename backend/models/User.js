const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  musicBackground: String,
  interested: [mongoose.Schema.Types.ObjectId],
  pastCollabs: [mongoose.Schema.Types.ObjectId],
  notifications: [
    {
      fromUserId: mongoose.Schema.Types.ObjectId,
      read: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
