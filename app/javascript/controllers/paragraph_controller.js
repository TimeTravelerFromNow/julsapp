import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["paragraphOpen","paragraphClose"]

  connect() {
  
  }
  click(event) {
    console.log("clicked.")
    var element = event.target.closest('.paragraph-content')
    event.preventDefault()

    if (element) {

          element.classList.add('d-none')
          element.nextElementSibling.classList.remove('d-none')
          return;
    }

    element = event.target.closest('.paragraph-form')
    if (!element) {
          return;
    }

    if (!event.target.matches('.cancel')) return;

    element.classList.add('d-none')
    element.previousElementSibling.classList.remove('d-none')

  }
}
