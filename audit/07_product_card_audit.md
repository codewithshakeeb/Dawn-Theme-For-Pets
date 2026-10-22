# 07 Product Card Audit & Single-Source Architecture

**Branch:** `redesign/base44-match`  
**Reference:** Base44 Prototype ([petssify-pure-joy.base44.app](https://petssify-pure-joy.base44.app/)) & Reference Mockups (`media_1792692839799.png`)  
**Status:** Completed Audit (Part A1) — Pending Approval for Implementation (Part A2)

---

## 1. Product Card Rendering Inventory

A comprehensive audit of every template, section, and snippet where product cards and product listings are rendered across the Petssify Shopify Dawn theme:

| Surface / Location | File Path | Line(s) | Current Implementation | Notes / Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage Best Sellers** | [`sections/featured-collection.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/featured-collection.liquid#L120) | L120, L155 | `{% render 'card-product' %}` | Used by section ID `featured_collection` ("Best Sellers This Month", collection `best-sellers`). Also has onboarding card fallback at L155. |
| **Homepage Bowls & Feeders** | [`sections/featured-collection.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/featured-collection.liquid#L120) | L120 | `{% render 'card-product' %}` | Used by section ID `featured_collection_r6qgFM` (collection `bowls-feeders`). |
| **Homepage Bathing & Cleaning** | [`sections/featured-collection.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/featured-collection.liquid#L120) | L120 | `{% render 'card-product' %}` | Used by section ID `featured_collection_Q7wpBw` (collection `bathing-cleaning`). |
| **Collection Product Grid** | [`sections/main-collection-product-grid.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/main-collection-product-grid.liquid#L192) | L192 | `{% render 'card-product' %}` | Primary product catalog grid for all collections (`/collections/all`, `/collections/dogs`, `/collections/cat`, etc.). |
| **Search Results Grid** | [`sections/main-search.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/main-search.liquid#L275) | L275 | `{% render 'card-product' %}` | Product search results grid (`/search?q=...`). |
| **PDP Product Recommendations** | [`sections/related-products.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/related-products.liquid#L41) | L41 | `{% render 'card-product' %}` | "You may also like" grid on product detail pages via Shopify Recommendations API. |
| **PDP Complementary Products** | [`sections/main-product.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/main-product.liquid#L598) | L598 | `{% render 'card-product' %}` | "Pairs well with" / Frequently bought together complementary block (`horizontal_class: true`). |
| **Collage Section** | [`sections/collage.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/collage.liquid#L96) | L96 | `{% render 'card-product' %}` | Renders `card-product` when a product block is configured in a collage layout. |
| **Predictive Search** | [`sections/predictive-search.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/sections/predictive-search.liquid#L139-L165) | L139–L165 | Custom inline markup + `price.liquid` | Renders compact search dropdown items with thumbnail, vendor, title, and price. |
| **Cart Drawer** | [`snippets/cart-drawer.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/snippets/cart-drawer.liquid#L47-L52) | L47–L52 | Button link group | Empty cart displays direct navigation links to Best Sellers, Dog Supplies, Cat Supplies. |
| **Dawn Core Snippet** | [`snippets/card-product.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/snippets/card-product.liquid) | L1–L605 | Core Dawn Card | 605 lines of complex legacy logic with multiple badge blocks, nested anchors, and styling inconsistencies. |
| **Petssify Custom Snippet** | [`snippets/petssify-product-card.liquid`](file:///d:/Dawn%20Theme%20Customization/Petssify/snippets/petssify-product-card.liquid) | L1–L124 | Custom Snippet | Currently orphaned (not referenced anywhere in templates/sections). |

---

## 2. Card Audit: Prototype vs. Current Dawn Card

A detailed breakdown comparing the current implementation against the Base44 prototype and the user's reference mockup:

### 2.1 Duplicate & Conflicting Badges
* **Current Issue:** In `snippets/card-product.liquid` (lines 127–146) and `snippets/price.liquid` (lines 115–126), Dawn features multiple badge rendering zones. In several views, products display a generic `"Sale"` badge alongside a discount percentage, or a mispositioned badge.
* **Prototype Spec:** Exactly **ONE** pill badge positioned at `top: 10px; left: 10px`:
  * If on sale and in stock: Single coral pill badge `-XX% OFF` (e.g. `-16% OFF` or `-35% OFF`).
  * If sold out: Grey/muted pill `Sold out` replacing the discount pill completely.
  * No separate "Sale" text badge anywhere.

### 2.2 Badge Calculation & Edge-Case Logic
* **Current Issue:** Dawn badges check `card_product.compare_at_price > card_product.price`, but if compare-at is less than or equal to price (or inverted due to merchant data entry), bugs occur:
  * Inverted prices: compare-at higher than regular price or negative discounts.
  * Variant discrepancies: If only some variants are discounted or compare-at is 0 on certain variants, the badge might show `0% OFF` or erroneous figures.
* **Prototype Spec:**
  * Calculate discount percentage from the first available variant (or `product.compare_at_price_max` if unselected):
    `{% assign pct = compare | minus: price | times: 100.0 | divided_by: compare | round %}`
  * Show discount badge **ONLY** if `compare_at > price` AND `pct >= 1`.
  * If `compare_at <= price`, strictly suppress the badge and do not display strikethrough price.

### 2.3 Image Ratio, Background & Hover Media Swap
* **Current Issue:**
  * Dawn relies on `--ratio-percent` from section settings (`adapt`, `portrait`, `square`). When set to `adapt`, different aspect ratios create ragged, uneven rows in the collection grid.
  * Image fit is often `cover`, cropping pet feeding bowls and tall dispensers.
  * Secondary image hover swap is tied to section setting `show_secondary_image`, which is missing or disabled in some sections.
* **Prototype Spec:**
  * Mandatory 1:1 aspect ratio container (`aspect-ratio: 1 / 1; width: 100%`).
  * `object-fit: contain` with a clean white/subtle neutral background (`#FFFFFF` or `#F8FAFC`) to keep product imagery uncropped.
  * Responsive `srcset` (165w, 360w, 540w, 720w) and proper `sizes`.
  * Proper `loading` attributes: first row (index <= 4 on desktop, <= 2 on mobile) `loading="eager"` + `fetchpriority="high"`, remaining cards `loading="lazy"`.
  * Smooth secondary image cross-fade/swap on hover for devices with mouse support (`@media (hover: hover)`).
  * Alt text fallback: `alt="{{ media.alt | default: product.title | escape }}"`.

### 2.4 Title Clamping & Uniform Grid Heights
* **Current Issue:**
  * Product titles range from 1 word ("Signe") to 20+ words. In Dawn cards, long titles wrap to 3 or 4 lines, causing cards in the same row to stretch unevenly.
* **Prototype Spec:**
  * Strict two-line clamping:
    ```css
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.8em;
    line-height: 1.4;
    ```
  * Ensures that cards with 1-line titles align perfectly with cards having 2-line titles.

### 2.5 Star Ratings & Review Counts
* **Current Issue:**
  * Dawn injects `<div class='jdgm-widget jdgm-preview-badge'>` unconditionally. When review apps are not configured or a product has 0 reviews, an empty whitespace block or unstyled "0 reviews" text renders.
* **Prototype Spec:**
  * Only render the rating row if review data exists AND review count > 0 (supports standard Shopify `product.metafields.reviews.rating` and Judge.me `product.metafields.judgeme.badge`).
  * If no reviews exist, gracefully omit the widget without leaving an empty height gap.
  * Amber/gold star color `#F5A623`.

### 2.6 Price Formatting & Variable Pricing
* **Current Issue:**
  * In Dawn's `price.liquid`, price ranges sometimes render with verbose "From $X.XX" or display strikethrough compare-at price when compare-at is lower than the regular price.
* **Prototype Spec:**
  * Regular / Sale price: Bold Navy (`#0B1528` / `#0F172A`), `font-size: 17px–18px`, `font-weight: 700–800`.
  * Compare-at price: Strikethrough muted grey (`#94A3B8`), `font-size: 13px–14px`.
  * Variant price ranges: If `product.price_varies`, display "From {{ product.price_min | money }}".
  * If `compare_at <= price`: strikethrough price must be completely omitted.

### 2.7 Quick Add & Interactive State Handling
* **Current Issue:**
  * Dawn's default quick add opens a heavy modal (`quick-add-modal`) or drawers with complex DOM overhead. On mobile, tap targets can be smaller than 44px.
* **Prototype Spec:**
  * **Single-variant in-stock product:** Clean button ("Add to Cart") that submits via AJAX and triggers cart drawer opening.
  * **Multi-variant in-stock product:** Button displays "Choose options" and links directly to the PDP (or opens quick select).
  * **Sold-out product:** Button displays "Sold out", styled disabled with `disabled` and `aria-disabled="true"`.
  * **Sold-out visual presentation:** Image desaturated with `opacity: 0.6; filter: grayscale(20%);`, title and price remain high contrast (contrast ratio > 4.5:1, WCAG AA compliant), card lift animation disabled.
  * Mobile tap targets: Minimum 44px height across all clickable elements.

### 2.8 Semantic Accessibility & HTML Validity
* **Current Issue:**
  * Dawn cards wrap internal headings in `<a>` tags while also containing an outer `full-unstyled-link` or media link, risking nested link violations or fragmented screen-reader announcements.
* **Prototype Spec:**
  * Accessible stretched-link pattern: Card title link features a pseudo-element `a::after { content: ''; position: absolute; inset: 0; z-index: 1; }` covering the entire card.
  * Quick-add button and badge positioned above the stretched link (`z-index: 2`) so they remain interactive without nesting `<a>` inside `<a>`.
  * Clear `aria-label` for screen readers (e.g. `aria-label="Add {{ product.title }} to cart"`).
  * Visible, high-contrast focus ring on keyboard tab navigation (`:focus-visible`).

---

## 3. Plan for Part A2 (Implementation Architecture)

To establish a single source of truth without breaking Dawn core dependencies:

1. **Refine `snippets/petssify-product-card.liquid`:**
   * Build complete, robust component accepting:
     * `product` (Object, required)
     * `lazy_load` (Boolean, default true)
     * `show_quick_add` (Boolean, default true)
     * `show_rating` (Boolean, default true)
     * `image_sizes` (String, default responsive preset)
     * `section_id` (String, optional)
     * `horizontal_class` (Boolean, optional for PDP complementary blocks)
   * Integrate:
     * Unified discount pill / sold-out pill
     * 1:1 contain square media with secondary hover swap
     * 2-line title clamp
     * Conditional star reviews
     * Price logic with "From $X" support
     * AJAX quick add for single-variant, "Choose options" for multi-variant, disabled "Sold out"
     * Stretched accessible link pattern

2. **Single Source of Truth Redirection:**
   * Update `snippets/card-product.liquid` to act as a lightweight, clean adapter forwarding all render calls to `petssify-product-card.liquid`:
     ```liquid
     {%- comment -%} Petssify: Forward to unified petssify-product-card {%- endcomment -%}
     {% render 'petssify-product-card',
       product: card_product,
       lazy_load: lazy_load,
       show_quick_add: quick_add,
       show_rating: show_rating,
       section_id: section_id,
       horizontal_class: horizontal_class
     %}
     ```
   * This guarantees that EVERY section (`featured-collection`, `main-collection-product-grid`, `main-search`, `related-products`, `main-product`, `collage`) instantly receives the unified, pixel-perfect card without altering each section's complex parameter signature.

3. **CSS Design Tokens & Styling in `assets/petssify-theme.css`:**
   * Refine `.petssify-product-card` styles to match Base44 prototype tokens:
     * Card border: `1px solid #E2E8F0`
     * Border radius: `12px`
     * Hover elevation: `translateY(-3px)`, shadow `0 10px 25px -5px rgba(0,0,0,0.08)`
     * Discount pill: Coral `#FF5E5B`, text `#FFFFFF`, font-weight 700
     * Sold out pill: Slate `#64748B` or subtle grey
     * Grid layouts: 4 columns desktop / 3 tablet / 2 mobile with consistent 20px gap

4. **Verification & Screenshot Plan:**
   * Verify card rendering on:
     * Collection page (`/collections/all`)
     * Homepage Best Sellers grid
     * Search results (`/search?q=pet`)
     * PDP Product Recommendations ("You may also like")
     * PDP Complementary products block
   * Save verification screenshots to `/audit/screenshots/product-card/`.

---

## 4. Next Step
Awaiting user review and `"approved"` confirmation before executing Part A2.
