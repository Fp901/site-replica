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
  const slideBackground = $('.slide-background');
  const dots = $('.owl-dot span');
  let slideInterval;

  /**
   * Updates the banner with the selected slide content
   * @param {number} index - The index of the slide to display
   */
  function showSlide(index) {
    const slide = slides[index];
    banner.addClass('hide-text');

    // Update button color via CSS variable
    $('.banner-slide .btn').css('--btn-color', slide.btnColor);

    // Update slide-background to persist the image
    slideBackground.css({
      'background-image': `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${slide.img})`,
    });

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
        clearInterval(slideInterval);
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, 6000);
      }
    });
  });

  // Initialize slider
  showSlide(currentSlide);
  slideInterval = setInterval(nextSlide, 6000);

  // Add drag/swipe functionality with TouchSwipe
  banner.swipe({
    swipeLeft: function () {
      currentSlide = (currentSlide + 1) % slides.length;
      clearInterval(slideInterval);
      showSlide(currentSlide);
      slideInterval = setInterval(nextSlide, 6000);
    },
    swipeRight: function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      clearInterval(slideInterval);
      showSlide(currentSlide);
      slideInterval = setInterval(nextSlide, 6000);
    },
    threshold: 75, // Minimum distance for swipe
    allowPageScroll: 'vertical', // Allow vertical scrolling
  });
});
