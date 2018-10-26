function userLogin(req, res, next) {
  req.session.userLogin ? next() : res.redirect('404')
}

module.exports = { userLogin }