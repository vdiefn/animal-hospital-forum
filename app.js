const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./routes')
const SESSION_SECRET = 'secret'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true}))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash()) 
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')  
  res.locals.error_messages = req.flash('error_messages')  
  next()
})
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, ()=> {
  console.log(`Express is listening on http://localhost:${port}`)
})

module.exports = app