const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/hospitals', adminController.getHospitals)
router.use('/', (req,res) => res.redirect('/admin/hospitals'))

module.exports = router