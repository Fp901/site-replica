/**
 * ==========================================================
 * main.js
 * ----------------------------------------------------------
 * Handles:
 * 1️⃣ Banner Slider
 * 2️⃣ Side Menu (Push Effect)
 * 3️⃣ Sticky Header (Navbar + Services Menu)
 * 4️⃣ Cookie Consent Modal
 * ==========================================================
 */

$(function () {
  console.log('main.js loaded, jQuery version:', $.fn.jquery);

  /* ==========================================================
     1️⃣ BANNER SLIDER
     ========================================================== */
  const slides = [
    {
      title: 'The East Of Englands Leading Technology Company',
      text: 'Performance-driven digital and technology services<br>with complete transparency.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/leading_company.webp',
      btnColor: '#7E57A0',
    },
    {
      title: 'Bespoke Software',
      text: 'Delivering expert bespoke software<br>solutions across a range of industries.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/bespoke_software.jpg',
      btnColor: '#E8A008',
    },
    {
      title: 'IT Support',
      text: 'Fast and cost-effective IT support<br>services for your business.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/IT_support.webp',
      btnColor: '#2A6EC6',
    },
    {
      title: 'Digital Marketing',
      text: 'Generating your new business through<br>results-driven marketing activities.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/marketing.webp',
      btnColor: '#26AB5F',
    },
    {
      title: 'Telecoms Services',
      text: 'A new approach to connectivity, see<br>how we can help your business.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/telecoms.webp',
      btnColor: '#C42E2A',
    },
    {
      title: 'Web Design',
      text: 'For businesses looking to make a strong<br>and effective first impression.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/web_design.webp',
      btnColor: '#7E57A0',
    },
    {
      title: 'Cyber Security',
      text: 'Keeping businesses and their customers<br>sensitive information protected.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/cyber_sec.webp',
      btnColor: '#E80A42',
    },
  ];

  let currentSlide = 0;
  const banner = $('.banner-slide');
  const dots = $('.owl-dot span');

  /**
   * Updates the banner with the selected slide content
   * @param {number} index - The index of the slide to display
   */
  function showSlide(index) {
    const slide = slides[index];
    banner.addClass('hide-text');

    // Immediately update button color via CSS variable
    $('.banner-slide .btn').css('--btn-color', slide.btnColor);

    // Create temporary overlay image for smooth transition
    const nextImage = $('<div class="slide-image"></div>')
      .css(
        'background-image',
        `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${slide.img})`
      )
      .appendTo(banner);

    // Apply transition class slightly delayed
    setTimeout(() => banner.addClass('is-sliding'), 10);

    // After transition, update main banner contents
    setTimeout(() => {
      banner
        .removeClass('is-sliding')
        .css(
          'background-image',
          `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${slide.img})`
        );

      nextImage.remove();

      $('.banner-slide .container h1').html(slide.title);
      $('.banner-slide .container p').html(slide.text);
      $('.banner-slide .btn').html(
        `${slide.btnText} <i class="fa-solid fa-arrow-right"></i>`
      );

      banner.removeClass('hide-text');

      // Update dot indicator
      if (dots.length) {
        dots.removeClass('active');
        dots.eq(index).addClass('active');
      }
    }, 350);
  }

  /** Cycles to the next slide automatically */
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Manual slide navigation via dot indicators
  dots.each(function (i) {
    $(this).on('click', function () {
      if (i !== currentSlide) {
        currentSlide = i;
        showSlide(currentSlide);
      }
    });
  });

  // Initialize slider
  showSlide(currentSlide);
  setInterval(nextSlide, 6000);

  /* ==========================================================
     2️⃣ SIDE MENU (RIGHT PUSH EFFECT)
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

  /* ==========================================================
     3️⃣ STICKY HEADER (NAVBAR + SERVICES MENU)
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

  /* ==========================================================
     4️⃣ COOKIE CONSENT POPUP
     ========================================================== */
  (function handleCookieModal() {
    const cookieKey = 'cookiesAccepted';

    // Create modal markup dynamically
    const cookieModal = $(`
      <div id="cookie-modal">
        <h2>Cookies Policy</h2>
        <p>
          Our website uses cookies. This helps us provide you with a good experience on our website.
          To see what cookies we use and what they do, and to opt-in on non-essential cookies click 
          "Change Settings". For a detailed explanation, click on "<a href="#">Privacy Policy</a>"; 
          otherwise, click "Accept Cookies" to continue.
        </p>
        <div class="btn-row">
          <button class="btn-settings">Change Settings</button>
          <button class="btn-accept">Accept Cookies</button>
        </div>
      </div>
    `);

    const overlay = $('<div id="cookie-modal-overlay"></div>');
    $('body').append(overlay, cookieModal);

    // Show modal only if not yet accepted
    if (!localStorage.getItem(cookieKey)) {
      setTimeout(() => {
        $('#cookie-modal, #cookie-modal-overlay').addClass('active');
      }, 500);
    }

    // Accept button
    $(document).on('click', '.btn-accept', function () {
      localStorage.setItem(cookieKey, 'true');
      $('#cookie-modal, #cookie-modal-overlay').removeClass('active');
    });

    // Change Settings button (placeholder)
    $(document).on('click', '.btn-settings', function () {
      alert('Settings page or preferences modal could open here.');
    });
  })();
});
