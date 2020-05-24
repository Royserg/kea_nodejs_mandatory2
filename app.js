const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

/* Handlebars */
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

/* SESSION */
const session = require('express-session')

// You need to copy config.template.json and fill it with your secret
const { sessionSecret } = require('./config/config.json')

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}))

/* RATE LIMIT  */
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 8 requests per windowMs
})

app.use(limiter)

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8 // limit each IP to 8 requests per windowMs
})

app.use('/signup', authLimiter)
app.use('/login', authLimiter)

/* Setup Knex ======= */
const { Model } = require('objection')
const Knex = require('knex')
const knexfile = require('./knexfile')
// Initialize knex
const knex = Knex(knexfile.development)
// Give the knex instance to objection.
Model.knex(knex)

/* Routes =========== */

const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
  // auth
app.use(authRoute)
  // users
app.use(usersRoute)

/*  */
const Elective = require('./models/Elective')

const { authenticate } = require('./middleware/auth')

app.get('/', authenticate, (req, res) => {
  const list = ['first', 'second', 'third']
  const content = 'this is some content'
  res.render('home', {
    title: 'home page',
    user: req.session.user,
    content,
    published: true,
    list,
  })
})

app.get('/electives', async (req, res) => {

  const electives = await Elective.query()
  // res.json({ electives: electives })
  console.log(electives)
  res.render('electives', {
    title: 'Electives',
    electives,
  })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`problems running the server, ${error}`);
  }
  console.log(`Server running on port: ${PORT}`);
});
