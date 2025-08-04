import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values= {revenue: Array}
  async connect() {
     const data = this.revenueValue.map((item)=> item[1]/100.0)
     const labels = this.revenueValue.map((item)=> item[0])
    if (!window.Chart) {
      await this.loadChartJs()
    }

    const ctx = document.getElementById("revenueChart")
    if (!ctx || !window.Chart) {
      console.error("❌ Chart.js not loaded or canvas not found")
      return
    }


    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue $',
          data: data,
          borderWidth: 3,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { color: "#d4f3ef" },
            beginAtZero: true
          }
        }
      }
    })
  }

  loadChartJs() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js"
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
}
