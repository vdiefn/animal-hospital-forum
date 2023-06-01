const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { getUser } = require('../helpers/auth-helper')
const { localFileHandler } = require('../helpers/file-helpers')

const userController = {
  signUpPage: (req, res, next) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    const errors = []

    if (!name || !email || !password || !passwordCheck) throw new Error('所有欄位都是必填的！')
    if (password !== passwordCheck) throw new Error('密碼與確認密碼不相符！')

    return Promise.all([
      User.findOne({ email }),
      User.findOne({ name })
    ])
    .then(([emailCheck, nameCheck]) => {
      if (emailCheck) throw new Error('信箱已被註冊！')
      if (nameCheck) throw new Error('名稱已被使用！')
      return bcrypt.hash(password, 10)
      })
    .then(hash => {
      return User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
    })
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')  
        res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    res.redirect('/')
  },
  logout: (req, res) => {
    req.logout(function(err){
      if (err) { return next(err)}
      req.flash('success_messages', '您已經成功登出！')
      res.redirect('/hospitals')
    })
  },
  getProfile: (req, res, next) => {
    const id = getUser(req)._id
    return User.findById(id)
      .lean()
      .then((user) => {
        return res.render('profile', { user })
      })
      .catch(err => next(err))
  },
  editProfilePage: (req, res, next) => {
    const id = getUser(req)._id
    return User.findById(id)
      .lean()
      .then(user => {
        res.render('profile-edit', { user })
      })
      .catch(err => next(err))

  },
  editProfile: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    const { file } = req
    const id = getUser(req)._id
    if (password !== passwordCheck) throw new Error('密碼不相同')

    Promise.all([
      User.findById(id),
      User.findOne({ email: email }),
      User.findOne({ name: name }),
      localFileHandler(file)
    ])
    .then(async ([user, emailCheck, nameCheck, filePath]) => {
      console.log(nameCheck)
      console.log(getUser(req)._id)
      if (!user) throw new Error ("使用者不存在！")
      if (emailCheck._id.toString() !== getUser(req)._id.toString()) throw new Error('信箱已有人註冊！')
      if ((nameCheck) && (nameCheck._id.toString() !== getUser(req)._id.toString())) throw new Error('名字已有人使用！')
      return user.updateOne({
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : user.password,
        image: filePath || user.image
      })
    })
    
    .then((user) => {
      req.flash('success_messages', '已成功更新使用者資訊！')
      res.redirect(`/users/${id}`)
    })
    .catch(err => next(err))
  }

}


module.exports = userController