const mongoose = require('mongoose')
const Hospital = require('../hospital')
const faker = require('faker')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  for(let i = 0; i < 5; i++){
    Hospital.create({
      name:`Hospital${i}`,
      address:faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      description: faker.lorem.text(),
      image: `https://loremflickr.com/320/240/restaurant,food/?lock=${Math.random() * 100}`
    })
  }
  console.log('done')
})