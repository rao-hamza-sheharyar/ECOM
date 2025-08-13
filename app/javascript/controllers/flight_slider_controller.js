import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["track", "dots"]

  connect() {
    this.currentSlide = 0
    this.cardsPerSlide = 4
    this.totalCards = this.trackTarget.children.length
    this.totalSlides = Math.ceil(this.totalCards / this.cardsPerSlide)
  }

  goToSlide(event) {
    const slideIndex = parseInt(event.currentTarget.dataset.slideIndex)
    this.currentSlide = slideIndex
    const percentage = -(slideIndex * 100)
    this.trackTarget.style.transform = `translateX(${percentage}%)`
    this.updateDots()
  }

  updateDots() {
    this.dotsTarget.querySelectorAll("button").forEach((dot, index) => {
      dot.classList.toggle("bg-yellow-400", index === this.currentSlide)
      dot.classList.toggle("bg-gray-300", index !== this.currentSlide)
    })
  }
}
