// Function to apply the saved theme on page load
const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    const initialTheme = savedTheme || 'light';
    root.setAttribute('data-theme', initialTheme);
};

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

    // Trigger the animation
    requestAnimationFrame(() => {
        overlay.style.opacity = 0.5;
        overlay.style.clipPath = 'circle(150% at 100% 0%)';
    });

    setTimeout(() => {
        document.body.removeChild(overlay);
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }, 600);
};


// Apply the saved theme when the page loads
window.addEventListener("load", () => {
    applySavedTheme();
    document.getElementById('theme-toggle-button').addEventListener('click', () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        toggleThemeOverlayAnimation(newTheme);
    });

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
    }
});


// Simple Game
const [
    userHand,
    opponentHand,
    titleGame,
    scoreLeft,
    scoreRight,
    gameCta
] = ['#hand-left', '#hand-right', '#titleGame', '#score-left', '#score-right', '#game-cta']
    .map(selector => document.querySelector(selector));

const comment = document.querySelector('#comment'); 
const buttons = document.querySelectorAll('[data-type]');
const possibilities = Object.freeze({ 1: "rock", 2: 'paper', 3: 'scissor' });
const outcomes = Object.freeze({ 1: "It's a Draw", 2: 'Try Again', 3: 'You Win!' });

const state = {
    user: { lastModifier: 'scene__hand_rock', wins: 0 },
    opponent: { lastModifier: 'scene__hand_rock', wins: 0 }
};

let isGameCtaDisplayed = false;

const comments = [
    "Staying curious about emerging technologies allows me to adapt quickly in a rapidly evolving industry.",
    "I like Figma’s Auto Layout because it saves time and keeps my designs responsive.",
    "My design approach emphasizes simplicity, clarity, and user satisfaction.",
    "Feedback from users inspires me to refine my work and strive for continuous improvement.",
    "I aim to collaborate with cross-functional teams to create products that solve real-world problems.",
    "Fun fact: I once learned how to juggle three objects in under a day."
];

// Keep track of current comment index
let currentCommentIndex = 0;

const getRandomFromObj = (obj) => Math.floor((Math.random() * Math.floor(Object.keys(obj).length) + 1));

const getLogic = (outcomes, a, b) => a === b ? outcomes[1] : (((a - b + 3) % 3 === 1)) ? outcomes[2] : outcomes[3];

const getModifier = (modifier) => `scene__hand_${modifier}`;

const displayGameCta = () => {
    if (!isGameCtaDisplayed) {
        gameCta.style.opacity = '1';
        comment.style.opacity = '1'; 
        isGameCtaDisplayed = true;
    }
};

const getOutcomeAndUpdateDOM = (e) => {
    if (!isGameCtaDisplayed) {
        displayGameCta(); 
    }

    const choiceDataType = Number(e.target.getAttribute('data-type'));
    const opponentChoice = getRandomFromObj(possibilities);
    updateDOM(opponentChoice, choiceDataType);
};

const updateDOM = (opponentChoice, choiceDataType) => {
    userHand.classList.remove(state.user.lastModifier);
    opponentHand.classList.remove(state.opponent.lastModifier);
    state.user.lastModifier = getModifier(possibilities[choiceDataType]);
    state.opponent.lastModifier = getModifier(possibilities[opponentChoice]);
    userHand.classList.add(state.user.lastModifier);
    opponentHand.classList.add(state.opponent.lastModifier);

    const outcome = getLogic(outcomes, opponentChoice, choiceDataType);
    state.user.wins = outcome === 'You Win!' ? state.user.wins + 1 : state.user.wins;
    state.opponent.wins = outcome === 'Try Again' ? state.opponent.wins + 1 : state.opponent.wins;
    scoreLeft.textContent = state.user.wins;
    scoreRight.textContent = state.opponent.wins;
    titleGame.textContent = outcome;

    // Update comment text in sequence
    comment.querySelector('p').textContent = comments[currentCommentIndex];
    currentCommentIndex = (currentCommentIndex + 1) % comments.length;

    // Re-trigger animation
    comment.classList.remove('comment-animate');
    void comment.offsetWidth; 
    comment.classList.add('comment-animate');

    const partyElement = document.getElementById('party');
    if (outcome === 'You Win!') {
        partyElement.style.opacity = '1';
    } else {
        partyElement.style.opacity = '0';
    }
};

buttons.forEach((button) => button.addEventListener('click', getOutcomeAndUpdateDOM));
