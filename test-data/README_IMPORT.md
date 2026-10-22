# Petssify Test Products Import & Setup Guide

This directory contains the test products CSV for validating in-stock, out-of-stock, and mixed-variant product page (PDP) and catalog card states across the Petssify Shopify store.

---

## 1. Products Included in `petssify_test_products.csv`

1. **Product 1 — In Stock (with Mixed-Variant Edge Case)**
   - **Handle:** `petssify-test-in-stock-slow-feeder-bowl`
   - **Title:** Petssify Food-Grade Silicone Slow Feeder Bowl – Non-Slip Pet Food Mat
   - **Options:** 
     - Color: `Sage Green`, `Blush Pink`
     - Size: `Small 7.5" / 19cm` ($18.00 / compare-at $26.00), `Large 10" / 25.5cm` ($22.00 / compare-at $30.00)
   - **Inventory:**
     - Sage Green / Small: 25 in stock
     - Sage Green / Large: 25 in stock
     - Blush Pink / Small: 25 in stock
     - **Blush Pink / Large: 0 in stock (SOLD OUT)** — *Edge case for testing disabled variant pill while product remains purchasable in other variants.*
   - **Tags:** `dog`, `cat`, `slow-feeders`, `feeding`, `best-sellers`

2. **Product 2 — Out of Stock (100% Sold Out)**
   - **Handle:** `petssify-test-out-of-stock-cat-fountain`
   - **Title:** Petssify 2.2L Stainless Steel Cat Water Fountain – Silent Pump & Visual Window
   - **Options:** 
     - Filter Bundle: `Fountain + 2 Filters` ($39.00 / compare-at $55.00), `Fountain + 4 Filters` ($44.00 / compare-at $62.00)
   - **Inventory:** 0 for both variants (`available == false` across entire product)
   - **Tags:** `cat`, `water-fountains`, `feeding`, `best-sellers`

---

## 2. Step-by-Step Import Instructions (Shopify Admin)

1. Log in to your **Shopify Admin**.
2. Navigate to **Products** in the left sidebar.
3. Click the **Import** button in the top right.
4. Click **Add file** and select [`test-data/petssify_test_products.csv`](file:///d:/Dawn%20Theme%20Customization/Petssify/test-data/petssify_test_products.csv).
5. **Important:** Leave **"Overwrite existing products that have the same handle"** UNCHECKED (unless you are re-importing updated data).
6. Click **Upload and continue**, review the preview summary (2 products detected), and click **Import products**.

---

## 3. Post-Import Verification & Store Configuration

After the import completes:

1. **Sales Channel Publishing:**
   - Open each imported product.
   - Under **Publishing** / **Sales channels**, verify that **Online Store** is checked.
2. **Assign to Collections:**
   - Under **Collections**, ensure both products are added to:
     - `Best Sellers` (handle: `best-sellers`)
     - `Bowls & Feeders` / `Feeding`
   - *Note:* The CSV includes the tag `best-sellers` for automated collections. If your "Best Sellers" collection is manual, add them manually.
3. **Verify Product Status:**
   - Ensure the Status is set to **Active**.
4. **Media / Images (Optional):**
   - The CSV provides a fallback placeholder URL. In Admin, you may drag and drop 2–3 photos into each product's **Media** section to verify the secondary image hover-swap behavior.
5. **Inventory Locations:**
   - Under **Inventory**, confirm that inventory is assigned to your active store location so Shopify properly tracks availability.

---

## 4. Preview URLs on Dev Theme

With `shopify theme dev` running locally:
- **In-Stock PDP:** `/products/petssify-test-in-stock-slow-feeder-bowl`
- **Out-of-Stock PDP:** `/products/petssify-test-out-of-stock-cat-fountain`
- **Best Sellers Grid:** `/collections/best-sellers` or Homepage
- **All Products Grid:** `/collections/all`

---

## 5. Cleanup Instructions (Post-Testing)

When testing and QA are finished, delete the test products:
1. Go to **Shopify Admin** -> **Products**.
2. Search for `petssify-test`.
3. Select both test products via the checkboxes.
4. Click **More actions** -> **Delete products**.
5. Confirm deletion.
