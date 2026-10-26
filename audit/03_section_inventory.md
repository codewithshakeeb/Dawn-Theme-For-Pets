# Phase 2: Section Inventory & Component Breakdown

A complete inventory of all UI sections across Global elements, Homepage, Collection Page, and Product Detail Page (PDP), documenting order, layout per breakpoint, editable content fields, and interactive behaviors based on the Base44 Prototype and Dawn OS 2.0 capabilities.

---

## 1. Global Sections (Site-Wide)

### 1.1 Announcement Bar
* **Order:** Top of viewport (01)
* **Purpose:** Highlight key value propositions (shipping threshold, guarantees, verified specs) across all templates.
* **Layout:** Full width, fixed height `40px` (`h-10`), flex center with prev/next navigation arrows.
* **Content Fields:**
  * Slide 1: `Free Tracked US Shipping on Orders Over $50`
  * Slide 2: `30-Day Money-Back Guarantee — Easy US Returns`
  * Slide 3: `Verified Sizing, Material & Weight Specs on Every Product`
  * Auto-rotate duration: 5 seconds.
* **Interactions:** Auto-slides every 5000ms with smooth fade-in animation; clickable prev/next chevron buttons with keyboard focus states.

### 1.2 Sticky Navy Header & Navigation
* **Order:** Below announcement bar (02)
* **Purpose:** Primary brand navigation, search initiation, customer account access, and real-time cart drawer trigger.
* **Layout:**
  * Desktop (≥1024px): 3-zone header — Left: Logo image (`Petssify`); Center: Horizontal navigation links (`Home`, `Dogs`, `Cat`, `Grooming & Care`, `Feeding`, `Travel & Walking`, `Health & Recovery`, `Best Sellers`); Right: Search icon, Account icon, Cart bag icon with badge count.
  * Mobile (<1024px): 3-zone header — Left: Hamburger button; Center: Logo; Right: Search icon & Cart icon.
* **Mega Menu Layout (Desktop):**
  * Stretches full container width below header with `border-t border-line`, `bg-white`, `shadow-[0_18px_40px_rgba(15,23,42,0.12)]`.
  * 3 columns:
    * Col 1: Primary category essentials (e.g. `Dog Toys & Enrichment`, `Feeding & Water`, `Grooming & Care`, `Collars & Harnesses`, `Health & Recovery`).
    * Col 2: "Shop by need" problem-solving links (e.g. `Boredom & mental enrichment`, `Faster, calmer meals`, `Dogs that pull on the lead`).
    * Col 3: Highlighted Navy promo card (`bg-navy rounded-[12px] p-6 text-white`) with eyebrow, title, and "Shop Best Sellers" button.
* **Mobile Drawer Layout:**
  * Slide-out sheet from left with nested accordion dropdowns for categories, quick links, and contact info.
* **Interactions:** Sticky on scroll up; hover reveals mega-menu dropdowns on desktop; cart icon opens the Ajax Cart Drawer.

### 1.3 Ajax Cart Drawer
* **Order:** Global overlay (triggered via cart button or quick-add)
* **Purpose:** Streamlined slide-out cart with upsells, free shipping incentive, and express checkout.
* **Layout:** Slide-out right panel (`max-w-[420px] w-full bg-white`).
* **Sub-Components:**
  1. Header: "Your cart (X)" + Close button.
  2. Free Shipping Progress Bar: Dynamic calculation showing amount remaining to unlock $50 free shipping; turns green with confetti icon when threshold is met.
  3. Body:
     * Empty State: Large neutral circle icon (`bg-surface`), "Your cart is empty" heading, friendly explanation copy, and three direct navigation pills: **Shop Best Sellers**, **Shop Dog Supplies**, **Shop Cat Supplies**.
     * Populated State: List of items with square thumbnail, title, selected variant, unit price, quantity stepper (`-` / `+`), and remove button.
  4. Footer: Subtotal calculation, free shipping notice, order notes (optional), and full-width Checkout button (`h-12 bg-navy text-white rounded-[10px]`).
* **Interactions:** Live quantity update via Shopify Cart Ajax API without page reload; smooth progress bar transition.

### 1.4 Global Footer
* **Order:** Bottom of all templates
* **Purpose:** Comprehensive store directory, verified contact NAP, legal disclosures, and trust badges.
* **Layout:** 4 columns on desktop (`grid-cols-4`), collapsing to 2 columns on tablet, 1 column on mobile.
* **Columns:**
  1. Brand Bio: Logo + Sentence-case company summary explaining Dynamic Resolutions LLC, verified specs, and US base.
  2. Main Menu: Links to top shopping collections (`Home`, `Shop All`, `Cats`, `Dogs`, `Best Sellers`, `About Us`).
  3. Quick Links: Policies (`Privacy Policy`, `Return & Refund Policy`, `Shipping Policy`, `Terms of Service`, `Contact Us`).
  4. Unified Contact Info (NAP): Email (`support@petssify.com`), Phone (`+1 (800) [Active Number]`), Legal Entity (`Dynamic Resolutions LLC`), Corporate Office, and Returns Hub. Social media circles below.
* **Bottom Bar:** Copyright notice, payment method pill badges (Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Shop Pay), and legal links.

---

## 2. Homepage Section Inventory (`templates/index.json`)

| # | Section Name | Type | Layout (Desktop / Mobile) | Key Content & Fields | Interactions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Hero Banner** | `petssify-hero` | Full width, dark background with high-res dog+cat image, text box left-aligned | Eyebrow: `Verified specs on every listing`<br>H1: `Practical Dog & Cat Supplies — Verified Sizing, Materials & Breed Specs`<br>Sub: `Shop 304 stainless steel water fountains...`<br>CTA 1: `Shop Best Sellers`<br>CTA 2: `Shop by Pet` | Smooth hover state on buttons; eager loaded with `fetchpriority="high"` for LCP. |
| **02** | **Why Shop With Petssify** | `petssify-value-props` | 4 columns desktop (`grid-cols-4`), 2 cols tablet, 1 col mobile | 4 cards with SVG icons:<br>1. Exact Specs Before You Buy<br>2. 30-Day Easy Returns<br>3. Ships Across the United States<br>4. Reachable Human Support | Hover lift (`hover:-translate-y-0.5 shadow-lift`). |
| **03** | **Who Are You Shopping For?** | `petssify-category-circles` | 8 columns desktop (`grid-cols-8`), horizontal swipe carousel on mobile (`overflow-x-auto`) | 8 circular collection avatars (Dogs, Cats, Feeding, Toys, Grooming, Walking, Health, Travel) with clean label below. | Hover ring animation (`ring-2 ring-navy ring-offset-2 scale-105`). |
| **04** | **Best Sellers This Month** | `featured-collection` | 4 columns desktop (`grid-cols-4`), 2 columns mobile | Bound to `best-sellers`. Header with eyebrow `Most Popular`, H2 title, "View All" button. Renders modern product cards with hover quick-add. | Hover image swap, quick add to cart drawer. |
| **05** | **Feeding Feature Banner** | `petssify-feature-banner` | Contained hero banner (`h-[380px]`), gradient navy overlay | Eyebrow: `Everyday Nutrition`<br>H2: `Every Meal, Made Special.`<br>Sub: `Stylish Feeding Bowls For Cats & Dogs`<br>CTA: `Shop Feeding Essentials` -> `/collections/feeding` | Click through to feeding collection. |
| **06** | **Feeding Product Grid** | `featured-collection` | 4 columns desktop, 2 columns mobile | Bound to `bowls-feeders`. 8 products showing elevated stands, fountains, slow feeders. | Hover image swap, quick add. |
| **07** | **Grooming Feature Banner** | `petssify-feature-banner` | Contained hero banner (`h-[380px]`), gradient navy overlay | Eyebrow: `Coat & Hygiene Care`<br>H2: `Groom. Shine. Repeat.`<br>Sub: `Bath & Care Essentials For Your Furry Family`<br>CTA: `Shop Cleaning & Bathing` -> `/collections/bathing-cleaning` | Click through to bathing collection. |
| **08** | **Grooming Product Grid** | `featured-collection` | 4 columns desktop, 2 columns mobile | Bound to `bathing-cleaning` (corrected from cat-health-wellness per spec). 8 products. | Hover image swap, quick add. |
| **09** | **Brand Trust Row** | `petssify-trust-bar` | 4 columns desktop, 2 cols mobile | 4 minimal trust items with clean outline icons: Trusted Quality, Exclusive Savings, Fast & Secure Delivery, Customer Support. | Resting display. |
| **10** | **Customer Reviews Carousel** | `apps` / `petssify-reviews` | Centered review carousel with star badge, quote cards, reviewer name & verified badge | Heading: `What Customers Say`. Renders Judge.me verified reviews or auto-hides if empty. | Swipeable carousel with prev/next arrows. |
| **11** | **FAQ Accordion** | `petssify-faq-section` | Centered container (`max-w-[800px]`), single accordion list | 10 FAQs including corrected Question #3 on shipping windows (1–2 business days processing, 5–8 delivery). | One-click accordion open/close with 180° rotating chevron. |
| **12** | **Newsletter Section** | `newsletter` | Contained card (`rounded-[16px] bg-surface p-12 text-center`) | H2: `Unlock 15% OFF Today`<br>Sub: `Join our family! As a warm welcome, enjoy 15% OFF on your first order.`<br>Email input + Subscribe button. | Integrates with Shopify customer newsletter subscription. |

---

## 3. Collection Page Section Inventory (`templates/collection.json`)

| # | Section Name | Layout & Structure | Content & Elements |
| :--- | :--- | :--- | :--- |
| **01** | **Breadcrumbs** | Placed **above** the H1 inside `page-width` | `Home › Dogs › Dog Toys & Enrichment` (dynamic hierarchy without hardcoding). |
| **02** | **Collection Banner** | Left-aligned, readable container (`max-w-[820px]`) | 1. H1 title (`{{ collection.title }}`) without "Collection:" prefix.<br>2. Formatted collection intro description (`15px`, line-height `1.6`, `#475569`). |
| **03** | **Sub-Collection Chips** | Horizontal flex pills row with wrap | Chips for sub-types (e.g. `Puzzle Feeders`, `Snuffle Mats`, `Chew Toys`, `Flirt Poles`, `Ball Launchers`) driven by menu or tags. |
| **04** | **Filter & Sort Toolbar** | Flex row between filter button / active chips and Sort dropdown | 1. Active filters count & clear pills.<br>2. Desktop facets sidebar or top bar.<br>3. Mobile "Filters" button triggering bottom sheet.<br>4. Sort dropdown (`Featured`, `Price: Low to High`, `Price: High to Low`, `Newest`). |
| **05** | **Product Grid** | 4 columns on desktop (`lg:grid-cols-4`), 3 on tablet (`md:grid-cols-3`), 2 on mobile (`grid-cols-2`) | Grid of Petssify product cards with dynamic discount badges, 2-line title clamps, review counts, and quick add. |
| **06** | **Pagination / Load More** | Centered below product grid | Numbered pagination or clean "Load More Products" button. |

---

## 4. Product Detail Page (PDP) Inventory (`templates/product.json`)

| # | Block / Component | Placement & Layout | Purpose & Technical Specs |
| :--- | :--- | :--- | :--- |
| **01** | **Breadcrumbs** | Above gallery and buy box | Shows valid category path (e.g. `Home › Health & Recovery › Product Title`). |
| **02** | **Product Media Gallery** | Left Column (Sticky desktop, `grid-cols-12` span 7) | Main product image viewer with zoom/lightbox; horizontal or vertical thumbnail row below. **No empty vertical gap below gallery.** |
| **03** | **Product Title & Review Summary** | Top of Right Column (Buy Box) | Product H1 (`24px`–`32px` bold); star rating badge linking directly to `#reviews`. |
| **04** | **Price & Savings Display** | Below title | Current price (`#0B1F5C` bold `24px`), compare-at strikethrough price, and `-XX% OFF` badge. Never shows compare-at lower than regular price. |
| **05** | **Dynamic Stock Status Badge** | Below price | Pill badge with pulsing green dot (`#16A34A`): `IN STOCK — Ships within 1–2 business days from our US partner network`. Dynamically updates or displays `Currently Out of Stock`. |
| **06** | **Variant Selectors** | Below stock status | Color visual swatches (circular color circles with active ring); Size pills with measurements. **Hides `Default Title` when single variant.** |
| **07** | **Size Guide Modal Trigger** | Beside Size label | Clickable link with tape measure icon (`Size guide`); opens responsive modal with measurement diagram and sizing table. |
| **08** | **Quantity Selector & Add to Cart** | Below variants | Stepper input (`-` / `+`) + Primary `Add to Cart` button (`h-12 bg-navy text-white rounded-[10px] w-full`) + Buy with Shop Pay button. |
| **09** | **Guaranteed Safe & Secure Checkout** | Below buy buttons | Trust icons row (Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay). |
| **10** | **OUR Petssify PROMISE** | Below checkout badges | Structured card (`border border-line rounded-[12px] p-5`) with 3 checkmark items: Free Shipping on $50+, 30-Day Money-Back Guarantee, 24/7 Email Support. |
| **11** | **Product Accordions** | Bottom of buy box | 4 collapsible rows with rotating chevrons:<br>1. **Product Description** (clean description without duplicate H2 or 5x title spam)<br>2. **Specifications** (key-value table: Material, Dimensions, Weight, Neck range, Care)<br>3. **Shipping & Returns** (1–2 business days processing, 5–8 delivery, 30-day returns)<br>4. **FAQ** |
| **12** | **Customer Reviews Section** | Full width below main 2-column container | 2-column layout: Left score card (average rating, total count), Right review filter/sort and review cards list. |
| **13** | **Frequently Bought Together** | Full width below reviews | 4–6 recommended complementary products based on Shopify product recommendations. |
| **14** | **Mobile Sticky Add-to-Cart Bar** | Fixed viewport bottom on mobile (`lg:hidden`) | Thumbnail, title, selected variant, price, and compact `Add to cart` button. |
