$(function () {
  console.log('cookieConsent.js loaded, jQuery version:', $.fn.jquery);

  /* ==========================================================
     COOKIE CONSENT POPUP
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
