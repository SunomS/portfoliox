window.addEventListener("load", () => {
    // Animate Preloader 
    const preloader = document.getElementById("preloader");
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            scale: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = "none";
            }
        });
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Helper Animate Overlay section
    const addHeroText = () => {
        const heroTextElement = document.querySelector(".hero-text");
        if (heroTextElement) {
            heroTextElement.classList.add("visible");
        }
    };

    const removeHeroText = () => {
        const heroTextElement = document.querySelector(".hero-text");
        if (heroTextElement) {
            heroTextElement.classList.remove("visible");
        }
    };

    // Animate Overlay section
    gsap.to(".overlay-text", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".enter",
            start: "1% top",
            end: "12% top",
            scrub: true
        },
        onComplete: addHeroText,
        onReverseComplete: removeHeroText,
    });

    // Animate Hero section
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".enter",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true
        }
    });

    heroTimeline
        .to("img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut",
        })
        .to(
            ".section.hero",
            {
                scale: 1.1,
                transformOrigin: "center center",
                ease: "power1.inOut",
            },
            "<"
        );

    // Animate Navbar section
    gsap.to(".custom-navbar", {
        scrollTrigger: {
            trigger: ".enter",
            start: "200vh top",
            toggleClass: { targets: ".custom-navbar", className: "visible" }
        }
    });

    // Animate Footer section
    const contacts = document.querySelectorAll(".contact");
    const contactCards = document.querySelectorAll(".contact-card");
    const totalCards = Math.min(contacts.length, contactCards.length);

    for (let i = 0; i < totalCards; i++) {
        const wrapper = contacts[i];
        const card = contactCards[i];

        let scale = 1,
            rotation = 0;
        if (i !== totalCards - 1) {
            scale = 0.9 + 0.025 * i;
            rotation = -10;
        }

        gsap.to(card, {
            scale: scale,
            rotationX: rotation,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top 0%",
                end: "bottom 100%",
                endTrigger: ".end",
                scrub: 1,
                pin: wrapper,
                pinSpacing: false,
                markers: false,
                id: (i + 1).toString(),
            },
        });
    }

    // Carousel Function
    document.querySelectorAll('.carousel-row').forEach(carousel => {
        let isDown = false, startX, scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        let startTouchX, startScrollLeft;
        carousel.addEventListener('touchstart', (e) => {
            startTouchX = e.touches[0].pageX;
            startScrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].pageX;
            const touchMove = (startTouchX - touchX) * 6;
            carousel.scrollLeft = startScrollLeft + touchMove;
        });
    });

    //check mobile device
    function isMobile() {
        return window.innerWidth < 767;
    }

    // Animate Work Item
    if (!isMobile()) {
        const carouselRows = document.querySelectorAll('.carousel-row');
        carouselRows.forEach(row => {
            const workItems = row.querySelectorAll('.work-item:not(.first-card)');
            workItems.forEach((item, index) => {
                gsap.fromTo(item,
                    { opacity: 0, x: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        delay: index * 0.3,
                        ease: "power1.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "80% top",
                            toggleActions: "play none none none",
                        }
                    }
                );
            });
        });

        // Animate Contact Item
        const cards = document.querySelectorAll('.side-card');
        gsap.from(cards, {
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-card',
                start: 'top 30%'
            }
        });
    }


});


const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
  };
  
  // Example usage: add an event listener to a button
  document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
  