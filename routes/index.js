const express = require('express')
const router = express.Router()
const hospitalController = require('../controllers/hospital-controller')
const userController = require('../controllers/user-controller')
const admin = require('./modules/admin')
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('passport')
const { authenticator, authenticatedAdmin } = require('../middleware/auth')
const upload = require('../middleware/multer')

router.use('/admin', authenticatedAdmin, admin)

// 註冊
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// 登入
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signin'}), userController.signIn)

// 登出
router.get('/logout', userController.logout)

// 修改hospital
router.get('/hospitals/:id/edit', hospitalController.editHospitalPage)
router.put('/hospitals/:id', upload.single('image'), hospitalController.editHospital)

// 新增hospital
router.get('/hospitals/new', hospitalController.createHospitalPage)
router.post('/hospitals', upload.single('image'), hospitalController.createHospital)

// 瀏覽特定hospital
router.get('/hospitals/:id', hospitalController.getHospital)


// 瀏覽所有hospital
router.get('/hospitals', hospitalController.getHospitals)

// 瀏覽/修改個人資料
router.get('/users/:id', authenticator, userController.getProfile)
router.get('/users/:id/edit', authenticator, userController.editProfilePage)
router.put('/users/:id', authenticator, upload.single('image'), userController.editProfile)

router.use('/', (req, res) => res.redirect('/hospitals'))

router.use('/', generalErrorHandler)

module.exports = router