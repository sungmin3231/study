"use strict";

// JSON 파일에서 항목 가져 오기
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// 주어진 항목으로 목록 업데이트
function displayItems(items) {
  const container = document.querySelector(".items");
  //   innerHTML은 요소내에 포함된 HTML 또는 XML 마크업을 가져오거나 설정
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 주어진 데이터 항목에서 html 목록 항목 만들기
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="items__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

//  logo, button 을 클릭했을때 설정
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}
// filter된 데이터값 가져오기
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
