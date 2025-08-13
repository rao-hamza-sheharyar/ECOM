// app/javascript/controllers/grid_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["background"]
  static values = {
    images: Array,
    interval: Number
  }

  connect() {
    this.index = 0
    if (this.hasBackgroundTarget && this.imagesValue.length > 0) {
      this.startBackgroundRotation()
    }
  }

  startBackgroundRotation() {
    this.updateBackground()
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.imagesValue.length
      this.updateBackground()
    }, this.intervalValue || 3000)
  }

  updateBackground() {
    this.backgroundTarget.style.backgroundImage = `url(${this.imagesValue[this.index]})`
  }

  disconnect() {
    clearInterval(this.timer)
  }
}
