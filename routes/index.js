const express = require('express')
const router = express.Router()
const hospitalController = require('../controllers/hospital-controller')
const userController = require('../controllers/user-controller')
const admin = require('./modules/admin')
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('passport')
const { authenticator } = require('../middleware/auth')

router.use('/admin', admin)

// 註冊
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// 登入
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signin'}), userController.signIn)

// 登出
router.get('/logout', userController.logout)

// 瀏覽所有hospital
router.get('/hospitals', hospitalController.getHospitals)


router.use('/', (req, res) => res.redirect('/hospitals'))

router.use('/', generalErrorHandler)

module.exports = router