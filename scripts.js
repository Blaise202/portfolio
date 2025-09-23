
document.addEventListener("DOMContentLoaded", () => {
  // --- Fade-in on load ---
  window.onload = () => {
    document.body.classList.remove("opacity-0");
  };

  // --- Sticky Header ---
  const header = document.getElementById("header");
  const scrolledClasses = [
    "bg-[#1C1C1C]/80",
    "backdrop-blur-sm",
    "shadow-lg",
    "shadow-lime-500/5",
  ];
  const transparentClass = "bg-transparent";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.remove(transparentClass);
      header.classList.add(...scrolledClasses);
    } else {
      header.classList.remove(...scrolledClasses);
      header.classList.add(transparentClass);
    }
  });

  // --- Project Carousel ---
  const track = document.getElementById("carousel-track");
  if (track) {
    const nextButton = document.getElementById("carousel-next");
    const prevButton = document.getElementById("carousel-prev");
    const dotsContainer = document.getElementById("carousel-dots");
    const dots = Array.from(dotsContainer.children);
    const slideCount = track.children.length;
    let currentIndex = 0;
    let slideInterval;

    const updateCarousel = (targetIndex) => {
      const newIndex = (targetIndex + slideCount) % slideCount;

      track.style.transform = `translateX(-${newIndex * 100}%)`;

      dots[currentIndex].classList.remove("bg-lime-400", "scale-125");
      dots[currentIndex].classList.add("bg-gray-600");

      dots[newIndex].classList.add("bg-lime-400", "scale-125");
      dots[newIndex].classList.remove("bg-gray-600");

      currentIndex = newIndex;
    };

    const startAutoSlide = () => {
      slideInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5000);
    };

    const resetAutoSlide = () => {
      clearInterval(slideInterval);
      startAutoSlide();
    };

    nextButton.addEventListener("click", () => {
      updateCarousel(currentIndex + 1);
      resetAutoSlide();
    });

    prevButton.addEventListener("click", () => {
      updateCarousel(currentIndex - 1);
      resetAutoSlide();
    });

    dotsContainer.addEventListener("click", (e) => {
      const targetDot = e.target.closest("button");
      if (!targetDot) return;
      const targetIndex = dots.findIndex((dot) => dot === targetDot);
      if (targetIndex !== currentIndex) {
        updateCarousel(targetIndex);
        resetAutoSlide();
      }
    });

    startAutoSlide();
  }
});