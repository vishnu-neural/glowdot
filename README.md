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
* **📱 Installable Progressive Web App (PWA)**: Complete W3C Web Manifest and Service Worker with Add to Home Screen (A2HS) support for Android devices.
* **🛡️ Live Data & Double-Booking Protection**: Core static assets are cached offline, while live booking and cancellation requests are strictly verified online to prevent double-booking or stale slot assignments.
* **📡 Branded Offline Fallback**: Custom offline fallback page (`offline.html`) and real-time connectivity status indicator.
* **✨ 100% Mobile Responsive**: Tailored for Android screen sizes (down to 320px) with 44px+ touch targets and safe area insets.

---

## 🚀 Getting Started

No build tools or heavy dependencies required.

### Option 1: Local HTTP Server (Recommended for PWA testing)
PWAs require a secure context (HTTPS or `localhost`).
Using Node.js:
```bash
npx serve .
```
Or with Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

### Option 2: Direct File Access
Open `index.html` directly in modern web browsers (Note: Service Worker and PWA install prompt require HTTP/HTTPS).

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
