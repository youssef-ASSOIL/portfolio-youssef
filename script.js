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
        const isOpen = hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        hamburger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });
}

document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    if (hamburger) {
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Ouvrir le menu");
    }
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

// Contact Form — Direct background email submission via Web3Forms
const form = document.querySelector('.contact-form');
if (form) {
    const submitBtn = form.querySelector('.btn-submit');
    const hint = form.querySelector('.form-hint');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) return;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
        }
        if (hint) {
            hint.textContent = 'Transmission de votre message...';
            hint.className = 'form-hint';
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '8edf2dd1-77a8-4ba0-b4e8-ae19f7fd90ba',
                    from_name: 'Portfolio Youssef ASSOIL',
                    subject: `Nouveau message de ${name} — Portfolio`,
                    name: name,
                    email: email,
                    message: message
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                form.reset();
                if (hint) {
                    hint.textContent = '✔ Merci ! Votre message a bien été envoyé. Je vous répondrai très rapidement.';
                    hint.className = 'form-hint form-hint-success';
                }
            } else {
                throw new Error(result.message || 'Erreur lors de l\'envoi');
            }
        } catch (err) {
            if (hint) {
                hint.textContent = 'Une erreur est survenue lors de l\'envoi. Vous pouvez m\'écrire directement à assoilyoussef02@gmail.com.';
                hint.className = 'form-hint form-hint-error';
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }
        }
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
