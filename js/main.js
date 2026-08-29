document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  function scrollToTopClearHash() {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    header.addEventListener('click', function (e) {
      if (e.target === header || e.target === header.querySelector('.container')) {
        scrollToTopClearHash();
      }
    });
  }

  document.querySelectorAll('.header-logo-home').forEach(function (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToTopClearHash();
    });
  });

  initScrollReveal();
  initHeaderShadow();
});

function initHeaderShadow() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var update = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initScrollReveal() {
  var selectors = [
    '.section-title', '.section-lead',
    '.worry-card', '.capability-card', '.flow-card', '.flow-arrow',
    '.gallery-card', '.instructor-card', '.voice-card', '.achievement-item',
    '.change-card', '.theme-card', '.step-item', '.step-arrow',
    '.timeline-item', '.faq-item', '.survey-card', '.overview-list li',
    '.venn-wrap', '.venn-descs', '.final-cta', '.map-embed'
  ];
  var els = document.querySelectorAll(selectors.join(','));
  if (!els.length) return;

  els.forEach(function (el) { el.classList.add('reveal'); });

  var groups = new Map();
  els.forEach(function (el) {
    var parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach(function (siblings) {
    siblings.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
    });
  });

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(function (el) { observer.observe(el); });
}
