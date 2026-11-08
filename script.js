// Always open the page at the top
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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// 1. Hero 3D Rotating Network Sphere (Canvas)
// ==========================================================================
const sphereCanvas = document.getElementById('heroSphereCanvas');
if (sphereCanvas && sphereCanvas.getContext) {
    const ctx = sphereCanvas.getContext('2d');
    const W = 680;
    const H = 680;
    sphereCanvas.width = W;
    sphereCanvas.height = H;

    const NUM_POINTS = 95;
    const RADIUS = 240;
    const points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < NUM_POINTS; i++) {
        const y = 1 - (i / (NUM_POINTS - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        points.push({
            x: Math.cos(theta) * r * RADIUS,
            y: y * RADIUS,
            z: Math.sin(theta) * r * RADIUS
        });
    }

    let angleY = 0;
    let angleX = 0.25;

    function renderSphere() {
        ctx.clearRect(0, 0, W, H);
        angleY += 0.0035;

        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        const projected = points.map(p => {
            const x1 = p.x * cosY - p.z * sinY;
            const z1 = p.z * cosY + p.x * sinY;
            const y2 = p.y * cosX - z1 * sinX;
            const z2 = z1 * cosX + p.y * sinX;
            const scale = 520 / (520 + z2);
            return {
                px: W / 2 + x1 * scale,
                py: H / 2 + y2 * scale,
                z: z2,
                scale
            };
        });

        // Draw network connections
        for (let i = 0; i < projected.length; i++) {
            for (let j = i + 1; j < projected.length; j++) {
                const dx = projected[i].px - projected[j].px;
                const dy = projected[i].py - projected[j].py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 92) {
                    const alpha = (1 - dist / 92) * 0.24;
                    ctx.strokeStyle = `rgba(57, 213, 255, ${alpha.toFixed(3)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(projected[i].px, projected[i].py);
                    ctx.lineTo(projected[j].px, projected[j].py);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        projected.forEach((pt, idx) => {
            const alpha = Math.max(0.18, (pt.z + RADIUS) / (2 * RADIUS));
            ctx.fillStyle = idx % 3 === 0
                ? `rgba(167, 139, 250, ${alpha.toFixed(2)})`
                : `rgba(57, 213, 255, ${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 2.3 * pt.scale, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(renderSphere);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        renderSphere();
    }
}

// ==========================================================================
// 2. Hero Typing Animation
// ==========================================================================
const heroTypingText = document.getElementById('heroTypingText');
if (heroTypingText) {
    const phrases = [
        'Building intelligent software.',
        'Engineering scalable systems.',
        'Turning ideas into reality.'
    ];
    let phraseIdx = 0;
    let charIdx = phrases[0].length;
    let isDeleting = true;

    function tickHeroType() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            charIdx--;
            heroTypingText.textContent = current.substring(0, charIdx);
            if (charIdx <= 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tickHeroType, 350);
                return;
            }
            setTimeout(tickHeroType, 32);
        } else {
            const nextPhrase = phrases[phraseIdx];
            charIdx++;
            heroTypingText.textContent = nextPhrase.substring(0, charIdx);
            if (charIdx >= nextPhrase.length) {
                isDeleting = true;
                setTimeout(tickHeroType, 2200);
                return;
            }
            setTimeout(tickHeroType, 55);
        }
    }

    setTimeout(tickHeroType, 2400);
}

// ==========================================================================
// 3. Interactive Card Mouse Spotlight
// ==========================================================================
document.querySelectorAll('.skill-card, .portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// ==========================================================================
// 4. Interactive Project Case Study Modal
// ==========================================================================
const CASE_STUDIES = {
    'sepa': {
        tag: 'Blazor Server / .NET 9 / SQL Server / ISO 20022',
        title: 'SEPA Pro Solution — Plateforme Bancaire',
        sub: 'Solution complète d\'automatisation des flux financiers (virements SCT & prélèvements SDD) conforme aux normes bancaires européennes ISO 20022.',
        challenge: 'Les traitements manuels de Grands Livres comptables Excel et la génération de lots XML bancaires étaient lents et sujets aux rejets bancaires (erreurs IBAN, mandats manquants, non-conformité XSD).',
        solution: 'Architecture .NET 9 / Blazor Server multi-société en 22 pages Razor avec un moteur intelligent d\'auto-création des entités (Tiers, Comptes, Mandats) et validation stricte par schéma XSD avant export.',
        bullets: [
            'Développement de 22 pages Razor interactives sous .NET 9 (Blazor Server) avec gestion multi-société et RBAC.',
            'Création du pipeline d\'import Excel (Grand Livre) avec détection et auto-création intelligente des Tiers, IBAN et Mandats.',
            'Moteur de génération XML ISO 20022 (pain.001 SCT & pain.008 SDD) avec validation XSD et prévisualisation sécurisée.',
            'Module de rapprochement bancaire, pistes d\'audit complètes et pipeline CI/CD automatisé sous GitHub Actions.'
        ],
        techs: ['.NET 9', 'Blazor Server', 'C#', 'EF Core', 'SQL Server 2019+', 'XML ISO 20022 / XSD', 'GitHub Actions'],
        showArchLink: true
    },
    'astreinte-web': {
        tag: 'CodeIgniter 4 / PHP / REST API / JWT',
        title: 'Écosystème d\'Astreinte V2 — Back-Office & API',
        sub: 'Modernisation d\'une plateforme critique de gestion des services d\'astreinte pour le secteur public, garantissant la haute disponibilité des procédures et annuaires d\'urgence.',
        challenge: 'Assurer une synchronisation fiable et sécurisée des données d\'astreinte entre le back-office Web et les tablettes d\'intervention sur le terrain, tout en respectant strictement le RGPD.',
        solution: 'Architecture RESTful sous CodeIgniter 4 sécurisée par Token/JWT, couplée à une stratégie de synchronisation transactionnelle "REPLACE" et une interface back-office moderne en Glassmorphism.',
        bullets: [
            'Conception et développement de l\'API REST sécurisée par JWT pour l\'alimentation des terminaux mobiles.',
            'Implémentation de la stratégie de synchronisation "REPLACE" garantissant zéro corruption de données.',
            'Refonte UX/UI complète du back-office d\'administration avec design Glassmorphism.',
            'Gestion stricte de la conformité RGPD et journalisation des accès agents.'
        ],
        techs: ['PHP 8', 'CodeIgniter 4', 'REST API', 'JWT Auth', 'MySQL', 'Glassmorphism UI'],
        showArchLink: false
    },
    'astreinte-mobile': {
        tag: '.NET MAUI / C# / SQLite Offline-First',
        title: 'Astreinte Mobile — Application Tablette Terrain',
        sub: 'Application mobile cross-platform destinée aux agents d\'astreinte sur le terrain, fonctionnant à 100% même en zone blanche sans connexion réseau.',
        challenge: 'Les agents en intervention d\'urgence doivent accéder instantanément aux procédures critiques et aux annuaires même en l\'absence totale de couverture 4G/Wi-Fi.',
        solution: 'Application .NET MAUI dotée d\'un moteur de persistance locale SQLite complet et d\'un système de synchronisation différentielle dès le retour de la connectivité.',
        bullets: [
            'Développement de l\'application tablette sous .NET MAUI (C# / XAML) optimisée pour une ergonomie terrain.',
            'Architecture Offline-First basée sur SQLite permettant la consultation instantanée des procédures et contacts.',
            'Synchronisation sécurisée via API JWT avec vérification d\'intégrité des données téléchargées.'
        ],
        techs: ['.NET MAUI', 'C#', 'SQLite', 'Offline-First', 'REST / JWT'],
        showArchLink: false
    },
    'assala-erp': {
        tag: 'Spring Boot 3 / Java 17 / React 18 / Docker',
        title: 'Assala Iskane ERP — Pilotage de Chantiers Immobiliers',
        sub: 'ERP métier multi-site permettant le suivi budgétaire, la gestion des approvisionnements et la validation hiérarchique des commandes de chantiers.',
        challenge: 'Digitaliser un processus d\'achat et de validation complexe impliquant 6 départements différents sur plusieurs chantiers simultanés avec une isolation stricte des données.',
        solution: 'Architecture Full Stack Spring Boot 3 (Java 17) + React 18 intégrant un moteur de workflow à 6 niveaux et un contrôle d\'accès RBAC granulaire déployé sous Docker Compose et Nginx.',
        bullets: [
            'Architecture backend sous Spring Boot 3 (Java 17) et persistance MySQL avec isolation des données par chantier.',
            'Implémentation de la chaîne de validation à 6 niveaux : Chef de Chantier → Responsable Projet → Tech Manager → Comptabilité → Service Tech → Magasin.',
            'Interface réactive sous React 18 avec tableaux de bord temps réel par rôle.',
            'Conteneurisation complète via Docker Compose et reverse-proxy Nginx sécurisé.'
        ],
        techs: ['Java 17', 'Spring Boot 3', 'Spring Security / RBAC', 'React 18', 'MySQL', 'Docker Compose', 'Nginx'],
        showArchLink: false
    }
};

const caseModalOverlay = document.getElementById('caseModalOverlay');
const caseModalClose = document.getElementById('caseModalClose');
const caseModalTag = document.getElementById('caseModalTag');
const caseModalTitle = document.getElementById('caseModalTitle');
const caseModalSub = document.getElementById('caseModalSub');
const caseModalChallenge = document.getElementById('caseModalChallenge');
const caseModalSolution = document.getElementById('caseModalSolution');
const caseModalBullets = document.getElementById('caseModalBullets');
const caseModalTechs = document.getElementById('caseModalTechs');
const caseModalArchBtn = document.getElementById('caseModalArchBtn');

function openCaseModal(projectKey) {
    const data = CASE_STUDIES[projectKey];
    if (!data || !caseModalOverlay) return;

    caseModalTag.textContent = data.tag;
    caseModalTitle.textContent = data.title;
    caseModalSub.textContent = data.sub;
    caseModalChallenge.textContent = data.challenge;
    caseModalSolution.textContent = data.solution;

    caseModalBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
    caseModalTechs.innerHTML = data.techs.map(t => `<span class="case-tech-pill">${t}</span>`).join('');

    if (caseModalArchBtn) {
        caseModalArchBtn.style.display = data.showArchLink ? 'inline-block' : 'none';
    }

    caseModalOverlay.classList.add('open');
    caseModalOverlay.setAttribute('aria-hidden', 'false');
}

function closeCaseModal() {
    if (!caseModalOverlay) return;
    caseModalOverlay.classList.remove('open');
    caseModalOverlay.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.portfolio-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
        openCaseModal(card.getAttribute('data-project'));
    });
});

if (caseModalClose) caseModalClose.addEventListener('click', closeCaseModal);
if (caseModalArchBtn) caseModalArchBtn.addEventListener('click', closeCaseModal);
if (caseModalOverlay) {
    caseModalOverlay.addEventListener('click', (e) => {
        if (e.target === caseModalOverlay) closeCaseModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseModalOverlay && caseModalOverlay.classList.contains('open')) {
        closeCaseModal();
    }
});

// ==========================================================================
// 5. Copy Email Button & Direct Web3Forms Contact Submission
// ==========================================================================
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        const email = copyEmailBtn.getAttribute('data-email') || 'assoilyoussef02@gmail.com';
        const span = copyEmailBtn.querySelector('span');
        try {
            await navigator.clipboard.writeText(email);
            if (span) span.textContent = '✔ Copié !';
            setTimeout(() => {
                if (span) span.textContent = 'Copier';
            }, 2200);
        } catch (err) {
            if (span) span.textContent = email;
        }
    });
}

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

// ==========================================================================
// 6. Scroll Reveal Animations
// ==========================================================================
const revealTargets = document.querySelectorAll(
    '.skill-card, .portfolio-card, .timeline-item, .section-title, .eyebrow, .contact-info, .contact-form, .architecture-intro, .arch-window, .curve-roadmap'
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

// ==========================================================================
// 7. Interactive Terminal (whoami, projects, skills, contact, sudo hire youssef)
// ==========================================================================
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');

if (terminalOutput) {
    const lines = [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'Youssef ASSOIL — Software Engineer | Full Stack & DevOps' },
        { type: 'cmd', text: 'cat competences.txt' },
        { type: 'out', text: '.NET 9 / Blazor · Java / Spring Boot · React · Angular · Docker · GCP' },
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
        if (index >= lines.length) return;

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
                    timers.push(setTimeout(() => typeLine(index + 1), 260));
                }
            }, 32);
            timers.push(typing);
        } else {
            lineEl.className = line.type === 'ok' ? 'ok' : '';
            lineEl.textContent = line.text;
            timers.push(setTimeout(() => typeLine(index + 1), 300));
        }
    }

    function runTerminalCommand(raw) {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const echoCmd = document.createElement('div');
        echoCmd.innerHTML = PROMPT + raw.replace(/</g, '&lt;');
        terminalOutput.appendChild(echoCmd);

        const out = document.createElement('div');
        if (cmd === 'whoami') {
            out.textContent = 'Youssef ASSOIL\nSoftware Engineer\nFull Stack & DevOps (Disponible pour un CDI)';
        } else if (cmd === 'projects') {
            out.innerHTML = '<span class="ok">Projets en production :</span>\n' +
                '  1. SEPA Pro Solution       — .NET 9 / Blazor Server / SQL Server / ISO 20022\n' +
                '  2. Astreinte Web V2        — CodeIgniter 4 / REST API / JWT / Glassmorphism\n' +
                '  3. Astreinte Mobile        — .NET MAUI / SQLite Offline-First\n' +
                '  4. Assala Iskane ERP       — Spring Boot 3 / React 18 / Docker / Nginx';
        } else if (cmd === 'skills') {
            out.textContent = 'Backend      : .NET 9, Blazor, Java 17, Spring Boot 3, PHP/Symfony/CI4\nFrontend     : React 18, TypeScript, Angular\nDevOps/Cloud : Docker, GitHub Actions CI/CD, Terraform, Google Cloud (GCP)\nArchitecture : SOLID, DDD, Design Patterns, ISO 20022';
        } else if (cmd === 'contact') {
            out.innerHTML = 'Email    : <span class="ok">assoilyoussef02@gmail.com</span>\nTéléphone: +33 7 66 31 93 53\nLinkedIn : linkedin.com/in/assoilyoussef';
        } else if (cmd.startsWith('sudo hire')) {
            out.innerHTML = '<span class="ok">🎉 [SUDO ACCESS GRANTED] — Excellent choix !</span>\n' +
                '✔ Vérification des compétences .NET 9 / Spring Boot / DevOps... 100%\n' +
                '✔ Motivation & rigueur d\'ingénierie... MAX\n' +
                '➜ Prêt à rejoindre votre équipe en CDI ! Envoyez-moi un message juste en bas 👇';
        } else if (cmd === 'help') {
            out.textContent = 'Commandes disponibles : whoami, projects, skills, contact, sudo hire youssef, clear';
        } else {
            out.textContent = `Commande inconnue: "${raw}". Essayez: whoami, projects, skills, contact, sudo hire youssef`;
        }

        terminalOutput.appendChild(out);
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const v = terminalInput.value;
                terminalInput.value = '';
                runTerminalCommand(v);
            }
        });
    }

    document.querySelectorAll('.term-cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            runTerminalCommand(btn.getAttribute('data-cmd'));
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
