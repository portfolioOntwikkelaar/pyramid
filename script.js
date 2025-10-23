import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const mountains = document.querySelectorAll(".mountain");
  const mountainRange = document.querySelector(".mountain-range");
  const atmosphere = document.querySelector(".atmosphere");

  // Initialize GSAP timeline for mountain animation
  const mountainTL = gsap.timeline({ paused: true });

  mountains.forEach((mountain, index) => {
    const depth = parseFloat(mountain.getAttribute("data-depth"));
    mountainTL.to(
      mountain,
      {
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

  // Parallax effect on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    gsap.to(mountains, {
      y: scrollY * 0.5,
      stagger: 0.05,
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
  };

  updateSkyGradient();
  setInterval(updateSkyGradient, 60000);
});
