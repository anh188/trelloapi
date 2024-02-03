// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: {type:String, require:true},
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  phone: {type: String, required:true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;