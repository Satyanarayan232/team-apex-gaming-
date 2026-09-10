const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

// Sticky navbar background
function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});

// Highlight current navigation item
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(item => {
                item.classList.toggle(
                    "active",
                    item.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => sectionObserver.observe(section));

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(".section, .contact, footer").forEach(section => {
    section.classList.add("reveal");
    revealObserver.observe(section);
});

// Roster filtering tabs
const rosterTabs = document.querySelectorAll(".roster-tab");
const playerCards = document.querySelectorAll(".player-card");

if (rosterTabs.length > 0) {
    rosterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const roster = tab.getAttribute("data-roster");
            rosterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            playerCards.forEach(card => {
                const cardGame = card.getAttribute("data-game");
                if (roster === "all" || cardGame === roster) {
                    card.style.display = "";
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// Quick select roster from Team section buttons
document.querySelectorAll("[data-select-roster]").forEach(btn => {
    btn.addEventListener("click", () => {
        const rosterType = btn.getAttribute("data-select-roster");
        const matchingTab = document.querySelector(`.roster-tab[data-roster="${rosterType}"]`);
        if (matchingTab) {
            matchingTab.click();
        }
    });
});
