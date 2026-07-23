document.addEventListener('DOMContentLoaded', () => {
    /* ===== Hamburger Menu ===== */
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileMenu = document.getElementById('menu-items');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    hamburgerIcon?.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    /* ===== Dark / Light Mode Toggle ===== */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");

    // Load saved theme
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        if (themeIcon) themeIcon.className = "fa-solid fa-sun";
    }

    themeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");

        if (themeIcon) {
            themeIcon.className = isLight
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";
        }

        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
});

/* ===== Scroll-based Animations & Active Nav ===== */
const sections = document.querySelectorAll('section, .home-content');
const navLinks = document.querySelectorAll('.menu-items li a');
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll(".skills .bar span");
let skillsAnimated = false;

function handleScroll() {
    const top = window.scrollY;

    navLinks.forEach(link => link.classList.remove('active'));

    sections.forEach(sec => {
        const offset = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (id && top >= offset && top < offset + height) {
            const targetLink = document.querySelector(`a[href="#${id}"]`);
            targetLink?.classList.add('active');
        }
    });

    /* Animate Skills */
    if (skillsSection && !skillsAnimated) {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (sectionPosition < screenPosition - 100) {
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            skillsAnimated = true;
        }
    }
}

let throttleTimer;
window.addEventListener('scroll', () => {
    if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
            handleScroll();
            throttleTimer = null;
        }, 200);
    }
});

/* ===== Smooth Scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* ===== Contact Form Submission (Formspree) ===== */
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
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                showPopup("✅ Message sent successfully!");
                form.reset();
            } else {
                showPopup("❌ Something went wrong!");
            }
        } catch (error) {
            showPopup("⚠ Network error. Please try again.");
        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    });
}

/* ===== Popup Notification ===== */
function showPopup(message) {
    const popupContainer = document.getElementById("popup");
    if (!popupContainer) return;

    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = message;

    popupContainer.appendChild(popup);

    setTimeout(() => popup.classList.add("show"), 100);
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

/* ===== Typed.js ===== */
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: [
            'Front End Developer',
            'BCA (DS & AI) Student',
            'Google Student Ambassador'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
}
