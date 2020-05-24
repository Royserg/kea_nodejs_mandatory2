const logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    const response = axios.post('http://localhost:3000/logout')
    window.location.href = '/login'
  })
}