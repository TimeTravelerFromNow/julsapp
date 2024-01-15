import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    //this.element.textContent = "Hello World!"
    this.reSort()
  }

  reSort() {
    const selector = element => element.querySelector("element").id

    const ascendingOrder = true
    const isNumeric = true

    const elems = [...this.element.querySelectorAll("element")]

    const collator = new Intl.Collator(undefined, {numeric: isNumeric, sensitivity: 'base'});

    elems.sort((elementA, elementB) => {
        const [firstElement, secondElement] = ascendingOrder ? [elementA, elementB] : [elementB, elementA];
        const idOfFirstElement = selector(firstElement);
        const idOfSecondElement = selector(secondElement);
        return collator.compare(idOfFirstElement , idOfSecondElement)
      })
      .forEach(element => this.element.appendChild(element));

  }

  shiftElems(by = 0) {

    var elemsCount = 0;
    for (let i = 0; i < this.element.children.length; i++) {
      if( this.element.children[i].classList.contains("element")) {
        elemsCount += 1
      }
    }

    var posMax = 0
    for( let i = 0; i < gon.elements.length; i++ ) {
      if (gon.elements[i].position > posMax ) {
        posMax = gon.elements[i].position
      }
    }
  }

  upBClicked() {
    console.log("elms upB")
  }
  downBClicked() {
  console.log("downB elms")
  }
}
