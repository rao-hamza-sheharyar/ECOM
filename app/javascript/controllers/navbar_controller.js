import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["menu", "topbar", "redbar"]

    connect() {
        this._onScroll = this.handleScroll.bind(this)
        window.addEventListener("scroll", this._onScroll, { passive: true })
        this.updateSpacer()
    }

    disconnect() {
        window.removeEventListener("scroll", this._onScroll)
    }

    toggle() {
        if (this.hasMenuTarget) {
            this.menuTarget.classList.toggle("hidden")
        }
    }

    handleScroll() {
        const y = window.scrollY || 0

        if (this.hasTopbarTarget) {
            if (y > 10) {
                this.topbarTarget.style.display = "none"
            } else {
                this.topbarTarget.style.display = "flex"
            }
        }

        this.updateSpacer()
    }

    updateSpacer() {
        const spacer = document.getElementById("header-spacer")
        if (spacer) {
            spacer.style.height = this.element.offsetHeight + "px"
        }
    }
}
