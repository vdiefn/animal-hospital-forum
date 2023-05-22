const { ensureAuthenticated, getUser } = require("../helpers/auth-helper")

const authenticator = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warning_messages', '請先登入才能使用！')
  res.redirect('back')
}

const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) return next()
    res.redirect('/')
  }else {
    res.redirect('back')
  }
}
 
module.exports = {
  authenticator,
  authenticatedAdmin
}