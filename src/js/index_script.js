"use strict";

const navBar = document.querySelector(".navbar");
const title = document.querySelector(".titre");
const subTitle = document.querySelector(".titre__sous");
const containerOne = document.querySelector(".");

// Function to handle the change of opacity when we hover on the links of the navbar
const handlerover = function (event) {
  if (event.target.classList.contains("navlink")) {
    const link = event.target;
    const siblings = link.closest(".navbar").querySelectorAll(".navlink");

    // link.classList.toggle("border-bottom");

    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = this;
    });
  } else {
    document.querySelectorAll(".navlink").forEach((element) => (element.style.opacity = 1));
  }
};

navBar.addEventListener("mouseover", handlerover.bind(0.5));
navBar.addEventListener("mouseout", handlerover.bind(0.5));

// We hide the title and one the fade in animation is finisshed, we set the opacity to 1

const fadeInHelper = function (div, time) {
  const delay = time * 1000;
  div.style.opacity = 0;
  setTimeout(() => {
    div.style.opacity = 1;
  }, delay);
};

fadeInHelper(title, 1.2);
fadeInHelper(subTitle, 1.5);
