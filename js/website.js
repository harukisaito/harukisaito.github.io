"use strict";

const mainNavLinks = document.querySelectorAll("nav ul li ul li a");
const mainSections = document.querySelectorAll("main section");

let lastId;
let cur = [];


const updateIndication = () => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if(section == null)
    {
      return;
    }

    if (
      section.offsetTop <= fromTop + 200 &&
      section.offsetTop + section.offsetHeight > fromTop + 200
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

fadeInPage();

function fadeInPage() {
  if (!window.AnimationEvent) { return; }
  let fader = document.getElementById('fader');
    fader.classList.add('fade-out');

}

document.addEventListener('DOMContentLoaded', function() {
  if (!window.AnimationEvent) { return; }
  let anchors = document.getElementsByTagName('a');
    
    for (var idx=0; idx<anchors.length; idx+=1) {
      if (anchors[idx].hostname !== window.location.hostname ||
        anchors[idx].pathname === window.location.pathname) {
        continue;
    }
    anchors[idx].addEventListener('click', function(event) {
      let fader = document.getElementById('fader'),
          anchor = event.currentTarget;
      
      let listener = function() {
          window.location = anchor.href;
          fader.removeEventListener('animationend', listener);
      };
      fader.addEventListener('animationend', listener);
      
      event.preventDefault();
      fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  let fader = document.getElementById('fader');
  fader.classList.remove('fade-in');
});
