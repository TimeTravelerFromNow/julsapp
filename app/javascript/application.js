// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"

import "bootstrap"
import "@popperjs/core"

import "controllers"
import "trix"
import "@rails/actiontext"

// import "@rails/actioncable"

// import Sortable from 'sortablejs'

// document.addEventListener('turbo:load', () => {
//   document.addEventListener('click', () => {
//     let element = event.target.closest('.paragraph-content')
//     if (!element) return;
//     event.preventDefault()
//
//     element.classList.add('d-none')
//     element.nextElementSibling.classList.remove('d-none')
//   })
//
//   document.addEventListener('click', () => {
//     if (!event.target.matches('.cancel')) return;
//     event.preventDefault()
//     let element = event.target.closest('.paragraph-form')
//
//     element.classList.add('d-none')
//     element.previousElementSibling.classList.remove('d-none')
//   })
//
//   let element = document.getElementById('elements')
//   Sortable.create(elements, { animation: 150 })
// })
