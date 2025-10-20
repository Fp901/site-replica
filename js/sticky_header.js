$(function () {
  console.log('stickyHeader.js loaded, jQuery version:', $.fn.jquery);

  /* ==========================================================
     STICKY HEADER (NAVBAR + SERVICES MENU)
     ========================================================== */
  const $navbar = $('header.navbar');
  const $servicesBar = $('.services-menu');
  let lastScrollTop = 0;
  let isHeaderVisible = true;
  const threshold = 100;

  /** Handles scroll visibility for navbar & services bar */
  function updateHeader() {
    const scrollTop = $(window).scrollTop();
    const scrollingDown = scrollTop > lastScrollTop;
    const isDesktop = window.innerWidth >= 992;

    // Near top → always visible
    if (scrollTop <= threshold) {
      $navbar.removeClass('sticky hidden').addClass('visible');
      if (isDesktop)
        $servicesBar.removeClass('sticky hidden').addClass('visible');
      isHeaderVisible = true;
    }
    // Scroll down → hide
    else if (scrollingDown && isHeaderVisible) {
      $navbar.addClass('sticky hidden').removeClass('visible');
      if (isDesktop)
        $servicesBar.addClass('sticky hidden').removeClass('visible');
      isHeaderVisible = false;
    }
    // Scroll up → show
    else if (!scrollingDown && !isHeaderVisible) {
      $navbar.addClass('sticky visible').removeClass('hidden');
      if (isDesktop)
        $servicesBar.addClass('sticky visible').removeClass('hidden');
      isHeaderVisible = true;
    }

    // Debug log (safe to remove for production)
    console.log(
      'Scroll:',
      scrollTop,
      '| Down:',
      scrollingDown,
      '| Visible:',
      isHeaderVisible,
      '| Desktop:',
      isDesktop
    );

    lastScrollTop = Math.max(scrollTop, 0);
  }

  /** Utility: throttle to reduce scroll calls */
  function throttle(func, wait) {
    let timeout;
    return function (...args) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func(...args);
        }, wait);
      }
    };
  }

  const throttledUpdateHeader = throttle(updateHeader, 100);
  $(window).on('scroll', throttledUpdateHeader);

  // Initial header state
  updateHeader();

  // Keep services bar aligned below current navbar height
  $(window)
    .on('resize', () => {
      document.documentElement.style.setProperty(
        '--navbar-offset',
        `${$('header.navbar').outerHeight()}px`
      );
    })
    .trigger('resize');
});
