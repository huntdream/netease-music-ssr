import fetch from 'isomorphic-fetch'

export function fetchEvent() {
  const url = 'http://localhost:3000/user?uid=32693089'

  return fetch(url)
    .then(res => res.json())
    .then(data => data.events)
    .catch(error => {
      console.warn(error)
      return null
    })
}
