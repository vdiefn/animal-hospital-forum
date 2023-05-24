const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')


// 新增一筆資料
router.get('/hospitals/create', adminController.createHospitalPage)
router.post('/hospitals', upload.single('image'), adminController.createHospital)

// 瀏覽特定hospital
router.get('/hospitals/:id', adminController.getHospital)

// 瀏覽總表
router.get('/hospitals', adminController.getHospitals)

router.use('/', (req,res) => res.redirect('/admin/hospitals'))

module.exports = router