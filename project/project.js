// Animation for `.comparisonSection`
gsap.utils.toArray(".comparisonSection").forEach(section => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      end: () => "+=" + section.offsetWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1
    },
    defaults: { ease: "none" }
  });

  tl.fromTo(
    section.querySelector(".afterImage"), 
    { xPercent: -100, x: 0 }, 
    { xPercent: 0 }
  )
  .fromTo(
    section.querySelector(".afterImage .img-place"), 
    { xPercent: 100, x: 0 }, 
    { xPercent: 0 }, 
    0
  );
});

// Sticky Zoom Out Animation for `.StickyZoom`
if (window.innerWidth >= 767) {
  gsap.timeline({
    defaults: { ease: 'power2.easeOut' },
    scrollTrigger: {
      markers: false,
      trigger: '.StickyZoom',
      start: 'top',
      end: 'bottom center',
      pin: true,
      toggleActions: "play none reverse none"
    }
  })
  .fromTo(
    '.image-area2', 
    { clipPath: 'inset(20% 20% 20% 20%)', scale: 0.8 }, 
    { clipPath: 'inset(10% 10% 10% 10%)', scale: 1, duration: 2 }
  );
}



// Initial Project Start Animation Timeline
let projectStartTimeline = gsap.timeline();

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
    delay: 0,
    ease: "expo.inOut"
  })
  .from(".container.enter", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  })
  .from(
    ".container .row img", 
    {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power2.out"
    }, 
    "-=1"
  )
  .from(
    ".container .row h2", 
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out"
    }, 
    "-=0.8"
  )
  .from(
    ".container .row p", 
    {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out"
    }, 
    "-=0.6"
  )
  .from(
    ".container .row .col-sm-6", 
    {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out"
    }, 
    "-=0.4"
  );


// Function to toggle the theme
const toggleTheme = () => {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
};
const applySavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const root = document.documentElement;
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    root.setAttribute('data-theme', 'light'); 
  }
};
document.addEventListener('DOMContentLoaded', applySavedTheme);
document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
