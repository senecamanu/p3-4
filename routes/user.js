const express = require('express'),
  routes = express.Router(),
  { User, Product, Transactions } = require('../server/models'),
  { getDate } = require('../helpers/getDate')

routes.use(express.urlencoded({ extended: false }))

// !MIDDLEWARES
const {userLogin} = require('../middleware/userLogin')

// !HOME
routes.get('/', userLogin, (req, res) => {
  res.render('user/index', {name: req.session.name, err: null})
})

// !BUY
routes.get('/buy', userLogin, (req, res) => {
  Product.findAll()
    .then(data => {
      res.render('user/buy', { products: data, err: null })
    })
    .catch(err => res.send(err))
})

routes.post('/buy', userLogin, (req, res) => {
  Transactions.create({
    date: new Date(),
    UserId: Number(req.session.userId),
    ProductId: req.body.product,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(data => res.redirect('/user'))
    .catch(err => res.send(err))
})

// ! HISTORY
routes.get('/history', userLogin, (req, res) => {
  User.findOne({where: {id: req.session.userId}, include: [Product]})
    // .then(data => res.send(data))
    .then(data => {
      let productsInp = data.Products

      let labels = [] //! for all the names below it
      let datasetData = [] //! datasets data
      let datasetBG = []
      let datasetBorder = []

      for (let i in productsInp) {
        labels.push(getDate(productsInp[i].Transactions.date))
        datasetData.push(Number(productsInp[i].nominal))
        datasetBG.push("rgba(54, 162, 235, 0.2)")
        datasetBorder.push("rgba(54, 162, 235, 1)")
      }

      // res.send(typeof labels)
      res.render('user/history', 
      {name: req.session.name, 
        err:null, 
        labels: labels,
        data: data, 
        datasetData: datasetData,
        datasetBG: datasetBG,
        datasetBorder: datasetBorder
      })
    })
    .catch(err => res.send(err))

})

// ! LOGOUT

routes.get('/logout', userLogin, (req, res) => {
  req.session.userLogin = false
  res.redirect('/')
})


module.exports = routes