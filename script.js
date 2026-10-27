"use strict";

const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedServices = Array.from(
      bookingForm.querySelectorAll('input[name="services"]:checked')
    ).map((cb) => cb.value);

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const formData = new FormData(bookingForm);
    const customerName = String(formData.get("customerName") || "").trim();
    const customerPhone = String(formData.get("customerPhone") || "").trim();

    if (!customerName || !customerPhone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const details = [
      "SHIX LAUNDRY — BOOKING REQUEST",
      `Name: ${customerName}`,
      `Phone: ${customerPhone}`,
      `Services: ${selectedServices.join(", ")}`,
      `Arrangement: ${formData.get("serviceMethod") || "Not specified"}`,
      `Address: ${String(formData.get("customerAddress") || "").trim() || "Not specified"}`,
      "",
      "Please confirm availability and pricing."
    ];

    const message = encodeURIComponent(details.join("\n"));
    window.open(`https://wa.me/254706414015?text=${message}`, "_blank", "noopener,noreferrer");
  });
});
