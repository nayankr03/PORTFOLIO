// ===== Navbar background change on scroll =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("solid");
  } else {
    navbar.classList.remove("solid");
  }
});

// ===== Skills bar animation =====
const skillBars = document.querySelectorAll(".progress-line span");
const skillsSection = document.querySelector(".skills-bar");
let skillsAnimated = false;

function animateSkills() {
  if (!skillsAnimated) {
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (sectionPosition < screenPosition - 100) {
      skillBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress");
        bar.style.width = progress;
      });
      skillsAnimated = true;
    }
  }
}

window.addEventListener("scroll", animateSkills);

// ===== Mobile menu toggle =====
const menuItems = document.querySelector(".menu-items");
const navbarContainer = document.querySelector(".navbar-container");

// Create hamburger menu button
const menuBtn = document.createElement("div");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "&#9776;"; // ☰ icon
menuBtn.style.fontSize = "1.8rem";
menuBtn.style.color = "#fff";
menuBtn.style.cursor = "pointer";
menuBtn.style.display = "none"; // hide for large screens
navbarContainer.appendChild(menuBtn);

menuBtn.addEventListener("click", () => {
  menuItems.classList.toggle("active");
});

// Show menu button only for small screens
function checkScreenSize() {
  if (window.innerWidth <= 768) {
    menuBtn.style.display = "block";
  } else {
    menuBtn.style.display = "none";
    menuItems.classList.remove("active");
  }
}

window.addEventListener("resize", checkScreenSize);
checkScreenSize();

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    // Close mobile menu after clicking a link
    if (menuItems.classList.contains("active")) {
      menuItems.classList.remove("active");
    }
  });
});

// ===== Form submission with AJAX (Formspree) =====
const form = document.querySelector(".form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector(".sendMessage-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Oops! Something went wrong.");
      }
    } catch (error) {
      alert("⚠ Network error. Please try again later.");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  });
}
