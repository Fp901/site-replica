$(function () {
  console.log('sideMenu.js loaded, jQuery version:', $.fn.jquery);

  /* ==========================================================
     SIDE MENU (RIGHT PUSH EFFECT)
     ========================================================== */
  const $sideMenu = $('.side-menu');
  const $body = $('body');
  const $overlay = $('<div class="page-overlay"></div>').appendTo('body');
  const $servicesMenu = $('.services-menu');
  const $hamburger = $('.hamburger');
  let $servicesPlaceholder = null;
  let isMenuOpen = false;

  /** Injects the services menu into the mobile side panel */
  function injectServicesMenu() {
    if ($servicesMenu.length && !$sideMenu.find('.services-menu').length) {
      $servicesPlaceholder = $(
        '<div class="services-placeholder"></div>'
      ).insertAfter($servicesMenu);
      $servicesMenu.prependTo($sideMenu);
    }
  }

  /** Restores the services menu to its original position (desktop view) */
  function restoreServicesMenu() {
    if (
      $servicesPlaceholder &&
      $servicesPlaceholder.length &&
      $sideMenu.find('.services-menu').length
    ) {
      $servicesMenu.insertBefore($servicesPlaceholder);
      $servicesPlaceholder.remove();
      $servicesPlaceholder = null;
    }
  }

  /** Utility: debounce for resize performance */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /** Handles responsive placement of services menu */
  function checkViewport() {
    const width = window.innerWidth;
    if (width < 992) {
      injectServicesMenu();
    } else {
      restoreServicesMenu();
    }

    // Maintain menu open state on resize
    if (isMenuOpen) {
      $sideMenu.addClass('open');
      $overlay.addClass('active');
      $body.addClass('menu-open');
      $hamburger.addClass('active');
    }
  }

  const debouncedCheckViewport = debounce(checkViewport, 100);
  checkViewport();

  /** Toggle menu open/close on hamburger click */
  $(document).on('click', '.hamburger', function () {
    $(this).toggleClass('active');
    isMenuOpen = $(this).hasClass('active');
    isMenuOpen ? openSideMenu() : closeSideMenu();
  });

  /** Opens side menu with overlay */
  function openSideMenu() {
    $sideMenu.addClass('open');
    $overlay.addClass('active');
    $body.addClass('menu-open');
    isMenuOpen = true;
  }

  /** Closes side menu and overlay */
  function closeSideMenu() {
    $hamburger.removeClass('active');
    $sideMenu.removeClass('open');
    $overlay.removeClass('active');
    $body.removeClass('menu-open');
    isMenuOpen = false;
  }

  // Close menu when clicking outside
  $(document).on('click', function (e) {
    if ($(e.target).closest('.side-menu, .hamburger').length === 0)
      closeSideMenu();
  });
  $overlay.on('click', closeSideMenu);

  // Listen for resize events
  $(window).on('resize', debouncedCheckViewport);
});
