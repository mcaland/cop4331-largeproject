const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: Array, required: true },
    lookingFor: { type: Array, required: true },
    matchedUsers: { type: Array, required: true },
    interestedUsers: { type: Array, required: true },
    imageUrl: { type: String, required: true },
    audioUrl: { type: String, required: true },
});

mongoose.Schema.Types.String.checkRequired(v => v != null);

module.exports = mongoose.model('User', userSchema);
