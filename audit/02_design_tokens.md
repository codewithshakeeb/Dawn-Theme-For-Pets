# Phase 2: Design Tokens & Visual Identity System

Extracted directly from the Petssify Base44 Design Prototype (`https://petssify-pure-joy.base44.app/`) CSS bundle and UI architecture.

---

## 1. Color Palette

| Token Name | Hex Code | HSL / RGB | Purpose / Usage | WCAG AA Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| `--navy` | `#0B1F5C` | `rgb(11, 31, 92)` | Primary brand color: header background, primary buttons, price text, active borders, card highlights | 13.8:1 on white (Passes AAA) |
| `--navy-700` | `#0A1745` | `rgb(10, 23, 69)` | Deep navy: announcement bar, button hover states, mega-menu promo card | 16.2:1 on white (Passes AAA) |
| `--coral` | `#FF6B4A` | `rgb(255, 107, 74)` | Accent alert / discount color: `-XX% OFF` badge, eyebrow section tags, sale highlights | 3.2:1 on white (Used for graphic badges & accents with white text: 3.1:1 on white, 4.5:1 on navy) |
| `--success` | `#16A34A` | `rgb(22, 163, 74)` | Stock status pulsing dot, 100% unlocked free shipping progress bar, checkmarks | 3.9:1 on white (UI graphic) |
| `--surface` | `#F5F7FB` | `rgb(245, 247, 251)` | Neutral light surface: empty cart icon circle, review summary widget background, button secondary fill | Background |
| `--line` | `#E2E8F0` | `rgb(226, 232, 240)` | Divider borders, card strokes, accordion bottom borders, table gridlines | Structural stroke |
| `--ink` | `#0F172A` | `rgb(15, 23, 42)` | Primary text: H1, H2, H3 headings, bold product titles, filter labels | 16.1:1 on white (Passes AAA) |
| `--ink-body` | `#475569` | `rgb(71, 85, 105)` | Secondary body text: descriptions, accordion answers, reviews text, meta labels | 5.8:1 on white (Passes AA) |
| `--ink-muted` | `#94A3B8` | `rgb(148, 163, 184)` | Muted text: compare-at strikethrough price, table column headers, breadcrumb separators | 2.6:1 on white (Passes for incidental/disabled elements) |
| `--star` | `#F5A623` | `rgb(245, 166, 35)` | Customer review stars (solid filled gold) | Graphic star rating |
| `--white` | `#FFFFFF` | `rgb(255, 255, 255)` | Page background, card backgrounds, white CTA text, icon backgrounds | Canvas background |

---

## 2. Typography Scale & Font Pairings

The design prototype standardizes on **Plus Jakarta Sans** for all display titles and headings, paired with **Inter** for dense UI, body copy, and specifications.

* **Primary Heading Family:** `Plus Jakarta Sans`, system-ui, sans-serif
* **Primary Body Family:** `Inter`, system-ui, sans-serif

| Hierarchy | Font Family | Size (Mobile) | Size (Desktop) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | Plus Jakarta Sans | `30px` | `48px` | `700` (Bold) | `1.12` | `-0.025em` (Tight) |
| **Section H2** | Plus Jakarta Sans | `26px` | `32px`–`34px` | `700` (Bold) | `1.15` | `-0.025em` (Tight) |
| **PDP Product H1** | Plus Jakarta Sans | `24px` | `32px` | `700` (Bold) | `1.2` | `-0.02em` |
| **Component H3 / Cards** | Plus Jakarta Sans | `15px` | `16px` | `600` (Semibold)| `1.3` | `normal` |
| **Accordion Header** | Plus Jakarta Sans | `15px` | `16px` | `600` (Semibold)| `1.4` | `normal` |
| **Body (Default)** | Inter | `15px` | `15px` | `400` (Regular) | `1.65`–`1.75` | `normal` |
| **Body Semibold** | Inter | `14px`–`15px`| `14px`–`15px` | `600` (Semibold)| `1.5` | `normal` |
| **Captions / Meta** | Inter | `13px` | `13px` | `500` (Medium) | `1.4` | `normal` |
| **Eyebrow / Badges** | Plus Jakarta Sans | `11px` | `11px` | `600` (Semibold)| `1.2` | `0.16em`–`0.18em` (Uppercase)|

---

## 3. Spacing, Layout & Container Specifications

* **Max Container Width:** `1280px` (`max-w-[1280px]` / `.container-pet`)
* **Horizontal Page Padding:** `16px` (Mobile) / `24px` (Tablet & Desktop)
* **Section Vertical Spacing:**
  * Homepage Hero: `min-height: 70vh` (Mobile) / `min-height: 80vh` (Desktop)
  * Feature Sections: `padding-top: 56px; padding-bottom: 56px` (`py-14`) on mobile, `padding-top: 80px; padding-bottom: 80px` (`py-20`) on desktop.
* **Grid Gutters:**
  * Mobile: `16px` (`gap-4`)
  * Desktop: `24px` to `32px` (`gap-6` to `gap-8`)

---

## 4. Radii & Surface Styling

* **Button Radius (`--radius-btn`):** `10px` (`rounded-[10px]`)
* **Card Radius (`--radius-card`):** `12px` (`rounded-[12px]`)
* **Pill / Circular Radius (`--radius-pill`):** `999px` (`rounded-full`)
* **Modal / Bottom Sheet Radius:** `16px` (Desktop modal) / `24px` on top corners of mobile sheets (`rounded-t-[24px]`)

---

## 5. Shadows & Elevation

* **`--shadow-card`:** `0 2px 12px rgba(15, 23, 42, 0.06)` (Subtle resting card elevation)
* **`--shadow-lift`:** `0 12px 28px rgba(15, 23, 42, 0.10)` (Card hover / modal elevation)
* **`--shadow-dropdown`:** `0 18px 40px rgba(15, 23, 42, 0.12)` (Mega-menu and search dropdown)
* **`--shadow-mobile-bar`:** `0 -8px 24px rgba(15, 23, 42, 0.08)` (Sticky bottom add-to-cart bar)

---

## 6. Component Specs

### 6.1 Buttons
* **Primary Button:** Height `48px`, `background: #0B1F5C`, text `#FFFFFF`, font-weight `600`, font-size `14px`, border-radius `10px`. Hover: `background: #0A1745`.
* **Secondary / Outline Button:** Height `48px`, `background: transparent`, `border: 1px solid #0B1F5C`, text `#0B1F5C`, font-weight `600`, font-size `14px`, border-radius `10px`. Hover: `background: #0B1F5C`, text `#FFFFFF`.
* **Hero White Pill Button:** Height `48px`, `background: #FFFFFF`, text `#0B1F5C`, border-radius `10px`, hover: `background: #F5F7FB`.
* **Quick Add Button (Product Card):** Desktop: Height `44px`, `background: #0B1F5C`, text `#FFFFFF`, absolute positioned bottom `12px`, revealed on group-hover with `opacity: 1`. Mobile: floating circular quick-add icon button.

### 6.2 Product Card
* **Card Container:** Outer border `1px solid #E2E8F0`, background `#FFFFFF`, border-radius `12px`, shadow `--shadow-card`.
* **Image Aspect Ratio:** `1:1` square, inner padding `16px`, `object-fit: contain`. Image smoothly scales by `1.03x` on card hover.
* **Badge:** Single `-XX% OFF` coral pill (`#FF6B4A`) positioned top-left (`top: 12px; left: 12px`). No redundant "SALE" text.
* **Title:** 2-line clamp (`-webkit-line-clamp: 2`), `15px` font-weight `600`, `#0F172A`.
* **Rating:** Rendered via app snippet, automatically hidden if `reviews_count == 0`.
* **Price:** `#0B1F5C` bold `16px`, compare-at `#94A3B8` `14px` strikethrough.

### 6.3 Free Shipping Progress Bar
* **Threshold:** `$50.00 USD` (`5000` cents).
* **Track:** Height `8px`, border-radius `999px`, background `#F5F7FB` (`--surface`).
* **Fill:** Animated width transition (`duration: 300ms`), background `#0B1F5C` (`--navy`) when `< $50`, turning `#16A34A` (`--success`) when `≥ $50`.
* **Message:** Icon + dynamic remainder calculation (`Add $X.XX more...` / `🎉 You've unlocked FREE Tracked US Shipping!`).
