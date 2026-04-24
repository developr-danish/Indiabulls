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
const callbackForm = document.querySelector("[data-callback-form]");
const callbackFields = callbackForm ? Array.from(callbackForm.querySelectorAll("input[name]")) : [];

const resetCallbackFormState = () => {
  callbackForm?.classList.remove("is-submitted");
  callbackFields.forEach((field) => {
    field.classList.remove("is-invalid");
    const errorNode = callbackForm.querySelector(`[data-error-for="${field.name}"]`);
    if (errorNode) {
      errorNode.textContent = "";
    }
  });
};

const validators = {
  name: (value) => {
    if (!value.trim()) {
      return "Please enter your name.";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }
    return "";
  },
  email: (value) => {
    if (!value.trim()) {
      return "Please enter your email address.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) {
      return "Please enter a valid email address.";
    }
    return "";
  },
  mobile: (value) => {
    if (!value.trim()) {
      return "Please enter your mobile number.";
    }
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      return "Mobile number must be 10 digits.";
    }
    return "";
  },
};

const validateField = (field) => {
  const validator = validators[field.name];
  if (!validator || !callbackForm) {
    return true;
  }

  const errorMessage = validator(field.value);
  const errorNode = callbackForm.querySelector(`[data-error-for="${field.name}"]`);

  field.classList.toggle("is-invalid", Boolean(errorMessage));

  if (errorNode) {
    errorNode.textContent = errorMessage;
  }

  return !errorMessage;
};

const openModal = () => {
  resetCallbackFormState();
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

callbackFields.forEach((field) => {
  field.addEventListener("input", () => {
    validateField(field);
  });
});

callbackForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const isFormValid = callbackFields.every((field) => validateField(field));

  if (!isFormValid) {
    return;
  }

  callbackForm.classList.add("is-submitted");
  callbackForm.reset();
});
/* Popup Section JS End Here */
