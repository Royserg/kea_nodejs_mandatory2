const router = require('express').Router();
const User = require('../models/User')

const { username, email, password, confirmPassword } = require('../utils/formFieldsKinds')

const bcrypt = require('bcrypt')
const saltRounds = 12

/* === Login */
router.get('/login', (req, res) => {
  res.render('login', {
    style: 'login.css',
    fields: [username, password]
  })
})

router.post('/login', (req, res) => {
  // 1. Get Form data
  const { username, password } = req.body
  console.log(username, password)
  // 2. Validate the data

  // 3. Check if user exists and get their password
  // 4. Compare passwords
  // 4. Send response based on the comparison

  return res.status(501).send({ response: 'Not implemented '})
})

/* === SignUp */
router.get('/signup', (req, res) => {
  res.render('signup', {
    fields: [username, email, password, confirmPassword]
  })
})

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (username && password) {
    // password validation
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password must be at least 8 characters long" });
    } else {
      try {
        // Check if username exists
        const userExists = await User.query()
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

router.post("/login", (req, res) => {
  res.status(501).json({ response: "Not implemented yet" });
});

router.post("/logout", (req, res) => {
  res.status(501).json({ response: "Not implemented yet" });
});

module.exports = router;
