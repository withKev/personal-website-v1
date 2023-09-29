/* SMOOTHLY SCROLLS TO SELECTED SECTIONS */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* REVEALS SECTIONS WHEN 50% IN-VIEW */

const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", revealSections);

function revealSections() {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top; // Calculates distance between TOP of viewport to TOP of section
    const windowHeight = window.innerHeight; // Calculates height of viewport AKA usable screen

    if (sectionTop < windowHeight * 0.5) {
      section.classList.add("active");
    }
  });
}

/* INITIALLY REVEALS SECTION IN-VIEW */

revealSections();

/* KEEPS TRACK OF WHICH SECTION THE USER IS LOOKING AT */

let currentSectionIndex = 0;
const floatingButton = document.querySelector(".fb");

function updateCurrentSectionIndex() {
  for (let i = 0; i < sections.length; i++) {
    updateFloatingButtonIcon();
    const section = sections[i];
    const rect = section.getBoundingClientRect();

    // Check if more than 50% of the section is in the viewport
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      currentSectionIndex = i;
      break;
    }
  }
}

window.addEventListener("scroll", updateCurrentSectionIndex);

updateCurrentSectionIndex();

function updateFloatingButtonIcon() {
  const nextSectionIndex = currentSectionIndex + 1;

  if (nextSectionIndex === sections.length) {
    floatingButton.classList.remove("fa-caret-down");
    floatingButton.classList.add("fa-caret-up");
  } else {
    floatingButton.classList.remove("fa-caret-up");
    floatingButton.classList.add("fa-caret-down");
  }
}

/* BOTTOM RIGHT SCROLL BUTTON */

floatingButton.addEventListener("click", () => {
  const nextSectionIndex = currentSectionIndex + 1;

  if (nextSectionIndex < sections.length) {
    const nextSection = sections[nextSectionIndex];
    const nextSectionTop =
      nextSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: nextSectionTop,
      behavior: "smooth",
    });

    currentSectionIndex = nextSectionIndex;
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    currentSectionIndex = 0;
  }
});

/* SHOW AND HIDE MENU */

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggleBtn");
const navClose = document.getElementById("nav-closeBtn");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav-link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/* SET ACTIVE LINKS FOR EFFECT */

const allSectionIds = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  allSectionIds.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav-menu a[href*=" + sectionId + "]"
      ),
      leftNavMenu = document.querySelector(
        ".left-nav-menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
      leftNavMenu.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
      leftNavMenu.classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", scrollActive);
