# 08 State Test Results & QA Matrix

**Branch:** `redesign/base44-match`  
**Reference:** Base44 Prototype & Reference Layout Mockups  
**Test Suite:** Product Card Unification, Test Products, and PDP State Handling (Parts A–D)

---

## 1. Test Matrix: Product Page & Catalog States

| State / Scenario | Viewport | Test Action | Expected Result | Result |
| :--- | :--- | :--- | :--- | :--- |
| **In-Stock PDP** (`petssify-test-in-stock-slow-feeder-bowl`) | 1440px Desktop | Page load & initial state | Green status dot with "IN STOCK — Ships within 1–2 business days from our US partner network". Add to cart enabled, dynamic checkout visible, discount pill active. | **PASS** |
| **In-Stock PDP** | 768px Tablet | Variant switch (Sage Green -> Blush Pink) | Price updates smoothly ($18.00 -> $22.00 for Large), inventory remains in-stock, image switches. | **PASS** |
| **In-Stock PDP** | 375px Mobile | Scroll down page | Mobile sticky add-to-cart bar triggers with thumbnail, title, selected variant title, and active Add to Cart action. | **PASS** |
| **In-Stock PDP** | 1440px Desktop | Add to Cart click | Submits via AJAX, triggers slide-out Cart Drawer, updates subtotal and Free Shipping progress bar (crosses $50 threshold on 3x quantity). | **PASS** |
| **Mixed-Variant PDP** (Blush Pink / Large 10") | 1440px Desktop | Select sold-out variant combination | Status badge live updates to "Currently out of stock" via `#Inventory-{{ section.id }}` re-render. Add to cart button switches to "Sold out" (`disabled` + `aria-disabled="true"`). Dynamic checkout hidden. "Notify Me" restock form renders. | **PASS** |
| **Mixed-Variant PDP** | 375px Mobile | Switch from Large Blush Pink (Sold Out) back to Sage Green (In Stock) | Button switches back to active "Add to Cart", dynamic checkout reappears, status badge returns to green "IN STOCK", Notify Me form hides. | **PASS** |
| **Mixed-Variant PDP** | 768px Tablet | Variant pill inspection | Unavailable combinations display strikethrough text with `opacity: 0.55` and `cursor: not-allowed`. | **PASS** |
| **Out-of-Stock PDP** (`petssify-test-out-of-stock-cat-fountain`) | 1440px Desktop | Page load | Red status badge "Currently out of stock" rendered. Zero green "IN STOCK" text anywhere on page. | **PASS** |
| **Out-of-Stock PDP** | 1440px Desktop | Buy box & buttons | Primary button is disabled "Sold out", dynamic checkout ("Buy with Shop Pay") completely hidden. | **PASS** |
| **Out-of-Stock PDP** | 1440px Desktop | Restock Form | `snippets/petssify-notify-me.liquid` renders with prefilled product title/URL, email input, and submit button. | **PASS** |
| **Out-of-Stock PDP** | 375px Mobile | Sticky bottom bar | Shows disabled "Sold out" button; clicking it smoothly scrolls the user to the "Notify Me" form. | **PASS** |
| **Out-of-Stock PDP** | 1440px Desktop | Product Recommendations | Section "You may also like" renders 4 in-stock alternatives placed cleanly **above** the Judge.me reviews app section. | **PASS** |
| **Out-of-Stock PDP** | Desktop/Mobile | Structured Data JSON-LD | Outputs `"availability": "https://schema.org/OutOfStock"`. Page `<meta>` / robots allows indexing (`Allow: /products/`). | **PASS** |
| **Product Card** (In-Stock) | All Viewports | Grid render | Single `-XX% OFF` coral pill (top-left), 1:1 contain image, secondary image hover swap, 2-line title, bold navy price, "Add to Cart" or "Choose options". | **PASS** |
| **Product Card** (Out-of-Stock) | All Viewports | Grid render | Muted slate "Sold out" pill replaces discount badge. Image desaturated (`opacity: 0.6`). Button is disabled "Sold out" (`aria-disabled="true"`). Hover lift disabled. | **PASS** |
| **Cart Drawer** | All Viewports | Direct variant ID manipulation | Attempting to force-add an out-of-stock item via AJAX returns error description displayed in `.product-form__error-message` without crashing the drawer. | **PASS** |
| **Breadcrumbs** | All Viewports | Species separation | Cat water fountain displays `Home › Cat Supplies › Product Title` and never references Dog collections. Slow feeder bowl displays valid Feeding category trail. | **PASS** |

---

## 2. Accessibility & Screen Reader Audit

* **Stretched Link Pattern:** Card titles wrap `<a>` with a pseudo-element overlay covering the card (`.petssify-product-card__link::after`). The quick-add button has `z-index: 2`, ensuring no nested `<a>` inside `<a>` violations.
* **Focus States:** High-contrast focus outline (`2px solid var(--color-accent)`) on card links and buttons during keyboard `Tab` navigation.
* **Button Labels:** Disabled buttons correctly specify both `disabled` and `aria-disabled="true"`.
* **Mobile Tap Targets:** All buttons, variant pills, and links satisfy WCAG 2.5.5 with minimum dimensions of 44x44px.
* **Image Fallbacks:** All images feature descriptive `alt` tags with fallback to `product.title`.

---

## 3. Shopify Theme Check Results
* Total inspected files: 187
* Liquid Syntax Errors: **0**
* Regressions: **0**
