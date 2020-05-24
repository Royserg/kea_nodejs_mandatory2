
const authenticate = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    // User not authenticated
    res.redirect('/login')
  }
}

const checkSignedIn = (req, res, next) => {
  if (req.session.user) {
    console.log('redirecting to home page')
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = {
  authenticate,
  checkSignedIn,
}
