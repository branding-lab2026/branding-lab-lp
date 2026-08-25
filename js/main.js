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

  var header = document.querySelector('.site-header');
  if (header) {
    header.addEventListener('click', function (e) {
      if (e.target === header || e.target === header.querySelector('.container')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
