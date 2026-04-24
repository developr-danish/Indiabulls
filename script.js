/* Scroll Animation Section JS Start From Here */
const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

const scrollRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  }
);

scrollRevealElements.forEach((element) => {
  scrollRevealObserver.observe(element);
});
/* Scroll Animation Section JS End Here */

/* Green Life Carousel JS Start From Here */
const fadeCarousel = document.querySelector("[data-fade-carousel]");

if (fadeCarousel) {
  const fadeSlides = Array.from(fadeCarousel.querySelectorAll(".green-life-slide"));
  let activeSlideIndex = 0;

  setInterval(() => {
    fadeSlides[activeSlideIndex].classList.remove("is-active");
    activeSlideIndex = (activeSlideIndex + 1) % fadeSlides.length;
    fadeSlides[activeSlideIndex].classList.add("is-active");
  }, 3200);
}
/* Green Life Carousel JS End Here */

/* Lifestyle Marquee Section JS Start From Here */
const marqueeTrack = document.querySelector("[data-marquee-track]");
const marqueeSpeed = 0.7;

if (marqueeTrack) {
  let marqueeOffset = 0;

  const getMarqueeDistance = () => {
    const marqueeCards = marqueeTrack.querySelectorAll(".lifestyle-marquee-card");
    const originalCards = Array.from(marqueeCards).slice(0, marqueeCards.length / 2);
    const marqueeGap = parseFloat(getComputedStyle(marqueeTrack).gap) || 0;

    return originalCards.reduce((total, card) => total + card.getBoundingClientRect().width, 0) +
      marqueeGap * originalCards.length;
  };

  let marqueeDistance = getMarqueeDistance();

  const animateMarquee = () => {
    marqueeOffset -= marqueeSpeed;

    if (Math.abs(marqueeOffset) >= marqueeDistance) {
      marqueeOffset = 0;
    }

    marqueeTrack.style.transform = `translateX(${marqueeOffset}px)`;
    requestAnimationFrame(animateMarquee);
  };

  window.addEventListener("resize", () => {
    marqueeDistance = getMarqueeDistance();
  });

  requestAnimationFrame(animateMarquee);
}
/* Lifestyle Marquee Section JS End Here */

/* Popup Section JS Start From Here */
const modal = document.querySelector("[data-modal]");
const openButton = document.querySelector("[data-modal-open]");
const closeButtons = document.querySelectorAll("[data-modal-close]");

const openModal = () => {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
};

openButton?.addEventListener("click", openModal);

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeModal();
  }
});
/* Popup Section JS End Here */
