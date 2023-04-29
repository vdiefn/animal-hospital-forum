const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hospitalSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image:{
    type: String
  },
  hasER: {
    type: Boolean
  }
})

module.exports = mongoose.model('Hospital', hospitalSchema)