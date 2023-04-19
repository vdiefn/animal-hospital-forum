const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db