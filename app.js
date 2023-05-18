const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const path = require('path')
const SESSION_SECRET = 'secret'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true}))
app.use(session({ 
  secret: SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true 
}))
app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.wrong_messages = req.flash('wrong_messages')  
  next()
})
app.use(routes)


app.listen(port, ()=> {
  console.log(`Express is listening on http://localhost:${port}`)
})

module.exports = app