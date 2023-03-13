"use strict";

/////////////////
const containerElement = document.querySelector(".container");
const slides = document.querySelectorAll(".carousel");
const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");
const dotsContainer = document.querySelector(".dots");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
const maxSlide = slides.length;

// Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-slide="${i}">&nbsp;</button>`
    );
  });
};

function activateDot(slide) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot--active"));

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
}

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${120 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Prevous slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

// Event handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    // the same one, down one is destructuring
    // const slide = e.target.dataset.slide;
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
