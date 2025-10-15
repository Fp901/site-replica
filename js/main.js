$(function () {
  // Debug: Confirm jQuery and script execution
  console.log('main.js loaded, jQuery version:', $.fn.jquery);
  console.log('Document ready, DOM loaded');

  // ==============================
  // 1. Banner Slider
  // ==============================
  const slides = [
    {
      title: 'The East Of Englands Leading Technology Company',
      text: 'Performance-driven digital and technology services<br>with complete transparency.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/leading_company.webp',
    },
    {
      title: 'Bespoke Software',
      text: 'Delivering expert bespoke software<br>solutions across a range of industries.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/bespoke_software.jpg',
    },
    {
      title: 'IT Support',
      text: 'Fast and cost-effective IT support<br>services for your business.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/IT_support.webp',
    },
    {
      title: 'Digital Marketing',
      text: 'Generating your new business through<br>results-driven marketing activities.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/marketing.webp',
    },
    {
      title: 'Telecoms Services',
      text: 'A new approach to connectivity, see<br>how we can help your business.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/telecoms.webp',
    },
    {
      title: 'Web Design',
      text: 'For businesses looking to make a strong<br>and effective first impression.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/web_design.webp',
    },
    {
      title: 'Cyber Security',
      text: 'Keeping businesses and their customers<br>sensitive information protected.',
      btnText: 'Find out more',
      img: '../assets/images/banner_slider/home-MSxH.webp',
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

  // Debug: Check if key elements exist
  console.log('.side-menu found:', $sideMenu.length ? 'Yes' : 'No');
  console.log('.services-menu found:', $servicesMenu.length ? 'Yes' : 'No');
  console.log('.hamburger found:', $hamburger.length ? 'Yes' : 'No');

  // Function to inject services-menu into side-menu
  function injectServicesMenu() {
    if ($servicesMenu.length && !$sideMenu.find('.services-menu').length) {
      console.log('Injecting services-menu into side-menu');
      $servicesPlaceholder = $(
        '<div class="services-placeholder"></div>'
      ).insertAfter($servicesMenu);
      $servicesMenu.prependTo($sideMenu);
    } else {
      console.log('Services-menu already injected or not found');
    }
  }

  // Function to restore services-menu to original position
  function restoreServicesMenu() {
    if (
      $servicesPlaceholder &&
      $servicesPlaceholder.length &&
      $sideMenu.find('.services-menu').length
    ) {
      console.log('Restoring services-menu to original position');
      $servicesMenu.insertBefore($servicesPlaceholder);
      $servicesPlaceholder.remove();
      $servicesPlaceholder = null;
    } else {
      console.log(
        'Not restoring: No placeholder or services-menu not in side-menu'
      );
    }
  }

  // Debounce function to limit resize event frequency
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

  // Function to check viewport and manage injection/restoration
  function checkViewport() {
    const width = window.innerWidth;
    console.log('Checking viewport, width:', width, 'Menu open:', isMenuOpen);
    if (width < 992) {
      injectServicesMenu();
      // Reapply menu state if open
      if (isMenuOpen) {
        $sideMenu.addClass('open');
        $overlay.addClass('active');
        $body.addClass('menu-open');
        $hamburger.addClass('active');
      }
    } else {
      restoreServicesMenu();
      // Keep menu open if it was open
      if (isMenuOpen) {
        console.log('Keeping side menu open on desktop viewport');
        $sideMenu.addClass('open');
        $overlay.addClass('active');
        $body.addClass('menu-open');
        $hamburger.addClass('active');
      }
    }
  }

  // Debounced viewport check
  const debouncedCheckViewport = debounce(checkViewport, 100);

  // Initial check on load
  checkViewport();

  // Toggle hamburger
  $(document).on('click', '.hamburger', function () {
    console.log('Hamburger clicked');
    $(this).toggleClass('active');
    isMenuOpen = $(this).hasClass('active');
    console.log('Menu state updated:', isMenuOpen ? 'Open' : 'Closed');
    if (isMenuOpen) {
      openSideMenu();
    } else {
      closeSideMenu();
    }
  });

  // Open menu
  function openSideMenu() {
    console.log('Opening side menu, window width:', window.innerWidth);
    $sideMenu.addClass('open');
    $overlay.addClass('active');
    $body.addClass('menu-open');
    isMenuOpen = true;
  }

  // Close menu
  function closeSideMenu() {
    console.log('Closing side menu');
    $hamburger.removeClass('active');
    $sideMenu.removeClass('open');
    $overlay.removeClass('active');
    $body.removeClass('menu-open');
    isMenuOpen = false;
  }

  // Close when clicking outside or overlay
  $(document).on('click', function (e) {
    if ($(e.target).closest('.side-menu, .hamburger').length === 0) {
      console.log('Clicked outside, closing side menu');
      closeSideMenu();
    }
  });
  $overlay.on('click', function () {
    console.log('Overlay clicked, closing side menu');
    closeSideMenu();
  });

  // Handle resize with debounce
  $(window).on('resize', debouncedCheckViewport);

  // ==============================
  // 3. Sticky Header
  // ==============================
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('header.navbar').addClass('sticky');
    } else {
      $('header.navbar').removeClass('sticky');
    }
  });

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
