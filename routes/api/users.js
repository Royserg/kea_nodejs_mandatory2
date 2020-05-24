const router = require('express').Router()

const User = require('../../models/User')

router.get('/api/users', async (req, res) => {
  const users = await User.query().withGraphFetched('electives')

  res.json({ users })
})

router.get('/api/users/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.query().where('id', id).withGraphFetched('electives')

  res.json({ user: user[0] })
})

// Add elective to a user
router.post('/api/users/:id/electives', async (req, res) => {
  const { id } = req.params

  const user = await User.query().findById(id)
  const elective = await user.$relatedQuery('electives').insert(req.body)

  res.json({ elective })
})

module.exports = router
