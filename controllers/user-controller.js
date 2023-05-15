const bcrypt = require('bcryptjs')
const User = require('../models/user')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    const errors = []

    if (!name || !email || !password || !passwordCheck) {
      errors.push({ message: '所有欄位都是必填。' })
    }

    if (password !== passwordCheck) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }

    if (errors.length) {
      return res.render('signup', {
        errors,
        name,
        email
      })
    }
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: '這個email已經註冊過了！'})
        return res.render('signup', {
          errors,
          name
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        }))
      .then(() =>  res.redirect('/signin'))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
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
      req.flash('success_messages', '你已經成功登出！')
      res.redirect('/hospitals')
    })
  }
}


module.exports = userController