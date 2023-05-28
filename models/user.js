const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: "https://img.freepik.com/free-icon/user_318-804790.jpg"
  }  
})

module.exports = mongoose.model('User', userSchema)