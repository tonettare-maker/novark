(function () {
  var root = document.documentElement;
  root.classList.add('js');
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Theme
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store('nv-theme', next);
  });

  // Sprache merken
  document.querySelectorAll('[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () { store('nv-lang', a.getAttribute('data-lang')); });
  });
  var langMenu = document.querySelector('.lang-menu');
  if (langMenu) {
    var lb = langMenu.querySelector('.lang-btn');
    lb.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = langMenu.classList.toggle('open');
      lb.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function () { langMenu.classList.remove('open'); lb.setAttribute('aria-expanded', 'false'); });
  }

  // Mobile Menü
  var menuBtn = document.querySelector('.menu-btn'), nav = document.getElementById('main-nav');
  if (menuBtn && nav) menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav) nav.classList.remove('open');
    if (langMenu) langMenu.classList.remove('open');
  });

  // Header-Linie beim Scrollen
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Karussell
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var track = c.querySelector('.car-track');
    function go(dir) { track.scrollBy({ left: dir * (track.clientWidth * 0.8), behavior: 'smooth' }); }
    c.querySelector('.prev').addEventListener('click', function () { go(-1); });
    c.querySelector('.next').addEventListener('click', function () { go(1); });
  });

  // 404: Sprache wählen
  var nf = document.querySelectorAll('[data-nf]');
  if (nf.length) {
    var want = store('nv-lang') || (navigator.language || 'de').slice(0, 2);
    var has = Array.prototype.some.call(nf, function (n) { return n.getAttribute('data-nf') === want; });
    if (has) nf.forEach(function (n) { n.hidden = n.getAttribute('data-nf') !== want; });
  }

  // Teaser-Video: bei reduzierter Bewegung anhalten
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-teaser]').forEach(function (v) { v.removeAttribute('autoplay'); try { v.pause(); } catch (e) {} });
  }

  // Einblenden beim Scrollen
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.value, .app-card, .featured, .features li, .card, .faq details, .link-tiles a, .callout');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
