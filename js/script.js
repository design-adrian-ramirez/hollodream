const topNav = document.getElementById("topNav");
const hero = document.querySelector(".hero");
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

// Show top nav after scrolling a little
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) { // small offset triggers nav reliably
    topNav.classList.add("active");
  } else {
    topNav.classList.remove("active");
  }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.style.opacity = '0';
    mobileMenu.style.right = '-100%';
    setTimeout(() => {
      mobileMenu.classList.remove('active');
      mobileMenu.style.opacity = '';
      mobileMenu.style.right = '';
    }, 400);
  });
});

// Artist card flip for mobile
document.addEventListener('DOMContentLoaded', () => {
  const MOBILE_MAX = 768;
  const TEST_MODE = false;

  function createObserver() {
    if (window._artistsObserver) {
      window._artistsObserver.disconnect();
      window._artistsObserver = null;
    }

    const isMobile = window.innerWidth <= MOBILE_MAX || TEST_MODE;
    if (!isMobile) return;

    const cards = document.querySelectorAll('.artists-grid .card');
    if (!cards.length) return;

    const bandHeight = 2;
    const halfViewport = Math.floor(window.innerHeight / 2);
    const topMargin = -(halfViewport - Math.floor(bandHeight / 2));
    const bottomMargin = -(halfViewport - Math.ceil(bandHeight / 2));
    const rootMargin = `${topMargin}px 0px ${bottomMargin}px 0px`;

    const options = { root: null, rootMargin, threshold: 0 };
    window._artistsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('flip');
        } else {
          entry.target.classList.remove('flip');
        }
      });
    }, options);

    cards.forEach(card => window._artistsObserver.observe(card));
  }

  createObserver();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createObserver, 150);
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(createObserver, 200);
  });
});
