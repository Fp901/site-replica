$(document).ready(function () {
  // ==============================
  // 1. Banner Slider
  // ==============================
  let slides = [
    {
      title: 'Cyber Security',
      text: 'Keeping businesses and their customers sensitive information protected.',
      btnText: 'Find out more',
      img: 'assets/images/banner1.jpg',
    },
    {
      title: 'IT Support',
      text: 'Reliable support and consultancy for your business needs.',
      btnText: 'Learn more',
      img: 'assets/images/banner2.jpg',
    },
    {
      title: 'Web Design',
      text: 'Modern, responsive websites that convert visitors into customers.',
      btnText: 'View Projects',
      img: 'assets/images/banner3.jpg',
    },
  ];

  let currentSlide = 0;

  function showSlide(index) {
    const slide = slides[index];
    $('.banner-slide .container h1').text(slide.title);
    $('.banner-slide .container p').html(slide.text);
    $('.banner-slide .btn').text(slide.btnText);
    $('.banner-slide').css('background-image', `url(${slide.img})`);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 5000);

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

  $('.hamburger').click(function () {
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
  $('.hamburger').click(function () {
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

  $('#accept-cookies').click(function () {
    localStorage.setItem('cookiesAccepted', 'true');
    $('#cookie-popup').fadeOut();
  });
});
