document.addEventListener("DOMContentLoaded", () => {
    const mountains = document.querySelectorAll(".mountain");
    const mountainRange = document.querySelector(".mountain-range");
    const atmosphere = document.querySelector(".atmosphere");

    // Initialiseer GSAP timeline voor mountain animation
    // Dit zorgt voor de animatie bij HOVER (x en scale veranderen)
    const mountainTL = gsap.timeline({ paused: true });

    mountains.forEach((mountain, index) => {
        const depth = parseFloat(mountain.getAttribute("data-depth"));
        mountainTL.to(
            mountain,
            {
                // De bergen met een hogere 'depth' (achteraan) bewegen minder
                x: -100 * depth,
                scale: 1 + 0.2 * depth,
                duration: 1.5,
                ease: "power2.inOut",
            },
            0
        );
    });

    // Hover effect
    mountainRange.addEventListener("mouseenter", () => mountainTL.play());
    mountainRange.addEventListener("mouseleave", () => mountainTL.reverse());

    // Parallax effect op scroll
    // Dit zorgt voor de animatie bij SCROLL (y veranderen)
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        
        // De bergen bewegen met 50% van de scroll (scrollY * 0.5)
        // en bewegen met een lichte vertraging (stagger: 0.05)
        gsap.to(mountains, {
            y: scrollY * 0.5,
            stagger: 0.05,
            ease: "none",
        });
        
        // Bonus: Laat de atmosfeer (mist/sterren) ook bewegen, maar trager
        gsap.to(atmosphere, {
            y: scrollY * 0.2, 
            ease: "none",
        });
    });

    // Dynamic sky color based on time of day
    const updateSkyGradient = () => {
        const hour = new Date().getHours();
        const isDaytime = hour >= 6 && hour < 18;
        document.documentElement.style.setProperty(
            "--color-sky-start",
            isDaytime ? "#c9d6ff" : "#0a0a23"
        );
        document.documentElement.style.setProperty(
            "--color-sky-end",
            isDaytime ? "#e2e2e2" : "#16213e"
        );
        // Update de zichtbaarheid van sterren
        gsap.to(".stars", {
            opacity: isDaytime ? 0 : 0.7,
            duration: 1,
        });
    };

    updateSkyGradient();
    setInterval(updateSkyGradient, 60000);
});
