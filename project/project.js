// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Animation for `.comparisonSection`
gsap.utils.toArray(".comparisonSection").forEach(section => {
  if (!section) return; // Ensure section exists before running animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      end: () => `+=${section.offsetWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1
    },
    defaults: { ease: "none" }
  });

  const afterImage = section.querySelector(".afterImage");
  const afterImagePlace = section.querySelector(".afterImage .img-place");

  if (afterImage) {
    tl.fromTo(
      afterImage,
      { xPercent: -100, x: 0 },
      { xPercent: 0 }
    );
  }

  if (afterImagePlace) {
    tl.fromTo(
      afterImagePlace,
      { xPercent: 100, x: 0 },
      { xPercent: 0 },
      0 
    );
  }
});

// Animation for `.item` elements
document.querySelectorAll(".item").forEach(item => {
  if (!item) return; // Ensure item exists before running animation
  const triggerElement = item;
  const targetElement = item.previousElementSibling;
  
  if (!triggerElement || !targetElement) return; // Ensure both elements exist
  
  const projectCardsTimeline = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 56%",
      end: "top top",
      scrub: 1,
      markers: false
    }
  });

  projectCardsTimeline
    .to(targetElement, { scale: 0.8, duration: 1 })
});

// Initial Project Start Animation Timeline
const projectStartTimeline = gsap.timeline();

projectStartTimeline
  .to(".overlay h1", {
    opacity: 0,
    y: -60,
    duration: 1.5,
    ease: "expo.inOut"
  })
  .to(".overlay", {
    top: "-100%",
    duration: 1,
    ease: "expo.inOut"
  }, "-=1") 


// Function to apply the saved theme on page load
const applySavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const root = document.documentElement;
  const initialTheme = savedTheme || 'light';
  root.setAttribute('data-theme', initialTheme);
};

// Function to toggle the theme with overlay animation
const toggleThemeOverlayAnimation = (newTheme) => {
  const root = document.documentElement;
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.right = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = newTheme === 'dark' ? '#121212' : '#ffffff';
  overlay.style.zIndex = 1000;
  overlay.style.opacity = 0;
  overlay.style.clipPath = 'circle(0% at 100% 0%)';
  overlay.style.transition = 'clip-path 0.6s ease-in-out, opacity 0.6s ease-in-out';

  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = 0.5;
    overlay.style.clipPath = 'circle(150% at 100% 0%)';
  });

  setTimeout(() => {
    document.body.removeChild(overlay);
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('themeChanged', Date.now());
  }, 600);
};

const syncThemeAcrossPages = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === 'themeChanged') {
      const savedTheme = localStorage.getItem('theme');
      const root = document.documentElement;

      if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
      }
    }
  });
};

const initializeTheme = () => {
  applySavedTheme();
  syncThemeAcrossPages();
  const themeToggleButton = document.getElementById('theme-toggle-button');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const root = document.documentElement;
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      toggleThemeOverlayAnimation(newTheme);
    });
  }
};

initializeTheme();
