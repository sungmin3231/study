"use strict";

const navbarToggle = document.querySelector(".navbar__toggleBtn");
const navMenu = document.querySelector(".navbar__menu");
const navLink = document.querySelector(".navbar__links");
navbarToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navLink.classList.toggle("active");
});
