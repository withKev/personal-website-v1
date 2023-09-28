// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", revealSections);

function revealSections() {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.5) {
      section.classList.add("active");
    }
  });
}

// Initially reveal sections that are in the viewport on page load
revealSections();

const floatingButton = document.querySelector(".fb");
let currentSectionIndex = 0;

floatingButton.addEventListener("click", function () {
  const nextSectionIndex = currentSectionIndex + 1;
  if (nextSectionIndex === sections.length - 1) {
    floatingButton.classList.remove("fa-caret-down");
    floatingButton.classList.add("fa-caret-up");
  } else {
    floatingButton.classList.remove("fa-caret-up");
    floatingButton.classList.add("fa-caret-down");
  }

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
