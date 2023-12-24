import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["paragraphOpen","paragraphClose"]

  connect() {

  }
  click(event) {
    console.log("clicked.")
    console.log(event.target.closest('.paragraph-content'))
    let element = event.target.closest('.paragraph-content')

      if (!element) return;

      event.preventDefault()

      if (!event.target.matches('.cancel')) {
      element.classList.add('d-none')
      element.nextElementSibling.classList.remove('d-none')
    } else {
      element.classList.remove('d-none') // clear just in case, dont want to accidentally have 2 'd-none'
      element.classList.add('d-none')
    }


  }
}
