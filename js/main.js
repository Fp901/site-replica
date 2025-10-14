$(function () {
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

  // Toggle hamburger
  $(document).on('click', '.hamburger', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      openSideMenu();
    } else {
      closeSideMenu();
    }
  });

  // Open menu
  function openSideMenu() {
    $sideMenu.addClass('open');
    $overlay.addClass('active');
    $body.addClass('menu-open');
  }

  // Close menu
  function closeSideMenu() {
    $('.hamburger').removeClass('active');
    $sideMenu.removeClass('open');
    $overlay.removeClass('active');
    $body.removeClass('menu-open');
  }

  // Close when clicking outside or overlay
  $(document).on('click', function (e) {
    if ($(e.target).closest('.side-menu, .hamburger').length === 0) {
      closeSideMenu();
    }
  });
  $overlay.on('click', closeSideMenu);

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
