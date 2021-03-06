/* eslint-env browser */
// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const newButton = document.querySelector('#new-button')

newButton.addEventListener('click', _ => {
    window.location('/customers/new')
})


update.addEventListener('click', _ => {
  fetch('/customers', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
      number: 1234,
      address: 'The Street 23 London',
      phone: '052-76252334'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
  fetch('/customers', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      
    })
    .catch(console.error)
})