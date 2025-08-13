import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay"]

  show(event) {
    const index = event.currentTarget.dataset.index
    const overlay = this.overlayTargets.find(o => o.dataset.overlayIndex === index)
    if (overlay) overlay.classList.remove("hidden")
  }

  hide(event) {
    const index = event.currentTarget.dataset.index
    const overlay = this.overlayTargets.find(o => o.dataset.overlayIndex === index)
    if (overlay) overlay.classList.add("hidden")
  }
}