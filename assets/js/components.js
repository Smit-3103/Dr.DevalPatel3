/* ===================================================
   MEDICOZ — components.js
   Injects global header + footer into every page
   =================================================== */

(function () {
  /* ─────────────────────────────────────────────────
     SVG LOGO (heart + cross)
  ───────────────────────────────────────────────── */
  const logoSVG = `
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 42 C25 42 5 28 5 16 A11 11 0 0 1 25 12 A11 11 0 0 1 45 16 C45 28 25 42 25 42Z"
            fill="#1b75bc"/>
      <rect x="22" y="16" width="6" height="16" rx="2" fill="white"/>
      <rect x="17" y="21" width="16" height="6" rx="2" fill="white"/>
    </svg>`;

  /* ─────────────────────────────────────────────────
     TOP BAR HTML
  ───────────────────────────────────────────────── */
  const topBarHTML = `
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-inner">
          <div class="top-bar-contact">
            <div class="top-bar-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="item-text">
                <strong>Our Location</strong>
                234 Triumph, Los Angeles, California, US
              </div>
            </div>
            <div class="top-bar-item">
              <i class="fas fa-clock"></i>
              <div class="item-text">
                <strong>Opening Hours</strong>
                Mon - Sat 8.00 - 18.00, Sunday CLOSED
              </div>
            </div>
          </div>
          <div class="top-bar-right">
            <div class="social-links">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Google Plus"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" aria-label="Skype"><i class="fab fa-skype"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <a href="contact.html" class="btn-appointment">Appointment</a>
          </div>
        </div>
      </div>
    </div>`;

  /* ─────────────────────────────────────────────────
     HEADER / NAV HTML
  ───────────────────────────────────────────────── */
  const headerHTML = `
    <nav class="site-header" role="navigation" aria-label="Main navigation">
      <div class="container" style="padding:0;">
        <div class="header-inner">
          <a href="index.html" class="site-logo" aria-label="Medicoz Home">
            ${logoSVG}
            <div class="logo-text">
              <span class="medical-solution">Medical Solution</span>
              <span class="medicoz">Medicoz</span>
            </div>
          </a>
          <div class="main-nav">
            <ul class="nav-list" id="navList">
              <li class="nav-item active" data-page="index">
                <a href="index.html" class="nav-link">Home</a>
              </li>
              <li class="nav-item" data-page="about-us">
                <a href="about.html" class="nav-link">About Us</a>
              </li>
              <li class="nav-item" data-page="services">
                <a href="services.html" class="nav-link">Services</a>
              </li>
              <li class="nav-item" data-page="gallery">
                <a href="gallery.html" class="nav-link">Gallery</a>
              </li>
              <li class="nav-item" data-page="doctors">
                <a href="doctors.html" class="nav-link">doctors</a>
              </li>
              <li class="nav-item" data-page="departments">
                <a href="departments.html" class="nav-link">Departments List</a>
              </li>
              <li class="nav-item" data-page="blog">
                <a href="blog.html" class="nav-link">Blog</a>
              </li>
              <li class="nav-item" data-page="contact">
                <a href="contact.html" class="nav-link">Contact</a>
              </li>
            </ul>
          </div>
          <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <!-- Mobile Nav -->
    <div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Mobile navigation">
      <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">
        <i class="fas fa-times"></i>
      </button>
      <ul class="mobile-nav-list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="doctors.html">Doctors</a></li>
        <li><a href="departments.html">Departments</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>`;

  /* ─────────────────────────────────────────────────
     FOOTER HTML
  ───────────────────────────────────────────────── */
  const footerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">

          <!-- Col 1: Logo + Desc -->
          <div class="footer-col">
            <div class="footer-logo">
              <div class="footer-logo-icon">
                <i class="fas fa-heartbeat"></i>
              </div>
              <div class="footer-logo-text">
                <span class="brand-name">Medicoz</span>
                <span class="brand-sub">Medical Solution</span>
              </div>
            </div>
            <p class="footer-desc">
              Our Clinic has grown to provide a world class facility for the clinic advanced restorative.
              We are among the most qualified implant providers in the AUS with over 30 years of quality training and experience.
            </p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Google Plus"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Skype"><i class="fab fa-skype"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <!-- Col 2: Departments -->
          <div class="footer-col">
            <h4>Departments</h4>
            <ul class="footer-links">
              <li><a href="department-detail.html">Surgery &amp; Radiology</a></li>
              <li><a href="department-detail.html">Family Medicine</a></li>
              <li><a href="department-detail.html">Women's Health</a></li>
              <li><a href="department-detail.html">Optician</a></li>
              <li><a href="department-detail.html">Pediatrics</a></li>
              <li><a href="department-detail.html">Dermatology</a></li>
            </ul>
          </div>

          <!-- Col 3: Latest News -->
          <div class="footer-col">
            <h4>Latest News</h4>
            <ul class="footer-news-list">
              <li class="footer-news-item">
                <div class="footer-news-img">
                  <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=120&h=100&fit=crop&q=70"
                       alt="Integrative Medicine article thumbnail" loading="lazy">
                </div>
                <div class="footer-news-text">
                  <a href="blog-detail.html?post_id=3">Integrative Medicine &amp; Cancer Treatment.</a>
                  <span class="footer-news-date">July 11, 2020</span>
                </div>
              </li>
              <li class="footer-news-item">
                <div class="footer-news-img">
                  <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=120&h=100&fit=crop&q=70"
                       alt="Health Care article thumbnail" loading="lazy">
                </div>
                <div class="footer-news-text">
                  <a href="blog-detail.html?post_id=4">Achieving Better Health Care Time.</a>
                  <span class="footer-news-date">August 1, 2020</span>
                </div>
              </li>
              <li class="footer-news-item">
                <div class="footer-news-img">
                  <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=120&h=100&fit=crop&q=70"
                       alt="Great Health Care article thumbnail" loading="lazy">
                </div>
                <div class="footer-news-text">
                  <a href="blog-detail.html?post_id=5">Great Health Care For Patients.</a>
                  <span class="footer-news-date">August 1, 2020</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Col 4: Contact -->
          <div class="footer-col">
            <h4>Contact Us</h4>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                <div class="footer-contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="footer-contact-text">
                  <strong>Address</strong>
                  <span>2130 Fulton Street San Diego<br>CA 94117-1080 USA</span>
                </div>
              </li>
              <li class="footer-contact-item">
                <div class="footer-contact-icon"><i class="fas fa-phone-alt"></i></div>
                <div class="footer-contact-text">
                  <strong>Mon to Fri: 08:30 - 18:00</strong>
                  <span>+898 68679 575</span>
                </div>
              </li>
              <li class="footer-contact-item">
                <div class="footer-contact-icon"><i class="fas fa-envelope"></i></div>
                <div class="footer-contact-text">
                  <strong>Do you have a Question?</strong>
                  <span>info@gmail.com</span>
                </div>
              </li>
              <li class="footer-contact-item">
                <div class="footer-contact-icon"><i class="fas fa-clock"></i></div>
                <div class="footer-contact-text">
                  <strong>Mon - Sat 8.00 - 18:00</strong>
                  <span>Sunday CLOSED</span>
                </div>
              </li>
            </ul>
          </div>

        </div><!-- /footer-grid -->
      </div><!-- /container -->

      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-inner">
            <span class="copyright">
              Copyright &copy; 2025 <strong>Bold Touch</strong> All Rights Reserved.
            </span>
            <div class="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="contact.html">Contact</a>
              <a href="#">Supplier</a>
            </div>
          </div>
        </div>
      </div>
    </footer>`;

  /* ─────────────────────────────────────────────────
     INJECT + INIT
  ───────────────────────────────────────────────── */
  function injectComponents() {
    /* Inject top bar */
    const topBarEl = document.getElementById('top-bar');
    if (topBarEl) topBarEl.outerHTML = topBarHTML;

    /* Inject header */
    const headerEl = document.getElementById('global-header');
    if (headerEl) headerEl.outerHTML = headerHTML;

    /* Inject footer */
    const footerEl = document.getElementById('global-footer');
    if (footerEl) footerEl.outerHTML = footerHTML;

    /* Active nav link based on current page */
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = path.replace('.html', '').replace(/-.*$/, '');
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      const pg = item.getAttribute('data-page');
      if (pg && path.includes(pg)) item.classList.add('active');
    });
    if (path === 'index.html' || path === '') {
      const homeItem = document.querySelector('.nav-item[data-page="index"]');
      if (homeItem) homeItem.classList.add('active');
    }

    /* Mobile hamburger */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');

    function openMobileNav() {
      if (!hamburger || !mobileNav) return;
      hamburger.classList.add('active');
      mobileNav.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileNav() {
      if (!hamburger || !mobileNav) return;
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openMobileNav);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
    if (mobileNav) {
      mobileNav.addEventListener('click', e => {
        if (e.target === mobileNav) closeMobileNav();
      });
    }

    /* Close mobile nav on link click */
    document.querySelectorAll('.mobile-nav-list a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    /* Keyboard: close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileNav();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }
})();
