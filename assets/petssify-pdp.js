/**
 * Petssify PDP Client-Side Interactive Engine (assets/petssify-pdp.js)
 * High-performance, non-blocking PDP logic:
 * - Dynamic Delivery Date Estimator (capped business-days calculation, idempotent)
 * - Accessible Tab / Mobile Accordion Switcher
 * - Intersection-driven Sticky Add-to-Cart with Cart Drawer integration
 * - Safe PubSub Variant Synchronization (no dangerous MutationObserver loops)
 * - Native Web Share with Clipboard Fallback
 */

(function () {
  'use strict';

  let isSyncingVariant = false;
  let lastSyncedVariantId = null;
  let stickyAtcObserver = null;
  let stickyFooterObserver = null;

  /* ==========================================================================
     1. Delivery Date Estimator (1-2 days processing + 5-8 days transit)
     ========================================================================== */
  function calculateDeliveryDates() {
    try {
      function addBusinessDays(startDate, daysToAdd) {
        const current = new Date(startDate);
        let added = 0;
        let safetyCount = 0;
        while (added < daysToAdd && safetyCount < 30) {
          safetyCount++;
          current.setDate(current.getDate() + 1);
          const day = current.getDay();
          if (day !== 0 && day !== 6) { // 0 = Sun, 6 = Sat
            added++;
          }
        }
        return current;
      }

      const today = new Date();
      const minDate = addBusinessDays(today, 6);
      const maxDate = addBusinessDays(today, 10);

      const options = { month: 'short', day: 'numeric' };
      const formattedRange = `${minDate.toLocaleDateString('en-US', options)} – ${maxDate.toLocaleDateString('en-US', options)}`;

      const deliveryContainers = document.querySelectorAll('.petssify-delivery-date-range');
      deliveryContainers.forEach((el) => {
        if (el.textContent !== formattedRange) {
          el.textContent = formattedRange;
        }
      });
    } catch (e) {
      console.warn('[Petssify] Date calculation error:', e);
    }
  }

  /* ==========================================================================
     2. Details Tab & Mobile Accordion Controller
     ========================================================================== */
  function initDetailsTabs() {
    const tabList = document.querySelector('.petssify-tabs-nav');
    const tabButtons = document.querySelectorAll('.petssify-tab-btn');
    const tabPanels = document.querySelectorAll('.petssify-tab-panel');
    const accordionHeaders = document.querySelectorAll('.petssify-accordion-header');

    if (!tabList && accordionHeaders.length === 0) return;

    // Desktop Tab Click
    tabButtons.forEach((btn) => {
      if (btn.dataset.initialized) return;
      btn.dataset.initialized = 'true';

      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('aria-controls');

        tabButtons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
        });

        tabPanels.forEach((panel) => {
          panel.classList.remove('is-active');
          panel.hidden = true;
        });

        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');

        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('is-active');
          activePanel.hidden = false;
        }
      });

      // Accessible Keyboard Navigation
      btn.addEventListener('keydown', (e) => {
        const tabsArray = Array.from(tabButtons);
        const index = tabsArray.indexOf(btn);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % tabsArray.length;
          tabsArray[nextIndex].focus();
          tabsArray[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + tabsArray.length) % tabsArray.length;
          tabsArray[prevIndex].focus();
          tabsArray[prevIndex].click();
        }
      });
    });

    // Mobile Accordion Toggle
    accordionHeaders.forEach((header) => {
      if (header.dataset.initialized) return;
      header.dataset.initialized = 'true';

      header.addEventListener('click', () => {
        const panel = header.closest('.petssify-tab-panel');
        if (!panel) return;
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        header.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        panel.classList.toggle('is-accordion-open', !isExpanded);
      });
    });
  }

  /* ==========================================================================
     3. Sticky Add-to-Cart Bar Engine
     ========================================================================== */
  function initStickyATC() {
    const stickyBar = document.getElementById('PetssifyStickyBar');
    if (!stickyBar) return;

    if (stickyBar.dataset.initialized === 'true') {
      return;
    }
    stickyBar.dataset.initialized = 'true';

    const mainAtcButton = document.querySelector(
      '.product-form__submit, #ProductSubmitButton-' + stickyBar.dataset.productId
    ) || document.querySelector('.product-form__buttons');

    const footer = document.querySelector('footer, .footer');
    const selectEl = document.getElementById('PetssifyStickySelect');
    const addBtn = document.getElementById('PetssifyStickyAddBtn');
    const notifyBtn = document.getElementById('PetssifyStickyNotifyBtn');

    let isMainButtonVisible = true;
    let isFooterVisible = false;

    function updateStickyVisibility() {
      if (!isMainButtonVisible && !isFooterVisible) {
        stickyBar.classList.add('is-visible');
        stickyBar.setAttribute('aria-hidden', 'false');
      } else {
        stickyBar.classList.remove('is-visible');
        stickyBar.setAttribute('aria-hidden', 'true');
      }
    }

    if (stickyAtcObserver) stickyAtcObserver.disconnect();
    if (stickyFooterObserver) stickyFooterObserver.disconnect();

    if (mainAtcButton && 'IntersectionObserver' in window) {
      stickyAtcObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isMainButtonVisible = entry.isIntersecting && entry.boundingClientRect.top >= 0;
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              isMainButtonVisible = false;
            } else if (entry.isIntersecting) {
              isMainButtonVisible = true;
            }
            updateStickyVisibility();
          });
        },
        { threshold: 0 }
      );
      stickyAtcObserver.observe(mainAtcButton);
    }

    if (footer && 'IntersectionObserver' in window) {
      stickyFooterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isFooterVisible = entry.isIntersecting;
            updateStickyVisibility();
          });
        },
        { threshold: 0.1 }
      );
      stickyFooterObserver.observe(footer);
    }

    // Variant Select Sync inside Sticky Bar
    if (selectEl) {
      selectEl.addEventListener('change', () => {
        if (isSyncingVariant) return;

        const selectedOpt = selectEl.options[selectEl.selectedIndex];
        if (!selectedOpt) return;

        const variantId = selectEl.value;
        const price = selectedOpt.dataset.price;
        const compareAt = selectedOpt.dataset.compareAt;
        const isAvailable = selectedOpt.dataset.available === 'true';
        const imgUrl = selectedOpt.dataset.image;

        // Update sticky price & UI
        const priceEl = document.getElementById('PetssifyStickyPrice');
        if (priceEl && price) priceEl.textContent = price;

        const compareEl = document.getElementById('PetssifyStickyComparePrice');
        if (compareEl && compareAt) compareEl.textContent = compareAt;

        const thumbImg = document.getElementById('PetssifyStickyThumbImg');
        if (thumbImg && imgUrl) thumbImg.src = imgUrl;

        // Toggle Add vs Notify
        if (addBtn && notifyBtn) {
          if (isAvailable) {
            addBtn.classList.remove('petssify-hidden');
            notifyBtn.classList.add('petssify-hidden');
            addBtn.setAttribute('data-variant-id', variantId);
          } else {
            addBtn.classList.add('petssify-hidden');
            notifyBtn.classList.remove('petssify-hidden');
          }
        }

        // Trigger change in main variant selector
        if (window.petssifySelectVariant) {
          window.petssifySelectVariant(variantId);
        }
      });
    }

    // Sticky ATC Button Click -> Ajax Add to Cart
    if (addBtn) {
      addBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const variantId = addBtn.getAttribute('data-variant-id') || (selectEl ? selectEl.value : null);
        if (!variantId) return;

        const btnText = addBtn.querySelector('.petssify-sticky-bar__btn-text');
        const spinner = addBtn.querySelector('.petssify-sticky-bar__btn-spinner');

        addBtn.disabled = true;
        if (spinner) spinner.classList.remove('petssify-hidden');
        if (btnText) btnText.textContent = 'Adding...';

        try {
          const res = await fetch(window.routes?.cart_add_url || '/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              id: variantId,
              quantity: 1,
            }),
          });

          if (!res.ok) throw new Error('Add to cart failed');

          if (btnText) btnText.textContent = 'Added ✓';

          // Update Dawn cart drawer or bubbles
          const cartDrawer = document.querySelector('cart-drawer');
          if (cartDrawer) {
            const cartRes = await fetch((window.routes?.cart_url || '/cart') + '?section_id=cart-drawer');
            const cartHtml = await cartRes.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(cartHtml, 'text/html');
            const newDrawerInner = doc.querySelector('cart-drawer');
            if (newDrawerInner) {
              cartDrawer.innerHTML = newDrawerInner.innerHTML;
            }
            if (typeof cartDrawer.open === 'function') {
              cartDrawer.open();
            }
          } else {
            fetch('/cart.js')
              .then((r) => r.json())
              .then((c) => {
                const countEls = document.querySelectorAll('.cart-count-bubble span:first-child');
                countEls.forEach((el) => (el.textContent = c.item_count));
              })
              .catch(() => {});
          }

          setTimeout(() => {
            if (btnText) btnText.textContent = 'Add to cart';
            addBtn.disabled = false;
            if (spinner) spinner.classList.add('petssify-hidden');
          }, 1500);
        } catch (err) {
          console.error('[Petssify] ATC error:', err);
          if (btnText) btnText.textContent = 'Error - Retry';
          addBtn.disabled = false;
          if (spinner) spinner.classList.add('petssify-hidden');
        }
      });
    }

    // Notify Me Button Click -> Smooth Scroll
    if (notifyBtn) {
      notifyBtn.addEventListener('click', () => {
        const notifyBlock = document.querySelector('.petssify-notify-me-block');
        if (notifyBlock) {
          notifyBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const emailInput = notifyBlock.querySelector('input[type="email"]');
          if (emailInput) setTimeout(() => emailInput.focus(), 600);
        }
      });
    }
  }

  /* ==========================================================================
     4. Helper to Select a Specific Variant Programmatically
     ========================================================================== */
  window.petssifySelectVariant = function (variantId) {
    if (!variantId) return;

    const radioInput = document.querySelector(
      `variant-selects input[data-option-value-id="${variantId}"], variant-selects input[value="${variantId}"]`
    );
    if (radioInput) {
      if (!radioInput.checked) {
        radioInput.checked = true;
        radioInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return;
    }

    const selectEl = document.querySelector('variant-selects select');
    if (selectEl) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value === String(variantId)) {
          if (selectEl.selectedIndex !== i) {
            selectEl.selectedIndex = i;
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
          }
          return;
        }
      }
    }
  };

  /* ==========================================================================
     5. Sync Variant Updates from Dawn (Clean PubSub + DOM Change Event)
     ========================================================================== */
  function syncVariantState(variant) {
    if (!variant || variant.id === lastSyncedVariantId) return;
    lastSyncedVariantId = variant.id;

    isSyncingVariant = true;
    try {
      // Sync sticky bar select
      const stickySelect = document.getElementById('PetssifyStickySelect');
      if (stickySelect && stickySelect.value !== String(variant.id)) {
        stickySelect.value = String(variant.id);
      }

      const stickyVariantLabel = document.getElementById('PetssifyStickyVariantLabel');
      if (stickyVariantLabel) {
        stickyVariantLabel.textContent = variant.title;
      }

      const addBtn = document.getElementById('PetssifyStickyAddBtn');
      const notifyBtn = document.getElementById('PetssifyStickyNotifyBtn');
      if (addBtn && notifyBtn) {
        if (variant.available) {
          addBtn.classList.remove('petssify-hidden');
          notifyBtn.classList.add('petssify-hidden');
          addBtn.setAttribute('data-variant-id', variant.id);
        } else {
          addBtn.classList.add('petssify-hidden');
          notifyBtn.classList.remove('petssify-hidden');
        }
      }

      const notifyBlock = document.querySelector('.petssify-notify-me-block');
      if (notifyBlock) {
        if (variant.available) {
          notifyBlock.classList.add('petssify-hidden');
        } else {
          notifyBlock.classList.remove('petssify-hidden');
        }
      }

      if (variant.available) {
        calculateDeliveryDates();
      }
    } catch (e) {
      console.warn('[Petssify] Variant sync error:', e);
    } finally {
      isSyncingVariant = false;
    }
  }

  function readSelectedVariantFromDOM() {
    try {
      const selectedVariantScript = document.querySelector('product-info [data-selected-variant]');
      if (selectedVariantScript && selectedVariantScript.textContent) {
        const variant = JSON.parse(selectedVariantScript.textContent);
        if (variant) syncVariantState(variant);
      }
    } catch (e) {
      // Safe fallback
    }
  }

  function listenToVariantChanges() {
    // 1. Dawn Native PubSub Event
    if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined' && PUB_SUB_EVENTS.variantChange) {
      subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
        const variant = event?.data?.variant;
        if (variant) {
          syncVariantState(variant);
        } else {
          setTimeout(readSelectedVariantFromDOM, 50);
        }
      });
    }

    // 2. Standard DOM change listener (debounced fallback & instant label update)
    document.addEventListener('change', (e) => {
      const target = e.target;
      if (!target) return;

      // Update selected value text in legend immediately
      if (target.matches('.product-form__input input[type="radio"], .product-form__input select')) {
        const parentFieldset = target.closest('.product-form__input');
        if (parentFieldset) {
          const selectedValEl = parentFieldset.querySelector('.petssify-variant-selected-val');
          if (selectedValEl) {
            selectedValEl.textContent = target.value;
          }
        }
      }

      if (
        target.matches(
          'variant-selects select, variant-selects input, variant-radios input, form[action*="/cart/add"] [name="id"]'
        )
      ) {
        setTimeout(readSelectedVariantFromDOM, 60);
      }
    });
  }

  /* ==========================================================================
     6. Native Web Share / Copy Link Trigger
     ========================================================================== */
  function initShareButtons() {
    const shareBtns = document.querySelectorAll('.petssify-share-button');
    shareBtns.forEach((btn) => {
      if (btn.dataset.initialized) return;
      btn.dataset.initialized = 'true';

      btn.addEventListener('click', async () => {
        const url = window.location.href;
        const title = document.title;

        if (navigator.share) {
          try {
            await navigator.share({ title, url });
          } catch (err) {
            // Cancelled or unsupported
          }
        } else {
          try {
            await navigator.clipboard.writeText(url);
            const originalText = btn.getAttribute('title') || 'Share';
            btn.setAttribute('title', 'Copied to clipboard!');
            setTimeout(() => btn.setAttribute('title', originalText), 2000);
          } catch (e) {
            // Clipboard fallback
          }
        }
      });
    });
  }

  /* ==========================================================================
     7. Initialization & Shopify Theme Editor Lifecycle
     ========================================================================== */
  function initAll() {
    calculateDeliveryDates();
    initDetailsTabs();
    initStickyATC();
    initShareButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAll();
      listenToVariantChanges();
    });
  } else {
    initAll();
    listenToVariantChanges();
  }

  // Shopify Theme Editor support
  document.addEventListener('shopify:section:load', (e) => {
    initAll();
  });
})();
