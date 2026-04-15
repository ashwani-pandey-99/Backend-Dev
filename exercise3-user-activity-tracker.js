const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  lastLogin: Date,
  lastLogout: Date,
  lastActive: Date,
}, { timestamps: true });

userActivitySchema.pre('save', function (next) {
  if (this.isModified('lastLogin') || this.isModified('lastLogout') || this.isModified('lastActive')) {
    this.lastActive = new Date();
  }
  next();
});

userActivitySchema.methods.recordLogin = function () {
  this.lastLogin = new Date();
  this.lastActive = new Date();
  return this.save();
};

userActivitySchema.methods.recordLogout = function () {
  this.lastLogout = new Date();
  this.lastActive = new Date();
  return this.save();
};

module.exports = mongoose.model('UserActivity', userActivitySchema);
