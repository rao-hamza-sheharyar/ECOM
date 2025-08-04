import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart || cart.length === 0) return

    let total = 0
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]
      total += item.price * item.quantity

      const div = document.createElement("div")
      div.classList.add("mt-2")
      div.innerText = `Item: ${item.name} - $${(item.price / 100).toFixed(2)} - Size: ${item.size} - Quantity: ${item.quantity}`

      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Remove"
      deleteButton.value = JSON.stringify({ id: item.id, size: item.size })
      deleteButton.classList.add("bg-gray-500", "rounded", "text-white", "px-2", "py-1", "ml-2")
      deleteButton.addEventListener("click", this.removeFromCart.bind(this))
      div.appendChild(deleteButton)

      this.element.prepend(div)
    }

    const totalEl = document.createElement("div")
    totalEl.innerText = `Total: $${(total / 100).toFixed(2)}`
    const totalContainer = document.getElementById("total")
    if (totalContainer) {
      totalContainer.appendChild(totalEl)
    }
  }

  clear() {
    localStorage.removeItem("cart")
    window.location.reload()
  }

  removeFromCart(event) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const values = JSON.parse(event.target.value)
    const { id, size } = values
    const index = cart.findIndex(item => item.id === id && item.size === size)

    if (index > -1) {
      cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(cart))
      window.location.reload()
    }
  }

  checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const csrfToken = document.querySelector("[name='csrf-token']")?.content

    const payload = {
      authenticity_token: csrfToken,
      cart: cart
    }

    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(body => {
            window.location.href = body.url
          })
        } else {
          return response.json().then(body => {
            const errorEl = document.createElement("div")
            errorEl.innerText = `There was an error processing your order. ${body.error}`
            const errorContainer = document.getElementById("errorContainer")
            if (errorContainer) errorContainer.appendChild(errorEl)
          })
        }
      })
      .catch(err => {
        console.error("Checkout error:", err)
      })
  }
}
