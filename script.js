/**
 * BeautySlot — Smart Beauty Parlour Booking Platform
 * Vanilla JavaScript MVP Implementation
 */

// ==========================================
// 1. DATASETS (SERVICES, SALONS, TIME SLOTS)
// ==========================================

const SERVICES_DATA = [
  {
    id: "srv-haircut",
    name: "Haircut & Styling",
    category: "Hair Care",
    icon: "💇‍♀️",
    price: 399,
    duration: "45 mins",
    desc: "Custom precision cut, conditioning wash, blow-dry, and professional styling tailored to your face shape."
  },
  {
    id: "srv-facial",
    name: "Herbal & Glow Facial",
    category: "Skin Care",
    icon: "✨",
    price: 899,
    duration: "60 mins",
    desc: "Deep pore cleansing, herbal exfoliation, vitamin-C glow massage, and rejuvenating herbal mask."
  },
  {
    id: "srv-hairstyling",
    name: "Hair Styling & Blowout",
    category: "Hair Care",
    icon: "💁‍♀️",
    price: 599,
    duration: "40 mins",
    desc: "Sleek straight, beach waves, or voluminous curls for parties, weddings, and special events."
  },
  {
    id: "srv-bridal",
    name: "Bridal HD Makeup",
    category: "Makeup",
    icon: "👰",
    price: 4999,
    duration: "120 mins",
    desc: "High-definition luxury bridal makeover with hair styling, saree/lehenga draping, and setting mist."
  },
  {
    id: "srv-manicure",
    name: "Deluxe Spa Manicure",
    category: "Nails & Hands",
    icon: "💅",
    price: 449,
    duration: "35 mins",
    desc: "Nail shaping, cuticle treatment, organic sugar scrub, gentle hand massage, and long-stay gel polish."
  },
  {
    id: "srv-pedicure",
    name: "Relaxing Foot Pedicure",
    category: "Foot Care",
    icon: "🦶",
    price: 549,
    duration: "45 mins",
    desc: "Aromatherapy foot soak, dead skin exfoliation, heel softening therapy, and soothing pressure massage."
  }
];

const SALONS_DATA = [
  {
    id: "salon-aura",
    name: "Aura Glow Salon & Spa",
    city: "Bengaluru",
    area: "Indiranagar",
    rating: 4.9,
    reviewsCount: 340,
    type: "unisex", // unisex, women
    homeService: true,
    startingPrice: 399,
    services: ["Haircut & Styling", "Herbal & Glow Facial", "Deluxe Spa Manicure", "Relaxing Foot Pedicure"]
  },
  {
    id: "salon-blossom",
    name: "Blossom Women Studio",
    city: "Mumbai",
    area: "Bandra West",
    rating: 4.8,
    reviewsCount: 290,
    type: "women",
    homeService: true,
    startingPrice: 449,
    services: ["Herbal & Glow Facial", "Bridal HD Makeup", "Deluxe Spa Manicure", "Hair Styling & Blowout"]
  },
  {
    id: "salon-velvet",
    name: "Royal Velvet Luxury Parlour",
    city: "Delhi NCR",
    area: "South Extension",
    rating: 4.9,
    reviewsCount: 420,
    type: "unisex",
    homeService: false,
    startingPrice: 599,
    services: ["Haircut & Styling", "Bridal HD Makeup", "Herbal & Glow Facial", "Hair Styling & Blowout"]
  },
  {
    id: "salon-lavender",
    name: "Lavender Petals Beauty Hub",
    city: "Bengaluru",
    area: "Koramangala",
    rating: 4.7,
    reviewsCount: 215,
    type: "women",
    homeService: true,
    startingPrice: 349,
    services: ["Herbal & Glow Facial", "Deluxe Spa Manicure", "Relaxing Foot Pedicure"]
  },
  {
    id: "salon-urban",
    name: "Urban Glam Stylists",
    city: "Hyderabad",
    area: "Jubilee Hills",
    rating: 4.8,
    reviewsCount: 310,
    type: "unisex",
    homeService: true,
    startingPrice: 499,
    services: ["Haircut & Styling", "Hair Styling & Blowout", "Herbal & Glow Facial"]
  },
  {
    id: "salon-sparkle",
    name: "Sparkle & Grace Makeovers",
    city: "Mumbai",
    area: "Andheri East",
    rating: 4.6,
    reviewsCount: 180,
    type: "women",
    homeService: false,
    startingPrice: 399,
    services: ["Bridal HD Makeup", "Haircut & Styling", "Deluxe Spa Manicure"]
  }
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
  "07:00 PM",
  "08:00 PM"
];

const STORAGE_KEY = "beautyslot_bookings";

// ==========================================
// 2. STATE & STORAGE MANAGEMENT
// ==========================================

function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with 1 initial sample booking for rich demo UX
      const seedData = [
        {
          id: "BS-1024",
          salonId: "salon-aura",
          salonName: "Aura Glow Salon & Spa",
          serviceId: "srv-facial",
          serviceName: "Herbal & Glow Facial",
          price: 899,
          date: getTomorrowDateString(),
          slot: "11:30 AM",
          serviceMode: "Salon Visit",
          customerName: "Aishwarya Rai",
          customerPhone: "9876543210",
          customerAddress: "",
          specialNotes: "Organic herbal ingredients preferred",
          status: "Confirmed",
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading localStorage:", err);
    return [];
  }
}

function saveStoredBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error("Error writing to localStorage:", err);
  }
}

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTomorrowDateString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ==========================================
// 3. UI RENDERING FUNCTIONS
// ==========================================

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  grid.innerHTML = SERVICES_DATA.map(srv => `
    <div class="service-card" data-service-id="${srv.id}">
      <div>
        <div class="service-card-top">
          <div class="service-icon-box">${srv.icon}</div>
          <div class="service-title-area">
            <span class="service-tag">${srv.category}</span>
            <h3>${srv.name}</h3>
          </div>
        </div>
        <p class="service-desc">${srv.desc}</p>
      </div>
      <div>
        <div class="service-meta-row">
          <div class="service-price">₹${srv.price}</div>
          <div class="service-duration">⏱️ ${srv.duration}</div>
        </div>
        <button type="button" class="btn btn-outline btn-block" onclick="quickBookService('${srv.id}')">
          Book This Service →
        </button>
      </div>
    </div>
  `).join("");
}

let activeSalonCategory = "all";
let activeSalonSearch = "";

function renderSalons() {
  const grid = document.getElementById("salonsGrid");
  if (!grid) return;

  const query = activeSalonSearch.toLowerCase().trim();

  const filtered = SALONS_DATA.filter(salon => {
    // Category filter
    if (activeSalonCategory === "women" && salon.type !== "women") return false;
    if (activeSalonCategory === "unisex" && salon.type !== "unisex") return false;
    if (activeSalonCategory === "home" && !salon.homeService) return false;

    // Search filter (name, city, area, services)
    if (query) {
      const matchName = salon.name.toLowerCase().includes(query);
      const matchCity = salon.city.toLowerCase().includes(query);
      const matchArea = salon.area.toLowerCase().includes(query);
      const matchService = salon.services.some(s => s.toLowerCase().includes(query));
      if (!matchName && !matchCity && !matchArea && !matchService) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-bookings-box" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔍</div>
        <h3>No Salons Found</h3>
        <p>No parlours matched your search criteria. Try a different city or category.</p>
        <button class="btn btn-outline" onclick="resetSalonFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(salon => `
    <div class="salon-card" data-salon-id="${salon.id}">
      <div>
        <div class="salon-header-row">
          <div class="salon-name-box">
            <h3>${salon.name}</h3>
            <div class="salon-location">📍 ${salon.area}, ${salon.city}</div>
          </div>
          <div class="salon-rating">★ ${salon.rating}</div>
        </div>

        <div class="salon-tags">
          <span class="tag-badge ${salon.type === 'women' ? 'tag-women' : 'tag-unisex'}">
            ${salon.type === 'women' ? '🌸 Women Only' : '👥 Unisex'}
          </span>
          ${salon.homeService ? '<span class="tag-badge tag-home">🏡 Home Visit Available</span>' : ''}
        </div>

        <div class="salon-services-list">
          <strong>Key Services:</strong>
          ${salon.services.slice(0, 3).join(" • ")}
        </div>
      </div>

      <div class="salon-card-footer">
        <div class="salon-starting-price">
          Starting from
          <span>₹${salon.startingPrice}</span>
        </div>
        <button type="button" class="btn btn-primary btn-sm" onclick="quickBookSalon('${salon.id}')">
          Reserve Slot ⚡
        </button>
      </div>
    </div>
  `).join("");
}

function populateBookingDropdowns() {
  const salonSelect = document.getElementById("bookingSalon");
  const serviceSelect = document.getElementById("bookingService");

  if (salonSelect) {
    salonSelect.innerHTML = `<option value="">-- Choose a Salon --</option>` +
      SALONS_DATA.map(s => `<option value="${s.id}">${s.name} (${s.city} - ${s.area})</option>`).join("");
  }

  if (serviceSelect) {
    serviceSelect.innerHTML = `<option value="">-- Choose a Service --</option>` +
      SERVICES_DATA.map(s => `<option value="${s.id}">${s.name} (₹${s.price} • ${s.duration})</option>`).join("");
  }
}

function renderTimeSlots() {
  const container = document.getElementById("slotsContainer");
  const salonSelect = document.getElementById("bookingSalon");
  const dateInput = document.getElementById("bookingDate");
  const selectedSlotInput = document.getElementById("selectedSlot");

  if (!container || !salonSelect || !dateInput || !selectedSlotInput) return;

  const salonId = salonSelect.value;
  const date = dateInput.value;

  if (!salonId || !date) {
    container.innerHTML = `<div class="slots-hint-msg">Please select both a salon and date to view live slots</div>`;
    selectedSlotInput.value = "";
    return;
  }

  // Find existing active bookings for this salon and date
  const bookings = getStoredBookings();
  const bookedSlots = bookings
    .filter(b => b.salonId === salonId && b.date === date && b.status !== "Cancelled")
    .map(b => b.slot);

  const currentSelection = selectedSlotInput.value;

  container.innerHTML = TIME_SLOTS.map(slot => {
    const isBooked = bookedSlots.includes(slot);
    const isSelected = !isBooked && (currentSelection === slot);

    return `
      <button 
        type="button" 
        class="slot-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}" 
        ${isBooked ? 'disabled title="Slot already reserved"' : ''}
        onclick="selectSlot('${slot}')"
      >
        ${slot}
      </button>
    `;
  }).join("");

  // Clear selection if current selection became invalid
  if (bookedSlots.includes(currentSelection)) {
    selectedSlotInput.value = "";
  }
}

window.selectSlot = function(slot) {
  const selectedSlotInput = document.getElementById("selectedSlot");
  const errorSlot = document.getElementById("errorSlot");
  if (!selectedSlotInput) return;

  selectedSlotInput.value = slot;
  if (errorSlot) errorSlot.textContent = "";

  renderTimeSlots();
};

let activeBookingFilter = "all";

function renderBookingsList() {
  const container = document.getElementById("bookingsList");
  const countBadge = document.getElementById("bookingsCountBadge");
  if (!container) return;

  const bookings = getStoredBookings();

  // Update navbar count with active confirmed bookings
  const confirmedCount = bookings.filter(b => b.status === "Confirmed").length;
  if (countBadge) {
    countBadge.textContent = confirmedCount;
  }

  const filtered = bookings.filter(b => {
    if (activeBookingFilter === "Confirmed") return b.status === "Confirmed";
    if (activeBookingFilter === "Cancelled") return b.status === "Cancelled";
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-bookings-box">
        <div class="empty-icon">📅</div>
        <h3>No Appointments Found</h3>
        <p>${activeBookingFilter === 'all' 
          ? "You haven't booked any beauty parlour appointments yet." 
          : `No appointments with status '${activeBookingFilter}'.`}</p>
        <a href="#booking" class="btn btn-primary">Book Your First Slot Now</a>
      </div>
    `;
    return;
  }

  // Sort by date (newest first)
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

  container.innerHTML = sorted.map(booking => {
    const isConfirmed = booking.status === "Confirmed";
    return `
      <div class="booking-item-card">
        <div class="booking-main-info">
          <span class="booking-ref-badge">REF: ${booking.id}</span>
          <div class="booking-salon-name">${escapeHtml(booking.salonName)}</div>
          <div class="booking-service-title">${escapeHtml(booking.serviceName)} • <span class="booking-price-tag">₹${booking.price}</span></div>
          
          <div class="booking-details-row">
            <span class="booking-detail-pill">📅 ${booking.date}</span>
            <span class="booking-detail-pill">⏰ ${booking.slot}</span>
            <span class="booking-detail-pill">${booking.serviceMode === 'Home Service' ? '🏡 Home Service' : '🏢 In-Salon'}</span>
            <span class="booking-detail-pill">👤 ${escapeHtml(booking.customerName)} (${escapeHtml(booking.customerPhone)})</span>
          </div>

          ${booking.customerAddress ? `<div class="field-hint">📍 Address: ${escapeHtml(booking.customerAddress)}</div>` : ''}
          ${booking.specialNotes ? `<div class="field-hint">📝 Notes: ${escapeHtml(booking.specialNotes)}</div>` : ''}
        </div>

        <div class="booking-status-side">
          <span class="status-badge ${isConfirmed ? 'status-confirmed' : 'status-cancelled'}">
            ${isConfirmed ? '● Confirmed Slot' : '✕ Cancelled'}
          </span>

          ${isConfirmed ? `
            <button type="button" class="btn btn-outline btn-danger btn-sm" onclick="cancelAppointment('${booking.id}')">
              Cancel Slot
            </button>
          ` : `
            <span class="field-hint">Slot freed up</span>
          `}
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================
// 4. BOOKING ACTIONS & CANCELLATION
// ==========================================

function handleBookingSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("appointmentForm");
  const salonSelect = document.getElementById("bookingSalon");
  const serviceSelect = document.getElementById("bookingService");
  const dateInput = document.getElementById("bookingDate");
  const selectedSlotInput = document.getElementById("selectedSlot");
  const nameInput = document.getElementById("customerName");
  const phoneInput = document.getElementById("customerPhone");
  const addressInput = document.getElementById("customerAddress");
  const notesInput = document.getElementById("specialNotes");
  const modeRadio = document.querySelector('input[name="serviceMode"]:checked');

  // Reset errors
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");

  let isValid = true;

  if (!salonSelect.value) {
    document.getElementById("errorSalon").textContent = "Please select a parlour.";
    isValid = false;
  }

  if (!serviceSelect.value) {
    document.getElementById("errorService").textContent = "Please select a service.";
    isValid = false;
  }

  const todayStr = getTodayDateString();
  if (!dateInput.value) {
    document.getElementById("errorDate").textContent = "Please select an appointment date.";
    isValid = false;
  } else if (dateInput.value < todayStr) {
    document.getElementById("errorDate").textContent = "Past dates are not allowed. Please choose today or a future date.";
    isValid = false;
  }

  if (!selectedSlotInput.value) {
    document.getElementById("errorSlot").textContent = "Please select an available time slot pill above.";
    isValid = false;
  }

  const nameVal = nameInput.value.trim();
  if (!nameVal || nameVal.length < 2) {
    document.getElementById("errorName").textContent = "Please enter your valid name (at least 2 letters).";
    isValid = false;
  }

  const phoneVal = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phoneVal)) {
    document.getElementById("errorPhone").textContent = "Please enter a valid 10-digit mobile number.";
    isValid = false;
  }

  const serviceMode = modeRadio ? modeRadio.value : "Salon Visit";
  if (serviceMode === "Home Service" && (!addressInput.value.trim() || addressInput.value.trim().length < 5)) {
    document.getElementById("errorAddress").textContent = "Please enter your home address for the beauty specialist visit.";
    isValid = false;
  }

  if (!isValid) {
    showToast("Please check and fill in all required fields.", "error");
    return;
  }

  // Duplicate Slot Check
  const bookings = getStoredBookings();
  const isDuplicate = bookings.some(b => 
    b.salonId === salonSelect.value &&
    b.date === dateInput.value &&
    b.slot === selectedSlotInput.value &&
    b.status !== "Cancelled"
  );

  if (isDuplicate) {
    document.getElementById("errorSlot").textContent = "Sorry, this time slot was just taken. Please pick another slot.";
    showToast("This slot is already booked for this salon and date.", "error");
    renderTimeSlots();
    return;
  }

  const selectedSalonObj = SALONS_DATA.find(s => s.id === salonSelect.value);
  const selectedServiceObj = SERVICES_DATA.find(s => s.id === serviceSelect.value);

  // Generate Reference ID (e.g. BS-48291)
  const refId = "BS-" + Math.floor(10000 + Math.random() * 90000);

  const newBooking = {
    id: refId,
    salonId: selectedSalonObj.id,
    salonName: selectedSalonObj.name,
    serviceId: selectedServiceObj.id,
    serviceName: selectedServiceObj.name,
    price: selectedServiceObj.price,
    date: dateInput.value,
    slot: selectedSlotInput.value,
    serviceMode: serviceMode,
    customerName: nameVal,
    customerPhone: phoneVal,
    customerAddress: serviceMode === "Home Service" ? addressInput.value.trim() : "",
    specialNotes: notesInput ? notesInput.value.trim() : "",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  saveStoredBookings(bookings);

  // Show Confirmation Modal
  showConfirmationModal(newBooking);

  // Update UI & My Bookings
  renderBookingsList();
  renderTimeSlots();

  // Reset form inputs except date/salon
  form.reset();
  document.getElementById("modeSalon").checked = true;
  toggleAddressVisibility("Salon Visit");
  selectedSlotInput.value = "";
  dateInput.value = todayStr;
  
  showToast(`Appointment confirmed! Ref ID: ${refId}`, "success");
}

window.cancelAppointment = function(bookingId) {
  if (!confirm(`Are you sure you want to cancel appointment ${bookingId}? The slot will become available for others.`)) {
    return;
  }

  const bookings = getStoredBookings();
  const target = bookings.find(b => b.id === bookingId);
  if (target) {
    target.status = "Cancelled";
    saveStoredBookings(bookings);
    renderBookingsList();
    renderTimeSlots();
    showToast(`Appointment ${bookingId} has been cancelled.`, "info");
  }
};

// ==========================================
// 5. MODAL & TOAST NOTIFICATIONS
// ==========================================

function showConfirmationModal(booking) {
  const modal = document.getElementById("confirmationModal");
  const details = document.getElementById("confirmationDetails");
  if (!modal || !details) return;

  details.innerHTML = `
    <div class="modal-receipt-card">
      <div class="receipt-ref-header">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Reference ID</span>
          <h4 style="font-size:1.15rem; color:var(--primary-color); font-family:monospace;">${booking.id}</h4>
        </div>
        <span class="status-badge status-confirmed">Confirmed</span>
      </div>

      <div class="receipt-row">
        <span class="label">Salon:</span>
        <span class="value">${escapeHtml(booking.salonName)}</span>
      </div>
      <div class="receipt-row">
        <span class="label">Service:</span>
        <span class="value">${escapeHtml(booking.serviceName)}</span>
      </div>
      <div class="receipt-row">
        <span class="label">Date:</span>
        <span class="value">${booking.date}</span>
      </div>
      <div class="receipt-row">
        <span class="label">Time Slot:</span>
        <span class="value">${booking.slot}</span>
      </div>
      <div class="receipt-row">
        <span class="label">Service Type:</span>
        <span class="value">${booking.serviceMode}</span>
      </div>
      <div class="receipt-row">
        <span class="label">Customer:</span>
        <span class="value">${escapeHtml(booking.customerName)} (${escapeHtml(booking.customerPhone)})</span>
      </div>
      ${booking.customerAddress ? `
        <div class="receipt-row">
          <span class="label">Home Address:</span>
          <span class="value">${escapeHtml(booking.customerAddress)}</span>
        </div>
      ` : ''}

      <div class="receipt-total-row">
        <span>Demo Amount to Pay:</span>
        <span style="color:var(--primary-color);">₹${booking.price}</span>
      </div>
    </div>
    <p style="font-size:0.8rem; color:var(--text-muted); text-align:center;">
      A confirmation SMS demo has been triggered. Please present this reference code upon arrival.
    </p>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function hideConfirmationModal() {
  const modal = document.getElementById("confirmationModal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <span>${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
    <div>${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 6. QUICK BOOKING HELPERS
// ==========================================

window.quickBookService = function(serviceId) {
  const serviceSelect = document.getElementById("bookingService");
  const bookingSection = document.getElementById("booking");
  if (serviceSelect) {
    serviceSelect.value = serviceId;
  }
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
  showToast("Service selected! Pick your salon & slot to finish booking.", "info");
};

window.quickBookSalon = function(salonId) {
  const salonSelect = document.getElementById("bookingSalon");
  const bookingSection = document.getElementById("booking");
  if (salonSelect) {
    salonSelect.value = salonId;
    renderTimeSlots();
  }
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
  showToast("Salon selected! Pick your service & slot to finish booking.", "info");
};

window.quickBook = function(salonName, serviceName) {
  const salon = SALONS_DATA.find(s => s.name.toLowerCase().includes(salonName.toLowerCase()));
  const service = SERVICES_DATA.find(s => s.name.toLowerCase().includes(serviceName.toLowerCase()));

  if (salon) {
    const sSelect = document.getElementById("bookingSalon");
    if (sSelect) sSelect.value = salon.id;
  }
  if (service) {
    const srvSelect = document.getElementById("bookingService");
    if (srvSelect) srvSelect.value = service.id;
  }

  renderTimeSlots();
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
};

window.resetSalonFilters = function() {
  activeSalonCategory = "all";
  activeSalonSearch = "";
  const searchInput = document.getElementById("salonSearchFilter");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll("#categoryFilters .filter-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === "all");
  });

  renderSalons();
};

function toggleAddressVisibility(mode) {
  const group = document.getElementById("homeAddressGroup");
  const addressInput = document.getElementById("customerAddress");
  if (!group) return;

  if (mode === "Home Service") {
    group.style.display = "block";
    if (addressInput) addressInput.setAttribute("required", "required");
  } else {
    group.style.display = "none";
    if (addressInput) addressInput.removeAttribute("required");
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// 7. INITIALIZATION & EVENT LISTENERS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial UI Renders
  renderServices();
  renderSalons();
  populateBookingDropdowns();

  // 2. Set min date to today for date picker
  const dateInput = document.getElementById("bookingDate");
  const todayStr = getTodayDateString();
  if (dateInput) {
    dateInput.min = todayStr;
    dateInput.value = todayStr;
  }

  renderTimeSlots();
  renderBookingsList();

  // 3. Navigation Toggle for Mobile
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Hero Search Handler
  const heroSearchInput = document.getElementById("heroSearchInput");
  const heroSearchBtn = document.getElementById("heroSearchBtn");
  const doHeroSearch = () => {
    const val = heroSearchInput.value.trim();
    if (val) {
      activeSalonSearch = val;
      const salonFilter = document.getElementById("salonSearchFilter");
      if (salonFilter) salonFilter.value = val;
      renderSalons();
      document.getElementById("salons").scrollIntoView({ behavior: "smooth" });
    }
  };

  if (heroSearchBtn) heroSearchBtn.addEventListener("click", doHeroSearch);
  if (heroSearchInput) {
    heroSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        doHeroSearch();
      }
    });
  }

  // 5. Salon Discovery Search & Category Filters
  const salonSearchFilter = document.getElementById("salonSearchFilter");
  if (salonSearchFilter) {
    salonSearchFilter.addEventListener("input", (e) => {
      activeSalonSearch = e.target.value;
      renderSalons();
    });
  }

  const categoryFilters = document.getElementById("categoryFilters");
  if (categoryFilters) {
    categoryFilters.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-pill")) {
        categoryFilters.querySelectorAll(".filter-pill").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        activeSalonCategory = e.target.dataset.category;
        renderSalons();
      }
    });
  }

  // 6. Service Mode Radio Change (Salon Visit vs Home Service)
  document.querySelectorAll('input[name="serviceMode"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      toggleAddressVisibility(e.target.value);
    });
  });

  // 7. Dynamic Slot Reload on Salon or Date change
  const salonSelect = document.getElementById("bookingSalon");
  if (salonSelect) {
    salonSelect.addEventListener("change", renderTimeSlots);
  }
  if (dateInput) {
    dateInput.addEventListener("change", () => {
      const errorDate = document.getElementById("errorDate");
      if (dateInput.value < todayStr) {
        errorDate.textContent = "Past dates are not allowed.";
      } else {
        errorDate.textContent = "";
      }
      renderTimeSlots();
    });
  }

  // 8. Appointment Form Submit
  const bookingForm = document.getElementById("appointmentForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
  }

  // 9. Bookings Status Filter Pills
  const statusFilters = document.getElementById("bookingStatusFilters");
  if (statusFilters) {
    statusFilters.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-pill")) {
        statusFilters.querySelectorAll(".filter-pill").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        activeBookingFilter = e.target.dataset.status;
        renderBookingsList();
      }
    });
  }

  // 10. Reset Demo Data Button
  const clearBtn = document.getElementById("clearAllDemoBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Reset demo appointments to default?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderBookingsList();
        renderTimeSlots();
        showToast("Demo bookings reset to initial sample state.", "info");
      }
    });
  }

  // 11. Modal Close Handlers
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBackdrop = document.getElementById("confirmationModal");
  const viewBookingsBtn = document.getElementById("viewBookingsBtn");
  const bookAnotherBtn = document.getElementById("bookAnotherBtn");

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", hideConfirmationModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) hideConfirmationModal();
    });
  }
  if (viewBookingsBtn) {
    viewBookingsBtn.addEventListener("click", () => {
      hideConfirmationModal();
      document.getElementById("my-bookings").scrollIntoView({ behavior: "smooth" });
    });
  }
  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener("click", () => {
      hideConfirmationModal();
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    });
  }
});
