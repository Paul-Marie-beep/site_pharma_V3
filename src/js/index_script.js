"use strict";

const main = document.querySelector(".main");
const navBar = document.querySelector(".navbar");
const categories = document.querySelector(".categories");
const items = document.querySelectorAll(".item");
const momentProducts = document.querySelector(".moment-products");
const [...momentProductsImages] = document.querySelectorAll(".product__pic");

const arrowLeft = document.querySelector(".arrows__arrow--left");
const arrowRight = document.querySelector(".arrows__arrow--right");
let i = 1;
let carryOn = true;
let allowKey;

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

const backgroundObserver = new IntersectionObserver(changeBackground, backgroundOptions);
backgroundObserver.observe(categories);

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

const categoriesObserver = new IntersectionObserver(revealSection, categoriesOptions);
categoriesObserver.observe(categories);
categories.classList.add("section-hidden");

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

// We want to replace the 'lazy' images by the real ones when the user scroll donws on the page
const loadProductImages = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  momentProductsImages.forEach((img) => {
    loadImage(img);
  });

  observer.unobserve(entry.target);
};

const productImagesOptions = {
  root: null,
  threshold: 0,
  ///////////////
  // À affiner
  rootMargin: "+50px",
  ///////////////
};

const productImagesObserver = new IntersectionObserver(loadProductImages, productImagesOptions);
productImagesObserver.observe(momentProducts);

const revealProductsOptions = {
  root: null,
  threshold: 0.4,
};

const productsObserver = new IntersectionObserver(revealSection, revealProductsOptions);
productsObserver.observe(momentProducts);
momentProducts.classList.add("section-hidden");

const allowKeyboardUse = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    allowKey = true;
  } else {
    allowKey = false;
  }
};

const allowKeyObserver = new IntersectionObserver(allowKeyboardUse, productImagesOptions);
allowKeyObserver.observe(momentProducts);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour le slider des produits du moment

// Remove the first picture of the node list of the images since it has to load immediatly
momentProductsImages.shift();

////Add lazy class to the lazy images
momentProductsImages.forEach((img) => {
  img.classList.add("icone-lazy");
});

const moveTitlesRight = function () {
  const currentTitle = document.querySelector(`.titles__title--${i}`);
  const newtitle = document.querySelector(`.titles__title--${i - 1}`);
  const allTitles = document.querySelectorAll(".titles__title");

  currentTitle.classList.add("hidden");
  newtitle.classList.remove("hidden");
  // On doit bien mettre i-1 car l'incrémentation se fait après qu'on est ajouté la classe que l'on veut enlever, donc on a un décalage
  allTitles.forEach((el) => el.classList.remove(`translate--${i - 1}00`));
};

const moveTitlesLeft = function () {
  const currentTitle = document.querySelector(`.titles__title--${i}`);
  const newtitle = document.querySelector(`.titles__title--${i + 1}`);
  const allTitles = document.querySelectorAll(".titles__title");

  currentTitle.classList.add("hidden");
  newtitle.classList.remove("hidden");
  allTitles.forEach((el) => el.classList.add(`translate--${i}00`));
};

const moveDescriptionsRight = function () {
  const currentDescription = document.querySelector(`.descriptions__description--${i}`);
  const newDescription = document.querySelector(`.descriptions__description--${i - 1}`);
  const allDescriptions = document.querySelectorAll(".descriptions__description");

  currentDescription.classList.add("hidden");
  newDescription.classList.remove("hidden");
  // On doit bien mettre i-1 car l'incrémentation se fait après qu'on est ajouté la classe que l'on veut enlever, donc on a un décalage
  allDescriptions.forEach((el) => el.classList.remove(`translate--${i - 1}00`));
};

const moveDescriptionsLeft = function () {
  const currentDescription = document.querySelector(`.descriptions__description--${i}`);
  const newDescription = document.querySelector(`.descriptions__description--${i + 1}`);
  const allDescriptions = document.querySelectorAll(".descriptions__description");

  currentDescription.classList.add("hidden");
  newDescription.classList.remove("hidden");
  allDescriptions.forEach((el) => el.classList.add(`translate--${i}00`));
};

const moveImagesRight = function () {
  const currentImage = document.querySelector(`.product__pic--${i}`);
  currentImage.classList.remove(`translate--${i - 1}00`);
  currentImage.classList.add("hidden");
};

const moveimagesLeft = function () {
  const nextImage = document.querySelector(`.product__pic--${i + 1}`);
  nextImage.classList.add(`translate--${i}00`);
  nextImage.classList.remove("hidden");
};

const retreatProgressBar = function (index) {
  setTimeout(function () {
    const currentBall = document.querySelector(`.stepper__ball--${index - 1}`);
    currentBall.classList.add("unscale");
    carryOn = true;
  }, 200);
};

const advanceProgressBar = function () {
  const treatedBall = document.querySelector(`.stepper__ball--${i}`);
  treatedBall.classList.remove("unscale");
};

const atrophyGreenBall = function () {
  const nextGreenBall = document.querySelector(`.green--${i}`);
  nextGreenBall.classList.add("atrophy");
  // On bloque la possibilité de cliquer sur une autre slide avant que la barre verte ne soit rétractée.
  carryOn = false;
};

const revealGreenBall = function (index) {
  // On met une paramètre dans la fonction pour être sûr que l'incrémentation du timer ne sera pas effectuée avant la fin de l'intervalle.
  carryOn = false;
  setTimeout(function () {
    const nextGreenBall = document.querySelector(`.green--${index + 1}`);
    nextGreenBall.classList.remove("atrophy");
    carryOn = true;
  }, 300);
};

const leftAction = function () {
  // On met une guard si on est sur la première slide
  if (i === 1) return;
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  // Si on était sur la  dernière slide on remet la flèche de droite entièrement visible
  if (i === 4) arrowRight.style.opacity = 1;
  moveTitlesRight();
  moveDescriptionsRight();
  moveImagesRight();
  retreatProgressBar(i);
  atrophyGreenBall();

  i--;
  // Si on est sur la première slide, on rend la flèche de gauche transparente.
  if (i === 1) arrowLeft.style.opacity = 0.5;
};

const rightAction = function () {
  // On met une guard arrivé au bout des slides
  if (i === 4) return;
  // Si c'est le premier appui sur la flèche on remet la flèche de gauche à la bonne couleur.
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  if (i === 1) arrowLeft.style.opacity = 1;
  moveTitlesLeft();
  moveDescriptionsLeft();
  moveimagesLeft();
  advanceProgressBar();
  revealGreenBall(i);
  i++;
  // On met la flèche en transparence une fois arrivé au bout des slides.
  if (i === 4) arrowRight.style.opacity = 0.5;
};

// function to handle the user's order via the keyboard
const stepperKey = function () {
  console.log("go");
  document.addEventListener("keydown", function (event) {
    console.log("clavier :", event.key);
    console.log("allowKey :", allowKey);
    if (event.key === "ArrowLeft" && allowKey) {
      leftAction();
    }
    if (event.key === "ArrowRight" && allowKey) {
      rightAction();
    }
  });
};
stepperKey();

// function to handle the user's order via the mouse
const stepperClick = function () {
  arrowRight.addEventListener("click", rightAction);
  arrowLeft.addEventListener("click", leftAction);
};
stepperClick();
