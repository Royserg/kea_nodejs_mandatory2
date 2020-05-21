const router = require("express").Router();

const User = require('../models/User')

router.get('/users', async (req, res) => {
  const users = await User.query().withGraphFetched('electives')

  res.json({ users })
})

router.get('/users/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.query().where('id', id).withGraphFetched('electives')

  res.json({ user: user[0] })
})

// Add elective for a user
router.post('/users/:id/electives', async (req, res) => {
  const { id } = req.params

  const user = await User.query().findById(id)
  const elective = await user.$relatedQuery('electives').insert( req.body )

  res.json({ elective })
})

/* Session tests */
router.get('/setsessionvalue', (req, res) => {
  req.session.payingAttention = true
  return res.send({response: 'OK'})
})

router.get('/getsessionvalue', (req, res) => {
  const { session } = req
  return res.send({ payingAttention: session.payingAttention })
})

router.get('/test', (req, res) => {
  const dynamicData = req.query
  console.log(dynamicData)

  return res.json(dynamicData)
})

module.exports = router
