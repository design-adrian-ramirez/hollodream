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
