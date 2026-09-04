"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// ============================================================
// Types
// ============================================================
interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: "breakfast" | "lunch";
  menuItems: string[];
  donorName: string;
  donorPhone: string;
  bookedAt: string;
}

// ============================================================
// Constants
// ============================================================
const MENU_ITEMS = {
  breakfast: [
    { id: "puttu_kadala", name: "Puttu & Kadala Curry", nameMl: "പുട്ടും കടല കറിയും", emoji: "🍚" },
    { id: "idli_sambar", name: "Idli & Sambar", nameMl: "ഇഡ്ഡലിയും സാമ്പാറും", emoji: "🥣" },
    { id: "dosa_chutney", name: "Dosa & Chutney", nameMl: "ദോശയും ചട്ണിയും", emoji: "🥞" },
    { id: "appam_stew", name: "Appam & Stew", nameMl: "അപ്പവും സ്റ്റൂവും", emoji: "🍳" },
    { id: "upma", name: "Upma", nameMl: "ഉപ്പുമാവ്", emoji: "🍲" },
    { id: "sadhya_breakfast", name: "Sadhya (Breakfast)", nameMl: "സദ്യ (പ്രാതൽ)", emoji: "🍛" },
    { id: "custom_breakfast", name: "Custom / Other", nameMl: "മറ്റുള്ളവ", emoji: "✨" },
  ],
  lunch: [
    { id: "biriyani", name: "Biriyani", nameMl: "ബിരിയാണി", emoji: "🍛" },
    { id: "naichor_chicken", name: "Naichor & Chicken Curry", nameMl: "നെയ്‌ച്ചോറും ചിക്കൻ കറിയും", emoji: "🍗" },
    { id: "sadhya_lunch", name: "Sadhya (Full Meals)", nameMl: "സദ്യ (ഊണ്)", emoji: "🥘" },
    { id: "meals_fish", name: "Rice & Fish Curry", nameMl: "ചോറും മീൻ കറിയും", emoji: "🐟" },
    { id: "meals_veg", name: "Vegetarian Meals", nameMl: "സസ്യ ഊണ്", emoji: "🥗" },
    { id: "porotta_beef", name: "Porotta & Beef", nameMl: "പൊറോട്ടയും ബീഫും", emoji: "🥙" },
    { id: "custom_lunch", name: "Custom / Other", nameMl: "മറ്റുള്ളവ", emoji: "✨" },
  ],
};

// Kerala public holidays 2024-2026 (major ones)
const KERALA_HOLIDAYS = [
  "2026-01-01", "2026-01-14", "2026-01-26", "2026-03-30", "2026-04-02",
  "2026-04-10", "2026-04-14", "2026-05-01", "2026-08-15", "2026-08-26",
  "2026-09-07", "2026-10-02", "2026-10-20", "2026-10-21", "2026-11-01",
  "2026-11-14", "2026-12-25",
];

// ============================================================
// Helper Functions
// ============================================================
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

function isHoliday(dateStr: string): boolean {
  return KERALA_HOLIDAYS.includes(dateStr);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getNextNSchoolDays(n: number): string[] {
  const days: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let current = new Date(today);
  current.setDate(current.getDate() + 1); // start from tomorrow

  while (days.length < n) {
    const dateStr = current.toISOString().split("T")[0];
    if (!isWeekend(current) && !isHoliday(dateStr)) {
      days.push(dateStr);
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
}

// ============================================================
// Component
// ============================================================
export default function FoodDonationPage() {
  const { t } = useLanguage();

  // State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch">("breakfast");
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const availableDays = getNextNSchoolDays(30);

  // Load bookings from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "foodDonations"), orderBy("bookedAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];
        setBookings(data);
      },
      (err) => {
        console.error("Error listening to food donations:", err);
        // Fallback: try loading from localStorage for offline support
        try {
          const stored = localStorage.getItem("shantiweb_food_bookings");
          if (stored) {
            setBookings(JSON.parse(stored));
          }
        } catch {
          // ignore
        }
      }
    );
    return () => unsubscribe();
  }, []);

  // Check if a slot is booked
  const getBookingForSlot = useCallback(
    (date: string, mealType: "breakfast" | "lunch"): Booking | undefined => {
      return bookings.find((b) => b.date === date && b.mealType === mealType);
    },
    [bookings]
  );

  // Toggle menu item
  const toggleMenuItem = (itemId: string) => {
    setSelectedMenuItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Validate phone
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\s|-/g, "");
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  // Handle booking — save to Firestore
  const handleBook = async () => {
    setPhoneError("");

    if (!selectedDate) return;
    if (!donorName.trim()) return;
    if (!validatePhone(donorPhone)) {
      setPhoneError(t("Please enter a valid 10-digit Indian mobile number", "ദയവായി സാധുവായ 10 അക്ക ഇന്ത്യൻ മൊബൈൽ നമ്പർ നൽകുക"));
      return;
    }
    if (selectedMenuItems.length === 0) return;

    const existingBooking = getBookingForSlot(selectedDate, selectedMeal);
    if (existingBooking) return;

    setSubmitting(true);
    try {
      const bookingData = {
        date: selectedDate,
        mealType: selectedMeal,
        menuItems: selectedMenuItems,
        donorName: donorName.trim(),
        donorPhone: donorPhone.trim(),
        bookedAt: new Date().toISOString(),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "foodDonations"), bookingData);

      setShowSuccess(true);
      setSelectedDate("");
      setSelectedMenuItems([]);
      setDonorName("");
      setDonorPhone("");

      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      console.error("Error saving booking:", err);
      // Fallback: save to localStorage
      try {
        const fallbackBooking: Booking = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
          date: selectedDate,
          mealType: selectedMeal,
          menuItems: selectedMenuItems,
          donorName: donorName.trim(),
          donorPhone: donorPhone.trim(),
          bookedAt: new Date().toISOString(),
        };
        const updatedBookings = [...bookings, fallbackBooking];
        setBookings(updatedBookings);
        localStorage.setItem("shantiweb_food_bookings", JSON.stringify(updatedBookings));
        setShowSuccess(true);
        setSelectedDate("");
        setSelectedMenuItems([]);
        setDonorName("");
        setDonorPhone("");
        setTimeout(() => setShowSuccess(false), 4000);
      } catch {
        // ignore
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    selectedDate &&
    donorName.trim() &&
    donorPhone.trim() &&
    selectedMenuItems.length > 0 &&
    !getBookingForSlot(selectedDate, selectedMeal) &&
    !submitting;

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-[#E07A2F] via-[#D4436A] to-[#A8325A] text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block" aria-hidden="true">🍽️</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Food Donation", "ഭക്ഷണ സംഭാവന")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "Sponsor a meal for our students! Choose a date, pick breakfast or lunch, and select what you'd like to provide. Your generosity nourishes their future.",
              "ഞങ്ങളുടെ വിദ്യാർത്ഥികൾക്ക് ഒരു ഭക്ഷണം സ്‌പോൺസർ ചെയ്യൂ! ഒരു തീയതി തിരഞ്ഞെടുക്കൂ, പ്രഭാതഭക്ഷണം അല്ലെങ്കിൽ ഉച്ചഭക്ഷണം തിരഞ്ഞെടുക്കൂ."
            )}
          </p>
        </div>
      </section>

      {/* Success message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-success text-white px-8 py-4 rounded-2xl shadow-xl animate-fade-in-up flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-bold">{t("Booking Confirmed!", "ബുക്കിംഗ് സ്ഥിരീകരിച്ചു!")}</p>
            <p className="text-sm text-white/90">{t("Thank you for your generous donation!", "നിങ്ങളുടെ ഉദാരമായ സംഭാവനയ്ക്ക് നന്ദി!")}</p>
          </div>
        </div>
      )}

      <div className="py-12 lg:py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ===== LEFT: Booking Form ===== */}
            <div className="lg:col-span-2 space-y-8">

              {/* Step 1: Meal Type */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
                <h2 className="font-heading text-xl font-bold text-text-dark mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                  {t("Choose Meal Type", "ഭക്ഷണ തരം തിരഞ്ഞെടുക്കുക")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setSelectedMeal("breakfast"); setSelectedMenuItems([]); }}
                    className={`p-5 rounded-xl border-2 text-center transition-all duration-200 ${selectedMeal === "breakfast"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/30"
                      }`}
                  >
                    <span className="text-3xl block mb-2">🌅</span>
                    <span className="font-bold text-text-dark block">{t("Breakfast", "പ്രാതൽ")}</span>
                    <span className="text-xs text-text-muted">{t("Morning meal", "രാവിലെ ഭക്ഷണം")}</span>
                  </button>
                  <button
                    onClick={() => { setSelectedMeal("lunch"); setSelectedMenuItems([]); }}
                    className={`p-5 rounded-xl border-2 text-center transition-all duration-200 ${selectedMeal === "lunch"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/30"
                      }`}
                  >
                    <span className="text-3xl block mb-2">☀️</span>
                    <span className="font-bold text-text-dark block">{t("Lunch", "ഉച്ചഭക്ഷണം")}</span>
                    <span className="text-xs text-text-muted">{t("Afternoon meal", "ഉച്ച ഭക്ഷണം")}</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Pick Date */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
                <h2 className="font-heading text-xl font-bold text-text-dark mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                  {t("Select a Date", "ഒരു തീയതി തിരഞ്ഞെടുക്കുക")}
                </h2>
                <p className="text-text-muted text-sm mb-4">
                  {t(
                    "Weekends and holidays are excluded. Green = Available, Red = Already booked.",
                    "വാരാന്ത്യങ്ങളും അവധി ദിവസങ്ങളും ഒഴിവാക്കിയിട്ടുണ്ട്. പച്ച = ലഭ്യം, ചുവപ്പ് = ബുക്ക് ചെയ്തത്."
                  )}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {availableDays.map((dateStr) => {
                    const booking = getBookingForSlot(dateStr, selectedMeal);
                    const isBooked = !!booking;
                    const isSelected = selectedDate === dateStr;
                    const d = new Date(dateStr + "T00:00:00");
                    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
                    const dayNum = d.getDate();
                    const monthName = d.toLocaleDateString("en-IN", { month: "short" });

                    return (
                      <button
                        key={dateStr}
                        onClick={() => !isBooked && setSelectedDate(dateStr)}
                        disabled={isBooked}
                        className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${isSelected
                            ? "border-primary bg-primary text-white shadow-md"
                            : isBooked
                              ? "border-red-200 bg-red-50 cursor-not-allowed opacity-80"
                              : "border-border hover:border-success hover:bg-success/5"
                          }`}
                        title={isBooked ? `Booked by ${booking?.donorName}` : `Available - ${formatDate(dateStr)}`}
                      >
                        <span className={`text-xs block ${isSelected ? "text-white/80" : "text-text-muted"}`}>
                          {dayName}
                        </span>
                        <span className={`text-lg font-bold block ${isSelected ? "text-white" : isBooked ? "text-red-400" : "text-text-dark"}`}>
                          {dayNum}
                        </span>
                        <span className={`text-xs block ${isSelected ? "text-white/80" : "text-text-muted"}`}>
                          {monthName}
                        </span>
                        {isBooked && (
                          <span className="text-xs text-red-500 mt-1 block">
                            {t("Booked", "ബുക്ക്ഡ്")} ✓
                          </span>
                        )}
                        {!isBooked && !isSelected && (
                          <span className="text-xs text-success mt-1 block">
                            {t("Open", "ലഭ്യം")}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Menu */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
                <h2 className="font-heading text-xl font-bold text-text-dark mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                  {t(
                    `Choose ${selectedMeal === "breakfast" ? "Breakfast" : "Lunch"} Menu`,
                    `${selectedMeal === "breakfast" ? "പ്രാതൽ" : "ഉച്ചഭക്ഷണ"} മെനു തിരഞ്ഞെടുക്കുക`
                  )}
                </h2>
                <p className="text-text-muted text-sm mb-4">
                  {t("Select one or more items you'd like to provide.", "നിങ്ങൾ നൽകാൻ ആഗ്രഹിക്കുന്ന ഒന്നോ അതിലധികമോ ഇനങ്ങൾ തിരഞ്ഞെടുക്കുക.")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MENU_ITEMS[selectedMeal].map((item) => {
                    const isChecked = selectedMenuItems.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleMenuItem(item.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${isChecked
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/30"
                          }`}
                      >
                        <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                        <div className="flex-1">
                          <span className="font-semibold text-text-dark block text-sm">
                            {t(item.name, item.nameMl)}
                          </span>
                        </div>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${isChecked ? "border-primary bg-primary" : "border-border"
                          }`}>
                          {isChecked && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Your Details */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
                <h2 className="font-heading text-xl font-bold text-text-dark mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
                  {t("Your Details", "നിങ്ങളുടെ വിശദാംശങ്ങൾ")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="donor-name" className="block text-sm font-semibold text-text-dark mb-1">
                      {t("Your Name", "നിങ്ങളുടെ പേര്")} *
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={t("Enter your name", "നിങ്ങളുടെ പേര് നൽകുക")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="donor-phone" className="block text-sm font-semibold text-text-dark mb-1">
                      {t("Phone Number", "ഫോൺ നമ്പർ")} *
                    </label>
                    <input
                      id="donor-phone"
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => { setDonorPhone(e.target.value); setPhoneError(""); }}
                      placeholder={t("10-digit mobile number", "10 അക്ക മൊബൈൽ നമ്പർ")}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none text-text-dark text-sm transition-colors ${phoneError ? "border-red-400 focus:border-red-500" : "border-border focus:border-primary"
                        }`}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                    )}
                  </div>
                </div>

                {/* Book button */}
                <button
                  onClick={handleBook}
                  disabled={!isFormValid}
                  className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isFormValid
                      ? "bg-secondary text-white hover:bg-secondary-light shadow-md hover:shadow-lg cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {submitting
                    ? t("Saving...", "സേവ് ചെയ്യുന്നു...")
                    : t("Confirm Food Donation Booking", "ഭക്ഷണ സംഭാവന ബുക്കിംഗ് സ്ഥിരീകരിക്കുക")}{" "}
                  🍽️
                </button>

                {!selectedDate && (
                  <p className="text-text-light text-xs mt-2 text-center italic">
                    {t("Please select a date above to continue", "തുടരാൻ മുകളിൽ ഒരു തീയതി തിരഞ്ഞെടുക്കുക")}
                  </p>
                )}
              </div>
            </div>

            {/* ===== RIGHT: Status Panel ===== */}
            <div className="space-y-6">
              {/* How it works */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-4">
                  {t("How It Works", "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു")}
                </h3>
                <div className="space-y-3">
                  {[
                    { step: "1", text: t("Choose breakfast or lunch", "പ്രാതൽ അല്ലെങ്കിൽ ഉച്ചഭക്ഷണം തിരഞ്ഞെടുക്കുക") },
                    { step: "2", text: t("Pick an available date (green)", "ലഭ്യമായ തീയതി (പച്ച) തിരഞ്ഞെടുക്കുക") },
                    { step: "3", text: t("Select menu items", "മെനു ഇനങ്ങൾ തിരഞ്ഞെടുക്കുക") },
                    { step: "4", text: t("Enter your name & phone number", "നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും നൽകുക") },
                    { step: "5", text: t("Confirm your booking!", "നിങ്ങളുടെ ബുക്കിംഗ് സ്ഥിരീകരിക്കുക!") },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <span className="text-text-muted text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                  {t("Calendar Legend", "കലണ്ടർ സൂചന")}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-success/20 border border-success"></span>
                    <span className="text-sm text-text-muted">{t("Available", "ലഭ്യം")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-red-100 border border-red-300"></span>
                    <span className="text-sm text-text-muted">{t("Already Booked", "ഇതിനകം ബുക്ക് ചെയ്തത്")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-primary border border-primary"></span>
                    <span className="text-sm text-text-muted">{t("Your Selection", "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ്")}</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-4">
                  {t("Upcoming Donations", "വരാനിരിക്കുന്ന സംഭാവനകൾ")}
                </h3>
                {bookings.length === 0 ? (
                  <div className="text-center py-6">
                    <span className="text-4xl block mb-2">🍽️</span>
                    <p className="text-text-muted text-sm">
                      {t("No bookings yet. Be the first to donate a meal!", "ഇതുവരെ ബുക്കിംഗുകൾ ഇല്ല. ഒരു ഭക്ഷണം സംഭാവന ചെയ്യുന്ന ആദ്യത്തെ ആളാകൂ!")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {bookings
                      .filter((b) => new Date(b.date) >= new Date(new Date().toISOString().split("T")[0]))
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((booking) => {
                        const menuNames = booking.menuItems.map((itemId) => {
                          const allItems = [...MENU_ITEMS.breakfast, ...MENU_ITEMS.lunch];
                          const found = allItems.find((m) => m.id === itemId);
                          return found ? t(found.name, found.nameMl) : itemId;
                        });

                        return (
                          <div
                            key={booking.id}
                            className="p-4 rounded-xl bg-warm-bg border border-border"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-text-dark">
                                {formatDate(booking.date)}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${booking.mealType === "breakfast"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-orange-100 text-orange-700"
                                }`}>
                                {booking.mealType === "breakfast" ? "🌅 " : "☀️ "}
                                {t(
                                  booking.mealType === "breakfast" ? "Breakfast" : "Lunch",
                                  booking.mealType === "breakfast" ? "പ്രാതൽ" : "ഉച്ചഭക്ഷണം"
                                )}
                              </span>
                            </div>
                            <p className="text-sm text-text-muted mb-1">
                              <span className="font-medium">{t("Donor:", "സംഭാവകൻ:")}</span>{" "}
                              {booking.donorName}
                            </p>
                            <p className="text-sm text-text-muted mb-1">
                              <span className="font-medium">{t("Phone:", "ഫോൺ:")}</span>{" "}
                              {booking.donorPhone.replace(/(\d{5})(\d{5})/, "$1 $2")}
                            </p>
                            <p className="text-xs text-text-light">
                              <span className="font-medium">{t("Menu:", "മെനു:")}</span>{" "}
                              {menuNames.join(", ")}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Contact for queries */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <p className="text-primary text-sm font-medium mb-2">
                  {t("Questions about food donation?", "ഭക്ഷണ സംഭാവനയെ കുറിച്ചുള്ള ചോദ്യങ്ങൾ?")}
                </p>
                <p className="text-text-muted text-sm">
                  {t(
                    "Contact the school management for any queries about food donation, delivery arrangements, or special dietary requirements.",
                    "ഭക്ഷണ സംഭാവന, ഡെലിവറി ക്രമീകരണങ്ങൾ, അല്ലെങ്കിൽ പ്രത്യേക ഭക്ഷണ ആവശ്യകതകൾ എന്നിവയെക്കുറിച്ചുള്ള ചോദ്യങ്ങൾക്ക് സ്‌കൂൾ മാനേജ്‌മെന്റുമായി ബന്ധപ്പെടുക."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
