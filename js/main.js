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

    // hide text
    banner.addClass('hide-text');

    // create sliding image layer
    const nextImage = $('<div class="slide-image"></div>')
      .css(
        'background-image',
        `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${slide.img})`
      )
      .appendTo(banner);

    // trigger slide movement (allow layout to attach first)
    setTimeout(() => banner.addClass('is-sliding'), 10);

    // after slide completes
    setTimeout(() => {
      banner
        .removeClass('is-sliding')
        .css(
          'background-image',
          `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${slide.img})`
        );

      nextImage.remove();

      // update text & button
      $('.banner-slide .container h1').html(slide.title);
      $('.banner-slide .container p').html(slide.text);
      $('.banner-slide .btn').html(
        `${slide.btnText} <i class="fa-solid fa-arrow-right"></i>`
      );

      banner.removeClass('hide-text');

      // update dots (only if they exist)
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

  // Manual dot click
  dots.each(function (i) {
    $(this).on('click', function () {
      if (i !== currentSlide) {
        currentSlide = i;
        showSlide(currentSlide);
      }
    });
  });

  // init + auto rotate
  showSlide(currentSlide);
  setInterval(nextSlide, 6000);

  // ==============================
  // 2. Side Menu
  // ==============================
  const sideMenu = $("<nav id='side-menu'></nav>").appendTo('body');
  sideMenu.html(`
    <button id="close-side">✕</button>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  `);

  $('#close-side').hide();

  $('.hamburger').on('click', function () {
    sideMenu.addClass('active');
    $('#close-side').show();
  });

  $(document).on('click', '#close-side', function () {
    sideMenu.removeClass('active');
    $('#close-side').hide();
  });

  // ==============================
  // 3. Mobile Menu
  // ==============================
  $('.hamburger').on('click', function () {
    $('.services-menu').slideToggle();
  });

  // ==============================
  // 4. Sticky Header
  // ==============================
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('header.navbar').addClass('sticky');
    } else {
      $('header.navbar').removeClass('sticky');
    }
  });

  // ==============================
  // 5. Cookie Consent Pop-Up
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
