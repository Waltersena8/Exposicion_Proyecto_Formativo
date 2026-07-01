/* ============================================
   SIMFAC - Script Interactivo
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === MENU TOGGLE ===
  const menuToggle = document.querySelector('.menu-toggle');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on item click
    menuOverlay.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === TOP BAR SCROLL EFFECT ===
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 50) {
        topBar.classList.add('scrolled');
      } else {
        topBar.classList.remove('scrolled');
      }
      lastScroll = scroll;
    });
  }

  // === SCROLL REVEAL ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === SMOOTH SCROLL FOR ANCHORS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === TABS ===
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tabs-container');
      const tabId = btn.dataset.tab;

      // Deactivate all tabs in this group
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      // Activate clicked tab
      btn.classList.add('active');
      const targetContent = tabGroup.querySelector(`#${tabId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current) + suffix;
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // === PARALLAX (subtle) ===
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
      }
    });
  }

  // === DICTIONARY TOGGLE (for data dictionary) ===
  document.querySelectorAll('.dict-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const table = toggle.nextElementSibling;
      if (table) {
        table.classList.toggle('collapsed');
        toggle.querySelector('.toggle-icon').textContent = table.classList.contains('collapsed') ? '▸' : '▾';
      }
    });
  });

});