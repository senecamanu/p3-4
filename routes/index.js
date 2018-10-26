const express = require('express'),
      routes = express.Router(),
      cryptoRandomString = require('crypto-random-string'),
      crypto = require('crypto'),
      { User } = require('../server/models')

routes.use(express.urlencoded({ extended: false }))

routes.use('/user', require('./user'))

//! do you believe in maaaagic

routes.get(`/`, (req, res) => res.render('index'))
routes.get(`/register`, (req, res) => res.render('register', {err:null}))

// ! Register
routes.post('/register', (req, res) => {
  const inp = req.body;
  const salt = cryptoRandomString(10);
  const hash = crypto.createHmac('sha256', inp.password)
                     .update(salt) // ?this is the salt
                     .digest('hex');
  User.create({
    name: inp.name,
    phone: inp.phoneNumber,
    email: inp.email,
    password:hash,
    salt: salt,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(data => res.redirect('/login'))
    .catch((err) => {
      res.render(`register`, { err: err.errors[0].message })
    });
})

// ! Login

routes.get('/login', (req, res) => {
  res.render('login', {err: null})
})
routes.post('/login', (req, res) => {
  const inp = req.body;
  User.findOne({where: {email: inp.email}})
    // .then(data => res.send(data))
    .then(data => {
      const checker = crypto.createHmac('sha256', inp.password)
        .update(data.salt) // ?this is the salt
        .digest('hex');
        // res.send(checker)

      if (checker.toString() === data.password.toString()) {
        req.session.name = data.name
        req.session.userLogin = true
        req.session.userId = data.id
        res.redirect('/user')
      } else {
        // res.redirect('login', {err: 'Password does not match.'})
        res.send('Password ga masuk')
      }
    })
    .catch(err => res.send(err))
})

// ! EVERYTHING ELSE GOES HERE
routes.get('*', (req, res) => res.status(404).render('404'))

module.exports = routes