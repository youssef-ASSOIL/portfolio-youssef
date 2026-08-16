// Always open the page at the top (mobile browsers otherwise restore the last scroll position)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Dark / Light theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

function syncThemeIcon() {
    if (!themeIcon) return;
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
}
syncThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        if (isLight) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
        syncThemeIcon();
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active");
    if (navMenu) navMenu.classList.remove("active");
}));

// Smooth Scrolling (Updated)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// ... existing smooth scroll code ...
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form (opens the visitor's email client with the message pre-filled)
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        const subject = `Nouveau message de ${name} — Portfolio`;
        const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        window.location.href = `mailto:assoilyoussef02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Scroll reveal animations
const revealTargets = document.querySelectorAll(
    '.skill-card, .portfolio-card, .timeline-item, .section-title, .eyebrow, .contact-info, .contact-form, .architecture-intro, .arch-window'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
} else {
    revealTargets.forEach(el => el.classList.add('in-view'));
}

// Terminal typing animation
const terminalOutput = document.getElementById('terminal-output');
if (terminalOutput) {
    const lines = [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'youssef.assoil — ingenieur logiciel full stack & devops' },
        { type: 'cmd', text: 'cat competences.txt' },
        { type: 'out', text: 'Java/Spring · .NET 9 · React · Angular · Docker · GCP · Python' },
        { type: 'cmd', text: './deploy.sh --env=production' },
        { type: 'ok', text: '✔ build passed' },
        { type: 'ok', text: '✔ tests passed' },
        { type: 'ok', text: '✔ deployed to production' },
        { type: 'cmd', text: 'echo $DISPONIBILITE' },
        { type: 'out', text: 'Disponible pour un CDI — Full Stack & DevOps' }
    ];

    const PROMPT = '<span class="prompt">➜</span> <span class="path">~</span> ';
    let started = false;
    let timers = [];

    function typeLine(index) {
        if (index >= lines.length) {
            terminalOutput.insertAdjacentHTML('beforeend', '<span class="terminal-cursor"></span>');
            return;
        }

        const line = lines[index];
        const lineEl = document.createElement('div');
        terminalOutput.appendChild(lineEl);

        if (line.type === 'cmd') {
            let charIndex = 0;
            const typing = setInterval(() => {
                charIndex++;
                lineEl.innerHTML = PROMPT + line.text.slice(0, charIndex) + '<span class="terminal-cursor"></span>';
                if (charIndex >= line.text.length) {
                    clearInterval(typing);
                    lineEl.innerHTML = PROMPT + line.text;
                    timers.push(setTimeout(() => typeLine(index + 1), 300));
                }
            }, 35);
            timers.push(typing);
        } else {
            lineEl.className = line.type === 'ok' ? 'ok' : '';
            lineEl.textContent = line.text;
            timers.push(setTimeout(() => typeLine(index + 1), 350));
        }
    }

    if ('IntersectionObserver' in window) {
        const termObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    typeLine(0);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        termObserver.observe(terminalOutput);
    } else {
        typeLine(0);
    }
}
