/* ==========================================================================
   Appliance Energy Consumption Website - Client Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initCurrentYear();
  initAccordion();
  initEnergyCalculator();
});

/**
 * Injects current year dynamically into the footer.
 */
function initCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Manages FAQ interactive expand/collapse accordion behavior.
 */
function initAccordion() {
  const toggleButtons = document.querySelectorAll(".faq-toggle");

  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const parentCard = this.parentElement;
      const content = parentCard.querySelector(".faq-content");
      const isOpen = parentCard.classList.contains("open");

      // Close all accordion panels
      document.querySelectorAll(".faq-card").forEach(function (card) {
        card.classList.remove("open");
        const innerContent = card.querySelector(".faq-content");
        if (innerContent) {
          innerContent.style.maxHeight = null;
        }
      });

      // Toggle current panel open if it was previously closed
      if (!isOpen) {
        parentCard.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/**
 * Handles appliance presets, input validation, and energy cost mathematics.
 */
function initEnergyCalculator() {
  const form = document.getElementById("calculatorForm");
  if (!form) return; // Terminate if not on the Home page

  const applianceSelect = document.getElementById("applianceSelect");
  const powerInput = document.getElementById("powerInput");
  const hoursInput = document.getElementById("hoursInput");
  const tariffInput = document.getElementById("tariffInput");

  const feedbackBox = document.getElementById("validationFeedback");
  const outputPanel = document.getElementById("calculatorOutputs");

  const outDailyKwh = document.getElementById("outDailyKwh");
  const outMonthlyKwh = document.getElementById("outMonthlyKwh");
  const outYearlyKwh = document.getElementById("outYearlyKwh");
  const outYearlyCost = document.getElementById("outYearlyCost");

  // Appliance dropdown preset handler
  applianceSelect.addEventListener("change", function () {
    if (this.value) {
      powerInput.value = this.value;
    }
  });

  // Calculation & Validation Event
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset error box
    feedbackBox.className = "status-msg hidden";
    feedbackBox.textContent = "";

    const powerWatts = parseFloat(powerInput.value);
    const dailyHours = parseFloat(hoursInput.value);
    const tariffCents = parseFloat(tariffInput.value);

    // Validation Guard Clauses
    if (isNaN(powerWatts) || powerWatts <= 0) {
      displayError("Please provide a valid, positive appliance wattage rating (Watts).");
      return;
    }

    if (isNaN(dailyHours) || dailyHours <= 0 || dailyHours > 24) {
      displayError("Daily operational hours must be a number between 0.1 and 24 hours.");
      return;
    }

    if (isNaN(tariffCents) || tariffCents < 0) {
      displayError("Please enter a valid electricity price per kWh (0 or greater).");
      return;
    }

    // Mathematical calculations
    const dailyKwh = (powerWatts * dailyHours) / 1000;
    const monthlyKwh = dailyKwh * 30.5; // Average days/month
    const yearlyKwh = dailyKwh * 365;
    const annualCost = yearlyKwh * (tariffCents / 100);

    // Update DOM nodes
    outDailyKwh.textContent = dailyKwh.toFixed(2) + " kWh";
    outMonthlyKwh.textContent = monthlyKwh.toFixed(2) + " kWh";
    outYearlyKwh.textContent = yearlyKwh.toFixed(2) + " kWh";
    outYearlyCost.textContent = "$" + annualCost.toFixed(2);

    // Reveal output results
    outputPanel.classList.remove("hidden");
  });

  function displayError(message) {
    feedbackBox.textContent = message;
    feedbackBox.className = "status-msg error";
    outputPanel.classList.add("hidden");
  }
}