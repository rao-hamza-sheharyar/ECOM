// app/javascript/controllers/home_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["slideshow", "tab", "destinationList"]
  static values = {
    images: Array,
    interval: Number
  }

  connect() {
    this.index = 0
    this.startSlideshow()
    this.activateTab(this.tabTargets[0])
    this.initDestinations()
    this.startCardRotation()
  }

  // ✅ Slideshow logic
  startSlideshow() {
    if (!this.hasSlideshowTarget || !this.imagesValue?.length) return

    this.updateBackground()
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.imagesValue.length
      this.updateBackground()
    }, this.intervalValue || 3000)
  }

  updateBackground() {
    this.slideshowTarget.style.backgroundImage = `url(${this.imagesValue[this.index]})`
  }

  // ✅ Tabs
  activate(event) {
    this.activateTab(event.currentTarget)
  }

  activateTab(activeTab) {
    this.tabTargets.forEach(tab => {
      tab.classList.remove("bg-white", "text-black")
      tab.classList.add("bg-transparent", "text-white")
    })

    activeTab.classList.remove("bg-transparent", "text-white")
    activeTab.classList.add("bg-white", "text-black")
  }

  // ✅ Destination Cards Rotation
  initDestinations() {
    this.allDestinations = [
      { name: 'Kathmandu', price: '656.00' },
      { name: 'Windhoek', price: '1324.00' },
      { name: 'Lagos', price: '640.00' },
      { name: 'Entebbe', price: '706.40' },
      { name: 'Istanbul', price: '540.00' },
      { name: 'Dubai', price: '880.00' },
      { name: 'Doha', price: '760.00' },
      { name: 'Karachi', price: '430.00' },
      { name: 'Cairo', price: '720.00' }
    ]

    this.visibleCards = this.allDestinations.slice(0, 4)
    this.nextIndex = 4
    this.renderCards()
  }

  startCardRotation() {
    this.cardTimer = setInterval(() => {
      // Remove first card and push next one if available
      this.visibleCards.shift()

      const next = this.allDestinations[this.nextIndex % this.allDestinations.length]
      this.visibleCards.push(next)

      this.nextIndex++
      this.renderCards()
    }, 2000)
  }

  renderCards() {
    if (!this.hasDestinationListTarget) return

    this.destinationListTarget.innerHTML = this.visibleCards.map(d => `
      <div class="bg-red-800/70 text-white p-4 sm:p-6 rounded-lg text-center space-y-2 shadow-md transition-opacity duration-500">
        <h4 class="text-base sm:text-xl font-bold">${d.name}</h4>
        <p class="text-sm sm:text-base">
          From £<span class="text-yellow-400 font-bold">${d.price}</span>/Person
        </p>
        <button class="bg-yellow-400 text-black font-semibold px-3 sm:px-4 py-1.5 hover:bg-yellow-500 animate__animated animate__shakeX">
          Book Now
        </button>
      </div>
    `).join("")
  }
  disconnect() {
    clearInterval(this.timer)
    clearInterval(this.cardTimer)
  }
}
