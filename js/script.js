const topNav = document.getElementById("topNav");
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {                       // distance from top of page to bottom of hero
  const heroBottom = hero.offsetTop + hero.offsetHeight;

  if (window.scrollY >= heroBottom - 50) {                      // show nav once you’ve scrolled past hero
    topNav.classList.add("active");
  } else {
    topNav.classList.remove("active");
  }
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');


hamburger.addEventListener('click', () => {                     // Toggle menu on hamburger click
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
  const TEST_MODE = false; // set true to test in desktop emulator if width check blocks it
  const MOBILE_MAX = 768;

  function createObserver() {
    // Clean up any previous observers
    if (window._artistsObserver) {
      window._artistsObserver.disconnect();
      window._artistsObserver = null;
    }

    const isMobile = window.innerWidth <= MOBILE_MAX || TEST_MODE;
    if (!isMobile) return;

    const cards = document.querySelectorAll('.artists-grid .card');
    if (!cards.length) return;

    // Make a thin horizontal band centered on the screen.
    // We'll use rootMargin so intersection occurs when element intersects that band.
    const bandHeight = 2; // px — thin band around center
    const halfViewport = Math.floor(window.innerHeight / 2);
    const topMargin = -(halfViewport - Math.floor(bandHeight / 2));
    const bottomMargin = -(halfViewport - Math.ceil(bandHeight / 2));
    const rootMargin = `${topMargin}px 0px ${bottomMargin}px 0px`;

    // threshold 0 means any intersection with the band counts
    const options = {
      root: null,
      rootMargin,
      threshold: 0
    };

    window._artistsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the card intersects the centered band -> flip
        if (entry.isIntersecting) {
          entry.target.classList.add('flip');
        } else {
          entry.target.classList.remove('flip');
        }
      });
    }, options);

    cards.forEach(card => window._artistsObserver.observe(card));
  }

  // initialize
  createObserver();

  // Recreate on resize/orientationchange so rootMargin matches new viewport
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createObserver, 150);
  });

  window.addEventListener('orientationchange', () => {
    // slight delay so dimensions settle
    setTimeout(createObserver, 200);
  });
});


mobileLinks.forEach(link => {                                   // Close menu smoothly when a link is clicked
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');                         // Remove the 'open' class from hamburger immediately
    
    mobileMenu.style.opacity = '0';                             // Start fade-out by removing 'active' class
    mobileMenu.style.right = '-100%';                           // slide out

    
    setTimeout(() => {                                          // Optional: wait for transition to end to fully remove class
      mobileMenu.classList.remove('active');
      mobileMenu.style.opacity = '';                            // Reset inline styles so it can open again next time
      mobileMenu.style.right = '';
    }, 400);                                                    // match the CSS transition duration
  });
});


