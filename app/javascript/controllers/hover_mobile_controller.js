// app/javascript/controllers/hover_mobile_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay"] // optional; we also query by data attributes

  connect() {
    this.media = window.matchMedia("(max-width: 767px)")
    this.cards = Array.from(document.querySelectorAll('[data-scroll-animate-target="card"]'))
    this.overlays = Array.from(document.querySelectorAll('[data-hover-target="overlay"]'))

    this._io = null
    this._onResize = this.handleResize.bind(this)

    // Run once on connect
    this.handleResize()

    // Listen for viewport changes (switching between mobile/desktop)
    this.media.addEventListener("change", this._onResize)
  }

  disconnect() {
    this.teardownObserver()
    this.media?.removeEventListener("change", this._onResize)
  }

  handleResize() {
    if (this.media.matches) {
      // Mobile behavior ON
      this.setupObserver()
      // Make sure only one is shown initially (whichever is most visible)
      this.pickMostVisibleNow()
    } else {
      // Desktop behavior: do NOT interfere with hover controller
      this.teardownObserver()
      this.hideAllOverlays() // keep desktop clean; hover will show on mouseenter
    }
  }

  setupObserver() {
    if (this._io) return
    // Use multiple thresholds so we can choose the most visible card
    this._io = new IntersectionObserver(this.handleIntersect.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    this.cards.forEach(card => this._io.observe(card))
  }

  teardownObserver() {
    if (!this._io) return
    this._io.disconnect()
    this._io = null
  }

  handleIntersect(entries) {
    if (!this.media.matches) return

    // From entries + any currently visible cards, pick the most visible
    // Build a visibility map
    const ratioByIndex = new Map()
    // Seed from any card we’ve already tracked (so quick scrolls don’t flicker)
    this.cards.forEach(card => {
      const idx = parseInt(card.dataset.index, 10)
      if (!Number.isNaN(idx)) ratioByIndex.set(idx, 0)
    })

    entries.forEach(e => {
      const idx = parseInt(e.target.dataset.index, 10)
      if (!Number.isNaN(idx)) ratioByIndex.set(idx, e.intersectionRatio)
    })

    // Pick the highest ratio
    let bestIdx = null
    let bestRatio = 0
    for (const [idx, r] of ratioByIndex.entries()) {
      if (r > bestRatio) {
        bestRatio = r
        bestIdx = idx
      }
    }

    // Only show if it’s meaningfully in view
    if (bestIdx !== null && bestRatio >= 0.35) {
      this.showOnly(bestIdx)
    } else {
      // If nothing is sufficiently in view, hide all to avoid odd states
      this.hideAllOverlays()
    }
  }

  pickMostVisibleNow() {
    // Quick pass using getBoundingClientRect to choose an initial card
    const vh = window.innerHeight || document.documentElement.clientHeight
    let bestIdx = null
    let bestPx = 0

    this.cards.forEach(card => {
      const idx = parseInt(card.dataset.index, 10)
      if (Number.isNaN(idx)) return
      const rect = card.getBoundingClientRect()
      const visiblePx = Math.max(
        0,
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      )
      if (visiblePx > bestPx) {
        bestPx = visiblePx
        bestIdx = idx
      }
    })

    if (bestIdx !== null) this.showOnly(bestIdx)
  }

  showOnly(index) {
    this.overlays.forEach(ov => {
      const i = parseInt(ov.dataset.overlayIndex, 10)
      if (i === index) {
        ov.classList.remove("hidden")
        ov.classList.add("flex")
      } else {
        ov.classList.add("hidden")
        ov.classList.remove("flex")
      }
    })
  }

  hideAllOverlays() {
    this.overlays.forEach(ov => {
      ov.classList.add("hidden")
      ov.classList.remove("flex")
    })
  }

  // Optional: keep your click-to-toggle for mobile taps
  toggle(event) {
    if (!this.media.matches) return
    const idx = parseInt(event.currentTarget.dataset.index, 10)
    const target = this.overlays.find(ov => parseInt(ov.dataset.overlayIndex, 10) === idx)
    if (!target) return

    const isHidden = target.classList.contains("hidden")
    if (isHidden) {
      this.showOnly(idx)
    } else {
      target.classList.add("hidden")
      target.classList.remove("flex")
    }
  }
}
