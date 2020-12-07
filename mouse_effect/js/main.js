"use strict";

const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

function coordinates(x, y) {
  tag.innerHTML = `
    좌표 (${x}px, ${y}px)
  `;
}

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  console.log(`${x}, ${y}`);

  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.top = `${y}px`;
  tag.style.left = `${x}px`;

  coordinates(x, y);
});
