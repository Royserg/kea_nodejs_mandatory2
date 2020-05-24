const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(loginForm)

  const username = formData.get('username')
  const password = formData.get('password')

  if (!username || !password) {
    Toast.fire({
      icon: 'error',
      title: 'Please, fill all fields',
      timer: 2000,
    })
    return
  }


  try {
    const response = await axios.post('http://localhost:3000/login', {
      username,
      password
    })

    if (response.status === 200) {
      Toast.fire({
        icon: 'success',
        title: 'Logging in',
        timer: 2000,
        onDestroy: () => {
          // User created, redirect to login page
          window.location.href = '/'
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
