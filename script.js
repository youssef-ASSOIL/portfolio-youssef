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
    '.skill-card, .portfolio-card, .timeline-item, .section-title, .eyebrow, .contact-info, .contact-form, .architecture-intro, .arch-window, .story-intro, .trajectory-canvas, .sys-telemetry-bar'
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

// Interactive Card Mouse Spotlight (--mouse-x, --mouse-y)
document.querySelectorAll('.skill-card, .portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// Terminal typing animation + Live Interactive Shell
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');

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
        { type: 'out', text: 'Disponible pour un CDI — Full Stack & DevOps (tapez "help" ci-dessous)' }
    ];

    const PROMPT = '<span class="prompt">➜</span> <span class="path">~</span> ';
    let started = false;
    let timers = [];

    function typeLine(index) {
        if (index >= lines.length) {
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
                    timers.push(setTimeout(() => typeLine(index + 1), 280));
                }
            }, 32);
            timers.push(typing);
        } else {
            lineEl.className = line.type === 'ok' ? 'ok' : '';
            lineEl.textContent = line.text;
            timers.push(setTimeout(() => typeLine(index + 1), 300));
        }
    }

    function executeShellCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'clear' || cmd === 'cls') {
            terminalOutput.innerHTML = '';
            return;
        }

        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = PROMPT + rawCmd.replace(/</g, '&lt;');
        terminalOutput.appendChild(cmdLine);

        const resp = document.createElement('div');
        if (cmd === 'help') {
            resp.innerHTML = '<span class="ok">Commandes système disponibles :</span>\n' +
                '  • <strong>skills</strong>       → Afficher la stack Full Stack & DevOps\n' +
                '  • <strong>sepa</strong>         → Inspecter l\'architecture bancaire SEPA Pro (.NET 9 / ISO 20022)\n' +
                '  • <strong>story</strong>        → Voir la trajectoire académique & évolution technique\n' +
                '  • <strong>projects</strong>     → Lister les réalisations en production\n' +
                '  • <strong>cv</strong>           → Télécharger le CV PDF\n' +
                '  • <strong>sudo hire</strong>    → Lancer le protocole de recrutement CDI\n' +
                '  • <strong>clear</strong>        → Nettoyer le terminal';
        } else if (cmd === 'skills' || cmd === 'stack') {
            resp.textContent = '[BACKEND]  Java 17 / Spring Boot 3 · .NET 9 / Blazor · PHP / Symfony / CI4\n[FRONTEND] React 18 / TypeScript · Angular · .NET MAUI / Flutter\n[DEVOPS]   Docker · GitHub Actions CI/CD · Terraform · Google Cloud (GCP) · Linux';
        } else if (cmd === 'sepa' || cmd === 'sepa-arch' || cmd === 'architecture') {
            resp.innerHTML = '<span class="ok">✔ Ouverture du module Architecture SEPA Pro (.NET 9 · ISO 20022)...</span>';
            const archEl = document.querySelector('#architecture');
            if (archEl) window.scrollTo({ top: archEl.offsetTop - 70, behavior: 'smooth' });
        } else if (cmd === 'story' || cmd === 'formation' || cmd === 'education') {
            resp.innerHTML = '<span class="ok">✔ Navigation vers 03 — Formation & Trajectoire Technique...</span>';
            const eduEl = document.querySelector('#education');
            if (eduEl) window.scrollTo({ top: eduEl.offsetTop - 70, behavior: 'smooth' });
        } else if (cmd === 'projects' || cmd === 'ls') {
            resp.textContent = '1. SEPA Pro Solution       (.NET 9 / Blazor / SQL Server / ISO 20022)\n2. Écosystème Astreinte V2 (CodeIgniter 4 / JWT / .NET MAUI SQLite)\n3. Assala Iskane ERP       (Spring Boot 3 / React 18 / Docker / Nginx)';
        } else if (cmd === 'cv') {
            resp.innerHTML = '<span class="ok">✔ Téléchargement de ASSOIL_YOUSSEF_CV.pdf...</span>';
            window.open('ASSOIL_YOUSSEF_CV.pdf', '_blank');
        } else if (cmd === 'whoami') {
            resp.textContent = 'Youssef ASSOIL — Ingénieur Logiciel Full Stack & DevOps (Montpellier, France)';
        } else if (cmd.startsWith('sudo hire') || cmd === 'hire' || cmd === 'contact') {
            resp.innerHTML = '<span class="ok">✔ [ACCESS GRANTED] Initialisation du canal de contact direct...</span>\n  Email : assoilyoussef02@gmail.com | Tél : +33 7 66 31 93 53';
            const contactEl = document.querySelector('#contact');
            if (contactEl) window.scrollTo({ top: contactEl.offsetTop - 70, behavior: 'smooth' });
        } else {
            resp.textContent = `zsh: command not found: ${rawCmd}. Tapez "help" pour voir les commandes.`;
        }

        terminalOutput.appendChild(resp);
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = terminalInput.value;
                terminalInput.value = '';
                executeShellCommand(val);
            }
        });
    }

    document.querySelectorAll('.term-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) executeShellCommand(cmd);
        });
    });

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

// OS Command Palette (⌘K / Ctrl+K)
const cmdOverlay = document.getElementById('cmdOverlay');
const cmdTrigger = document.getElementById('cmdTrigger');
const cmdCloseBtn = document.getElementById('cmdCloseBtn');
const cmdSearchInput = document.getElementById('cmdSearchInput');
const cmdItems = document.querySelectorAll('.cmd-item');

function openCommandPalette() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.add('open');
    cmdOverlay.setAttribute('aria-hidden', 'false');
    if (cmdSearchInput) {
        cmdSearchInput.value = '';
        cmdItems.forEach(item => item.style.display = 'flex');
        setTimeout(() => cmdSearchInput.focus(), 50);
    }
}

function closeCommandPalette() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.remove('open');
    cmdOverlay.setAttribute('aria-hidden', 'true');
}

if (cmdTrigger) {
    cmdTrigger.addEventListener('click', openCommandPalette);
}
if (cmdCloseBtn) {
    cmdCloseBtn.addEventListener('click', closeCommandPalette);
}
if (cmdOverlay) {
    cmdOverlay.addEventListener('click', (e) => {
        if (e.target === cmdOverlay) closeCommandPalette();
    });
}

document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdOverlay && cmdOverlay.classList.contains('open')) {
            closeCommandPalette();
        } else {
            openCommandPalette();
        }
    } else if (e.key === 'Escape' && cmdOverlay && cmdOverlay.classList.contains('open')) {
        closeCommandPalette();
    }
});

if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', () => {
        const q = cmdSearchInput.value.trim().toLowerCase();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(q) ? 'flex' : 'none';
        });
    });
}

cmdItems.forEach(item => {
    item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        const target = item.getAttribute('data-target');
        closeCommandPalette();

        if (action === 'goto' && target) {
            const el = document.querySelector(target);
            if (el) {
                window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
            }
        } else if (action === 'cv') {
            window.open('ASSOIL_YOUSSEF_CV.pdf', '_blank');
        } else if (action === 'theme' && themeToggle) {
            themeToggle.click();
        }
    });
});
