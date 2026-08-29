# P. Balakrishnan Master Memorial Special School — Website Documentation

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [How to Update Content](#how-to-update-content)
- [Language Toggle (English / Malayalam)](#language-toggle)
- [Adding Photos](#adding-photos)
- [Adding News & Events](#adding-news--events)
- [Updating Staff & Management](#updating-staff--management)
- [Development](#development)
- [Deployment via GitHub Pages](#deployment-via-github-pages)
- [Custom Domain Setup](#custom-domain-setup)

---

## Overview

This is the official website for **P. Balakrishnan Master Memorial Special School, Vettom** (formerly known as Santhi Special School). It is a static website built with Next.js that requires no backend or database. All content is managed through a single data file.

### Key Design Principles

- **Warm + Trustworthy + Professional** — designed for an adult audience (40+)
- **Bilingual** — English and Malayalam, togglable via a button
- **Accessible** — WCAG-conscious contrast, large text, keyboard navigable, screen-reader friendly
- **Privacy-respectful** — No exploitation of students, dignity-first language
- **Fully static** — No server needed, deployable to GitHub Pages for free

---

## Features

### Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, news ticker, origin story, impact stats, programs, timeline, student life, staff preview, testimonials, donation section, CTA |
| **Our Story** | `/our-story` | Full founding story, name evolution, P. Balakrishnan memorial, organization structure, timeline |
| **Programs** | `/programs` | All programs categorized (Education, Therapy, Vocational, Activities), free education section |
| **Our Team** | `/our-team` | Management committee with contacts, staff roles |
| **Gallery** | `/gallery` | Filterable photo gallery with lightbox |
| **News & Events** | `/news-events` | News articles, media coverage, achievements |
| **Support Us** | `/support` | 8 ways to help, bank details, tax exemption info, donation transparency |
| **Contact** | `/contact` | Contact info, management contacts, Google Maps, FAQ |

### Key Features

- 🌐 **Bilingual** — English ↔ Malayalam toggle in navbar
- 📰 **News Ticker** — Scrolling headlines on homepage
- 📊 **Animated Stats** — Counter animation on scroll
- 🕐 **Interactive Timeline** — School history from 2002 to present
- 🖼️ **Photo Gallery** — Filterable by category with lightbox
- 💰 **Bank Details** — Prominently displayed with 80G tax exemption info
- ❓ **FAQ Accordion** — Expandable questions and answers
- 📱 **Responsive** — Works on mobile, tablet, and desktop
- ♿ **Accessible** — Keyboard navigation, ARIA labels, skip links, focus states
- 🔍 **SEO Optimized** — Meta tags, Schema.org, sitemap, robots.txt

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16 | React framework with static export |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Google Fonts | - | Noto Sans + Playfair Display |

---

## Project Structure

```
shantiweb/
├── .github/workflows/deploy.yml    ← GitHub Pages auto-deploy
├── public/
│   ├── images/                     ← School photos
│   │   ├── shanti1.jpg
│   │   ├── shanti2.jpg
│   │   └── shanti3.jpg
│   └── robots.txt
├── src/
│   ├── app/                        ← Pages (Next.js App Router)
│   │   ├── layout.tsx              ← Root layout with fonts & SEO
│   │   ├── ClientLayout.tsx        ← Client wrapper (navbar, footer)
│   │   ├── globals.css             ← Design system & animations
│   │   ├── page.tsx                ← Homepage
│   │   ├── sitemap.ts              ← Auto-generated sitemap
│   │   ├── our-story/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── our-team/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── news-events/page.tsx
│   │   ├── support/page.tsx
│   │   └── contact/page.tsx
│   ├── components/                 ← Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── NewsTicker.tsx
│   │   ├── OriginStory.tsx
│   │   ├── StatsSection.tsx
│   │   ├── Timeline.tsx
│   │   ├── ProgramsPreview.tsx
│   │   ├── DonationSection.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ...
│   ├── context/
│   │   └── LanguageContext.tsx      ← English/Malayalam toggle
│   └── data/
│       └── siteData.ts             ← ★ ALL CONTENT HERE ★
├── next.config.ts
├── package.json
├── DOC.md                          ← This file
└── requirements.md                 ← Original requirements
```

---

## How to Update Content

### ★ The Single File You Need: `src/data/siteData.ts`

**All website content is in one file.** Open `src/data/siteData.ts` and edit the relevant section:

### School Information
```typescript
export const schoolInfo = {
  phone: "[TO BE VERIFIED]",        // ← Replace with actual phone
  email: "[TO BE VERIFIED]",        // ← Replace with actual email
  openingHours: "Monday - Saturday, 9:00 AM - 4:00 PM [TO BE VERIFIED]",
  // ... other fields
};
```

### Management Committee
```typescript
export const management = [
  {
    name: "C.K. Abubackar Haji",
    position: "Secretary",
    phone: "9447 830 972",
    photo: "",           // ← Add photo path: "/images/secretary.jpg"
    bio: "[Official biography to be provided]",  // ← Replace with real bio
  },
  // Add more members...
];
```

### Staff
```typescript
export const staff = [
  {
    name: "Teacher Name",           // ← Replace
    position: "Special Educator",
    qualification: "B.Ed Special Education",
    photo: "/images/teacher1.jpg",  // ← Add photo
    category: "teachers",
  },
  // Add more staff...
];
```

### Timeline Events
```typescript
export const timeline = [
  {
    year: "2002",
    title: "The Beginning",
    titleMl: "ആരംഭം",                // ← Malayalam translation
    description: "...",
    descriptionMl: "...",
    icon: "🌱",
  },
  // Add more events...
];
```

### News & Events
```typescript
export const newsItems = [
  {
    id: "unique-id",
    title: "Event Title",
    titleMl: "Malayalam Title",
    date: "2024-01-15",
    summary: "...",
    summaryMl: "...",
    category: "milestone",  // milestone, achievement, community, event
    image: "/images/event.jpg",
  },
  // Add more...
];
```

### FAQ
```typescript
export const faqItems = [
  {
    question: "Question text?",
    questionMl: "Malayalam question?",
    answer: "Answer text.",
    answerMl: "Malayalam answer.",
  },
  // Add more...
];
```

### Gallery Images
```typescript
export const galleryImages = [
  {
    src: "/images/photo-name.jpg",
    alt: "Description of the image",
    altMl: "Malayalam description",
    category: "students",   // school, students, activities, events, facilities
    caption: "Caption text",
    captionMl: "Malayalam caption",
  },
  // Add more...
];
```

### Testimonials
```typescript
export const testimonials = [
  {
    quote: "Testimonial text here.",
    quoteMl: "Malayalam translation.",
    author: "Person Name",
    role: "Parent",
    roleMl: "രക്ഷിതാവ്",
  },
  // Add more...
];
```

---

## Language Toggle

The website supports **English** and **Malayalam**. A toggle button in the navbar switches between languages.

- Navigation, section headings, and key content are translated
- The toggle is persistent within a session
- To add/update Malayalam translations, edit the `*Ml` fields in `siteData.ts`

---

## Adding Photos

1. Place photo files in `/public/images/`
2. Use `.jpg`, `.png`, or `.webp` format
3. Add an entry in `galleryImages` array in `siteData.ts`:

```typescript
{
  src: "/images/new-photo.jpg",
  alt: "Description",
  altMl: "Malayalam description",
  category: "students",
  caption: "Caption",
  captionMl: "Malayalam caption",
}
```

4. For staff/management photos, set the `photo` field:
```typescript
photo: "/images/staff-name.jpg",
```

---

## Adding News & Events

Add to the `newsItems` array in `siteData.ts`:

```typescript
{
  id: "unique-slug",
  title: "Annual Day Celebration 2024",
  titleMl: "വാർഷിക ദിനാഘോഷം 2024",
  date: "2024-03-15",
  summary: "Description of the event...",
  summaryMl: "Malayalam description...",
  category: "event",
  image: "/images/annual-day-2024.jpg",
}
```

The homepage news ticker will automatically include new items.

---

## Updating Staff & Management

Edit the `management` and `staff` arrays in `siteData.ts`. See the [How to Update Content](#how-to-update-content) section for the format.

---

## Development

### Prerequisites

- Node.js 18 or later
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build static files to /out directory
npm run build

# The /out directory contains the complete static website
```

---

## Deployment via GitHub Pages

### Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys on every push to `main`.

#### One-Time Setup:

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: School website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shantiweb.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**
   - Under "Build and deployment", select **Source: GitHub Actions**

3. **Push changes:**
   Every push to `main` will automatically build and deploy the website.

4. **Access your site:**
   - Your site will be at: `https://YOUR_USERNAME.github.io/shantiweb/`

### Manual Deployment

```bash
# Build the static export
npm run build

# Upload the contents of /out to any static file host
```

---

## Custom Domain Setup

To use a custom domain (e.g., `santhispecialschool.com`):

1. Add a `CNAME` file to `/public/`:
   ```
   santhispecialschool.com
   ```

2. Configure your domain's DNS:
   - Add a `CNAME` record pointing to `YOUR_USERNAME.github.io`
   - Or add `A` records pointing to GitHub's IP addresses

3. In GitHub: **Settings** → **Pages** → **Custom domain** → Enter your domain

4. Enable "Enforce HTTPS"

---

## Updating the Website

### Summary of Steps

1. Edit `src/data/siteData.ts` (content changes)
2. Add photos to `public/images/` (if needed)
3. Test locally: `npm run dev`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Update school information"
   git push
   ```
5. GitHub Actions will automatically build and deploy

### Items Marked `[TO BE VERIFIED]`

Search for `[TO BE VERIFIED]` in `siteData.ts` to find all placeholder content that needs real data from the school management:

- Phone number
- Email address
- Opening hours
- Current student count
- Current staff count
- Staff profiles and photos
- Management biographies
- Additional gallery photos
- Google Maps exact location

---

## Support

For technical issues with the website, contact the developer.
For content updates, edit `src/data/siteData.ts` and push to GitHub.
