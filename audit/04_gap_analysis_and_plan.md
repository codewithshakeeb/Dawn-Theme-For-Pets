# Phase 3: Gap Analysis, Component Mapping & Implementation Plan

A comprehensive architectural blueprint mapping each Base44 design prototype element to Dawn OS 2.0 theme files, detailing effort, risk, native Shopify alternatives, implementation order, and the separation between Theme-Code and Manual Admin tasks.

---

## 1. Prototype Component to Dawn File Mapping

| Prototype Component | Dawn Target File(s) / New Files | Type of Work | Effort | Risk | Customizer Settings to Expose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Design Tokens & Theme System** | `assets/petssify-theme.css`<br>`layout/theme.liquid` | **NEW CSS** + Theme Hook | **M** | **Low** | Map colors, fonts (Plus Jakarta Sans & Inter), radii, and shadows to CSS custom properties. |
| **Announcement Bar** | `sections/announcement-bar.liquid`<br>`sections/header-group.json` | Modify Existing | **S** | **Low** | Auto-rotate speed, slide text blocks (spec 1.2 defaults), navy deep background, white text. |
| **Sticky Navy Header & Mega Menu** | `sections/header.liquid`<br>`snippets/header-mega-menu.liquid`<br>`snippets/header-drawer.liquid`<br>`snippets/header-search.liquid` | Extend Existing | **L** | **Medium** | Logo picker & width, menu selection (`new-main-menu`), sticky header mode, mega-menu promo card blocks (eyebrow, title, CTA, link). |
| **Global Footer (NAP & Policies)** | `sections/footer.liquid`<br>`sections/footer-group.json` | Extend Existing | **M** | **Low** | Brand bio text (sentence case), corporate address, returns hub address, support email, phone number, social links, payment icons. |
| **Cart Drawer & Free Shipping Bar** | `snippets/cart-drawer.liquid`<br>`snippets/petssify-free-shipping-bar.liquid`<br>`assets/cart-drawer.js` | Extend Existing + **NEW Snippet** | **M** | **Medium** | Free shipping goal threshold (default `$50.00` / `5000` cents), progress bar colors, empty cart button links. |
| **Enhanced Product Card** | `snippets/card-product.liquid`<br>`snippets/petssify-product-card.liquid`<br>`snippets/price.liquid` | Extend Existing + **NEW Snippet** | **M** | **Medium** | Image aspect ratio, show secondary image on hover, quick-add button toggle, discount badge style (`-XX% OFF` pill). |
| **Collection Banner & Intro Container** | `sections/main-collection-banner.liquid` | Modify Existing | **S** | **Low** | Container max-width (`820px`), show/hide collection image, typography styling. Remove "Collection:" prefix. |
| **Collection Facets & Toolbar** | `sections/main-collection-product-grid.liquid`<br>`snippets/facets.liquid`<br>`snippets/breadcrumbs.liquid` | Extend Existing | **M** | **Medium** | Enable native filtering (availability, price slider, product type, pet type), active filter chips, sort dropdown, breadcrumbs above H1. |
| **Sub-Collection Chips** | `snippets/petssify-subcollection-chips.liquid`<br>`sections/main-collection-banner.liquid` | **NEW Snippet** | **S** | **Low** | Linklist or tag-based chips to filter sub-categories (e.g. Puzzle Feeders, Snuffle Mats). |
| **Homepage Hero Banner** | `sections/petssify-hero.liquid`<br>`templates/index.json` | **NEW Section** | **M** | **Low** | Background desktop & mobile image pickers, overlay opacity, eyebrow text, H1 headline, subheadline, primary CTA, secondary CTA. |
| **"Why Shop With Petssify" Value Props** | `sections/petssify-value-props.liquid`<br>`templates/index.json` | **NEW Section** | **S** | **Low** | Section title, 4 configurable feature blocks (icon selection, heading, text body). |
| **Category Circles ("Who are you shopping for?")** | `sections/petssify-category-circles.liquid`<br>`templates/index.json` | **NEW Section** | **M** | **Low** | Section title, blocks for collections with custom image override, label, and link. Mobile horizontal scroll toggle. |
| **Featured Collection Grids & Banners** | `sections/featured-collection.liquid`<br>`sections/petssify-feature-banner.liquid`<br>`templates/index.json` | Extend + **NEW Section** | **M** | **Low** | Collection selector, products to show, columns (desktop 4, mobile 2), quick add toggle, banner heading, subtext, CTA button. |
| **Brand Trust Row** | `sections/petssify-trust-bar.liquid`<br>`templates/index.json` | **NEW Section** | **S** | **Low** | 4 trust column items (icon, title, short text). |
| **Customer Reviews Carousel** | `sections/apps.liquid`<br>`sections/petssify-reviews-carousel.liquid`<br>`templates/index.json` | Configure App + Fallback | **M** | **Medium** | Bind Judge.me reviews carousel; auto-hide when review count is 0 to avoid empty UI container. |
| **FAQ Accordion Section** | `sections/petssify-faq-section.liquid`<br>`templates/index.json` | Update Existing | **S** | **Low** | Heading, subheading, FAQ blocks with updated shipping windows (1–2 days processing, 5–8 days delivery). |
| **Newsletter Section** | `sections/newsletter.liquid`<br>`templates/index.json` | Style Existing | **S** | **Low** | Heading ("Unlock 15% OFF Today"), body text, background style. |
| **PDP Layout & Gallery** | `sections/main-product.liquid`<br>`snippets/product-media-gallery.liquid` | Modify Existing | **M** | **Medium** | Sticky gallery alignment, eliminating empty vertical whitespace below media thumbnails. |
| **PDP Stock Availability Badge** | `snippets/petssify-stock-badge.liquid`<br>`sections/main-product.liquid`<br>`templates/product.json` | **NEW Snippet** | **S** | **Low** | Dynamic Liquid stock status check replacing hardcoded HTML in `product.json`. Green pulsing dot. |
| **PDP Variant Picker & Swatches** | `snippets/product-variant-picker.liquid`<br>`snippets/product-variant-options.liquid` | Extend Existing | **M** | **Medium** | Circular color swatches, button pills for sizes, hide single `Default Title` selector. |
| **Size Guide Modal** | `snippets/petssify-size-guide-modal.liquid`<br>`sections/main-product.liquid` | **NEW Snippet** | **S** | **Low** | Modal trigger next to Size label; measurement guide image & sizing chart table. |
| **PDP Trust & Guarantee Card** | `snippets/petssify-product-trust.liquid`<br>`templates/product.json` | **NEW Snippet** | **S** | **Low** | "OUR Petssify PROMISE" card with 3 checkmarks + Guaranteed Safe Checkout badges. |
| **PDP Accordions & Clean Desc** | `templates/product.json`<br>`sections/main-product.liquid` | Refactor Existing | **M** | **Medium** | Remove truncated Short Description block, remove duplicate H2, eliminate repeated title spam, standardize Shipping & Returns copy. |
| **Mobile Sticky Add-to-Cart** | `snippets/sticky-add-to-cart.liquid`<br>`sections/main-product.liquid` | Style Existing | **S** | **Low** | Mobile bottom bar with thumbnail, price, variant, and Add to Cart button. |
| **SEO Robots & Dynamic Schema** | `templates/robots.txt.liquid`<br>`snippets/schema-organization.liquid`<br>`snippets/schema-product.liquid` | **NEW Files** (Spec 6) | **S** | **Low** | robots.txt with AI bot rules; Organization + WebSite JSON-LD; Product + Offer + MerchantReturnPolicy JSON-LD. |

---

## 2. Prototype Features vs. Native Shopify Feasibility & Alternatives

| Prototype Feature | Native Shopify Limitation | Proposed Native Shopify Implementation |
| :--- | :--- | :--- |
| **Client-Side SPA Routing** (`/collections/dog-toys`, etc.) | Shopify uses server-rendered multi-page architecture with canonical URL handles (`/collections/dog-toys-enrichment`, `/collections/cat`, etc.). | Use Shopify's native collection handles and linklists. Create 301 redirects in Shopify Admin for any legacy or short handles (detailed in Manual Admin Tasks). |
| **Client-Side Array Filtering** | In the prototype, filtering runs instantly in browser JS memory over mock products. | Use Shopify's native faceted filtering (`facets.liquid`) powered by the **Shopify Search & Discovery App**. Supports instant Ajax grid refresh with URL state synchronization without page reloads. |
| **Static Mock Customer Reviews** | In the prototype, reviews are hardcoded JS objects. In Shopify, reviews must be authenticated and stored via a review application. | Integrate the installed **Judge.me Product Reviews** app widgets (`preview_badge`, `review_widget`, `cards_carousel`). Style the Judge.me widget containers via CSS in `petssify-theme.css` to match the prototype's typography, radii, and star colors (`#F5A623`). Auto-hide widgets on 0-review items. |
| **Shop Pay & Accelerated Checkout** | In the prototype, a generic "Buy with Shop" button is displayed. | Render native Shopify dynamic checkout buttons via `{{ form | payment_button }}`, allowing authenticated Shop Pay, Apple Pay, and Google Pay wallets according to the customer's browser. |
| **Hardcoded Size Chart Diagram** | Prototype uses a static SVG asset for recovery collar necks. | Render a flexible Size Guide modal snippet that displays the size chart image and measurement table, with support for product-specific metafield overrides (`product.metafields.custom.size_chart`). |

---

## 3. Prioritized Implementation Order

Once approved, implementation will proceed systematically in the following order:

1. **Step 1: Global Design Tokens & Theme Foundation**
   - Create `assets/petssify-theme.css` with CSS custom properties.
   - Enqueue font preconnects (`Plus Jakarta Sans` and `Inter`) and `petssify-theme.css` in `layout/theme.liquid`.
   - Update `config/settings_data.json` color schemes and typography references to align Dawn core tokens.
2. **Step 2: Announcement Bar, Sticky Header & Navigation**
   - Refactor `sections/announcement-bar.liquid` for 3 spec slides with 5-second rotation and deep navy background.
   - Modernize `sections/header.liquid` and `snippets/header-mega-menu.liquid` with navy styling and 3-column mega menus.
   - Restructure `sections/footer.liquid` and `sections/footer-group.json` with unified NAP and sentence-case summary.
3. **Step 3: Cart Drawer & Free Shipping Progress Bar**
   - Implement `snippets/petssify-free-shipping-bar.liquid` with dynamic $50.00 calculation.
   - Clean empty state in `snippets/cart-drawer.liquid` with the 3 customer destination buttons.
4. **Step 4: Enhanced Product Card**
   - Create `snippets/petssify-product-card.liquid` (or extend `card-product.liquid`) with 12px card border, square image, single `-XX% OFF` coral pill badge, 2-line title clamp, review rating, and hover quick-add.
5. **Step 5: Collection Page**
   - Place breadcrumb snippet above H1.
   - Remove "Collection:" prefix from visual H1 in `sections/main-collection-banner.liquid`.
   - Constrain description to 820px readable container.
   - Add sub-collection chips and polish faceted filter toolbar.
6. **Step 6: Product Detail Page (PDP)**
   - Eliminate empty vertical gap below product gallery.
   - Clean `templates/product.json`: remove truncated Short Description block and duplicate H2.
   - Replace hardcoded IN STOCK with dynamic Liquid stock indicator (`snippets/petssify-stock-badge.liquid`).
   - Guard variant picker against single `Default Title` variants.
   - Add `snippets/petssify-size-guide-modal.liquid` and style color swatches + size pills.
   - Standardize "OUR Petssify PROMISE" card and single "Shipping & Returns" accordion.
   - Refactor mobile sticky add-to-cart bar.
7. **Step 7: Homepage Refactoring (`templates/index.json`)**
   - Create `sections/petssify-hero.liquid` (spec copy defaults).
   - Create `sections/petssify-value-props.liquid` (4-card exact spec copy).
   - Create `sections/petssify-category-circles.liquid` (clean alt texts, hover rings).
   - Create `sections/petssify-feature-banner.liquid` for Feeding and Bathing promos.
   - Bind Bathing promo carousel to `bathing-cleaning`.
   - Configure Brand Trust row, Judge.me reviews carousel, and FAQ accordion.
8. **Step 8: Technical SEO & Schema Markup**
   - Add `templates/robots.txt.liquid` with AI crawler directives.
   - Add `snippets/schema-organization.liquid` and include in `layout/theme.liquid`.
   - Add `snippets/schema-product.liquid` and include in `sections/main-product.liquid`.
   - Ensure zero duplicate or conflicting schema blocks.

---

## 4. Separation of Tasks: Theme Code vs. Manual Admin Tasks

### (A) Theme-Code Tasks (Automated / Implemented in Theme)
* Spec 1.1: Verify `layout/theme.liquid` has no residual Storekick scripts.
* Spec 1.2: Unify announcement bar slides (Free shipping over $50, 30-day money-back, verified specs) across all templates.
* Spec 1.3: Cart drawer free shipping progress bar + 3 empty cart navigation buttons.
* Spec 1.4: Footer NAP update (sentence case bio, Delaware corporate office, San Mateo returns hub, support email, phone placeholder, dynamic payment icons).
* Spec 2.2: Hero banner component with editable H1, subheadline, and CTAs.
* Spec 2.3: "Why Shop With Petssify" 4-column value props component.
* Spec 2.4: Clean category icons alt texts; bind Grooming carousel to `bathing-cleaning`; update FAQ shipping answer.
* Spec 3.1: Dynamic Liquid availability status indicator (in-stock green pulsing dot / out-of-stock).
* Spec 3.2: Remove truncated Short Description block from `templates/product.json` and delete duplicate H2.
* Spec 3.3: Remove repeated product title spam block above shipping accordion.
* Spec 3.4: Hide single-variant `Default Title` button + unify single Shipping & Returns accordion.
* Spec 3.5: Fix breadcrumb navigation logic in `snippets/breadcrumbs.liquid`.
* Spec 4.1: Collection template H1 prefix removal, 820px intro container, faceted filter styling.
* Spec 6.1: Create `templates/robots.txt.liquid`.
* Spec 6.2: Create `snippets/schema-organization.liquid` (Organization + WebSite JSON-LD).
* Spec 6.3: Create `snippets/schema-product.liquid` (Product + Offer + Shipping + ReturnPolicy JSON-LD).

### (B) Manual Admin Tasks (Requiring Store Owner Action in Shopify Admin)
* Saved separately in `/audit/MANUAL_ADMIN_TASKS.md` with prioritized P0, P1, and P2 checklists.
