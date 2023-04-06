"use strict";

const navBar = document.querySelector(".navbar");

const cardsNat = document.querySelector(".produits-naturels-presentation");
console.log("cardsNat :", cardsNat);
const cardPics = document.querySelectorAll(".cardpic");

const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

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

// Nav sticky
const navHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) navBar.classList.add("nav-sticky");
  else navBar.classList.remove("nav-sticky");
};

const obsOptionsNat = {
  root: null,
  threshold: 0.8,
  rootMargin: `-${navHeight + 30}px`,
};

const navObserverNat = new IntersectionObserver(obsCallback, obsOptionsNat);

navObserverNat.observe(cardsNat);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faire apparaître la grid

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.add("trans");
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const revealPara = function (entries, observer) {
  revealSection(entries, observer);
};

const paraOptions = {
  root: null,
  threshold: 0.25,
};

const paraObserver = new IntersectionObserver(revealPara, paraOptions);
paraObserver.observe(cardsNat);

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

const revealImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  cardPics.forEach((image) => {
    loadImage(image);
  });
  observer.unobserve(entry.target);
};

const cardPicsOptions = {
  root: null,
  threshold: 0,
  rootMargin: "+30px",
};

const cardPicsObserver = new IntersectionObserver(revealImages, cardPicsOptions);
cardPicsObserver.observe(cardsNat);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const notIfMobile = function () {
  // On ne le fait pas sur tel
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
    return;

  cardsNat.classList.add("section-hidden");
  cardPics.forEach((div) => {
    div.classList.add("icone-lazy");
  });
};

notIfMobile();
