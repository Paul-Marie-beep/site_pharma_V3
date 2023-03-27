"use strict";

const navBar = document.querySelector(".navbar");
const title = document.querySelector(".titre__sur");
const subTitle = document.querySelector(".titre__sous");

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
