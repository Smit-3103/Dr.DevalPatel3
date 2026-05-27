/* ===================================================
   MEDICOZ — gallery.js
   Gallery filter, load more, and lightbox
   =================================================== */
(function () {
  'use strict';

  const ITEMS_PER_LOAD = 9;
  let visibleCount = ITEMS_PER_LOAD;

  function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const loadMoreBtn  = document.getElementById('loadMoreBtn');

    if (!galleryItems.length) return;

    /* Show first batch */
    updateVisibility('all', galleryItems);

    /* Filter buttons */
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        visibleCount = ITEMS_PER_LOAD;
        const filter = btn.getAttribute('data-filter') || 'all';
        updateVisibility(filter, galleryItems);
      });
    });

    /* Load More */
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
        const matching = currentFilter === 'all'
          ? galleryItems
          : galleryItems.filter(el => el.getAttribute('data-category') === currentFilter);

        visibleCount += 3;
        matching.forEach((el, i) => {
          el.style.display = i < visibleCount ? 'block' : 'none';
        });

        if (visibleCount >= matching.length) {
          loadMoreBtn.style.display = 'none';
        }
      });
    }

    /* Lightbox */
    initLightbox(galleryItems);
  }

  function updateVisibility(filter, items) {
    const matching = filter === 'all'
      ? items
      : items.filter(el => el.getAttribute('data-category') === filter);
    const nonMatching = filter === 'all'
      ? []
      : items.filter(el => el.getAttribute('data-category') !== filter);

    nonMatching.forEach(el => { el.style.display = 'none'; });
    matching.forEach((el, i) => {
      el.style.display = i < visibleCount ? 'block' : 'none';
    });

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = matching.length > visibleCount ? 'inline-block' : 'none';
    }
  }

  function initLightbox(items) {
    /* Create lightbox DOM */
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.id = 'lightbox';
    lb.innerHTML = `
      <span class="lightbox-close" id="lbClose">&times;</span>
      <img id="lbImg" src="" alt="Gallery enlarged view">
    `;
    document.body.appendChild(lb);

    const lbImg  = lb.querySelector('#lbImg');
    const lbClose = lb.querySelector('#lbClose');

    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lbImg.src = img.src.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800');
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lb.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
