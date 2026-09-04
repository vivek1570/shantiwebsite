"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// ============================================================
// Types
// ============================================================
interface FirestoreEvent {
  id: string;
  title: string;
  titleMl: string;
  date: string;
  summary: string;
  summaryMl: string;
  category: string;
  imageUrl: string;
  createdAt: Timestamp;
}

interface FirestoreGalleryImage {
  id: string;
  src: string;
  alt: string;
  altMl: string;
  category: string;
  caption: string;
  captionMl: string;
  createdAt: Timestamp;
}

interface FirestoreBooking {
  id: string;
  date: string;
  mealType: string;
  menuItems: string[];
  donorName: string;
  donorPhone: string;
  bookedAt: string;
}

// ============================================================
// Component
// ============================================================
export default function AdminDashboardPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"events" | "gallery" | "donations">("events");

  // Events state
  const [events, setEvents] = useState<FirestoreEvent[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTitleMl, setEventTitleMl] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventSummary, setEventSummary] = useState("");
  const [eventSummaryMl, setEventSummaryMl] = useState("");
  const [eventCategory, setEventCategory] = useState("event");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventSubmitting, setEventSubmitting] = useState(false);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<FirestoreGalleryImage[]>([]);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [galleryCaptionMl, setGalleryCaptionMl] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("school");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [gallerySubmitting, setGallerySubmitting] = useState(false);

  // Donations state
  const [donations, setDonations] = useState<FirestoreBooking[]>([]);

  // Messages
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, loading, router]);

  // Load data
  const loadEvents = useCallback(async () => {
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreEvent)));
    } catch (err) {
      console.error("Error loading events:", err);
    }
  }, []);

  const loadGallery = useCallback(async () => {
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setGalleryImages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreGalleryImage)));
    } catch (err) {
      console.error("Error loading gallery:", err);
    }
  }, []);

  const loadDonations = useCallback(async () => {
    try {
      const q = query(collection(db, "foodDonations"), orderBy("bookedAt", "desc"));
      const snapshot = await getDocs(q);
      setDonations(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreBooking)));
    } catch (err) {
      console.error("Error loading donations:", err);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadEvents();
      loadGallery();
      loadDonations();
    }
  }, [isAdmin, loadEvents, loadGallery, loadDonations]);

  // Upload image to Firebase Storage
  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storageRef = ref(storage, `${folder}/${timestamp}_${safeName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  // Add event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate) return;
    setEventSubmitting(true);
    try {
      let imageUrl = "";
      if (eventImage) {
        imageUrl = await uploadImage(eventImage, "events");
      }
      await addDoc(collection(db, "events"), {
        title: eventTitle.trim(),
        titleMl: eventTitleMl.trim() || eventTitle.trim(),
        date: eventDate,
        summary: eventSummary.trim(),
        summaryMl: eventSummaryMl.trim() || eventSummary.trim(),
        category: eventCategory,
        imageUrl,
        createdAt: Timestamp.now(),
      });
      setEventTitle("");
      setEventTitleMl("");
      setEventDate("");
      setEventSummary("");
      setEventSummaryMl("");
      setEventCategory("event");
      setEventImage(null);
      setSuccessMsg("Event added successfully!");
      loadEvents();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error adding event:", err);
    } finally {
      setEventSubmitting(false);
    }
  };

  // Add gallery photo
  const handleAddGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile || !galleryCaption.trim()) return;
    setGallerySubmitting(true);
    try {
      const imageUrl = await uploadImage(galleryFile, "gallery");
      await addDoc(collection(db, "gallery"), {
        src: imageUrl,
        alt: galleryCaption.trim(),
        altMl: galleryCaptionMl.trim() || galleryCaption.trim(),
        category: galleryCategory,
        caption: galleryCaption.trim(),
        captionMl: galleryCaptionMl.trim() || galleryCaption.trim(),
        createdAt: Timestamp.now(),
      });
      setGalleryCaption("");
      setGalleryCaptionMl("");
      setGalleryCategory("school");
      setGalleryFile(null);
      setSuccessMsg("Photo uploaded successfully!");
      loadGallery();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error uploading photo:", err);
    } finally {
      setGallerySubmitting(false);
    }
  };

  // Delete event
  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      loadEvents();
      setSuccessMsg("Event deleted.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Delete gallery image
  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      loadGallery();
      setSuccessMsg("Photo deleted.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  // Delete donation
  const handleDeleteDonation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this donation record?")) return;
    try {
      await deleteDoc(doc(db, "foodDonations", id));
      loadDonations();
      setSuccessMsg("Donation record deleted.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error deleting donation:", err);
    }
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-bg">
        <div className="animate-pulse text-primary text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-warm-bg">
      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-success text-white px-8 py-4 rounded-2xl shadow-xl animate-fade-in-up flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <span className="font-bold">{successMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Logged in as {user?.email}
              </p>
            </div>
            <button
              onClick={async () => { await signOut(); router.push("/"); }}
              className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 flex-wrap">
          {([
            { key: "events", label: "📰 Events", count: events.length },
            { key: "gallery", label: "🖼️ Gallery", count: galleryImages.length },
            { key: "donations", label: "🍽️ Donations", count: donations.length },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-text-muted border border-border hover:border-primary/30"
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ===== EVENTS TAB ===== */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add event form */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="font-heading text-xl font-bold text-text-dark mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">+</span>
                Add New Event
              </h2>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label htmlFor="event-title" className="block text-sm font-semibold text-text-dark mb-1">
                    Title (English) *
                  </label>
                  <input
                    id="event-title"
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Event title"
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="event-title-ml" className="block text-sm font-semibold text-text-dark mb-1">
                    Title (Malayalam)
                  </label>
                  <input
                    id="event-title-ml"
                    type="text"
                    value={eventTitleMl}
                    onChange={(e) => setEventTitleMl(e.target.value)}
                    placeholder="പരിപാടിയുടെ ശീർഷകം"
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event-date" className="block text-sm font-semibold text-text-dark mb-1">
                      Date *
                    </label>
                    <input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="event-category" className="block text-sm font-semibold text-text-dark mb-1">
                      Category
                    </label>
                    <select
                      id="event-category"
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                    >
                      <option value="event">Event</option>
                      <option value="milestone">Milestone</option>
                      <option value="achievement">Achievement</option>
                      <option value="community">Community</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="event-summary" className="block text-sm font-semibold text-text-dark mb-1">
                    Description (English)
                  </label>
                  <textarea
                    id="event-summary"
                    value={eventSummary}
                    onChange={(e) => setEventSummary(e.target.value)}
                    placeholder="Describe the event..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="event-summary-ml" className="block text-sm font-semibold text-text-dark mb-1">
                    Description (Malayalam)
                  </label>
                  <textarea
                    id="event-summary-ml"
                    value={eventSummaryMl}
                    onChange={(e) => setEventSummaryMl(e.target.value)}
                    placeholder="പരിപാടിയുടെ വിവരണം..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="event-image" className="block text-sm font-semibold text-text-dark mb-1">
                    Image (optional)
                  </label>
                  <input
                    id="event-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventImage(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={eventSubmitting || !eventTitle.trim() || !eventDate}
                  className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${
                    eventSubmitting || !eventTitle.trim() || !eventDate
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg"
                  }`}
                >
                  {eventSubmitting ? "Adding Event..." : "Add Event"}
                </button>
              </form>
            </div>

            {/* Events list */}
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-text-dark mb-2">
                Existing Events ({events.length})
              </h2>
              {events.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-border text-center">
                  <span className="text-4xl block mb-2">📰</span>
                  <p className="text-text-muted">No events added yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full capitalize">
                              {event.category}
                            </span>
                            <span className="text-text-light text-xs">{event.date}</span>
                          </div>
                          <h3 className="font-bold text-text-dark text-sm truncate">{event.title}</h3>
                          <p className="text-text-muted text-xs mt-0.5 line-clamp-2">{event.summary}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors p-1"
                          title="Delete event"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== GALLERY TAB ===== */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload form */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="font-heading text-xl font-bold text-text-dark mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">+</span>
                Upload Photo
              </h2>
              <form onSubmit={handleAddGalleryPhoto} className="space-y-4">
                <div>
                  <label htmlFor="gallery-file" className="block text-sm font-semibold text-text-dark mb-1">
                    Photo *
                  </label>
                  <input
                    id="gallery-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gallery-caption" className="block text-sm font-semibold text-text-dark mb-1">
                    Caption (English) *
                  </label>
                  <input
                    id="gallery-caption"
                    type="text"
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    placeholder="Describe this photo"
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gallery-caption-ml" className="block text-sm font-semibold text-text-dark mb-1">
                    Caption (Malayalam)
                  </label>
                  <input
                    id="gallery-caption-ml"
                    type="text"
                    value={galleryCaptionMl}
                    onChange={(e) => setGalleryCaptionMl(e.target.value)}
                    placeholder="ഈ ഫോട്ടോയുടെ വിവരണം"
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="gallery-category" className="block text-sm font-semibold text-text-dark mb-1">
                    Category
                  </label>
                  <select
                    id="gallery-category"
                    value={galleryCategory}
                    onChange={(e) => setGalleryCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-text-dark text-sm transition-colors"
                  >
                    <option value="school">School</option>
                    <option value="students">Students</option>
                    <option value="activities">Activities</option>
                    <option value="events">Events</option>
                    <option value="facilities">Facilities</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={gallerySubmitting || !galleryFile || !galleryCaption.trim()}
                  className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${
                    gallerySubmitting || !galleryFile || !galleryCaption.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg"
                  }`}
                >
                  {gallerySubmitting ? "Uploading..." : "Upload Photo"}
                </button>
              </form>
            </div>

            {/* Gallery grid */}
            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-4">
                Uploaded Photos ({galleryImages.length})
              </h2>
              {galleryImages.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-border text-center">
                  <span className="text-4xl block mb-2">🖼️</span>
                  <p className="text-text-muted">No photos uploaded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden shadow-sm border border-border">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteGalleryImage(img.id)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="p-2">
                        <p className="text-text-dark text-xs font-medium truncate">{img.caption}</p>
                        <span className="text-text-light text-[10px] capitalize">{img.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== DONATIONS TAB ===== */}
        {activeTab === "donations" && (
          <div>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
              Food Donation Records ({donations.length})
            </h2>
            {donations.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-border text-center">
                <span className="text-4xl block mb-2">🍽️</span>
                <p className="text-text-muted">No food donation bookings yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="bg-white rounded-xl p-5 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-text-dark">
                        {donation.date}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        donation.mealType === "breakfast"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {donation.mealType === "breakfast" ? "🌅 Breakfast" : "☀️ Lunch"}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted">
                      <span className="font-medium">Donor:</span> {donation.donorName}
                    </p>
                    <p className="text-sm text-text-muted">
                      <span className="font-medium">Phone:</span> {donation.donorPhone}
                    </p>
                    <p className="text-xs text-text-light mt-1">
                      <span className="font-medium">Menu:</span> {donation.menuItems.join(", ")}
                    </p>
                    <button
                      onClick={() => handleDeleteDonation(donation.id)}
                      className="mt-3 text-red-400 hover:text-red-600 transition-colors text-xs font-medium"
                    >
                      Delete Record
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
