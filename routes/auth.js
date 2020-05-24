const router = require('express').Router();
const User = require('../models/User')

const { username, email, password, confirmPassword } = require('../utils/formFieldsKinds')
const { authenticate, checkSignedIn } = require('../middleware/auth')

const bcrypt = require('bcrypt')
const saltRounds = 12

/* === SignUp */
router.get('/signup', checkSignedIn, (req, res) => {
  res.render('signup', {
    fields: [username, email, password, confirmPassword]
  })
})

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    // password validation
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password must be at least 8 characters long" });
    } else {
      try {
        // Check if username exists
        const userExists = await User
                                  .query()
                                  .select()
                                  .where('username', username)
                                  .limit(1);

        if (userExists.length > 0) {
          return res.status(400).json({ response: "Username already exists" });
        }

        // Add a new user to db
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = await User.query().insert({
          username: username,
          password: hashedPassword,
          email: email,
        });
        return res
          .status(200)
          .json({ response: "Successfully signup", newUser });
      } catch (error) {
        return res
          .status(500)
          .json({ response: "Something went wrong with DB", error });
      }
    }
  } else {
    return res.status(400).json({ response: "username or password missing" });
  }
});

/* === Login */
router.get('/login', checkSignedIn, (req, res) => {
  res.render('login', {
    style: 'login.css',
    fields: [username, password]
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User
                        .query()
                        .select()
                        .where('username', username)
                        .limit(1);

    const foundUser = user[0]
    if (!foundUser) {
      throw Error()
    }

    const isCorrectPassword = await bcrypt.compare(password, foundUser.password)
    if (!isCorrectPassword) {
      throw Error()
    }

    /* Save user data to session */
    req.session.user = {
      id: foundUser.id,
      username: foundUser.username,
    }

    return res.status(200).send({ response: 'Successfully signed in'})
  } catch (err) {
    return res.status(400).json({ response: "Wrong username or password" });
  }
})

/* === Logout */
router.post("/logout", authenticate, (req, res) => {
  req.session.destroy()
  res.status(204)
});

module.exports = router;
