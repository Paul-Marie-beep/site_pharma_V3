"use strict";

const main = document.querySelector(".main");
const navBar = document.querySelector(".navbar");
const categories = document.querySelector(".categories");
const items = document.querySelectorAll(".item");

// Function to handle the change of opacity when we hover on the links of the navbar
const handlerover = function (event) {
  if (event.target.classList.contains("navlink")) {
    const link = event.target;
    const siblings = link.closest(".navbar").querySelectorAll(".navlink");

    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = this;
    });
  } else {
    document.querySelectorAll(".navlink").forEach((element) => (element.style.opacity = 1));
  }
};

navBar.addEventListener("mouseover", handlerover.bind(0.5));
navBar.addEventListener("mouseout", handlerover.bind(0.5));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sticky nav
const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptions = {
  root: null,
  threshold: 0.55,
};

const navObserver = new IntersectionObserver(obsCallback, obsOptions);
navObserver.observe(main);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reveal categories

const changeBackground = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  console.log("trig");

  items.forEach((item) => {
    item.style = item.dataset.style;
  });

  observer.unobserve(entry.target);
};

const backgroundOptions = {
  root: null,
  threshold: 0,
  ///////////////
  // À affiner
  rootMargin: "+50px",
  ///////////////
};

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const categoriesOptions = {
  root: null,
  threshold: 0.5,
};

const backgroundObserver = new IntersectionObserver(changeBackground, backgroundOptions);
backgroundObserver.observe(categories);

const categoriesObserver = new IntersectionObserver(revealSection, categoriesOptions);
categoriesObserver.observe(categories);
categories.classList.add("section-hidden");
