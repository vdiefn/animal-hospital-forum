const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema
const hospitalSchema = new Schema ({
  name: {
    type: string,
    required: true
  },
  address: {
    type: string,
    required: true
  },
  telephone: {
    type: Number,
    required: true
  },
  description: {
    type: Text,
    required: false
  },
  cover:{
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Hospital', hospitalSchema)