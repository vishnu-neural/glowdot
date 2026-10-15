# BeautySlot — Smart Beauty Parlour Booking Platform

> **"Book Your Beauty. Skip the Queue."**

BeautySlot is a modern, responsive web platform designed to streamline salon appointments and doorstep beauty services. Customers can explore top salons, compare treatments, reserve queue-free time slots in real time, or request verified beauty specialists right at home.

---

## 🌟 Key Features

* **⚡ Real-Time Slot Reservation**: Interactive time slot picker (10:00 AM – 08:00 PM) that actively prevents double-booking for the same salon, date, and time.
* **🏠 Salon Visit or Doorstep Home Service**: Flexible toggle allowing customers to either visit the parlour or have a stylist visit their home.
* **🔎 Salon & City Discovery**: Search by parlour name, city (*Bengaluru, Mumbai, Delhi, Hyderabad*), or service with quick-category filters (*Women Only, Unisex, Home Visit*).
* **💅 Curated Treatment Menu**: Transparent pricing and durations for popular treatments:
  * Haircut & Styling
  * Herbal & Glow Facial
  * Hair Styling & Blowout
  * Bridal HD Makeup
  * Deluxe Spa Manicure
  * Relaxing Foot Pedicure
* **📅 My Bookings Management**: Instant client-side persistence via `localStorage`, appointment tracking, status filters, and one-click cancellation (which automatically frees up the slot for others).
* **📱 100% Responsive Design**: Aesthetic lavender and soft-pink palette optimized for mobile, tablet, and desktop screens.

---

## 🚀 Getting Started

No build tools or heavy dependencies required.

### Option 1: Direct File Access
1. Clone this repository:
   ```bash
   git clone https://github.com/vishnu-neural/glowdot.git
   ```
2. Open `index.html` directly in any modern web browser.

### Option 2: Local HTTP Server
Using Node.js:
```bash
npx serve .
```
Or with Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3 (Modern Flexbox, CSS Grid, Custom Variables), Vanilla JavaScript (ES6+).
* **Persistence**: Browser `localStorage` (Demo Mode).
* **Icons & Fonts**: Plus Jakarta Sans, Native Emojis.

---

## 🔒 Production Architecture Note

This MVP implements client-side slot tracking and persistence. For full enterprise deployment:
* **Backend**: Node.js/Express or Python/FastAPI.
* **Database**: PostgreSQL / MongoDB for multi-user transaction locks and atomic slot booking.
* **Authentication**: JWT/OAuth2 for customer & salon owner accounts.
* **Payment Gateway**: Razorpay / Stripe integration.
* **Notifications**: SMS / WhatsApp notifications via Twilio or Gupshup.

---

## 📄 License
MIT License. Built for hackathon showcase.
