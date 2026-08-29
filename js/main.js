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

  initHeaderShadow();
  initFadeUp();
  initScrollers();
});

// ヘッダーを常に上部に固定し、8pxスクロールしたら影をつける
function initHeaderShadow() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var update = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// スクロールで要素がふわっと表れるアニメーション
function initFadeUp() {
  var targets = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) { observer.observe(el); });
}

// 「実際にどう進む?」「開催スケジュール」の横スクロールを矢印ボタンでも操作できるようにする
function initScrollers() {
  document.querySelectorAll('[data-scroll-prev]').forEach(function (btn) {
    var track = document.getElementById(btn.getAttribute('data-scroll-prev'));
    if (!track) return;
    btn.addEventListener('click', function () {
      track.scrollBy({ left: -240, behavior: 'smooth' });
    });
  });
  document.querySelectorAll('[data-scroll-next]').forEach(function (btn) {
    var track = document.getElementById(btn.getAttribute('data-scroll-next'));
    if (!track) return;
    btn.addEventListener('click', function () {
      track.scrollBy({ left: 240, behavior: 'smooth' });
    });
  });
}
