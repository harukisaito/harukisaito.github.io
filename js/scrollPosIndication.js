"use strict";

const mainNavLinks = document.querySelectorAll("nav ul li ul li a");
const mainSections = document.querySelectorAll("main section");

let lastId;
let cur = [];


const updateIndication = () => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop + 100 &&
      section.offsetTop + section.offsetHeight > fromTop + 100
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
}

updateIndication();


window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop + 100 &&
      section.offsetTop + section.offsetHeight > fromTop + 100
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});
