document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileMenu = document.getElementById('menu-items');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    // Toggle Menu
    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // Reset on desktop resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ===== Scroll-based Animations =====
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
        if (id) {
            const targetLink = document.querySelector(`a[href="#${id}"]`);
            if (top >= offset && top < offset + height) {
                if (targetLink) targetLink.classList.add('active');
            }
        }
    });

    // Animate skill bars
    if (skillsSection && !skillsAnimated) {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        if (sectionPosition < screenPosition - 100) {
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
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

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===== Contact Form Submission =====
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
                showPopup("✅ Message sent successfully!");
                form.reset();
            } else {
                showPopup("❌ Oops! Something went wrong.");
            }
        } catch (error) {
            showPopup("⚠ Network error. Please try again later.");
        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    });
}

// ===== Popup Notification =====
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

// ===== Typing Animation =====
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ['Undergraduate Student', 'Front End Developer', 'Learner'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
}
