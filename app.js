// ! BASIC CONFIG
const express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'),
  path = require('path'),
  session = require('express-session'),
  routes = require('./routes'),
  crypto = require('crypto'),
  cryptoRandomString = require('crypto-random-string'),
  nodemailer = require('nodemailer');

app.set('view engine', 'ejs')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(session({secret: 'p3'}))

// ! HELPERS
const { productText } = require('./helpers/productText')
app.locals.productText = productText
const { getDate } = require('./helpers/getDate')
app.locals.getDate = getDate
const { currency } = require('./helpers/currency')
app.locals.currency = currency




app.use(routes)

app.listen(port, () => console.log(`Listening on ${port}`))