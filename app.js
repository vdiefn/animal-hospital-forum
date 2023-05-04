const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, ()=> {
  console.log(`Express is listening on http://localhost:${port}`)
})

module.exports = app