(function () {
  if (typeof gtag !== 'function') return;

  // ---- スクロール到達率 (25/50/75/90%) ----
  var scrollThresholds = [25, 50, 75, 90];
  var scrollFired = {};

  function checkScroll() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var docHeight = doc.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var percent = Math.round((scrollTop / docHeight) * 100);
    scrollThresholds.forEach(function (t) {
      if (percent >= t && !scrollFired[t]) {
        scrollFired[t] = true;
        gtag('event', 'scroll_depth', { percent: t });
      }
    });
  }

  function throttle(fn, wait) {
    var last = 0;
    var timer = null;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn();
      } else {
        clearTimeout(timer);
        timer = setTimeout(fn, wait - (now - last));
      }
    };
  }

  window.addEventListener('scroll', throttle(checkScroll, 300), { passive: true });
  checkScroll();

  // ---- 主要セクションの到達率・閲覧時間 ----
  var sectionIds = ['hero', 'why', 'about', 'schedule', 'forwho', 'lastyear', 'voices', 'instructors', 'overview', 'faq', 'join'];
  var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  var reached = {};
  var visibleSince = {};
  var totalVisibleMs = {};

  var reachObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      if (entry.isIntersecting && !reached[id]) {
        reached[id] = true;
        gtag('event', 'section_view', { section_id: id });
      }
    });
  }, { threshold: 0 });

  var timeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      if (entry.isIntersecting) {
        visibleSince[id] = Date.now();
      } else if (visibleSince[id]) {
        totalVisibleMs[id] = (totalVisibleMs[id] || 0) + (Date.now() - visibleSince[id]);
        visibleSince[id] = null;
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(function (el) {
    reachObserver.observe(el);
    timeObserver.observe(el);
  });

  function flushSectionTime() {
    sectionIds.forEach(function (id) {
      if (visibleSince[id]) {
        totalVisibleMs[id] = (totalVisibleMs[id] || 0) + (Date.now() - visibleSince[id]);
        visibleSince[id] = null;
      }
      var ms = totalVisibleMs[id];
      if (ms) {
        gtag('event', 'section_time', { section_id: id, seconds: Math.round(ms / 1000), transport_type: 'beacon' });
        totalVisibleMs[id] = 0;
      }
    });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flushSectionTime();
  });
  window.addEventListener('pagehide', flushSectionTime);

  // ---- 申込・お問い合わせボタンのクリック ----
  var FORM_TYPES = {
    'forms.gle/sUvXQ4iW6fAgKnK2A': 'apply',
    'forms.gle/F2Nt7o7mnQ5Bit7B7': 'contact'
  };

  function locationOf(link) {
    if (link.closest('#floating-cta')) return 'floating_cta';
    if (link.closest('footer')) return 'footer';
    var withId = link.closest('[id]');
    return withId ? withId.id : 'other';
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="forms.gle"]');
    if (!link) return;
    var type = null;
    for (var key in FORM_TYPES) {
      if (link.href.indexOf(key) !== -1) { type = FORM_TYPES[key]; break; }
    }
    if (!type) return;
    gtag('event', 'cta_click', { cta_type: type, location: locationOf(link) });
  });
})();
