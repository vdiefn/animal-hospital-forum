const express = require('express')
const router = express.Router()
const hospitalController = require('../controllers/hospital-controller')

router.get('/hospitals', hospitalController.getHospitals)
router.use('/', (req, res) => res.redirect('/hospitals'))


module.exports = router