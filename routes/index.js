const express = require('express')
const router = express.Router()
const hospitalController = require('../controllers/hospital-controller')
const userController = require('../controllers/user-controller')
const admin = require('./modules/admin')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/hospitals', hospitalController.getHospitals)

router.use('/', (req, res) => res.redirect('/hospitals'))

router.use('/', generalErrorHandler)

module.exports = router