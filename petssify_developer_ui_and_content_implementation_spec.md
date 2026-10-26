# Petssify.com — Developer UI, Theme Liquid & Content Implementation Specification

**Project:** Site-Wide UI/UX, Shopify Theme Liquid, Technical SEO, Schema & Content Overhaul  
**Store URL:** https://petssify.com/  
**Operating Entity:** Dynamic Resolutions LLC  
**Platform:** Shopify (OS 2.0 Dawn-based Theme)  


## 1. GLOBAL THEME UI, HEADER, FOOTER & APP CLEANUP

### 1.1 Uninstall / Replace Broken Storekick Live Chat Widget (Priority: P0)
* **Current UI Bug:** On every page load, the Storekick chat widget injects failing script calls and renders an error state in the DOM: `Chat isn't available right now / Something went wrong while loading the chat. / Try again`.
* **Developer Action:**
  1. Go to **Shopify Admin -> Apps** and uninstall **Storekick** (or disable its App Embed in **Online Store -> Themes -> Customize -> App embeds**).
  2. Inspect `layout/theme.liquid` and remove any residual `<script>` tags referencing `storekick`.
  3. Install and enable **Shopify Inbox** (free native Shopify chat) configured with automated order-tracking lookup and offline email capture routed to `support@petssify.com`.

### 1.2 Unify Cached Header & Announcement Bar Templates (Priority: P0)
* **Current UI Bug:** Certain collection templates (such as `/collections/cat-beds-comfort`) render a different header/announcement bar (`Mega Pet Sale Up to 50% OFF | Enjoy Free Shipping on Orders Over $50 | Buy More, Save More` and a `Leashes` nav link without `Health & Recovery`) than the homepage (`Mega Sale Up To 40% OFF | Free US shipping over $50 | 30-Day Money Back Return`).
* **Developer Action:**
  1. In **Online Store -> Themes -> Customize**, check `sections/header-group.json` and ensure all collection, product, and page templates inherit the **exact same global header and announcement bar section group**.
  2. Update the Announcement Bar rotating or static text to:
     * **Slide 1:** `Free Tracked US Shipping on Orders Over $50`
     * **Slide 2:** `30-Day Money-Back Guarantee — Easy US Returns`
     * **Slide 3:** `Verified Sizing, Material & Weight Specs on Every Product`

### 1.3 Fix Cart Drawer & `/cart` Page Empty-State UI (Priority: P1)
* **Current UI Bug:** When the cart drawer or `/cart` page is empty, afeatured collection promo card displays raw internal naming: `Feeding Essentials - Petssify - / Feeding / Feeding`.
* **Developer Action:**
  1. Open `snippets/cart-drawer.liquid` and `sections/main-cart-items.liquid`.
  2. Remove the raw `Feeding Essentials - Petssify -` text label from the empty-cart upsell card and replace it with clean button links: **Shop Best Sellers** (`/collections/best-sellers`), **Shop Dog Supplies** (`/collections/dogs`), and **Shop Cat Supplies** (`/collections/cat`).
  3. Add a dynamic **Free Shipping Progress Bar** at the top of the Cart Drawer (`threshold = 5000` cents / `$50.00 USD`):
     ```liquid
     {% assign free_shipping_threshold = 5000 %}
     {% assign cart_total = cart.total_price %}
     <div class="cart-shipping-bar" style="padding: 10px 16px; background: #F1F5F9; border-radius: 6px; margin-bottom: 12px; font-size: 14px; font-weight: 600;">
       {% if cart_total >= free_shipping_threshold %}
         <span>🎉 You've unlocked FREE Tracked US Shipping!</span>
       {% else %}
         {% assign remaining = free_shipping_threshold | minus: cart_total | money %}
         <span>Add {{ remaining }} more to unlock FREE Tracked US Shipping!</span>
       {% endif %}
     </div>
     ```

### 1.4 Unify Footer Contact Info (NAP) & Social Links (Priority: P0)
* **Current UI Bug:** The footer on most pages lists `2810 N Church St #728120 Wilmington, DE` and `Admin@petssify.com`, while `/pages/contact-us` and `/collections/collars-harnesses-leashes` list `315 Grand Blvd apt 3, San Mateo, CA 94401`, and FAQ copy uses `support@petssify.com`. No phone number or social icons exist.
* **Developer Action:**
  1. Open `sections/footer-group.json` / `sections/footer.liquid` and update the **Brand Bio** and **Contact Info** column globally to the following exact text:
     * **Footer Brand Summary (Sentence case, replacing Title Case):**
       `Petssify is a US-based online pet supply store operated by Dynamic Resolutions LLC, offering dog and cat essentials—including grooming tools, water fountains, slow feeders, harnesses, and travel gear—with verified size, weight, and material specs.`
     * **Footer Contact Info Block:**
       * **Email:** `support@petssify.com` (Mon–Fri, 24-hour response)
       * **Phone:** `+1 (800) [Insert Active US Support Number]` (Mon–Fri, 9am–5pm EST)
       * **Legal Entity:** `Dynamic Resolutions LLC`
       * **Corporate Office:** `2810 N Church St #728120, Wilmington, DE 19802, USA`
       * **Returns & Operations Hub:** `315 Grand Blvd, Suite 3, San Mateo, CA 94401, USA`


## 2. HOMEPAGE UI & CONTENT SPECIFICATION (`templates/index.json`)

### 2.1 Homepage SEO Meta Tags (Shopify Admin -> Online Store -> Preferences)
* **Home Page Title (58 chars):**
  `Petssify | Dog & Cat Supplies with Verified Sizing & Specs`
* **Home Page Meta Description (155 chars):**
  `Shop dog and cat supplies at Petssify with exact breed sizing, material specs, and weight limits on every page. Free US shipping over $50 & 30-day returns!`

### 2.2 Hero Banner Section UI & Copy
* **Hero Image Alt Text:** `Golden retriever and white cat with Petssify grooming, feeding, and enrichment supplies`
* **H1 Headline:** `Practical Dog & Cat Supplies — Verified Sizing, Materials & Breed Specs`
* **Hero Subheadline (Fix Title Case to clean Sentence Case):**
  `Shop 304 stainless steel water fountains, whisper-quiet LED nail grinders, interactive puzzle toys, escape-proof harnesses, and post-surgery recovery gear—with exact measurements in inches and centimeters before you buy.`
* **Primary CTA Button:** `Shop Best Sellers` -> `/collections/best-sellers`

### 2.3 Fix Homepage "Why Shop With Petssify" 4-Column Value Props
Replace the existing 4 columns so shipping windows and support email match the rest of the store:
1. **Exact Specs Before You Buy:** `Every listing states verified material grade, dimensions in inches and centimeters, and the weight or coat type it fits—including when a toy isn't made for heavy chewers. No guessing from photos.`
2. **30-Day Easy Returns:** `If a product doesn't fit your pet, return it within 30 days of delivery for a full refund. Items must be unused and in their original packaging.`
3. **Ships Across the United States:** `Orders process in 1–2 business days and arrive in 5–8 business days with live tracking. Free US shipping on all orders over $50.`
4. **Reachable Human Support:** `Email support@petssify.com. We reply within 24 hours, Monday through Friday. Petssify is operated by Dynamic Resolutions LLC.`

### 2.4 Fix Homepage Category Carousel & Banner Bindings
* **Category Icons ("Who are you shopping for?"):** Strip the raw `- Petssify -` suffixes from image alt texts (`Dog - Petssify -`, `Cat - Petssify -`, `Feeding Essentials - Petssify -`, `Toys - Petssify -`).
* **Fix Broken Banner Product Grid ("Groom. Shine. Repeat. / Bath & Care Essentials"):**
  * **Bug:** The CTA button links to `/collections/bathing-cleaning`, but the 8-product carousel underneath it is currently bound to `/collections/cat-health-wellness` (displaying recovery cones, syringes, ear thermometers, and taurine powder).
  * **Fix:** In Theme Customizer, change the collection source of that featured collection section from `cat-health-wellness` to `bathing-cleaning`.
* **Fix Empty "What Customers Say" Section:**
  * **Bug:** The heading `What Customers Say` renders on the homepage with no visible review cards in the static DOM.
  * **Fix:** Bind the Judge.me Featured Carousel widget with verified product reviews, or hide the empty section until verified buyer reviews are populated.
* **Update Homepage FAQ Question #3 ("How long does shipping take?"):**
  * **Fix Copy:** `Orders are processed within 1–2 business days (Monday–Friday) and delivered within 5–8 business days across the United States with tracking.`


## 3. PRODUCT DETAIL PAGE (PDP) UI & LIQUID TEMPLATE FIXES

### 3.1 Fix Site-Wide "SALE Sold out" Lockout vs. "IN STOCK" Badge (Priority: P0)
* **Current UI Bug:** Every product page displays `SALE Sold out` next to the price and marks every variant button `Variant sold out or unavailable`, while a hardcoded line below says `IN STOCK — Ready to ship within 24 hours`.
* **Developer Action:**
  1. In **Shopify Admin -> Products**, select all active products, open Bulk Editor, and set inventory quantity > 50 at the active US fulfillment location (or enable `Continue selling when out of stock` for dropshipped items).
  2. In `sections/main-product.liquid`, replace the hardcoded `IN STOCK — Ready to ship within 24 hours` text block with a dynamic Liquid availability indicator:
     ```liquid
     {% if product.selected_or_first_available_variant.available %}
       <div class="product-inventory-status in-stock">
         <span class="status-dot"></span> IN STOCK — Ships within 1–2 business days from our US partner network
       </div>
     {% else %}
       <div class="product-inventory-status out-of-stock">
         Currently Out of Stock
       </div>
     {% endif %}
     ```

### 3.2 Remove Truncated Above-the-Fold "Short Description" Block (Priority: P0)
* **Current UI Bug:** Above the variant picker, a `Short Description` block prints the literal words `Product Description ` followed by the first ~220 characters of `product.description | strip_html | truncate: 220`, cutting off mid-word, and then repeats the full `Product Description` heading and text below the fold.
* **Developer Action:**
  1. In `sections/main-product.liquid` (or `templates/product.json`), **delete** the `Short Description` truncated text block above the variant selector.
  2. Below the fold, remove the duplicate nested `<h2>Product Description</h2>` heading so `Product Description` only appears once.

### 3.3 Strip the 5x–7x Repeated Product Title Spam Block Above Shipping Accordion (Priority: P0)
* **Current UI Bug:** On nearly every product page, immediately after FAQ #4 and right above the `Shipping & Returns` accordion, the product title is repeated 5 to 7 times in a row in plain text (e.g., `Petssify Portable Folding Travel Litter Box Petssify Portable Folding Travel Litter Box...`).
* **Developer Action:**
  1. Inspect `sections/main-product.liquid` and the product description HTML for all products.
  2. Strip the trailing repeated product title block from the template/product HTML.

### 3.4 Hide Raw `Default Title` Variant Selector & Remove Duplicate `Shipping & Returns` Block (Priority: P1)
* **Current UI Bug:** Single-variant products (such as `/products/petssify-quiet-pet-nail-grinder` and `/products/petssify-intelligent-pet-deodorizer-ozone-uv`) render a visible variant button reading `Default Title`. In addition, the `Shipping & Returns` text block is rendered twice in a row on several PDPs.
* **Developer Action:**
  1. Wrap the variant picker block in `snippets/product-variant-picker.liquid` with:
     ```liquid
     {% unless product.has_only_default_variant %}
       <!-- Render variant pills / dropdowns -->
     {% endunless %}
     ```
  2. Remove the duplicate `Shipping & Returns` custom liquid block in `templates/product.json` and update the remaining accordion text to:
     `Shipping Time: Orders process in 1–2 business days; tracked US delivery takes 5–8 business days (Free over $50). Return Window: Returns are accepted within 30 days of delivery for unused items in original packaging.`

### 3.5 Fix Breadcrumb Navigation Logic (`snippets/breadcrumbs.liquid`) (Priority: P1)
* **Current UI Bug:** Dog products (such as `Petssify Portable Dog Water Bottle with Storage` and `Petssify 3M Dual Retractable Dog Leash`) display `Home › Cat › ...` or `Home › Accessories › ...` in the breadcrumb trail because the snippet grabs `product.collections.first`.
* **Developer Action:**
  Update `snippets/breadcrumbs.liquid` to prioritize the `collection` context URL if present, or select the most specific non-generic collection (excluding `all`, `best-sellers`, and `cat` when `product.title contains 'Dog'`):
  ```liquid
  {% assign bc_collection = collection %}
  {% unless bc_collection %}
    {% for c in product.collections %}
      {% unless c.handle == 'all' or c.handle == 'best-sellers' or c.handle == 'accessories' %}
        {% if product.title contains 'Dog' and c.handle contains 'cat' %}
          {% continue %}
        {% endif %}
        {% assign bc_collection = c %}
        {% break %}
      {% endunless %}
    {% endfor %}
  {% endunless %}
  ```


## 4. COLLECTION PAGES UI, FILTERS, REDIRECTS & SEO COPY

### 4.1 Collection Template UI Improvements (`sections/main-collection-banner.liquid`)
1. **Remove Redundant `"Collection: "` Prefix from Visual H1:**
   Change `<h1>Collection: {{ collection.title }}</h1>` to `<h1>{{ collection.title }}</h1>`.
2. **Render Collection SEO Intro Copy cleanly:**
   Place `{{ collection.description }}` directly below the `<h1>` inside a readable container (`max-width: 820px; font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;`).
3. **Enable Faceted Product Filters (Shopify Search & Discovery App):**
   Add faceted filters beyond just `Availability` and `Price`: enable **Product Type**, **Pet Type (Dog / Cat)**, **Size**, and **Material**.
4. **Replace Raw Canva / AI Collection Banner Filenames:**
   Re-upload collection banner images currently named `Add_a_subheading_33_62c10003-ba81-4e35-850c-d1e08df75677.png` and `Gemini_Generated_Image_hq1guhq1guhq1guh.png` as compressed `.webp` files (`pet-bathing-supplies-banner.webp`, `pet-feeding-supplies-banner.webp`) with descriptive alt text.

### 4.2 URL 301 Redirects to Add in Shopify Admin (`Online Store -> Navigation -> View URL redirects`)

| Old / Duplicate Collection URL | Redirect Target URL | Reason |
| :--- | :--- | :--- |
| `/collections/cat-beds` | `/collections/cat-beds-comfort` | Duplicate collection handle on `/collections` |
| `/collections/cat-toys` | `/collections/cat-toys-enrichment` | Duplicate collection handle on `/collections` |
| `/collections/cats-toys-entertainment` | `/collections/cat-toys-enrichment` | Duplicate collection handle on `/collections` |
| `/collections/dog-training-accessories` | `/collections/dog-walking-training` | Duplicate collection handle on `/collections` |
| `/collections/collars-harnesses` | `/collections/collars-harnesses-leashes` | Broken 1-product collection (only contains a cone) |

### 4.3 Fix Broken Collection Product Tagging in Shopify Admin
* **`/collections/water-fountains`:** Currently only has 2 products. Add `Petssify 2.2L Stainless Steel Cat Fountain – Silent Pump & Visual Window` to this collection.
* **`/collections/feeding`:** Currently only has 5 products while `cat-feeding` has 17 and `dog-feeding` has 15. Configure `/collections/feeding` as an automated smart collection including all products from `bowls-feeders`, `slow-feeders`, `water-fountains`, `dog-feeding`, and `cat-feeding`.
* **`/collections/collars-harnesses-leashes`:** Currently only has 4 products. Tag all collars, harnesses, and leashes (`Dog Harness with AirTag Holder`, `LED Collar with AirTag Holder`, `5m Retractable Dog Leash with LED Flashlight`, `Heavy Duty Nylon Dog Leash – 5M/10M/15M`) into this collection, and remove the `Inflatable Dog Cone Collar` (which belongs in `dog-health-wellness` and `health-recovery`).
* **`/collections/nail-care`:** Remove fur brushes (`Magic Pet Grooming Comb` and `Self-Cleaning Pet Grooming Brush`) from `nail-care`—keep them in `deshedding-brushes`.
* **`/collections/cat` & `/collections/cat-travel`:** Remove dog-only items (`Portable Dog Water Bottle with Storage`, `Waterproof Chew-Proof Dog Mat`, `Dog Anxiety Vest`, `Natural Dog Paw Balm`) and the `33LB Collapsible Pet Food Storage Container` from Cat/Cat Travel collections.

### 4.4 Ready-to-Paste Meta Titles, Meta Descriptions & 100–150 Word Intro Copy for All 27 Collections

| Collection Handle | Valid Meta Title (50–60 Chars) | Valid Meta Description (140–160 Chars) | Ready-to-Paste Collection Description (100–150 Words) |
| :--- | :--- | :--- | :--- |
| `/collections/dogs` | `Dog Supplies, Toys, Grooming, Harnesses & Travel Gear \| Petssify` | `Shop vet-informed dog supplies at Petssify. Compare interactive puzzle toys, no-pull harnesses, grooming clippers, slow feeders, and travel gear with exact breed sizing.` | Explore durable, spec-verified dog supplies engineered for everyday routines across puppies, adult breeds, and senior dogs. Every listing in our Dogs collection includes exact dimensions in inches and centimeters, weight capacity ratings, and coat-type or chew-strength suitability so you never have to guess from studio photos. Browse interactive puzzle feeders and sniff mats for mental enrichment, breathable no-pull harnesses with reflective trim, low-noise LED nail grinders, waterproof car seat hammocks, and orthopedic crate mats. Orders over $50 ship free within the United States and include a 30-day return window. |
| `/collections/cat` | `Cat Supplies, Scratchers, Fountains & Interactive Toys \| Petssify` | `Shop cat essentials at Petssify. Find 304 stainless steel water fountains, sisal scratchers, whisker-friendly bowls, and interactive cat toys with full specs.` | Discover practical indoor cat supplies designed around feline instincts, hydration, and stress-free home care. Our Cat collection brings together essentials spanning 304 stainless steel water fountains, 15-degree tilted anti-vomiting bowls, natural sisal scratching posts, suction-cup window perches, and self-play motion toys. Each product page details exact measurements, weight limits, power requirements, and cleaning instructions to help single-cat and multi-cat households shop with confidence. All orders ship within the US with tracking and 30-day returns. |
| `/collections/best-sellers` | `Best-Selling Dog & Cat Supplies – Top-Rated Pet Gear \| Petssify` | `Browse Petssify's best-selling dog and cat essentials. Compare customer-favorite cooling mats, recovery cones, nail grinders, and waterproof sofa protectors.` | Shop the highest-demand dog and cat problem-solvers at Petssify. Our Best Sellers collection highlights 17 everyday essentials chosen by pet parents for measurable utility: ice-silk self-cooling mats for summer heat, soft inflatable recovery collars for post-surgery comfort, whisper-quiet LED nail grinders, 3M dual retractable leashes, and reversible waterproof couch protectors. Every listing specifies exact neck, chest, or surface measurements alongside material composition and washing care. |
| `/collections/feeding` | `Dog & Cat Feeding Supplies – Bowls, Feeders & Storage \| Petssify` | `Shop mess-free pet feeding supplies at Petssify. Find automatic timed feeders, airtight dry food bins, slow-feed puzzle bowls, and travel water bottles.` | Upgrade mealtime hygiene and portion control with Petssify's Pet Feeding Supplies. Designed for both cats and dogs, this collection features programmable timed dual-bowl feeders, airtight kibble storage containers with moisture seals, interactive slow-feeding dispensers, and leak-proof travel bottles. Compare 304 stainless steel, food-grade silicone, and BPA-free ABS construction with verified capacity specs. |
| `/collections/bowls-feeders` | `Pet Bowls, Elevated Stands & Automatic Feeders \| Petssify` | `Shop stainless steel cat bowls, 15° tilted raised feeders, timed kibble dispensers, and 33lb airtight food bins for dogs and cats at Petssify.` | Build a cleaner, more ergonomic feeding station for your dog or cat. Our Bowls & Feeders collection combines whisker-friendly shallow stainless steel dishes, 15-degree tilted raised stands that support healthy digestion, gravity-fed food and water stations, and 33-pound wheeled kibble storage bins. Every listing specifies bowl diameter, depth, fluid ounce or gram capacity, and dishwasher compatibility. |
| `/collections/slow-feeders` | `Slow Feeder Dog Bowls & Silicone Lick Mats for Pets \| Petssify` | `Prevent gulping, bloat, and vomiting with Petssify slow feeder bowls and food-grade silicone lick mats for dogs and cats. Dishwasher-safe & BPA-free.` | Help fast eaters slow down, chew thoroughly, and digest comfortably with Petssify Slow Feeders. Engineered with raised maze ridges, central star obstacles, and textured honeycomb pockets, our food-grade silicone mats and anti-choke bowls extend mealtime by up to 5x while reducing regurgitation and canine bloat risk. Suitable for dry kibble, wet food, raw diets, and frozen peanut-butter or yogurt enrichment. |
| `/collections/water-fountains` | `Stainless Steel Cat & Dog Water Fountains – Silent Pump \| Petssify` | `Encourage healthy hydration with ultra-silent (<=28dB) 304 stainless steel cat and dog water fountains featuring quadruple carbon filtration at Petssify.` | Keep fresh, oxygenated water flowing 24/7 for cats and small-to-medium dogs. Our Water Fountains collection features corrosion-resistant 304 stainless steel reservoirs (2.2L to 3.2L / 108oz capacities) paired with whisper-quiet <=28dB 5V USB pumps and multi-stage activated carbon filters that trap hair, debris, and odors. Ideal for preventing feline chin acne and supporting multi-pet hydration. |
| `/collections/dog-feeding` | `Dog Bowls, Slow Feeders, Elevated Stands & Scoop Scales \| Petssify` | `Shop dog feeding essentials at Petssify: anti-gulp maze bowls, raised double stainless steel stands, digital food measuring scoops, and waterproof mats.` | From portion-controlled puppy meals to raised orthopedic dining for adult dogs, our Dog Feeding collection covers every step of daily nutrition. Compare anti-choke slow feeder bowls, digital LED gram-scale scoops for accurate weight management, absorbent waterproof feeding placemats, and raised stainless steel double-bowl stands with exact height and capacity measurements. |
| `/collections/cat-feeding` | `Cat Bowls, Whisker-Friendly Dishes & Tilted Stands \| Petssify` | `Prevent whisker fatigue and post-meal vomiting with shallow stainless steel cat bowls, 15° tilted triple-bowl stands, and 3.2L fountains at Petssify.` | Cats have sensitive whiskers and delicate digestive tracts that require shallow, wide, and ergonomically angled dishes. Our Cat Feeding collection includes 2cm low-profile stainless steel dishes, 15-degree tilted bamboo triple-bowl stands, 108oz stainless steel water fountains, and 55ml newborn kitten nursing bottle kits—all constructed from non-porous, food-safe materials. |
| `/collections/grooming-care` | `Pet Grooming Supplies – Brushes, Clippers & Bath Tools \| Petssify` | `Groom your dog or cat safely at home with Petssify deshedding rakes, low-noise LED nail grinders, grooming hammocks, and hypoallergenic bath tools.` | Professional-grade home grooming tools designed to reduce shedding, prevent painful mats, and eliminate nail-trimming anxiety. Our Grooming & Care hub organizes coat brushes, undercoat rakes, quiet rechargeable clippers, LED nail grinders, and bathing restraints by coat length and pet size so you can maintain healthy skin, paws, and teeth between vet or salon visits. |
| `/collections/dog-grooming-care` | `Dog Grooming Tools – Clippers, Deshedding Brushes & Nail Grinders \| Petssify` | `Shop dog grooming supplies at Petssify: low-noise clippers for thick coats, vacuum shedding brushes, LED nail grinders, and nail-trimming hammocks.` | Keep double-coated, curly, and short-haired dogs clean and mat-free at home. Our Dog Grooming & Care collection includes specialized tools—from rechargeable low-noise clippers for thick coats and vacuum-attachment shedding brushes to 2-LED nail grinders and restraint hammocks—complete with decibel ratings, blade materials, and coat compatibility details. |
| `/collections/cat-grooming-care` | `Cat Grooming Supplies – Self-Cleaning Brushes, Wraps & Nail Care \| Petssify` | `Stress-free cat grooming tools at Petssify: self-cleaning slicker brushes, steam spray combs, anti-bite calming wraps, and quiet LED nail grinders.` | Turn stressful feline grooming into a calm bonding routine. Our Cat Grooming & Care collection features tools tailored to sensitive feline skin and reflexes, including one-click self-cleaning slicker brushes, misting steam brushes that reduce static, breathable mesh shower bags, self-adherent wraps for scratch-free nail trims, and safety-guard nail clippers. |
| `/collections/deshedding-brushes` | `Dog & Cat Deshedding Brushes, Undercoat Rakes & Dematting Combs \| Petssify` | `Control loose fur and tangles with Petssify double-row undercoat rakes, stainless steel mat splitters, steam brushes, and silicone grooming gloves.` | Reduce household shedding by up to 90% without scratching your pet's skin. Our Deshedding & Brushes collection offers rounded-pin rotating undercoat rakes for thick double coats, stainless steel dematting combs for long-haired breeds, gentle silicone massage gloves for short coats, and one-click self-cleaning slicker brushes. |
| `/collections/nail-care` | `Dog & Cat Nail Grinders, LED Clippers & Scratch Boards \| Petssify` | `Trim pet nails safely without hitting the quick. Shop dual-LED quiet electric nail grinders, safety-guard clippers, and wooden scratch boards at Petssify.` | Eliminate the fear of cutting the bloodline (quick) during home nail trims. Our Pet Nail Care collection features whisper-quiet USB-rechargeable diamond-bit nail grinders with dual LED illumination, stainless steel clippers with depth safety guards, manual wooden sandpaper scratch boards for dogs, and breathable grooming hammocks. |
| `/collections/bathing-cleaning` | `Pet Bathing Supplies – Dryers, Sprayers, Towels & Paw Cleaners \| Petssify` | `Make bath time faster with Petssify high-velocity pet dryers, electric foam soap dispensers, waterproof ear covers, and portable paw washing cups.` | Cut bath and drying time in half while keeping your bathroom dry. Our Bathing & Cleaning collection includes adjustable-temperature high-velocity dog dryers, automatic soap-foaming dispensers, calming waterproof ear snoods that protect against water in the ear canal, silicone shampoo-dispensing brushes, and super-absorbent microfiber dog bathrobes. |
| `/collections/dental-care` | `Dog & Cat Dental Care – Triple Toothbrushes, Finger Brushes & Scalers \| Petssify` | `Support fresh breath and tartar control with 3-sided dog toothbrushes, food-grade silicone 360° finger brushes, dental chew toys, and oral care kits.` | Daily plaque removal is the most effective way to prevent periodontal disease in dogs and cats. Our Dental Care collection offers 360-degree food-grade silicone finger brushes for kittens and puppies, triple-head toothbrushes that clean three tooth surfaces simultaneously, serrated rubber dental chew toys, and multi-mode plaque care tools. |
| `/collections/grooming-accessories` | `Pet Grooming Shears, Calming Wraps, Aprons & Tool Organizers \| Petssify` | `Shop curved stainless steel dog grooming scissors, self-adherent cat calming wraps, waterproof grooming aprons, and storage bags at Petssify.` | Complete your home grooming kit with specialized finishing and restraint accessories. This collection brings together 4-piece rounded-tip stainless steel grooming shears (straight, curved, thinning, and comb), self-adherent anti-scratch cat wraps, waterproof grooming aprons, tick removal tool sets, and portable organizer bags. |
| `/collections/toys` | `Interactive Dog & Cat Toys – Puzzle Feeders, Chew Toys & Teasers \| Petssify` | `Keep indoor dogs and cats active with 31 enrichment toys: treat-dispensing puzzles, snuffle mats, automatic rolling balls, and catnip bird teasers.` | Combat boredom, separation anxiety, and destructive chewing with Petssify's interactive dog and cat toys. We categorize every toy by play style—foraging snuffle mats, sliding IQ treat puzzles, freeze-and-chew rubber toys, flirt poles, and motion-activated rolling balls—and explicitly flag chew-strength limits so you can choose safe enrichment. |
| `/collections/dog-toys-enrichment` | `Dog Puzzle Toys, Snuffle Mats, Ball Launchers & Chew Toys \| Petssify` | `Challenge your dog's mind with interactive treat puzzle feeders, foraging sniffing pads, automatic fetch ball launchers, and durable chew toys at Petssify.` | Twenty minutes of mental enrichment tires a dog out as effectively as an hour-long walk. Our Dog Toys & Enrichment collection features brain games and active play tools, including multi-slider IQ treat boards, layered fleece snuffle mats, press-to-dispense slow feeders, telescopic flirt poles, and rechargeable automatic ball launchers. |
| `/collections/cat-toys-enrichment` | `Interactive Cat Toys – Chirping Birds, Puzzle Boards & Tunnels \| Petssify` | `Trigger your indoor cat's hunting instincts with chirping bird teasers, 14-compartment treat puzzles, wooden ball track towers, and crinkle tunnels.` | Satisfy your indoor cat's natural stalk-chase-catch-eat cycle with 16 interactive enrichment toys. Browse motion-activated chirping bird plush lures, suction-cup steel wire feather wands, 3-level wooden ball track towers, 14-compartment slow-feeder puzzle boards, and foldable crinkle play tunnels. |
| `/collections/cat-scratching-furniture` | `Cat Scratching Posts, Sisal Boards, Sofa Protectors & Cat Trees \| Petssify` | `Protect your couch with Petssify natural sisal scratching posts, wall-mounted scratch stations, L-shaped scratcher beds, and multi-level cat trees.` | Redirect destructive clawing away from your upholstery with vertical and horizontal scratching surfaces cats naturally prefer. Our Cat Scratching & Furniture collection includes multi-level condo cat trees, trimmable self-adhesive sofa protector mats, solid wood V-frame sisal balls, wall-mounted sisal pads, and high-density corrugated lounge beds. |
| `/collections/dog-beds-comfort` | `Orthopedic Dog Beds, Elevated Cooling Cots & Waterproof Couch Blankets \| Petssify` | `Give your dog restorative rest with 3D orthopedic foam crate mats, raised mesh summer cots, ice-silk cooling pads, and waterproof sofa protectors.` | Support healthy joints and temperature regulation year-round with our Dog Beds & Comfort collection. Compare 3D orthopedic egg-crate foam mats with removable washable covers, breathable elevated mesh cots for hot weather, ice-silk self-cooling pads, and reversible quilted waterproof blankets that shield sofas and car seats. |
| `/collections/cat-beds-comfort` | `Cat Cave Beds, Suction Window Hammocks & Desk Perches \| Petssify` | `Shop cozy cat beds at Petssify: enclosed plush anxiety caves, heavy-duty suction cup window perches, 360° rotatable desk hammocks, and radiator beds.` | Cats sleep 12 to 16 hours a day and seek warm, elevated, or enclosed hideaways to feel secure. Our Cat Beds & Comfort collection offers 360-degree clamp-on desk hammocks for work-from-home pet parents, heavy-duty suction-cup window perches, enclosed thermal plush caves, and low-voltage 5V warming pads. |
| `/collections/dog-walking-training` | `Dog Walking & Training Gear – No-Pull Harnesses, Dual Leashes & Pouches \| Petssify` | `Walk and train with total control: 3M dual retractable LED leashes, reflective AirTag harnesses, 15m recall leads, treat pouches, and indoor potty trays.` | Build safer daily walks and faster recall with Petssify's Dog Walking & Training gear. This collection includes tangle-free 3M dual retractable leashes with built-in LED flashlights, no-pull reflective vests with integrated AirTag holders, 5m/10m/15m nylon recall leads, magnetic treat pouches, and indoor pee-pad holder trays. |
| `/collections/collars-harnesses-leashes` | `No-Pull Dog Harnesses, Reflective Vests & Retractable Leashes \| Petssify` | `Shop escape-proof dog harnesses, heavy-duty training vests, and LED dual retractable leashes with reflective stitching and chest sizing charts.` | Secure, ergonomic control for small, medium, and large dogs. Our Collars, Harnesses & Leashes collection features breathable mesh no-pull vests, waterproof AirTag collars, heavy-duty training harnesses with top grab handles, and reflective dual retractable leads that distribute pulling force across the chest rather than the trachea. |
| `/collections/dog-travel-outdoor` | `Dog Travel Gear – SUV Ramps, Car Seat Hammocks, Carriers & Water Bottles \| Petssify` | `Travel safely with your dog: foldable aluminum SUV stairs, waterproof back-seat hammocks, airline-approved backpack carriers, and 2-in-1 water bottles.` | Equip your car, backpack, and campsite for stress-free adventures with your dog. Our Dog Travel & Outdoor collection features road-trip and trail essentials, including wide-tread folding aluminum SUV stairs, waterproof rear-seat hammocks and cargo liners, breathable carrier backpacks, and leak-proof 2-in-1 travel water and food bottles. |
| `/collections/cat-travel` | `Cat Travel Carriers, Folding Litter Boxes & Pop-Up Tents \| Petssify` | `Take stress out of vet visits and road trips with soft-sided cat carrier backpacks, leak-proof folding travel litter boxes, and pop-up carrier tents.` | Keep indoor cats secure, ventilated, and comfortable during vet trips, flights, and hotel stays. Our Cat Travel collection pairs expandable soft-sided carrier backpacks and pop-up travel tents with waterproof folding nylon litter pans that pack flat into any carry-on or trunk. |
| `/collections/car-travel` | `Dog Car Seat Covers, Back-Seat Hammocks & SUV Cargo Mats \| Petssify` | `Protect your vehicle upholstery and keep pets secure with waterproof dog car hammock seat covers, back-seat nest extenders, and non-slip SUV trunk mats.` | Shield your car seats from mud, claws, shedding, and motion-sickness accidents while giving your pet a stable riding surface. Our Car Travel collection includes quilted waterproof rear-seat hammocks, structured back-seat extender beds, bungee seat-belt tethers, non-slip SUV cargo mats, and folding aluminum SUV stairs. |
| `/collections/travel-accessories` | `Portable Pet Travel Accessories – Folding Litter Pans, Water Bottles & Kits \| Petssify` | `Pack smart for pet road trips and flights: portable dog water bottles, collapsible cat litter boxes, 61-piece pet first aid kits, and folding SUV steps.` | Every essential your packing checklist needs for road trips, camping, and hotel stays with dogs or cats. Compare leak-proof 2-in-1 water and kibble bottles, collapsible waterproof litter trays, 61-piece EVA emergency first-aid kits, and pop-up travel enclosures. |
| `/collections/dog-health-wellness` | `Dog Health, Recovery Cones, First Aid Kits & Calming Vests \| Petssify` | `Support dog recovery and home care with soft recovery donuts, 61-piece first aid kits, non-contact ear thermometers, calming vests, and paw balms.` | Practical at-home wellness, first-aid, and post-surgical recovery aids for dogs. Our Dog Health & Wellness collection includes soft inflatable recovery donuts, 2-in-1 pill and liquid syringes, 1-second infrared ear thermometers, 61-piece emergency first-aid kits, calming anxiety vests, and natural chamomile paw balm. |
| `/collections/cat-health-wellness` | `Cat Health & Recovery – Soft Cones, Calming Vests & Home Care \| Petssify` | `Shop gentle feline health and recovery supplies: soft Elizabethan cones, calming thunder vests, pill dispensers, infrared ear thermometers, and tear balm.` | Reduce stress during feline recovery, medication, and home health checks. Our Cat Health & Wellness collection features ultra-lightweight padded Elizabethan recovery cones, drug-free calming compression vests, soft-tip 2-in-1 medicine syringes, and non-contact infrared ear thermometers. |
| `/collections/health-recovery` | `Pet Recovery & Home Care Supplies – Syringes, Thermometers & First Aid \| Petssify` | `Equip your home pet care kit with 61-piece pet first aid bags, infrared ear thermometers, soft-tip pill syringes, and calming recovery essentials.` | Be prepared for minor injuries, post-op care, and daily medication routines. Our Health & Recovery hub brings together non-invasive infrared ear thermometers, 2-in-1 pill and liquid dispensers, cohesive self-adherent paw wraps, and 61-piece portable emergency kits for dogs and cats. |


## 5. CATALOG, PRICING, VARIANT & MEDIA FIXES (SHOPIFY ADMIN)

### 5.1 Unpublish 8 High-Risk / Compliance-Violating SKUs Immediately (Priority: P0)

| Product Title | Reason to Unpublish / Remove |
| :--- | :--- |
| `Petssify Heart-Shaped Ceramic Cat Bowl` | **Trademark Infringement:** Product photo and alt text display the luxury trademark **"LE CREUSET"** embossed on the rim. |
| `Petssify Intelligent Pet Deodorizer – Ozone & UV Air Purifier` | **Pet Safety Hazard:** Emits ozone gas inside enclosed litter areas without CARB/EPA certification or feline respiratory warnings. |
| `Petssify Cat Taurine Powder – 99.9% Pure Supplement` | **Unverified Ingested Supplement:** White-label Chinese jar (`Kriath`/`Kriach`) with 12 broken variants (`2pcs 1`, `A`, `B`, `C`), $27 vs. $62 price jump, and no NASC/FDA verification. |
| `Petssify Dog Probiotic Soft Granules` | **Mislabeled Ingested Supplement:** Product photo shows a `"Turkey Tail"` mushroom jar while the title claims `"Dog Probiotic Soft Granules"`. |
| `Petssify Cranberry Bladder Health Drops` | **Unverified Ingested Supplement:** Liquid supplement with 0 reviews, no active ingredient mg/ml panel, and no lot/expiry data. |
| `Petssify Yegbong Pet Dental Toothpaste` | **Grey-Market Ingested Chemical:** Uses unverified `Yegbong` chemical brand in H1 with no full ingredient list. |
| `Petssify Pet Dental Oral Gel / Gel Pen` | **Unverified Oral Chemical:** Ingested tartar remover gel with no VOHC/veterinary ingredient disclosure. |
| `Petssify Waterproof Weekly Pill Organizer` | **Off-Niche Human Product:** 7-day human vitamin cylinder (`"caring for an aging parent"`) placed inside Dog and Cat Travel collections. |

### 5.2 Fix Wrong Product Images & Leaked Supplier Brand Names (Priority: P0)

| Product Title | Exact Media / Title Fix in Shopify Admin |
| :--- | :--- |
| `Petssify Pet Nail Clipper with Safety Guard` | **Wrong Product Photos:** Currently displays 2 photos of a *beige grooming brush* instead of nail clippers. Upload the correct stainless steel nail clipper images and update alt texts. |
| `Petssify Pet Ear Cleaning Wipes – 50 Count` | **Wrong Secondary Photo:** Image #2 shows before/after *dog teeth tartar wipes* on an *ear wipes* listing. Delete Image #2. |
| `Petssify Quiet Pet Nail Grinder – 2 LED Lights` | **Mismatched Image #6:** Image #6 shows a 2-in-1 clipper+grinder unit while Images 1–5 show a pure grinder. Delete Image #6. |
| `Petssify Professional Dog Nail Grinder` | **Wrong Alt Text:** Change Image #2 alt text from `Pet training device with accessories on a white background` to `Petssify 2-Speed Professional Dog Nail Grinder with charging cord and diamond bit`. |
| `Petssify Oitabi Pet Grooming Comb Set` | **Remove Supplier Brand:** Rename H1 to `Petssify 5-Piece Stainless Steel Pet Grooming Comb Set for Dogs & Cats`. |
| `Petssify SucceBuy 2800W Pet Dryer` | **Remove Supplier Brand:** Rename H1 to `Petssify 2800W High-Velocity Pet Grooming Dryer – Adjustable Speed & Heat with 4 Nozzles`. |
| `Petssify DualPet Pet Grooming Glove` | **Remove Supplier Brand:** Rename H1 to `Petssify Silicone Pet Grooming & Deshedding Massage Glove for Dogs & Cats`. |
| `Petssify Pet Nail Grinder – 7-Speed Rechargeable` | **Remove Supplier Brand from Alt Text:** Change alt text from `ROJECO Pet Nail Grinder – White Background` to `Petssify 7-Speed Rechargeable Pet Nail Grinder with LED Light`. |
| `Petssify 39 Double Row Undercoat Rake` | **Fix Supplier Number:** Rename H1 to `Petssify Double-Row 39-Pin Rotating Undercoat Rake for Dogs & Cats`. |
| `Petssify Edible Silicone Slow Feeder Bowl` | **Fix Translation Error:** Rename H1 from `Edible Silicone` to `Petssify Food-Grade Silicone Slow Feeder Bowl – Non-Slip Pet Food Mat`. |
| `Petssify Waterproof Pet Grooming Apron – Adjustable Kitchen & BBQ Bib` | **Fix Translation Error:** Rename H1 to `Petssify Waterproof Pet Grooming Apron – Adjustable Bathing & Trimming Smock with Pockets`. |
| `Petssify Bluetooth Pet GPS Tracker` & `Remote Pet GPS Tracker` | **Fix Misleading Title:** Rename `"GPS Tracker"` to `"Bluetooth Anti-Loss Collar Tag"` and `"Waterproof Apple Find My Collar Tag"` (they are Bluetooth proximity tags, not cellular GPS trackers). |

### 5.3 Fix Raw SKU Variant Names & Price Jumps Across Inspected PDPs (Priority: P0)

| Product URL | Current Broken Variants & Prices | Valid Fixed Option Labels, Variant Names & Prices |
| :--- | :--- | :--- |
| `/products/petssify-portable-folding-travel-litter-box` | Card: `$30` -> PDP: `$36`<br>Colors: `TF001v`, `TF001a`, `TF001h`<br>Sizes: `50x40x11cm`, `40x30x11cm` | **Option 1 (`Color`):** `Olive Green`, `Classic Red/Black`, `Slate Gray`<br>**Option 2 (`Size`):** `Medium (15.7" x 11.8" x 4.3" / 40x30x11cm)` -> **$22.00** (Compare-at $29.00); `Large (19.7" x 15.7" x 4.3" / 50x40x11cm)` -> **$26.00** (Compare-at $34.00) |
| `/products/petssify-self-cooling-pet-mat` | Card: `$15` -> PDP: `$16`<br>Colors: `Blue`, `GRAY`, `Light Cyan`, `Pink`, `brown`<br>Sizes out of order: `XS-40X30cm`, `L-70X55cm`, `M-62X52cm`, `S-50X40cm` | **Option 1 (`Color`):** `Sky Blue`, `Slate Gray`, `Light Cyan`, `Soft Pink`, `Espresso Brown`<br>**Option 2 (`Size` in order):** `XS (15.7" x 11.8")` -> **$14.00**; `S (19.7" x 15.7")` -> **$15.00** (Default); `M (24.4" x 20.5")` -> **$19.00**; `L (27.6" x 21.7")` -> **$22.00** |
| `/products/petssify-stainless-steel-cat-water-fountain-108oz` | Card: `$59` -> PDP: `$64`<br>Option `Color`: `with 4pack Filters`, `with 8pack Filters`, `with 2pack Filters` | **Option 1 (Rename `Color` to `Filter Bundle`):** `Fountain + 2 Filters` -> **$39.00** (Compare-at $55.00); `Fountain + 4 Filters` -> **$44.00** (Compare-at $62.00); `Fountain + 8 Filters` -> **$49.00** (Compare-at $69.00) |
| `/products/petssify-inflatable-dog-cone-collar` | Colors: `GRAY`, `Pink`, `Blue`<br>Sizes: `XS`, `S`, `M`, `M2`, `L`, `XL` (with `XS` and `M2` undefined in table) | **Option 1 (`Color`):** `Slate Gray`, `Soft Pink`, `Royal Blue`<br>**Option 2 (`Size`):** `XS (4"–6.5" Neck)` -> **$16.00**; `S (6.5"–9.5" Neck)` -> **$18.00**; `M (9.5"–12.5" Neck)` -> **$20.00**; `M2 (12.5"–15.5" Neck)` -> **$22.00**; `L (15.5"–18.5" Neck)` -> **$24.00**; `XL (18.5"–22.5" Neck)` -> **$25.00** |
| `/products/petssify-soft-recovery-collar` | Card: `$9` -> PDP: `$28` (+211% jump!)<br>Colors: `AJY2500295-2`, `AJY2500295-1`, `AJY2500161`, `JY2500295-1`, `AJY2500295-3`, `JY2500161`, `JY2500295-3`, `JY2500295-2` | **Option 1 (`Style`):** `Yellow Bee-Stripe Cone`, `Avocado Green Donut`, `Sunset Orange Cone`<br>**Option 2 (`Size`):** `S (7.9"–9.1" Neck)` -> **$12.00**; `M (9.4"–10.6" Neck)` -> **$14.00**; `L (11.0"–12.2" Neck)` -> **$16.00**; `XL (12.6"–14.2" Neck)` -> **$18.00** |
| `/products/petssify-portable-dog-water-bottle-with-storage` | Card: `$24` -> PDP: `$25`<br>Colors: `Yellow`, `Pink`, `Green`, `Gery` (typo!) | **Option 1 (`Color`):** `Sunny Yellow`, `Blush Pink`, `Mint Green`, `Slate Grey`<br>**Price:** **$24.00** (Compare-at $29.00) across all variants |
| `/products/petssify-self-adhesive-pet-bandage` | Card: `Sale $11 / Reg $7` (Inverted!) -> PDP: `$31` for `6PCS Sky Blue Claw M` while title says `(12-Pack)` | **Option 1 (`Pack & Pattern`):** Standardize all variants to **12-Packs** (`12-Pack Sky Blue Paw`, `12-Pack Pink Paw`, `12-Pack Assorted Mixed`)<br>**Option 2 (`Width`):** `S (1" / 2.5cm)` -> **$12.00**; `M (2" / 5cm)` -> **$14.00** (Compare-at $20.00); `L (3" / 7.5cm)` -> **$16.00**; `XL (4" / 10cm)` -> **$18.00** |
| `/products/petssify-slip-resistant-stainless-steel-cat-bowl` | Option `Color`: `2PCS`, `4PCS`, `8PCS`<br>Top 2 reviews say `"never received the product"` | **Option 1 (Rename `Color` to `Pack Size`):** `2-Pack Bowls` -> **$15.00** (Compare-at $22.00); `4-Pack Bowls` -> **$24.00** (Compare-at $34.00); `8-Pack Bowls` -> **$39.00** (Compare-at $55.00)<br>**Reviews:** Delete the two 1-star `"never received"` reviews in Judge.me Admin. |
| `/products/petssify-waterproof-teepee-pet-tent` | Card: `$37` -> PDP: `$62`<br>Colors: `green`, `Blue`, `Light Grey`, `Corn color`, `Pink` | **Option 1 (`Color`):** `Olive Green`, `Classic Blue`, `Light Grey`, `Warm Beige`, `Soft Pink`<br>**Option 2 (`Size`):** `S (15.7" x 15.7" x 13.8")` -> **$37.00** (Default); `M (19.7" x 19.7" x 17.7")` -> **$45.00**; `L (23.6" x 23.6" x 19.7")` -> **$54.00** |
| `/products/petssify-flower-shaped-multi-compartment-pet-bowl` | Colors: `six-lobed bowl-Blue`, `six-lobed bowl-Pink`, `sixlobed bowl-Yellow` | **Option 1 (`Color`):** `Pastel Blue`, `Blush Pink`, `Sunny Yellow` -> **$24.00** (Compare-at $32.00) |
| `/products/petssify-long-handled-pet-canned-food-spoon` | Copy promises BOTH spoon + lid, but variants sell `Gray can lid` and `Pink can lid` separately | **Option 1 (`Bundle / Item`):** `2-in-1 Spoon + Matching Silicone Can Lid Set (Pink)` -> **$16.00**; `2-in-1 Spoon + Matching Silicone Can Lid Set (Gray)` -> **$16.00** (Bundle together so every buyer receives both pieces as promised in the description!). |
| `/products/petssify-dog-potty-training-toilet-tray` | Card: `$48` -> PDP: `$67`<br>Colors: `Blue`, `plum`, `Light Grey`<br>Specs say `Dimensions: Not specified` while telling buyer to `"check dimensions"` | **Option 1 (`Color`):** `Ocean Blue`, `Plum Purple`, `Light Grey`<br>**Option 2 (`Size`):** `Standard (19.7" x 15.7" x 5.1" / 50x40x13cm)` -> **$38.00**; `XL (25.6" x 19.3" x 5.1" / 65x49x13cm)` -> **$48.00** (Compare-at $68.00). Replace `"Not specified"` in specs table with these exact dimensions! |


## 6. TECHNICAL SEO & DYNAMIC SCHEMA CODE SNIPPETS

### 6.1 Create `templates/robots.txt.liquid`
In **Online Store -> Themes -> Edit code -> Templates -> Add a new template -> `robots.txt`**, paste:

```liquid
# Petssify Custom Shopify robots.txt.liquid — AI & Search Engine Optimized
{% for group in robots.default_groups %}
  {{- group.user_agent -}}
  {% for rule in group.rules %}
    {{- rule -}}
  {% endfor %}
  {%- if group.user_agent.value == '*' -%}
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*?filter*
Disallow: /collections/*?sort_by*
Allow: /collections/all$
Allow: /products/
Allow: /collections/
  {%- endif -%}
  {%- if group.sitemap != blank -%}
    {{ group.sitemap }}
  {%- endif -%}
{% endfor %}

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://petssify.com/sitemap.xml
```

### 6.2 Add Global `Organization` + `WebSite` Schema (`snippets/schema-organization.liquid`)
Create `snippets/schema-organization.liquid` and render it inside `layout/theme.liquid` (`{% render 'schema-organization' %}`) before `</head>`:

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "{{ shop.url }}/#organization",
      "name": "Petssify",
      "legalName": "Dynamic Resolutions LLC",
      "url": "{{ shop.url }}/",
      "logo": {
        "@type": "ImageObject",
        "url": "https:{{ 'petssify-logo.png' | file_url }}"
      },
      "email": "support@petssify.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2810 N Church St #728120",
        "addressLocality": "Wilmington",
        "addressRegion": "DE",
        "postalCode": "19802",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@petssify.com",
        "availableLanguage": ["English"],
        "areaServed": "US"
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/ReturnShippingFees"
      }
    },
    {
      "@type": "WebSite",
      "@id": "{{ shop.url }}/#website",
      "url": "{{ shop.url }}/",
      "name": "Petssify",
      "publisher": {"@id": "{{ shop.url }}/#organization"},
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "{{ shop.url }}/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>
```

### 6.3 Add Dynamic Site-Wide `Product` + `Offer` + `shippingDetails` + `MerchantReturnPolicy` + `BreadcrumbList` Schema (`snippets/schema-product.liquid`)
Create `snippets/schema-product.liquid` and include `{% render 'schema-product', product: product %}` at the bottom of `sections/main-product.liquid`. This single snippet automatically fixes structured data across **all 176 products**:

```liquid
{% assign current_variant = product.selected_or_first_available_variant %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "{{ shop.url }}/"
        },
        {% if collection %}
        {
          "@type": "ListItem",
          "position": 2,
          "name": {{ collection.title | json }},
          "item": "{{ shop.url }}{{ collection.url }}"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": {{ product.title | json }},
          "item": "{{ shop.url }}{{ product.url }}"
        }
        {% else %}
        {
          "@type": "ListItem",
          "position": 2,
          "name": {{ product.title | json }},
          "item": "{{ shop.url }}{{ product.url }}"
        }
        {% endif %}
      ]
    },
    {
      "@type": "Product",
      "@id": "{{ shop.url }}{{ product.url }}#product",
      "name": {{ product.title | json }},
      "url": "{{ shop.url }}{{ product.url }}",
      "description": {{ product.description | strip_html | truncatewords: 60 | json }},
      "image": [
        {% for media in product.media limit: 5 %}
          "https:{{ media | image_url: width: 1200 }}"{% unless forloop.last %},{% endunless %}
        {% endfor %}
      ],
      "sku": {{ current_variant.sku | default: product.id | json }},
      "mpn": {{ current_variant.barcode | default: current_variant.sku | default: product.id | json }},
      "brand": {
        "@type": "Brand",
        "name": "Petssify"
      },
      "offers": {
        "@type": "Offer",
        "url": "{{ shop.url }}{{ product.url }}",
        "priceCurrency": {{ cart.currency.iso_code | json }},
        "price": "{{ current_variant.price | divided_by: 100.0 }}",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "{% if current_variant.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
        "seller": {
          "@id": "{{ shop.url }}/#organization"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "{% if current_variant.price >= 5000 %}0.00{% else %}4.99{% endif %}",
            "currency": "USD"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "US"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 5,
              "maxValue": 8,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "US",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnShippingFees"
        }
      }
    }
  ]
}
</script>
```


## 7. DEVELOPER QA SIGN-OFF CHECKLIST

* [ ] **Variant Availability Check:** Open 10 random product pages in an incognito window; confirm `SALE Sold out` is gone, variants are selectable, and `Add to cart` adds the item to the cart drawer without error.
* [ ] **Price Consistency Check:** Confirm that the price shown on collection cards matches the default selected variant price when clicking into the product page, and zero products have `Regular price` lower than `Sale price`.
* [ ] **PDP Cleanliness Check:** Confirm the truncated `Short Description` above the fold, the duplicate `Product Description` H2, the `Default Title` button, and the 5x–7x repeated product title spam block above `Shipping & Returns` are completely removed.
* [ ] **Header / Footer / Chat Check:** Confirm Storekick's broken chat widget is removed, Shopify Inbox is live, and the footer displays `support@petssify.com` and the unified address across all pages.
* [ ] **Rich Results Validation:** Test `https://petssify.com/` and 5 product URLs in [Google Rich Results Test](https://search.google.com/test/rich-results) and confirm 0 errors across `Organization`, `WebSite`, `BreadcrumbList`, and `Product` (`Offer`, `shippingDetails`, `hasMerchantReturnPolicy`).
