# B.L Palace Rangapara Hotel Website

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full premium hotel website for B.L Palace Rangapara (Assam, India)
- Sticky navigation: Home, Rooms, Amenities, About, Reviews, Contact, Book Now
- Hero section: full-width hotel image, headline, sub-headline, star rating badge, location badge, primary gold CTA (Book Your Stay), secondary navy CTA (Call Now)
- About section: welcome text, feature icons (Clean Rooms, Friendly Service, Affordable Pricing, Prime Location, Family Friendly)
- Rooms section: 3 cards (Standard, Deluxe, Family) with AI-generated images, description, Check Availability CTA
- Why Choose Us section: 6-icon grid with trust points
- Amenities section: icon grid (Comfortable Beds, Clean Washrooms, Parking, 24/7 Assistance, Family Friendly, Safe Environment, Easy Access)
- Testimonials section: carousel with 4.6 star rating and 3 guest reviews
- Location section: embedded Google Maps iframe, address, nearby landmarks, Get Directions link
- CTA banner: full-width Book Now / Call Now strip
- Contact / Booking form: Name, Phone, Check-in Date, Check-out Date, Message — stores submissions in backend
- Footer: logo, quick links, contact info, social icons, tagline
- Floating WhatsApp button (mobile + desktop)
- Sticky mobile call button at bottom
- Floating scroll-to-top button
- Smooth scroll animations on section entry
- Color palette: Deep Navy #0F172A, Warm Gold #D4AF37, Soft Beige #F8F7F4, White #FFFFFF
- Fonts: Poppins (headings), Inter (body)

### Modify
- None

### Remove
- None

## Implementation Plan
1. Set up index.css with OKLCH design tokens matching the navy/gold palette and import Poppins + Inter from Google Fonts
2. Build App.tsx as single-page layout with all sections
3. Use AI-generated images: /assets/generated/hotel-hero.dim_1400x800.jpg, room-standard, room-deluxe, room-family
4. Backend: store contact/booking form submissions via Motoko
5. Animate sections on scroll using Intersection Observer
6. WhatsApp floating button links to wa.me with placeholder number
7. Call Now links to tel: with placeholder number
8. Google Maps embed for Rangapara, Assam location
