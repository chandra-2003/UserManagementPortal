const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phone: { type: String },
  company: { type: String },
  address: {
    street: String,
    city: String,
    zip: String,
    geo: {
      lat: Number,
      lng: Number
    }
  }
});

module.exports = mongoose.model('User', userSchema);
