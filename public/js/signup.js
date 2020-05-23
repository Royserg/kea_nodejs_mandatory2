  const signupForm = document.querySelector('#signupForm')

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(signupForm)

    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (!username || !email || !password || !confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'Please, fill all fields',
        timer: 2000,
      })
      return
    }
    if (password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'Passwords don\'t match',
        timer: 2000,
      })
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        email,
        password
      })

      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Account created, redirecting to login',
          timer: 3000,
          onDestroy: () => {
            // User created, redirect to login page
            window.location.href = '/login'
          }
        })
      }

    } catch(err) {
      Toast.fire({
        icon: 'error',
        title: err.response.data.response,
        timer: 2000,
      })
    }

  })







