
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const bookingForm = document.getElementById("booking-form");
  const preferredDate = document.getElementById("preferred-date");

  // Do not allow customers to choose a date in the past.
  if (preferredDate) {
    const now = new Date();

    const localToday = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");

    preferredDate.min = localToday;
  }

  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedServices = Array.from(
      bookingForm.querySelectorAll('input[name="services"]:checked')
    ).map((checkbox) => checkbox.value);

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const formData = new FormData(bookingForm);

    const customerName = String(
      formData.get("customerName") || ""
    ).trim();

    const customerPhone = String(
      formData.get("customerPhone") || ""
    ).trim();

    if (!customerName || !customerPhone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const details = [
      "SHIX LAUNDRY — BOOKING REQUEST",
      "",
      `Name: ${customerName}`,
      `Customer phone: ${customerPhone}`,
      `Services requested: ${selectedServices.join(", ")}`,
      `Quantity or item details: ${String(formData.get("laundrySize") || "").trim() || "Not specified"}`,
      `Service arrangement: ${formData.get("serviceMethod") || "Not specified"}`,
      `Pickup / delivery address: ${String(formData.get("customerAddress") || "").trim() || "Not specified"}`,
      `Preferred date: ${formData.get("preferredDate") || "Not specified"}`,
      `Preferred time: ${formData.get("preferredTime") || "No preference"}`,
      `Additional details: ${String(formData.get("specialInstructions") || "").trim() || "None"}`,
      "",
      "Please confirm availability, final pricing, any pickup/delivery fee and timing."
    ];

    const message = encodeURIComponent(details.join("\n"));
    const whatsappURL = `https://wa.me/254706414015?text=${message}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});
