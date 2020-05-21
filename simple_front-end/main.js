const url = 'https://www.boredapi.com/api/activity'
const activityContainer = document.querySelector('#activity')

async function fetchActivity() {
  const response = await fetch(url)
  const json = await response.json()

  activityContainer.textContent = `${json.activity}`
}

fetchActivity()