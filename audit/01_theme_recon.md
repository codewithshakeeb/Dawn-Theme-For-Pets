# Phase 1: Repository Reconnaissance & Theme Mapping

**Theme Name:** Dawn  
**Theme Version:** 15.4.0 (OS 2.0)  
**Theme Blocks Support:** Yes (`/blocks` directory active with Theme Blocks)  
**Safety Branch Created:** `redesign/base44-match` (committed untouched baseline as `baseline-dawn`)  
**Date of Audit:** October 2026  

---

## 1. Complete Theme File Map & Key Component Identification

The Petssify theme is built on Shopify Dawn v15.4.0, using JSON page templates (`templates/*.json`) and section groups (`sections/header-group.json`, `sections/footer-group.json`). Below is the architectural mapping of all active store components:

| Store Component | Primary Theme File(s) | Role & Dependencies |
| :--- | :--- | :--- |
| **Announcement Bar** | `sections/announcement-bar.liquid`<br>`sections/header-group.json` | Global announcement slider, rendered within `header-group`. Supports auto-rotation and slide blocks. |
| **Header** | `sections/header.liquid`<br>`snippets/header-mega-menu.liquid`<br>`snippets/header-dropdown-menu.liquid`<br>`snippets/header-drawer.liquid`<br>`snippets/header-search.liquid` | Sticky header with desktop mega-menu / dropdown, mobile hamburger drawer, search modal, and live cart bubble. |
| **Footer** | `sections/footer.liquid`<br>`sections/footer-group.json`<br>`snippets/social-icons.liquid` | Global footer with multi-column blocks (brand info, menu links, contact text), newsletter, social icons, and payment badges. |
| **Cart Drawer** | `sections/cart-drawer.liquid`<br>`snippets/cart-drawer.liquid`<br>`assets/cart-drawer.js` | Slide-out Ajax cart drawer. Handles item line edits, empty state promo card, and cart total calculations. |
| **Hero / Slideshow** | `sections/image-banner.liquid`<br>`sections/slideshow.liquid`<br>`templates/index.json` (`custom_liquid_67Pd4R`) | Currently rendered on Homepage via a raw `custom_liquid` block (`custom_liquid_67Pd4R`) rather than a modular Dawn section. |
| **Featured Collection** | `sections/featured-collection.liquid` | Grid / slider of products bound to a collection setting (`best-sellers`, `bowls-feeders`, `bathing-cleaning`). |
| **Collection List** | `sections/collection-list.liquid` | Circular or grid collection list ("Who are you shopping for?"). |
| **Product Card** | `snippets/card-product.liquid`<br>`snippets/price.liquid` | Standard Dawn product card rendering image, title, vendor, review badge, price, compare-at, and discount badge. |
| **Collection Banner** | `sections/main-collection-banner.liquid` | Renders collection H1 title, description copy, and collection featured hero image. |
| **Facets / Filters** | `sections/main-collection-product-grid.liquid`<br>`snippets/facets.liquid`<br>`snippets/price-facet.liquid` | Native Shopify Search & Discovery faceted filters (availability, price slider, and tagged attributes). |
| **Main Collection Grid** | `sections/main-collection-product-grid.liquid`<br>`templates/collection.json` | 4/3/2 column product grid with pagination or infinite scroll. |
| **Main Product (PDP)** | `sections/main-product.liquid`<br>`templates/product.json` | Two-column product detail page (media gallery left, buy-box right with variant picker, stock, accordions). |
| **Product Gallery** | `snippets/product-media-gallery.liquid`<br>`snippets/product-thumbnail.liquid`<br>`snippets/product-media.liquid`<br>`snippets/product-media-modal.liquid` | Image gallery with thumbnail slider, lightbox modal, and hover zoom. |
| **Variant Picker** | `snippets/product-variant-picker.liquid`<br>`snippets/product-variant-options.liquid`<br>`snippets/swatch.liquid`<br>`snippets/swatch-input.liquid` | Pill, button, and swatch input selectors. |
| **Accordions / Tabs** | `sections/collapsible-content.liquid`<br>`snippets/icon-accordion.liquid`<br>`templates/product.json` (`collapsible_tab`) | Collapsible accordion rows on product pages and general pages. |
| **Reviews Integration** | App blocks: `shopify://apps/judge-me-reviews/blocks/...`<br>`sections/apps.liquid` | Judge.me review star badges, review widget on PDP, and review carousel on Homepage. |
| **Product Recommendations** | `sections/related-products.liquid` | Shopify dynamic recommendations ("Frequently Bought Together"). |
| **Newsletter** | `sections/newsletter.liquid`<br>`sections/email-signup-banner.liquid` | Email signup form integrated with Shopify Customer API. |
| **FAQ Section** | `sections/petssify-faq-section.liquid` | Custom FAQ accordion section with questions, answers, and support email links. |

---

## 2. Dawn Version & Theme Blocks Status

* **Dawn Version:** `15.4.0` (verified in `config/settings_schema.json`, line 5).
* **Theme Blocks:** The theme supports and currently contains Shopify Theme Blocks inside the `/blocks` directory:
  * `blocks/ai_gen_block_8f6823b.liquid` (18.8 KB)
  * `blocks/ai_gen_block_b002d14.liquid` (3.4 KB)

---

## 3. Specific Recon Code Search Findings

| Target Pattern | File Location & Line | Analysis & Resolution |
| :--- | :--- | :--- |
| **"storekick"** | `layout/theme.liquid`: **Not present**.<br>Referenced only in spec `petssify_developer_ui_and_content_implementation_spec.md` (lines 11–15, 507). | Storekick was injected dynamically via Shopify App Embed or ScriptTag API via `content_for_header`. Requires app uninstall in Shopify Admin -> Apps / App Embeds. No residual hardcoded tags exist in `theme.liquid`. |
| **Hardcoded "IN STOCK"** | `templates/product.json`: block `custom_liquid_k8nVae` | A hardcoded HTML `<div class="tf-stock-badge">...<strong>IN STOCK</strong> — Ready to ship within 24 hours</div>` is injected as a custom liquid block on ALL products, regardless of actual variant inventory. Must be replaced with dynamic Liquid inventory checks. |
| **`truncate: 220` / `truncate: 240`** | `templates/product.json`: block `custom_liquid_yRKiUe` | Injected as a custom liquid block: `<h4 class="tf-short-desc-heading">Short Description</h4><div class="tf-short-desc">{{ product.description \| strip_html \| truncate: 240 }}</div>`. Renders above the variant picker, cutting off mid-sentence. Must be completely removed from `templates/product.json`. |
| **"Default Title"** | `snippets/product-variant-picker.liquid`: line 11 | `{%- unless product.has_only_default_variant -%}` is already in the snippet, but single-variant products with improperly structured options in the Shopify backend or custom liquid variant triggers have rendered "Default Title". Verified safe; ensure single-variant products have no stray form pills. |
| **`product.collections.first` / Breadcrumbs** | `snippets/breadcrumbs.liquid`: lines 19–39 | Breadcrumb logic loops through `product.collections` and unconditionally assigns `breadcrumb_collection = product_collection` and breaks on the first non-generic match. For products in multiple collections (e.g. Cat and Dog), it grabs whichever was added first, producing false trails like `Home › Cat` on dog leashes. Needs collection context + breed logic. |
| **"Collection:" Prefix** | `sections/main-collection-banner.liquid`: lines 18–19 | Contains `<span class="visually-hidden">{{ 'sections.collection_template.title' \| t }}: </span>{{- collection.title \| escape -}}`. While visually hidden in standard Dawn, styling overrides and assistive tech render "Collection: ". Must be cleaned to `<h1>{{ collection.title }}</h1>`. |
| **Raw "- Petssify -" Labels** | `config/settings_data.json`: line 1<br>`templates/index.json`<br>`snippets/cart-drawer.liquid` | 1) In `settings_data.json`, `"cart_drawer_collection": "feeding"`. The collection title in Shopify Admin was named `Feeding Essentials - Petssify -`, which prints verbatim on empty cart cards via `snippets/card-collection.liquid`.<br>2) Image alt texts in `templates/index.json` contain `- Petssify -` suffixes. |
| **Duplicate Shipping & Returns Blocks** | `templates/product.json`: blocks `collapsible_tab_NXcnAr`, `custom_liquid_74meCg`, and `custom_liquid_xgN7Mk` | PDP contains 3 overlapping shipping/return notices: 1) `collapsible_tab_NXcnAr` with outdated 5–10 day delivery, 2) `custom_liquid_74meCg` ("Shipping calculated at checkout"), and 3) `custom_liquid_xgN7Mk` ("OUR Petssify PROMISE"). Description HTML on several products also contains duplicate shipping tabs. |

---

## 4. Existing Custom & Third-Party Code Inventory

The following non-standard Dawn code and app integrations exist in the workspace and must be handled carefully to avoid regressions:

1. **Judge.me Product Reviews:**
   - App blocks active in `templates/product.json` (`judge_me_reviews_preview_badge_GnFnak`, `judge_me_reviews_review_widget_9Rd9j7`).
   - Cards carousel active in `templates/index.json` (`judge_me_reviews_cards_carousel_jU8kkq`).
   - App embed enabled in `config/settings_data.json` (`14060646107696862457`).
2. **Shopify Inbox (Native Chat):**
   - App embed configured in `config/settings_data.json` (`15683396631634586217`), replaced Storekick.
3. **P-Quantity Breaks:**
   - App embed enabled in `config/settings_data.json` (`16559847531084589941`).
4. **Third-Party Snippets Present:**
   - `snippets/Infinite-Scroll.liquid` (custom infinite scrolling script for collection pages).
   - `snippets/sticky-add-to-cart.liquid` (custom sticky buy bar).
   - `snippets/breadcrumbs.liquid` (custom breadcrumbs implementation).
5. **Custom Section:**
   - `sections/petssify-faq-section.liquid` (custom FAQ accordion with inlined CSS).
6. **AI Search Feeds:**
   - `templates/llms.txt.liquid` and `templates/llms-full.txt.liquid` (markdown feed generation for LLMs/search engines).
7. **Custom Liquid Injections in JSON Templates:**
   - `templates/index.json`: `custom_liquid_67Pd4R` (hardcoded hero banner with inline `<style>`).
   - `templates/product.json`: 5 custom liquid blocks (`custom_liquid_k8nVae`, `custom_liquid_yRKiUe`, `custom_liquid_74meCg`, `custom_liquid_xgN7Mk`, `custom_liquid_38U7cF`).
