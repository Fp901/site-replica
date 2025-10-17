$(function () {
  console.log('main.js loaded, jQuery version:', $.fn.jquery);

  // ==============================
  // 1. Banner Slider
  // ==============================
  const slides = [
    {
      title: 'The East Of Englands Leading Technology Company',
      text: 'Performance-driven digital and technology services<br>with complete transparency.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/leading_company.webp',
    },
    {
      title: 'Bespoke Software',
      text: 'Delivering expert bespoke software<br>solutions across a range of industries.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/bespoke_software.jpg',
    },
    {
      title: 'IT Support',
      text: 'Fast and cost-effective IT support<br>services for your business.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/IT_support.webp',
    },
    {
      title: 'Digital Marketing',
      text: 'Generating your new business through<br>results-driven marketing activities.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/marketing.webp',
    },
    {
      title: 'Telecoms Services',
      text: 'A new approach to connectivity, see<br>how we can help your business.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/telecoms.webp',
    },
    {
      title: 'Web Design',
      text: 'For businesses looking to make a strong<br>and effective first impression.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/web_design.webp',
    },
    {
      title: 'Cyber Security',
      text: 'Keeping businesses and their customers<br>sensitive information protected.',
      btnText: 'Find out more',
      img: 'assets/images/banner_slider/cyber_security.webp',
    },
  ];

  let currentSlide = 0;
  const banner = $('.banner-slide');
  const dots = $('.owl-dot span');

  function showSlide(index) {
    const slide = slides[index];
    banner.addClass('hide-text');

    const nextImage = $('<div class="slide-image"></div>')
      .css(
        'background-image',
        `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${slide.img})`
      )
      .appendTo(banner);

    setTimeout(() => banner.addClass('is-sliding'), 10);

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

      if (dots.length) {
        dots.removeClass('active');
        dots.eq(index).addClass('active');
      }
    }, 350);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.each(function (i) {
    $(this).on('click', function () {
      if (i !== currentSlide) {
        currentSlide = i;
        showSlide(currentSlide);
      }
    });
  });

  showSlide(currentSlide);
  setInterval(nextSlide, 6000);

  // ==============================
  // 2. Side Menu (Right Push Effect)
  // ==============================
  const $sideMenu = $('.side-menu');
  const $body = $('body');
  const $overlay = $('<div class="page-overlay"></div>').appendTo('body');
  const $servicesMenu = $('.services-menu');
  const $hamburger = $('.hamburger');
  let $servicesPlaceholder = null;
  let isMenuOpen = false;

  function injectServicesMenu() {
    if ($servicesMenu.length && !$sideMenu.find('.services-menu').length) {
      $servicesPlaceholder = $(
        '<div class="services-placeholder"></div>'
      ).insertAfter($servicesMenu);
      $servicesMenu.prependTo($sideMenu);
    }
  }

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

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function checkViewport() {
    const width = window.innerWidth;
    if (width < 992) {
      injectServicesMenu();
      if (isMenuOpen) {
        $sideMenu.addClass('open');
        $overlay.addClass('active');
        $body.addClass('menu-open');
        $hamburger.addClass('active');
      }
    } else {
      restoreServicesMenu();
      if (isMenuOpen) {
        $sideMenu.addClass('open');
        $overlay.addClass('active');
        $body.addClass('menu-open');
        $hamburger.addClass('active');
      }
    }
  }

  const debouncedCheckViewport = debounce(checkViewport, 100);
  checkViewport();

  $(document).on('click', '.hamburger', function () {
    $(this).toggleClass('active');
    isMenuOpen = $(this).hasClass('active');
    if (isMenuOpen) {
      openSideMenu();
    } else {
      closeSideMenu();
    }
  });

  function openSideMenu() {
    $sideMenu.addClass('open');
    $overlay.addClass('active');
    $body.addClass('menu-open');
    isMenuOpen = true;
  }

  function closeSideMenu() {
    $hamburger.removeClass('active');
    $sideMenu.removeClass('open');
    $overlay.removeClass('active');
    $body.removeClass('menu-open');
    isMenuOpen = false;
  }

  $(document).on('click', function (e) {
    if ($(e.target).closest('.side-menu, .hamburger').length === 0) {
      closeSideMenu();
    }
  });
  $overlay.on('click', function () {
    closeSideMenu();
  });

  $(window).on('resize', debouncedCheckViewport);

  // ==============================
  // 3. Unified Sticky Header (Navbar + Services Menu)
  // ==============================
  const $navbar = $('header.navbar');
  const $servicesBar = $('.services-menu');
  let lastScrollTop = 0;
  let isHeaderVisible = true; // Start visible at top
  const threshold = 100; // Fixed threshold for initial scroll

  function updateHeader() {
    const scrollTop = $(window).scrollTop();
    const scrollingDown = scrollTop > lastScrollTop;
    const isDesktop = window.innerWidth >= 992;

    // Log state for debugging
    console.log(
      'Scroll position:',
      scrollTop,
      'Scrolling down:',
      scrollingDown,
      'Header visible:',
      isHeaderVisible,
      'Threshold:',
      threshold,
      'Is desktop:',
      isDesktop,
      'Navbar classes:',
      $navbar.attr('class'),
      'Services classes:',
      $servicesBar.attr('class')
    );

    if (scrollTop <= threshold) {
      // At top: natural state
      $navbar.removeClass('sticky hidden').addClass('visible');
      if (isDesktop) {
        $servicesBar.removeClass('sticky hidden').addClass('visible');
        console.log('At top: Services menu set to visible, no sticky');
      }
      isHeaderVisible = true;
    } else if (scrollingDown && isHeaderVisible) {
      // Scroll down: hide both
      $navbar.addClass('sticky hidden').removeClass('visible');
      if (isDesktop) {
        $servicesBar.addClass('sticky hidden').removeClass('visible');
        console.log('Scroll down: Services menu hidden with sticky');
      }
      isHeaderVisible = false;
    } else if (!scrollingDown && !isHeaderVisible && scrollTop > threshold) {
      // Scroll up: show both with sticky
      $navbar.addClass('sticky visible').removeClass('hidden');
      if (isDesktop) {
        $servicesBar.addClass('sticky visible').removeClass('hidden');
        console.log('Scroll up: Services menu shown with sticky');
      }
      isHeaderVisible = true;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
  }

  // Throttle scroll event for performance
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
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

  // Initial check
  updateHeader();

  // ==============================
  // 4. Cookie Consent Pop-Up
  // ==============================
  const cookiePopup = $(`
    <div id="cookie-popup">
      <p>This website uses cookies to ensure you get the best experience.</p>
      <button id="accept-cookies">Got it!</button>
    </div>
  `);

  $('body').append(cookiePopup);

  if (!localStorage.getItem('cookiesAccepted')) {
    $('#cookie-popup').fadeIn();
  }

  $('#accept-cookies').on('click', function () {
    localStorage.setItem('cookiesAccepted', 'true');
    $('#cookie-popup').fadeOut();
  });
});
