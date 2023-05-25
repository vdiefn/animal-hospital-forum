const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')


// 新增一筆資料
router.get('/hospitals/create', adminController.createHospitalPage)
router.post('/hospitals', upload.single('image'), adminController.createHospital)

// 修改hospital
router.get('/hospitals/:id/edit', adminController.editHospitalPage)
router.put('/hospitals/:id', upload.single('image'), adminController.editHospital)

// 瀏覽特定hospital
router.get('/hospitals/:id', adminController.getHospital)

// 刪除hospital
router.delete('/hospitals/:id', adminController.deleteHospital)

// 瀏覽總表
router.get('/hospitals', adminController.getHospitals)

router.use('/', (req,res) => res.redirect('/admin/hospitals'))

module.exports = router