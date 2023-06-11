const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const Hospital = require('../hospital')

const faker = require('faker')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb error!')
// })
db.once('open', () => {
  Hospital.create(
    {
      name:'Hospital1',
      city:'台北市', 
      address:faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      description: faker.lorem.text(),
      image: `https://loremflickr.com/320/240/animal,hospital/all/?lock=${Math.random() * 100}`,
      hasER: `${Math.round(Math.random() * 1) }`
    },
    {
      name: 'Hospital2',
      city: '新北市',
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      description: faker.lorem.text(),
      image: `https://loremflickr.com/320/240/animal,hospital/all/?lock=${Math.random()*100}`,
      hasER: `${Math.round(Math.random() * 1) }`
    },
    {
      name: 'Hospital3',
      city: '基隆市',
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      description: faker.lorem.text(),
      image: `https://loremflickr.com/320/240/animal,hospital/all/?lock=${Math.random()*100}`,
      hasER: `${Math.round(Math.random() * 1) }`
    },
    {
      name: 'Hospital4',
      city: '桃園市',
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      description: faker.lorem.text(),
      image: `https://loremflickr.com/320/240/animal,hospital/all/?lock=${Math.random()*100}`,
      hasER: `${Math.round(Math.random() * 1)}`
    },
    {
      name: 'Hospital5',
      city: '台北市',
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      description: faker.lorem.text(),
      image: `https://loremflickr.com/320/240/animal,hospital/all/?lock=${Math.random()*100}`,
      hasER: `${Math.round(Math.random() * 1)}`
    }
  )
  
  console.log('hospitalSeeder done')
})