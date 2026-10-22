if (!customElements.get('sticky-add-to-cart')) {
  customElements.define(
    'sticky-add-to-cart',
    class StickyAddToCart extends HTMLElement {
      connectedCallback() {
        this.sectionId = this.dataset.section;
        this.bar = this.querySelector('.sticky-add-to-cart__bar');
        this.button = this.querySelector('[data-sticky-add-to-cart-button]');
        this.priceContainer = this.querySelector('[data-sticky-price]');
        this.variantTitleContainer = this.querySelector('[data-sticky-variant-title]');

        const variantScript = this.querySelector('[data-sticky-variants]');
        this.variants = variantScript ? JSON.parse(variantScript.textContent) : [];

        this.realPrice = document.getElementById('price-' + this.sectionId);
        this.realForm = document.getElementById('product-form-' + this.sectionId);
        this.realSubmitButton = this.realForm
          ? this.realForm.querySelector('button[type="submit"]')
          : null;

        this.observeRealButton();
        this.observePriceChanges();
        this.bindVariantChange();
        this.bindClick();
        this.syncPrice();
      }

      observeRealButton() {
        const target = this.realSubmitButton || this.realForm;
        if (!target || !('IntersectionObserver' in window)) return;

        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.toggle(!entry.isIntersecting && entry.boundingClientRect.top < 0);
            });
          },
          { threshold: 0 }
        );
        this.intersectionObserver.observe(target);
      }

      toggle(show) {
        if (this.bar) this.bar.setAttribute('data-stuck', show ? 'true' : 'false');
      }

      // Pulls ONLY the current selling price, ignores badges and compare-at price
      syncPrice() {
        if (!this.realPrice || !this.priceContainer) return;
        const saleItem = this.realPrice.querySelector('.price__sale .price-item--sale');
        const regularItem = this.realPrice.querySelector('.price__regular .price-item--regular');
        const priceEl = saleItem || regularItem;
        this.priceContainer.textContent = priceEl
          ? priceEl.textContent.trim()
          : this.realPrice.textContent.trim();
      }

      observePriceChanges() {
        if (!this.realPrice) return;
        this.mutationObserver = new MutationObserver(() => this.syncPrice());
        this.mutationObserver.observe(this.realPrice, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }

      bindVariantChange() {
        if (!this.realForm) return;
        this.realForm.addEventListener('change', () => {
          setTimeout(() => this.syncVariantTitle(), 50);
        });
        document.addEventListener('change', (e) => {
          if (this.realForm.contains(e.target)) {
            setTimeout(() => this.syncVariantTitle(), 50);
          }
        });

        if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
          subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
            if (event.data.sectionId === this.sectionId) {
              setTimeout(() => {
                this.syncPrice();
                this.syncVariantTitle();
              }, 80);
            }
          });
        }
      }

      syncVariantTitle() {
        if (!this.realForm) return;
        const idInput = this.realForm.querySelector('[name="id"]');
        if (!idInput) return;
        const selected = this.variants.find((v) => String(v.id) === String(idInput.value));
        if (selected && this.variantTitleContainer) {
          this.variantTitleContainer.textContent = selected.title;
        }

        this.realSubmitButton = this.realForm.querySelector('button[type="submit"]');
        if (this.button && this.realSubmitButton) {
          const isSoldOut = this.realSubmitButton.hasAttribute('disabled');
          this.button.toggleAttribute('disabled', isSoldOut);
          this.button.setAttribute('aria-disabled', isSoldOut ? 'true' : 'false');
          const hiddenLabel = this.button.querySelector('.visually-hidden');
          if (hiddenLabel) {
            hiddenLabel.textContent = isSoldOut ? 'Sold out' : 'Add to cart';
          }
          this.button.classList.toggle('is-sold-out', isSoldOut);
        }
      }

      bindClick() {
        if (!this.button) return;
        this.button.addEventListener('click', () => {
          if (this.button.hasAttribute('disabled')) {
            const notifyEl = document.querySelector('.petssify-notify-me');
            if (notifyEl) {
              notifyEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
          }
          if (this.realSubmitButton) this.realSubmitButton.click();
        });
      }
    }
  );
}