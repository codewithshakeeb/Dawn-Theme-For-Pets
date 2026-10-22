# Petssify — Shopify Admin Tasks Checklist

This document details all **manual actions** that must be executed in the **Shopify Admin** or third-party app dashboards (Shopify Admin, Judge.me, Shopify Search & Discovery). These cannot be automated through theme Liquid/CSS code alone because they reside in Shopify's database (products, inventory, redirects, collections, app configurations).

Tasks are ordered strictly by priority: **P0 (Critical / Legal / Store Blocker)** → **P1 (Navigation / Taxonomy / High Value)** → **P2 (SEO Copy & Enrichment)**.

---

## 🚨 PRIORITY P0: CRITICAL COMPLIANCE, INVENTORY & CATALOG FIXES

### 1. Unpublish 8 High-Risk & Compliance-Violating Products Immediately
* **Location:** `Shopify Admin -> Products`
* **Action:** Set product status from `Active` to `Draft` (or delete):
  - [ ] **`Petssify Heart-Shaped Ceramic Cat Bowl`**
    * *Reason:* Trademark infringement risk — photo and alt text display **"LE CREUSET"** embossed on the rim.
  - [ ] **`Petssify Intelligent Pet Deodorizer – Ozone & UV Air Purifier`**
    * *Reason:* Severe pet health hazard — emits toxic ozone gas in confined feline litter spaces without CARB/EPA certification.
  - [ ] **`Petssify Cat Taurine Powder – 99.9% Pure Supplement`**
    * *Reason:* Unverified white-label Chinese ingestible jar (`Kriath`/`Kriach`), 12 broken raw variant codes (`2pcs 1`, `A`, `B`, `C`), arbitrary $27 to $62 price jumps, no FDA/NASC verification.
  - [ ] **`Petssify Dog Probiotic Soft Granules`**
    * *Reason:* Direct packaging mislabel — jar photo explicitly says `"Turkey Tail"` mushroom, while title says `"Dog Probiotic Soft Granules"`.
  - [ ] **`Petssify Cranberry Bladder Health Drops`**
    * *Reason:* Unverified liquid ingestible supplement with 0 reviews, no active mg/ml panel, no lot/batch/expiry data.
  - [ ] **`Petssify Yegbong Pet Dental Toothpaste`**
    * *Reason:* Unverified grey-market chemical brand (`Yegbong`) in title/H1 with no ingredient safety sheet.
  - [ ] **`Petssify Pet Dental Oral Gel / Gel Pen`**
    * *Reason:* Ingestible chemical tartar remover with no veterinary safety or VOHC verification.
  - [ ] **`Petssify Waterproof Weekly Pill Organizer`**
    * *Reason:* Human elderly care product (`"caring for an aging parent"`) erroneously categorized as pet travel supplies.

---

### 2. Uninstall Storekick & Enable Shopify Inbox
* **Location:** `Shopify Admin -> Apps` & `Online Store -> Themes -> Customize -> App embeds`
* **Actions:**
  - [ ] Uninstall the **Storekick** app (or turn off its App Embed toggle) to eliminate runtime Javascript console errors and the failing `Chat isn't available right now` banner.
  - [ ] Install **Shopify Inbox** (free native app by Shopify).
  - [ ] Configure Shopify Inbox:
    * Enable automated instant answers (Order Status lookup, Shipping FAQ, Returns FAQ).
    * Configure offline message capture routing to `support@petssify.com`.

---

### 3. Fix Site-Wide "Sold Out" Lockout (Bulk Inventory Update)
* **Location:** `Shopify Admin -> Products -> Inventory` (or select all products -> Bulk Edit)
* **Problem:** Every product currently displays `SALE Sold out` and disables variant selectors because inventory quantity is set to `0`.
* **Action:**
  - [ ] For all dropshipped items: Check the box **"Continue selling when out of stock"** on all active product variants.
  - [ ] For tracked warehouse stock: Set available quantity > `50` at the active fulfillment location.

---

### 4. Fix Wrong Product Media & Leaked Supplier Names
* **Location:** `Shopify Admin -> Products`
* **Actions:**
  - [ ] **`Petssify Pet Nail Clipper with Safety Guard`:** Delete the two photos of the *beige grooming brush* and upload actual stainless steel nail clipper photos with accurate alt text.
  - [ ] **`Petssify Pet Ear Cleaning Wipes – 50 Count`:** Delete Image #2 (it erroneously shows dog teeth tartar wipes instead of ear wipes).
  - [ ] **`Petssify Quiet Pet Nail Grinder – 2 LED Lights`:** Delete Image #6 (it shows a 2-in-1 combo unit while the product sold is a pure grinder).
  - [ ] **`Petssify Professional Dog Nail Grinder`:** Update Image #2 alt text from `Pet training device with accessories on a white background` to `Petssify 2-Speed Professional Dog Nail Grinder with charging cord and diamond bit`.
  - [ ] **Rename Leaked Supplier Brand Names in Titles:**
    * [ ] Rename `Petssify Oitabi Pet Grooming Comb Set` → `Petssify 5-Piece Stainless Steel Pet Grooming Comb Set for Dogs & Cats`
    * [ ] Rename `Petssify SucceBuy 2800W Pet Dryer` → `Petssify 2800W High-Velocity Pet Grooming Dryer – Adjustable Speed & Heat with 4 Nozzles`
    * [ ] Rename `Petssify DualPet Pet Grooming Glove` → `Petssify Silicone Pet Grooming & Deshedding Massage Glove for Dogs & Cats`
    * [ ] Rename `Petssify 39 Double Row Undercoat Rake` → `Petssify Double-Row 39-Pin Rotating Undercoat Rake for Dogs & Cats`
    * [ ] Rename `Petssify Edible Silicone Slow Feeder Bowl` → `Petssify Food-Grade Silicone Slow Feeder Bowl – Non-Slip Pet Food Mat`
    * [ ] Rename `Petssify Waterproof Pet Grooming Apron – Adjustable Kitchen & BBQ Bib` → `Petssify Waterproof Pet Grooming Apron – Adjustable Bathing & Trimming Smock with Pockets`
    * [ ] Rename `Petssify Bluetooth Pet GPS Tracker` & `Remote Pet GPS Tracker` → Rename to `Bluetooth Anti-Loss Collar Tag` and `Waterproof Apple Find My Collar Tag` (they use Bluetooth BLE, not cellular GPS).
    * [ ] Update alt text on `Petssify Pet Nail Grinder – 7-Speed Rechargeable`: Remove `ROJECO` reference.

---

### 5. Fix Raw SKU Codes, Inverted Pricing & Variant Options
* **Location:** `Shopify Admin -> Products -> [Product Name] -> Variants`
* **Actions:**
  - [ ] **`Petssify Portable Folding Travel Litter Box` (`/products/petssify-portable-folding-travel-litter-box`):**
    * Rename Option 1 (`Color`): `Olive Green`, `Classic Red/Black`, `Slate Gray` (replace `TF001v`, `TF001a`, `TF001h`).
    * Rename Option 2 (`Size`):
      * `Medium (15.7" x 11.8" x 4.3" / 40x30x11cm)` → Price: **$22.00** (Compare-at: **$29.00**)
      * `Large (19.7" x 15.7" x 4.3" / 50x40x11cm)` → Price: **$26.00** (Compare-at: **$34.00**)
  - [ ] **`Petssify Self-Cooling Pet Mat` (`/products/petssify-self-cooling-pet-mat`):**
    * Rename Colors: `Sky Blue`, `Slate Gray`, `Light Cyan`, `Soft Pink`, `Espresso Brown`.
    * Order Sizes properly: `XS (15.7" x 11.8")` ($14.00), `S (19.7" x 15.7")` ($15.00 - default), `M (24.4" x 20.5")` ($19.00), `L (27.6" x 21.7")` ($22.00).
  - [ ] **`Petssify Stainless Steel Cat Water Fountain 108oz` (`/products/petssify-stainless-steel-cat-water-fountain-108oz`):**
    * Rename Option 1 to **`Filter Bundle`** (currently called `Color`):
      * `Fountain + 2 Filters` → **$39.00** (Compare-at: **$55.00**)
      * `Fountain + 4 Filters` → **$44.00** (Compare-at: **$62.00**)
      * `Fountain + 8 Filters` → **$49.00** (Compare-at: **$69.00**)
  - [ ] **`Petssify Inflatable Dog Cone Collar` (`/products/petssify-inflatable-dog-cone-collar`):**
    * Set Colors: `Slate Gray`, `Soft Pink`, `Royal Blue`.
    * Set Sizes & Neck Ranges:
      * `XS (4"–6.5" Neck)` → **$16.00**
      * `S (6.5"–9.5" Neck)` → **$18.00**
      * `M (9.5"–12.5" Neck)` → **$20.00**
      * `M2 (12.5"–15.5" Neck)` → **$22.00**
      * `L (15.5"–18.5" Neck)` → **$24.00**
      * `XL (18.5"–22.5" Neck)` → **$25.00**
  - [ ] **`Petssify Soft Recovery Collar` (`/products/petssify-soft-recovery-collar`):**
    * Fix raw factory codes (`AJY2500295-2`, etc.) and the +211% price jump:
    * Option 1 (`Style`): `Yellow Bee-Stripe Cone`, `Avocado Green Donut`, `Sunset Orange Cone`
    * Option 2 (`Size`): `S (7.9"–9.1" Neck)` ($12.00), `M (9.4"–10.6" Neck)` ($14.00), `L (11.0"–12.2" Neck)` ($16.00), `XL (12.6"–14.2" Neck)` ($18.00).
  - [ ] **`Petssify Portable Dog Water Bottle with Storage` (`/products/petssify-portable-dog-water-bottle-with-storage`):**
    * Fix typo in Color: `Gery` → `Slate Grey`, plus `Sunny Yellow`, `Blush Pink`, `Mint Green`.
    * Align price to flat **$24.00** (Compare-at: **$29.00**).
  - [ ] **`Petssify Self-Adhesive Pet Bandage` (`/products/petssify-self-adhesive-pet-bandage`):**
    * Fix inverted pricing (card currently shows Sale $11 / Reg $7):
    * Standardize to 12-Packs: `S (1")` ($12.00), `M (2")` ($14.00 / Compare $20.00), `L (3")` ($16.00), `XL (4")` ($18.00).
  - [ ] **`Petssify Slip-Resistant Stainless Steel Cat Bowl` (`/products/petssify-slip-resistant-stainless-steel-cat-bowl`):**
    * Rename Option 1 from `Color` to `Pack Size`: `2-Pack Bowls` ($15.00), `4-Pack Bowls` ($24.00), `8-Pack Bowls` ($39.00).
  - [ ] **`Petssify Waterproof Teepee Pet Tent` (`/products/petssify-waterproof-teepee-pet-tent`):**
    * Set default variant to `S` at **$37.00** (matches collection card), `M` at **$45.00**, `L` at **$54.00**.
  - [ ] **`Petssify Long-Handled Pet Canned Food Spoon` (`/products/petssify-long-handled-pet-canned-food-spoon`):**
    * Product description promises both spoon + matching lid; bundle them together so customers receive both: `2-in-1 Spoon + Matching Silicone Can Lid Set (Pink)` ($16.00), `(Gray)` ($16.00).
  - [ ] **`Petssify Dog Potty Training Toilet Tray` (`/products/petssify-dog-potty-training-toilet-tray`):**
    * Add exact dimensions to variant names: `Standard (19.7" x 15.7" x 5.1" / 50x40x13cm)` ($38.00), `XL (25.6" x 19.3" x 5.1" / 65x49x13cm)` ($48.00 / Compare $68.00).

---

### 6. Delete Fake / Malicious Reviews in Judge.me
* **Location:** `Judge.me Product Reviews App -> Reviews -> All Reviews`
* **Action:**
  - [ ] On product `Petssify Slip-Resistant Stainless Steel Cat Bowl`: Locate and delete the two 1-star reviews stating `"never received the product"` (likely supplier scrapings from a dropship source).

---

## ⚡ PRIORITY P1: REDIRECTS, TAXONOMY & SEARCH FILTERS

### 7. Add 5 URL 301 Redirects
* **Location:** `Shopify Admin -> Online Store -> Navigation -> View URL redirects`
* **Action:** Click **Create URL redirect** and add the following 5 mappings:
  - [ ] `/collections/cat-beds` → `/collections/cat-beds-comfort`
  - [ ] `/collections/cat-toys` → `/collections/cat-toys-enrichment`
  - [ ] `/collections/cats-toys-entertainment` → `/collections/cat-toys-enrichment`
  - [ ] `/collections/dog-training-accessories` → `/collections/dog-walking-training`
  - [ ] `/collections/collars-harnesses` → `/collections/collars-harnesses-leashes`

---

### 8. Fix Broken Collection Product Tagging / Inclusion Rules
* **Location:** `Shopify Admin -> Products -> Collections`
* **Actions:**
  - [ ] **`/collections/water-fountains`:** Add `Petssify 2.2L Stainless Steel Cat Fountain – Silent Pump & Visual Window` to this collection.
  - [ ] **`/collections/feeding`:** Convert to an Automated Smart Collection with rule: Product Type is any of `Bowls & Feeders`, `Slow Feeders`, `Water Fountains`, or tagged `feeding`.
  - [ ] **`/collections/collars-harnesses-leashes`:**
    * Add `Dog Harness with AirTag Holder`, `LED Collar with AirTag Holder`, `5m Retractable Dog Leash with LED Flashlight`, and `Heavy Duty Nylon Dog Leash – 5M/10M/15M`.
    * Remove `Inflatable Dog Cone Collar` (move to `dog-health-wellness` and `health-recovery`).
  - [ ] **`/collections/nail-care`:** Remove fur brushes (`Magic Pet Grooming Comb` and `Self-Cleaning Pet Grooming Brush`) from nail care; keep them in `deshedding-brushes`.
  - [ ] **`/collections/cat` & `/collections/cat-travel`:** Remove dog-only items (`Portable Dog Water Bottle with Storage`, `Waterproof Chew-Proof Dog Mat`, `Dog Anxiety Vest`, `Natural Dog Paw Balm`) and `33LB Collapsible Pet Food Storage Container`.

---

### 9. Set Store Preferences SEO Meta Tags
* **Location:** `Shopify Admin -> Online Store -> Preferences`
* **Actions:**
  - [ ] **Homepage Title:** `Petssify | Dog & Cat Supplies with Verified Sizing & Specs` (58 chars)
  - [ ] **Homepage Meta Description:** `Shop dog and cat supplies at Petssify with exact breed sizing, material specs, and weight limits on every page. Free US shipping over $50 & 30-day returns!` (155 chars)

---

### 10. Enable Faceted Product Filters in Shopify Search & Discovery App
* **Location:** `Shopify Admin -> Apps -> Shopify Search & Discovery -> Filters`
* **Actions:**
  - [ ] Ensure the following filter dimensions are active on collection pages:
    * **Availability**
    * **Price**
    * **Product Type**
    * **Pet Type (Dog / Cat)** (via tags or standard category metafield)
    * **Size** (Variant option)
    * **Material** (Metafield or tag)

---

### 11. Re-upload Clean Banner Images with Proper File Names
* **Location:** `Shopify Admin -> Content -> Files` or Collection Edit pages
* **Action:**
  - [ ] Replace images named `Add_a_subheading_33_...png` and `Gemini_Generated_Image_...png` with clean, compressed `.webp` files (e.g. `pet-bathing-supplies-banner.webp`, `pet-feeding-supplies-banner.webp`) and descriptive alt text.

---

## 📝 PRIORITY P2: COLLECTION SEO INTROS & META TAGS

Paste these into each collection's **Title / Description** and the **Search engine listing (Edit website SEO)** fields (`Shopify Admin -> Products -> Collections -> [Collection]`).

| Status | Collection Handle | SEO Title (50–60 Chars) | SEO Meta Description (140–160 Chars) | Collection Description Summary |
| :---: | :--- | :--- | :--- | :--- |
| [ ] | `/collections/dogs` | `Dog Supplies, Toys, Grooming, Harnesses & Travel Gear \| Petssify` | `Shop vet-informed dog supplies at Petssify. Compare interactive puzzle toys, no-pull harnesses, grooming clippers, slow feeders, and travel gear with exact breed sizing.` | Durable, spec-verified dog supplies engineered for everyday routines across puppies, adult breeds, and senior dogs. Includes exact dimensions, weight capacities, and coat-type suitability. |
| [ ] | `/collections/cat` | `Cat Supplies, Scratchers, Fountains & Interactive Toys \| Petssify` | `Shop cat essentials at Petssify. Find 304 stainless steel water fountains, sisal scratchers, whisker-friendly bowls, and interactive cat toys with full specs.` | Indoor cat supplies designed around feline instincts, hydration, and stress-free home care. 304 stainless steel fountains, tilted anti-vomiting bowls, and sisal posts. |
| [ ] | `/collections/best-sellers` | `Best-Selling Dog & Cat Supplies – Top-Rated Pet Gear \| Petssify` | `Browse Petssify's best-selling dog and cat essentials. Compare customer-favorite cooling mats, recovery cones, nail grinders, and waterproof sofa protectors.` | 17 everyday essentials chosen by pet parents for measurable utility: ice-silk cooling mats, inflatable recovery collars, quiet LED nail grinders, and dual leashes. |
| [ ] | `/collections/feeding` | `Dog & Cat Feeding Supplies – Bowls, Feeders & Storage \| Petssify` | `Shop mess-free pet feeding supplies at Petssify. Find automatic timed feeders, airtight dry food bins, slow-feed puzzle bowls, and travel water bottles.` | Programmable timed dual-bowl feeders, airtight kibble bins with moisture seals, slow-feeding puzzle bowls, and leak-proof travel bottles. |
| [ ] | `/collections/bowls-feeders` | `Pet Bowls, Elevated Stands & Automatic Feeders \| Petssify` | `Shop stainless steel cat bowls, 15° tilted raised feeders, timed kibble dispensers, and 33lb airtight food bins for dogs and cats at Petssify.` | Whisker-friendly shallow stainless steel dishes, 15-degree tilted raised stands, gravity-fed stations, and 33-pound wheeled food storage bins. |
| [ ] | `/collections/slow-feeders` | `Slow Feeder Dog Bowls & Silicone Lick Mats for Pets \| Petssify` | `Prevent gulping, bloat, and vomiting with Petssify slow feeder bowls and food-grade silicone lick mats for dogs and cats. Dishwasher-safe & BPA-free.` | Food-grade silicone mats and maze-ridge bowls that extend mealtime up to 5x while reducing regurgitation and canine bloat risk. |
| [ ] | `/collections/water-fountains` | `Stainless Steel Cat & Dog Water Fountains – Silent Pump \| Petssify` | `Encourage healthy hydration with ultra-silent (<=28dB) 304 stainless steel cat and dog water fountains featuring quadruple carbon filtration at Petssify.` | Corrosion-resistant 304 stainless steel reservoirs (2.2L to 3.2L) with whisper-quiet <=28dB 5V USB pumps and multi-stage activated carbon filters. |
| [ ] | `/collections/dog-feeding` | `Dog Bowls, Slow Feeders, Elevated Stands & Scoop Scales \| Petssify` | `Shop dog feeding essentials at Petssify: anti-gulp maze bowls, raised double stainless steel stands, digital food measuring scoops, and waterproof mats.` | Anti-choke slow feeders, digital LED gram-scale measuring scoops for portion control, absorbent silicone mats, and raised double stands. |
| [ ] | `/collections/cat-feeding` | `Cat Bowls, Whisker-Friendly Dishes & Tilted Stands \| Petssify` | `Prevent whisker fatigue and post-meal vomiting with shallow stainless steel cat bowls, 15° tilted triple-bowl stands, and 3.2L fountains at Petssify.` | 2cm low-profile stainless steel dishes, 15-degree tilted bamboo triple-bowl stands, and stainless steel fountains that prevent whisker fatigue and feline acne. |
| [ ] | `/collections/grooming-care` | `Pet Grooming Supplies – Brushes, Clippers & Bath Tools \| Petssify` | `Groom your dog or cat safely at home with Petssify deshedding rakes, low-noise LED nail grinders, grooming hammocks, and hypoallergenic bath tools.` | Professional-grade home grooming tools: double-row undercoat rakes, quiet rechargeable clippers, LED nail grinders, and bathing restraints. |
| [ ] | `/collections/dog-grooming-care` | `Dog Grooming Tools – Clippers, Deshedding Brushes & Nail Grinders \| Petssify` | `Shop dog grooming supplies at Petssify: low-noise clippers for thick coats, vacuum shedding brushes, LED nail grinders, and nail-trimming hammocks.` | Specialized tools for double-coated, curly, and short-haired dogs: low-noise clippers, vacuum deshedding brushes, 2-LED grinders, and hammocks. |
| [ ] | `/collections/cat-grooming-care` | `Cat Grooming Supplies – Self-Cleaning Brushes, Wraps & Nail Care \| Petssify` | `Stress-free cat grooming tools at Petssify: self-cleaning slicker brushes, steam spray combs, anti-bite calming wraps, and quiet LED nail grinders.` | One-click self-cleaning slicker brushes, misting steam brushes that reduce static flyaways, breathable mesh shower bags, and anti-scratch wraps. |
| [ ] | `/collections/deshedding-brushes` | `Dog & Cat Deshedding Brushes, Undercoat Rakes & Dematting Combs \| Petssify` | `Control loose fur and tangles with Petssify double-row undercoat rakes, stainless steel mat splitters, steam brushes, and silicone grooming gloves.` | Rounded-pin rotating undercoat rakes for double coats, stainless steel dematting combs for long hair, and gentle silicone massage gloves. |
| [ ] | `/collections/nail-care` | `Dog & Cat Nail Grinders, LED Clippers & Scratch Boards \| Petssify` | `Trim pet nails safely without hitting the quick. Shop dual-LED quiet electric nail grinders, safety-guard clippers, and wooden scratch boards at Petssify.` | Diamond-bit electric nail grinders with dual LED headlights, clippers with depth safety guards, sandpaper scratch boards, and grooming hammocks. |
| [ ] | `/collections/bathing-cleaning` | `Pet Bathing Supplies – Dryers, Sprayers, Towels & Paw Cleaners \| Petssify` | `Make bath time faster with Petssify high-velocity pet dryers, electric foam soap dispensers, waterproof ear covers, and portable paw washing cups.` | Adjustable-temp high-velocity pet dryers, automatic soap foaming dispensers, calming ear snoods, and ultra-absorbent microfiber bathrobes. |
| [ ] | `/collections/dental-care` | `Dog & Cat Dental Care – Triple Toothbrushes, Finger Brushes & Scalers \| Petssify` | `Support fresh breath and tartar control with 3-sided dog toothbrushes, food-grade silicone 360° finger brushes, dental chew toys, and oral care kits.` | 360-degree food-grade silicone finger brushes, triple-head toothbrushes, textured dental rubber chew toys, and ultrasonic tartar cleaners. |
| [ ] | `/collections/grooming-accessories` | `Pet Grooming Shears, Calming Wraps, Aprons & Tool Organizers \| Petssify` | `Shop curved stainless steel dog grooming scissors, self-adherent cat calming wraps, waterproof grooming aprons, and storage bags at Petssify.` | 4-piece rounded-tip stainless steel scissors, self-adherent anti-scratch calming wraps, waterproof grooming aprons, and tick removal sets. |
| [ ] | `/collections/toys` | `Interactive Dog & Cat Toys – Puzzle Feeders, Chew Toys & Teasers \| Petssify` | `Keep indoor dogs and cats active with 31 enrichment toys: treat-dispensing puzzles, snuffle mats, automatic rolling balls, and catnip bird teasers.` | Interactive toys categorized by play style (foraging, sliding puzzles, rubber chew toys, motion-activated rolling balls) with explicit chew-strength flags. |
| [ ] | `/collections/dog-toys-enrichment` | `Dog Puzzle Toys, Snuffle Mats, Ball Launchers & Chew Toys \| Petssify` | `Challenge your dog's mind with interactive treat puzzle feeders, foraging sniffing pads, automatic fetch ball launchers, and durable chew toys at Petssify.` | Multi-slider IQ treat boards, layered fleece snuffle mats, press-to-dispense slow feeders, telescopic flirt poles, and automatic ball launchers. |
| [ ] | `/collections/cat-toys-enrichment` | `Interactive Cat Toys – Chirping Birds, Puzzle Boards & Tunnels \| Petssify` | `Trigger your indoor cat's hunting instincts with chirping bird teasers, 14-compartment treat puzzles, wooden ball track towers, and crinkle tunnels.` | Chirping bird plush lures, suction-cup steel wire feather wands, 3-level wooden ball tracks, 14-compartment puzzle boards, and crinkle tunnels. |
| [ ] | `/collections/cat-scratching-furniture` | `Cat Scratching Posts, Sisal Boards, Sofa Protectors & Cat Trees \| Petssify` | `Protect your couch with Petssify natural sisal scratching posts, wall-mounted scratch stations, L-shaped scratcher beds, and multi-level cat trees.` | Multi-level cat trees, trimmable adhesive sofa protector shields, solid wood V-frame sisal balls, wall-mounted sisal pads, and corrugated scratchers. |
| [ ] | `/collections/dog-beds-comfort` | `Orthopedic Dog Beds, Elevated Cooling Cots & Waterproof Couch Blankets \| Petssify` | `Give your dog restorative rest with 3D orthopedic foam crate mats, raised mesh summer cots, ice-silk cooling pads, and waterproof sofa protectors.` | 3D orthopedic egg-crate foam crate mats, raised outdoor cooling cots, ice-silk self-cooling pads, and reversible waterproof sofa blankets. |
| [ ] | `/collections/cat-beds-comfort` | `Cat Cave Beds, Suction Window Hammocks & Desk Perches \| Petssify` | `Shop cozy cat beds at Petssify: enclosed plush anxiety caves, heavy-duty suction cup window perches, 360° rotatable desk hammocks, and radiator beds.` | 360-degree clamp-on desk hammocks, heavy-duty suction-cup window perches, enclosed plush thermal caves, and low-voltage warming pads. |
| [ ] | `/collections/dog-walking-training` | `Dog Walking & Training Gear – No-Pull Harnesses, Dual Leashes & Pouches \| Petssify` | `Walk and train with total control: 3M dual retractable LED leashes, reflective AirTag harnesses, 15m recall leads, treat pouches, and indoor potty trays.` | Tangle-free 3M dual retractable leashes with LED lights, no-pull reflective vests with AirTag slots, 15m recall leads, and magnetic treat pouches. |
| [ ] | `/collections/collars-harnesses-leashes` | `No-Pull Dog Harnesses, Reflective Vests & Retractable Leashes \| Petssify` | `Shop escape-proof dog harnesses, heavy-duty training vests, and LED dual retractable leashes with reflective stitching and chest sizing charts.` | Breathable mesh no-pull vests, waterproof AirTag collars, heavy-duty training harnesses with top handles, and chest-load-distributing leashes. |
| [ ] | `/collections/dog-travel-outdoor` | `Dog Travel Gear – SUV Ramps, Car Seat Hammocks, Carriers & Water Bottles \| Petssify` | `Travel safely with your dog: foldable aluminum SUV stairs, waterproof back-seat hammocks, airline-approved backpack carriers, and 2-in-1 water bottles.` | Wide-tread folding aluminum SUV stairs, waterproof rear-seat hammocks, breathable carrier backpacks, and leak-proof 2-in-1 travel water bottles. |
| [ ] | `/collections/cat-travel` | `Cat Travel Carriers, Folding Litter Boxes & Pop-Up Tents \| Petssify` | `Take stress out of vet visits and road trips with soft-sided cat carrier backpacks, leak-proof folding travel litter boxes, and pop-up carrier tents.` | Soft-sided carrier backpacks, pop-up carrier tents, and waterproof folding nylon litter pans that pack flat into carry-on luggage. |
| [ ] | `/collections/car-travel` | `Dog Car Seat Covers, Back-Seat Hammocks & SUV Cargo Mats \| Petssify` | `Protect your vehicle upholstery and keep pets secure with waterproof dog car hammock seat covers, back-seat nest extenders, and non-slip SUV trunk mats.` | Quilted waterproof rear-seat hammocks, structured back-seat extender beds, bungee seat-belt tethers, and non-slip SUV trunk cargo mats. |
| [ ] | `/collections/travel-accessories` | `Portable Pet Travel Accessories – Folding Litter Pans, Water Bottles & Kits \| Petssify` | `Pack smart for pet road trips and flights: portable dog water bottles, collapsible cat litter boxes, 61-piece pet first aid kits, and folding SUV steps.` | Leak-proof 2-in-1 travel bottles, collapsible litter pans, 61-piece EVA emergency pet first-aid kits, and folding car steps. |
| [ ] | `/collections/dog-health-wellness` | `Dog Health, Recovery Cones, First Aid Kits & Calming Vests \| Petssify` | `Support dog recovery and home care with soft recovery donuts, 61-piece first aid kits, non-contact ear thermometers, calming vests, and paw balms.` | Soft inflatable recovery donuts, 2-in-1 pill syringes, 1-second infrared ear thermometers, 61-piece first-aid kits, and calming vests. |
| [ ] | `/collections/cat-health-wellness` | `Cat Health & Recovery – Soft Cones, Calming Vests & Home Care \| Petssify` | `Shop gentle feline health and recovery supplies: soft Elizabethan cones, calming thunder vests, pill dispensers, infrared ear thermometers, and tear balm.` | Lightweight padded Elizabethan recovery cones, drug-free calming vests, soft-tip 2-in-1 medicine syringes, and non-contact infrared thermometers. |
| [ ] | `/collections/health-recovery` | `Pet Recovery & Home Care Supplies – Syringes, Thermometers & First Aid \| Petssify` | `Equip your home pet care kit with 61-piece pet first aid bags, infrared ear thermometers, soft-tip pill syringes, and calming recovery essentials.` | Comprehensive first-aid and post-op care hub: non-invasive infrared thermometers, soft-tip syringes, cohesive paw wraps, and 61-piece first aid bags. |

---

### 12. Active Customer Support Phone Number
* [ ] Provide an active US customer support phone number to replace the placeholder `+1 (800) [Insert Active US Support Number]` in the theme footer and contact page.
