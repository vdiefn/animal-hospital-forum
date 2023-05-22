const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')

router.get('/hospitals', authenticatedAdmin, adminController.getHospitals)

router.use('/', (req,res) => res.redirect('/admin/hospitals'))

module.exports = router