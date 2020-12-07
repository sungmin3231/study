"use strict";

const find = document.querySelector(".find");
const rabbit = document.querySelector(".rabbits");

find.addEventListener("click", () => {
  rabbit.scrollIntoView({ behavior: "smooth", block: "center" });
});
