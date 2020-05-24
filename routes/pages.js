const router = require('express').Router()

const Elective = require('../models/Elective')
const { authenticate } = require('../middleware/auth')

router.get('/', authenticate, (req, res) => {
  const { user } = req.session

  res.render('home', {
    title: 'Home Page',
    user,
  })
})

router.get('/me', authenticate, (req, res) => {
  const { user } = req.session

  res.render('me', {
    title: `My Details: ${user.username}`,
    user,
  })
})

router.get('/electives', authenticate, async (req, res) => {
  const { user } = req.session
  const electives = await Elective.query().select().where('userId', user.id)

  res.render('electives', {
    title: 'Electives',
    user,
    electives,
  })
})

module.exports = router
