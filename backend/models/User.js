const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxLength: [50, 'First Name can not exceed 10 characters'],
    minLength: [2, 'First Name Must have more than 2 Characters']
  },
  lastName: {
    type: String,
    maxLength: [50, 'Last Name can not exceed 20 characters'],
    minLength: [2, 'Last Name Must have more than 2 Characters']
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  dob: {
    type: String
  },
  gender: {
    type: String
  },
    address: {
      type: String
    },
  avatar: {
      type: String,
  },
  posts: [{
    public_url: {
      type: String,
    },
    caption: {
      type: String,
    }
  }],
});


const User = mongoose.model("users", userSchema);
module.exports = {
  User
};