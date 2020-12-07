"use strict";

const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

addEventListener("load", () => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.width / 2;

  function coordinates(x, y) {
    tag.innerHTML = `
    좌표 (${x}px, ${y}px)
  `;
  }

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(`${x}, ${y}`);

    vertical.style.transform = `translateX(${x}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px, ${
      y - targetHalfHeight
    }px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;

    coordinates(x, y);
  });
});
