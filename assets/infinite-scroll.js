let loading = false;

window.addEventListener("scroll", () => {
  const nextPage = document.querySelector(".pagination__item--next a");
  if (!nextPage || loading) return;

  const rect = nextPage.getBoundingClientRect();
  if (rect.top < window.innerHeight + 200) {
    loading = true;

    fetch(nextPage.href)
      .then(res => res.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const newProducts = doc.querySelectorAll("#product-grid li");
        const grid = document.querySelector("#product-grid");

        newProducts.forEach(p => grid.appendChild(p));
        nextPage.parentElement.remove();
        loading = false;
      });
  }
});
