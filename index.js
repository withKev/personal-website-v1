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
