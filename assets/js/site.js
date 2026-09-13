(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  onReady(function () {
    var images = document.querySelectorAll('.blog-container img, .container img');
    images.forEach(function (img, i) {
      if (!img.getAttribute('loading')) img.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
      img.setAttribute('decoding', 'async');
      var src = img.getAttribute('src') || '';
      if (src.indexOf('mmbiz.qpic.cn') !== -1 && src.indexOf('images.weserv.nl') === -1) {
        img.setAttribute('data-origin', src);
        img.src = 'https://images.weserv.nl/?url=' + encodeURIComponent(src);
      }
    });

    var navTrigger = document.getElementById('navTrigger');
    var menuIcon = document.getElementById('menuIcon');
    var drawer = document.getElementById('drawer');
    var overlay = document.getElementById('overlay');
    var isMenuOpen = false;
    function isMobile() { return window.innerWidth <= 768; }
    function closeMenu() {
      if (!isMenuOpen) return;
      isMenuOpen = false;
      if (drawer) drawer.classList.remove('active');
      if (menuIcon) menuIcon.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    function toggleMenu() {
      if (!isMobile()) return;
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        if (drawer) drawer.classList.add('active');
        if (menuIcon) menuIcon.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else closeMenu();
    }
    if (navTrigger) navTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    if (overlay) overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.page-link').forEach(function (link) {
      link.addEventListener('click', function () { if (isMobile()) setTimeout(closeMenu, 100); });
    });
    window.addEventListener('resize', function () { if (!isMobile() && isMenuOpen) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

    var maryKayBtn = document.querySelector('.marykay-btn');
    var maryKayQR = document.getElementById('marykayQR');
    var isQrVisible = false;
    if (maryKayBtn && maryKayQR) {
      maryKayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isQrVisible = !isQrVisible;
        maryKayQR.style.opacity = isQrVisible ? '1' : '0';
        maryKayQR.style.visibility = isQrVisible ? 'visible' : 'hidden';
      });
      document.addEventListener('click', function (e) {
        if (!maryKayBtn.contains(e.target) && !maryKayQR.contains(e.target)) {
          isQrVisible = false;
          maryKayQR.style.opacity = '0';
          maryKayQR.style.visibility = 'hidden';
        }
      });
    }

    var widget = document.getElementById('dynamicRocketWidget');
    if (widget) {
      var t;
      window.addEventListener('scroll', function () {
        widget.classList.add('scrolling');
        clearTimeout(t);
        t = setTimeout(function () { widget.classList.remove('scrolling'); }, 150);
      }, { passive: true });
    }
  });

  window.addEventListener('load', function () {
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-GJQGLP28T0';
    s.async = true;
    s.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-GJQGLP28T0', { send_page_view: true });
    };
    document.head.appendChild(s);
  });
})();

function trackVisit(platform) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'social_media_visit', { platform: platform, source: 'footer_link' });
  }
}
