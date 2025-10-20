$(function () {
  console.log('partnersSlider.js loaded, jQuery version:', $.fn.jquery);

  /* ==========================================================
     PARTNERS LOGO SLIDERS (Shift Left Every 6s + Pause on Hover)
     ========================================================== */
  (function handlePartnerSliders() {
    const sliders = document.querySelectorAll('.partners-slideshow');
    if (!sliders.length) return;

    sliders.forEach((slider) => {
      const track = slider.querySelector('.logo-track');
      const items = slider.querySelectorAll('.logo-item');
      if (!track || items.length === 0) return;

      // Compute one-step distance = first item width + flex gap
      const getStep = () => {
        const first = track.querySelector('.logo-item');
        if (!first) return 0;
        const gap = parseFloat(getComputedStyle(track).gap || '0');
        return first.getBoundingClientRect().width + gap;
      };

      let step = getStep();
      let isAnimating = false;
      const durationMs = 450; // slide animation duration
      const intervalMs = 6000; // time between slides
      let timerId = null;

      // Apply a single left shift
      const slideOnce = () => {
        if (isAnimating) return;
        // Recompute step in case of responsive changes
        step = getStep();
        if (step <= 0) return;

        isAnimating = true;
        track.style.transition = `transform ${durationMs}ms ease`;
        track.style.transform = `translateX(-${step}px)`;

        const onDone = () => {
          track.removeEventListener('transitionend', onDone);
          // Reorder: move first item to the end
          const first = track.querySelector('.logo-item');
          if (first) track.appendChild(first);
          // Reset transform instantly (no flicker)
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          // Force reflow so the browser acknowledges the reset
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          track.offsetHeight;
          isAnimating = false;
        };

        track.addEventListener('transitionend', onDone);
      };

      const start = () => {
        if (timerId) return;
        timerId = setInterval(slideOnce, intervalMs);
      };

      const stop = () => {
        clearInterval(timerId);
        timerId = null;
      };

      // Start autoplay
      start();

      // Pause on hover (anywhere over this slider)
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);

      // Recalculate step on resize (prevents misalignment on breakpoints)
      window.addEventListener('resize', () => {
        // If mid-animation, finish it first
        if (!isAnimating) {
          step = getStep();
        }
      });
    });

    console.log(
      '✅ Partners logo sliders initialized (transform-based, pause on hover).'
    );
  })();
});
