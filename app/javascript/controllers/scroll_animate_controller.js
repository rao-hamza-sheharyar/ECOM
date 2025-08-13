import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scroll-animate"
export default class extends Controller {
  static targets = ["card"]

  connect() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // show and animate
          entry.target.classList.remove("opacity-0")
          entry.target.classList.add("animate__animated", "animate__fadeInDown")
        } else {
          // reset so it replays when user scrolls back
          entry.target.classList.add("opacity-0")
          entry.target.classList.remove("animate__animated", "animate__fadeInDown")
        }
      })
    }, { threshold: 0.2 })

    this.cardTargets.forEach(card => observer.observe(card))
  }
}
