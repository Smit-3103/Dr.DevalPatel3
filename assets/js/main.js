/* ===================================================
   MEDICOZ — main.js
   Global interactions: slider, counters, testimonials,
   scroll animations, skill bars, back-to-top
   =================================================== */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     HERO SLIDER
  ───────────────────────────────────────────────── */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 5000);
    }
    function resetAuto() { clearInterval(timer); startAuto(); }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });

    startAuto();
  }

  /* ─────────────────────────────────────────────────
     TESTIMONIAL SLIDER
  ───────────────────────────────────────────────── */
  function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots   = document.querySelectorAll('.t-dot');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  /* ─────────────────────────────────────────────────
     COUNTER ANIMATION
  ───────────────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (!target || el.dataset.counted) return;
    el.dataset.counted = '1';
    const duration = 2000;
    const step = target / (duration / 16);
    let count = 0;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = Math.floor(count).toLocaleString();
    }, 16);
  }

  /* ─────────────────────────────────────────────────
     SKILL BAR ANIMATION
  ───────────────────────────────────────────────── */
  function animateSkillBar(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    const width = el.getAttribute('data-width') || '0';
    setTimeout(() => { el.style.width = width + '%'; }, 100);
  }

  /* ─────────────────────────────────────────────────
     INTERSECTION OBSERVER — scroll triggers
  ───────────────────────────────────────────────── */
  function initScrollObserver() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: show everything immediately */
      document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
      document.querySelectorAll('.stat-number').forEach(animateCounter);
      document.querySelectorAll('.skill-fill').forEach(animateSkillBar);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.classList.contains('animate-on-scroll')) {
          el.classList.add('visible');
        }
        if (el.classList.contains('stat-number')) {
          animateCounter(el);
        }
        if (el.classList.contains('skill-fill')) {
          animateSkillBar(el);
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animate-on-scroll, .stat-number, .skill-fill')
      .forEach(el => observer.observe(el));
  }

  /* ─────────────────────────────────────────────────
     BACK TO TOP
  ───────────────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });

    btn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────────
     STICKY HEADER SHADOW
  ───────────────────────────────────────────────── */
  function initStickyHeader() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;
    const handleScroll = () => {
      if (window.scrollY > 80) {
        topBar.style.display = 'none';
      } else {
        topBar.style.display = '';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ─────────────────────────────────────────────────
     SMOOTH SCROLL for internal anchors
  ───────────────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────
     TABS (department-detail)
  ───────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tabs-header').forEach(header => {
      const btns = header.querySelectorAll('.tab-btn');
      const container = header.closest('.tabs-section') || header.parentElement;

      btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          container.querySelectorAll('.tab-panel').forEach((panel, j) => {
            panel.classList.toggle('active', i === j);
          });
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────
     INIT ALL
  ───────────────────────────────────────────────── */
  function init() {
    initHeroSlider();
    initTestimonialSlider();
    initScrollObserver();
    initBackToTop();
    initStickyHeader();
    initSmoothScroll();
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
