// Always open the page at the top
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ==========================================================================
// 1. Bilingual Translation Engine (FR / EN)
// ==========================================================================
let currentLang = localStorage.getItem('lang') || 'fr';
if (!['fr', 'en', 'de', 'ar'].includes(currentLang)) {
    currentLang = 'fr';
}
let currentArchLayer = 'presentation';

const I18N = {
    fr: {
        nav_home: 'Accueil',
        nav_projects: 'Projets',
        nav_experience: 'Expérience',
        nav_skills: 'Compétences',
        nav_arch: 'Architecture',
        nav_education: 'Formation',
        nav_certs: 'Certifications',
        nav_contact: 'Contact',

        hero_avail_title: 'Disponible pour un CDI',
        hero_avail_sub: 'Mobile en France et à l\'international',
        hero_badge: 'SOFTWARE ENGINEER &nbsp;|&nbsp; C#/.NET &nbsp;|&nbsp; FULL-STACK &amp; DEVOPS',
        hero_bio_1: 'Ingénieur logiciel spécialisé en développement <strong>C#/.NET</strong> et <strong>Full-Stack</strong>, avec une expérience dans la conception d\'applications métier bancaires, web et mobiles.',
        hero_bio_2: 'Passionné par l\'architecture logicielle, la qualité du code et l\'automatisation des processus, je conçois des solutions fiables, maintenables et adaptées aux besoins métier.',
        stat_internships: 'Stages en entreprise',
        stat_projects: 'Projets métier livrés',
        stat_degree: 'Titre RNCP niveau 7',
        hero_cta_work: 'Voir mes projets',
        hero_cta_cv: 'Télécharger mon CV',

        term_cmds_label: 'Commandes :',

        proj_eyebrow: '01 — Réalisations concrètes',
        proj_title: 'Projets Phares',
        lbl_role: 'Mon rôle :',
        lbl_result: 'Résultat :',
        proj_cta: 'Voir l\'étude de cas détaillée →',

        proj_sepa_title: 'SEPA Pro — Automatisation Bancaire',
        proj_sepa_desc: 'Conception et développement d\'une application métier de gestion des virements (SCT) et prélèvements (SDD) conforme à la norme ISO 20022.',
        proj_sepa_role: 'Développement Full-Stack C#/.NET 9 (Stage PROXIEL)',
        proj_sepa_res: 'Import automatisé Excel & génération XML validée par XSD',

        proj_astw_title: 'Astreinte Web V2 — Back-Office & API',
        proj_astw_desc: 'Modernisation d\'un système de gestion des astreintes publiques assurant la disponibilité des procédures et annuaires pour les agents.',
        proj_astw_role: 'Conception API REST/JWT & refonte du Back-Office',
        proj_astw_res: 'Synchronisation fiable Web/Mobile & conformité RGPD',

        proj_astm_title: 'Astreinte Mobile — Tablette Terrain',
        proj_astm_desc: 'Application mobile pour tablettes supportant un mode hors-ligne complet pour la consultation des procédures et annuaires en intervention.',
        proj_astm_role: 'Développement .NET MAUI & persistance locale SQLite',
        proj_astm_res: 'Accès 100 % autonome hors connexion réseau',

        proj_erp_title: 'Assala Iskane ERP — Gestion de Chantiers',
        proj_erp_desc: 'Solution métier multi-site pour le pilotage des chantiers immobiliers, la gestion des accès par rôle et le suivi des approvisionnements.',
        proj_erp_role: 'Développement Full-Stack Java/Spring & React',
        proj_erp_res: 'Workflow de validation à 6 niveaux conteneurisé sous Docker',

        exp_eyebrow: '02 — Mon parcours en entreprise',
        exp_title: 'Expérience Professionnelle',
        exp_prox_date: 'Février – Août 2026 | Montpellier, France',
        exp_prox_role: 'PROXIEL — Ingénieur logiciel Full-Stack (Stage)',
        exp_prox_sub: 'Stage de fin d\'études — Conception d\'applications métier & automatisation financière',
        exp_prox_p1_title: '1. SEPA Pro — Solution d\'automatisation bancaire',
        exp_prox_p1_b1: '<strong>Stack C#/.NET :</strong> Développement sous <strong>C# / .NET 9</strong>, <strong>Blazor</strong>, <strong>Entity Framework Core</strong> et <strong>SQL Server</strong>.',
        exp_prox_p1_b2: '<strong>Traitements SEPA :</strong> Automatisation de l\'import de données comptables Excel (Tiers, Comptes, Mandats) et gestion des virements (SCT) et prélèvements (SDD).',
        exp_prox_p1_b3: '<strong>Conformité ISO 20022 :</strong> Génération de fichiers XML SEPA avec validation par schéma <strong>XSD</strong> et contrôle avant export.',
        exp_prox_p1_b4: '<strong>Qualité & CI/CD :</strong> Automatisation des builds et de l\'exécution des tests via <strong>GitHub Actions</strong>.',
        exp_prox_p2_title: '2. Astreinte Web & Mobile — Gestion d\'astreinte publique',
        exp_prox_p2_b1: '<strong>Backend & API :</strong> Développement sous <strong>CodeIgniter 4</strong> d\'une architecture REST sécurisée par <strong>Token/JWT</strong>.',
        exp_prox_p2_b2: '<strong>Application Mobile :</strong> Développement d\'une application <strong>.NET MAUI</strong> pour tablettes avec base locale <strong>SQLite</strong> supportant le mode hors ligne.',
        exp_prox_p2_b3: '<strong>Synchronisation :</strong> Mise en œuvre d\'un mécanisme de synchronisation fiable garantissant l\'intégrité des procédures et annuaires hors connexion.',

        exp_assala_date: 'Juin – Août 2024 | Fès, Maroc',
        exp_assala_role: 'Assala Iskane — Ingénieur logiciel Full-Stack (Stage)',
        exp_assala_sub: 'Conception et développement d\'un ERP de pilotage de chantiers immobiliers',
        exp_assala_b1: '<strong>Stack Technique :</strong> Backend <strong>Spring Boot 3 (Java 17)</strong>, Frontend <strong>React 18</strong> et base de données <strong>MySQL</strong>.',
        exp_assala_b2: '<strong>Workflow Métier :</strong> Implémentation d\'une chaîne de validation hiérarchique à 6 niveaux (Chef de Chantier → Responsable Projet → Tech Manager → Comptabilité → Service Technique → Magasin).',
        exp_assala_b3: '<strong>Sécurité & RBAC :</strong> Gestion granulaire des droits d\'accès pour 6 rôles distincts avec isolation des données par chantier.',
        exp_assala_b4: '<strong>Conteneurisation :</strong> Déploiement multi-conteneurs via <strong>Docker Compose</strong> et reverse-proxy <strong>Nginx</strong>.',

        exp_med_date: 'Juin – Août 2023 | France (À distance)',
        exp_med_role: 'Medzair — Développeur Full-Stack Web & Mobile (Stage)',
        exp_med_sub: 'Plateforme de gestion des remplacements médicaux entre établissements et praticiens',
        exp_med_b1: '<strong>Backend & Mobile :</strong> Développement avec <strong>Node.js</strong> et <strong>Flutter / Dart</strong> pour une application cross-platform.',
        exp_med_b2: '<strong>Temps Réel :</strong> Intégration de <strong>Firebase Realtime Database</strong> pour la synchronisation instantanée des offres de remplacement.',
        exp_med_b3: '<strong>Fonctionnalités :</strong> Calendrier interactif des disponibilités et notifications automatisées.',

        skills_eyebrow: '03 — Ce que je maîtrise',
        skills_title: 'Compétences Techniques',
        sk_dotnet: 'C#, Blazor, .NET MAUI, Entity Framework Core — appliqué sur SEPA Pro et Astreinte Mobile.',
        sk_java: 'Spring Security, Spring Data JPA, API REST & RBAC — appliqué sur Assala Iskane ERP.',
        sk_react: 'Interfaces métier réactives, tableaux de bord et gestion d\'état — appliqué sur Assala Iskane ERP.',
        sk_angular: 'Applications SPA modulaires en TypeScript, composants réutilisables et consommation d\'APIs REST.',
        sk_sql: 'Modélisation relationnelle, migrations EF Core, requêtes complexes et persistance mobile hors ligne.',
        sk_docker: 'Conteneurisation Docker Compose, reverse-proxy Nginx et pipelines d\'intégration GitHub Actions.',
        sk_solid: 'Séparation des responsabilités, architecture en couches, maintenabilité et tests automatisés.',
        sk_uml: 'Modélisation métier, patterns Repository, Factory, Strategy et validation de flux XML/XSD.',
        sk_api: 'Conception d\'APIs sécurisées par Token/JWT, synchronisation Web/Mobile et bonnes pratiques RGPD.',
        sk_php: 'Développement d\'applications et d\'APIs métier structurées en architecture MVC.',
        sk_cloud: 'Environnements applicatifs Cloud et bases de l\'Infrastructure as Code sur Google Cloud.',
        sk_linux: 'Administration Ubuntu/Linux, automatisation Bash et gestion de versions Git en équipe.',

        arch_eyebrow: '04 — Ingénierie & Conception',
        arch_title: 'Architecture Logicielle',
        arch_intro: 'Vue pédagogique et anonymisée d\'une architecture <strong>.NET / ISO 20022</strong> en couches. Cliquez sur chaque couche ci-dessous pour explorer les choix techniques de conception.',
        arch_tab_1: 'Presentation Layer',
        arch_tab_2: 'Business Logic Layer',
        arch_tab_3: 'Data Access Layer',
        arch_tab_4: 'Integrations & CI/CD',

        edu_eyebrow: '05 — Bagage académique',
        edu_title: 'Formation',
        edu_1_title: 'Licence en Ingénierie Informatique (Computer Engineering)',
        edu_1_school: 'ESISA — École Supérieure d\'Ingénierie en Sciences Appliquées (Fès)',
        edu_1_desc: 'Algorithmique avancée, structures de données, programmation orientée objet (C++, Java), bases de données SQL, réseaux informatiques et systèmes Linux.',
        edu_2_title: 'Master 1 (M1) — Ingénierie des Systèmes d\'Information',
        edu_2_school: 'ESISA — Fès, Maroc',
        edu_2_desc: 'Conception logicielle (principes SOLID, Design Patterns, modélisation UML), architectures distribuées et développement d\'applications Full-Stack et mobiles.',
        edu_3_title: 'Expert en informatique et système d\'information',
        edu_3_school: 'EPSI Montpellier — Titre RNCP niveau 7 (Bac+5), obtenu en octobre 2026',
        edu_3_desc: 'Architecture d\'applications d\'entreprise (.NET, Java/Spring), qualité logicielle, DevOps (Docker, CI/CD), Cloud et pilotage de projets SI.',

        cert_eyebrow: '06 — Formation continue & Certificats',
        cert_title: 'Certifications',
        cert_verify: 'Vérifier le certificat →',

        contact_eyebrow: '07 — Discutons',
        contact_title: 'Contact',
        contact_intro: 'À la recherche d\'un ingénieur logiciel C#/.NET et Full-Stack pour un CDI ? N\'hésitez pas à me contacter directement.',
        btn_copy: 'Copier l\'email',
        contact_loc: 'Montpellier, France — Mobile en France et à l\'international',
        ph_name: 'Votre nom',
        ph_email: 'Votre email professionnel',
        ph_msg: 'Votre message (opportunité CDI, échange technique...)',
        btn_send: 'Envoyer le message',
        form_hint_default: 'Formulaire connecté : envoi direct par email avec confirmation.',

        modal_prob: 'Problématique métier',
        modal_role: 'Mon rôle & Contexte',
        modal_contrib: 'Solution technique & Réalisations',
        modal_arch_btn: 'Explorer l\'architecture'
    },
    en: {
        nav_home: 'Home',
        nav_projects: 'Projects',
        nav_experience: 'Experience',
        nav_skills: 'Skills',
        nav_arch: 'Architecture',
        nav_education: 'Education',
        nav_certs: 'Certifications',
        nav_contact: 'Contact',

        hero_avail_title: 'Available for a Full-Time Role (CDI)',
        hero_avail_sub: 'Open to relocation across France & internationally',
        hero_badge: 'SOFTWARE ENGINEER &nbsp;|&nbsp; C#/.NET &nbsp;|&nbsp; FULL-STACK &amp; DEVOPS',
        hero_bio_1: 'Software Engineer specialized in <strong>C#/.NET</strong> and <strong>Full-Stack</strong> development, with hands-on experience designing banking, web, and mobile business applications.',
        hero_bio_2: 'Passionate about software architecture, code quality, and process automation, I build reliable, maintainable solutions tailored to business needs.',
        stat_internships: 'Industry Internships',
        stat_projects: 'Business Projects Built',
        stat_degree: 'Level 7 RNCP (Master\'s)',
        hero_cta_work: 'Explore My Work',
        hero_cta_cv: 'Download My CV',

        term_cmds_label: 'Commands:',

        proj_eyebrow: '01 — Featured Engineering Work',
        proj_title: 'Featured Projects',
        lbl_role: 'My Role:',
        lbl_result: 'Outcome:',
        proj_cta: 'Read full case study →',

        proj_sepa_title: 'SEPA Pro — Banking Automation Platform',
        proj_sepa_desc: 'Design and development of a business application automating SEPA credit transfers (SCT) and direct debits (SDD) compliant with ISO 20022.',
        proj_sepa_role: 'Full-Stack C#/.NET 9 Developer (Internship at PROXIEL)',
        proj_sepa_res: 'Automated Excel ledger import & XSD-validated XML generation',

        proj_astw_title: 'Astreinte Web V2 — Back-Office & REST API',
        proj_astw_desc: 'Modernization of a public-sector on-call management system ensuring high availability of emergency procedures and directories.',
        proj_astw_role: 'REST/JWT API Design & Back-Office Modernization',
        proj_astw_res: 'Reliable Web/Mobile synchronization & GDPR compliance',

        proj_astm_title: 'Astreinte Mobile — Offline-First Field App',
        proj_astm_desc: 'Tablet application supporting full offline operation for field agents consulting emergency procedures and directories.',
        proj_astm_role: '.NET MAUI Development & Local SQLite Persistence',
        proj_astm_res: '100% autonomous access without network connectivity',

        proj_erp_title: 'Assala Iskane ERP — Construction Management',
        proj_erp_desc: 'Multi-site enterprise platform for construction site tracking, role-based access control, and procurement workflows.',
        proj_erp_role: 'Full-Stack Java/Spring Boot & React Developer',
        proj_erp_res: '6-stage approval workflow containerized with Docker',

        exp_eyebrow: '02 — Professional Track Record',
        exp_title: 'Professional Experience',
        exp_prox_date: 'February – August 2026 | Montpellier, France',
        exp_prox_role: 'PROXIEL — Full-Stack Software Engineer (Internship)',
        exp_prox_sub: 'Final-year internship — Enterprise application design & financial workflow automation',
        exp_prox_p1_title: '1. SEPA Pro — Banking Automation Solution',
        exp_prox_p1_b1: '<strong>C#/.NET Stack:</strong> Developed with <strong>C# / .NET 9</strong>, <strong>Blazor</strong>, <strong>Entity Framework Core</strong>, and <strong>SQL Server</strong>.',
        exp_prox_p1_b2: '<strong>SEPA Workflows:</strong> Automated accounting Excel imports (Third Parties, Accounts, Mandates) and management of SCT transfers and SDD direct debits.',
        exp_prox_p1_b3: '<strong>ISO 20022 Compliance:</strong> Generated SEPA XML batches with strict <strong>XSD</strong> schema validation prior to export.',
        exp_prox_p1_b4: '<strong>Quality & CI/CD:</strong> Automated build and test execution pipelines using <strong>GitHub Actions</strong>.',
        exp_prox_p2_title: '2. Astreinte Web & Mobile — Public On-Call System',
        exp_prox_p2_b1: '<strong>Backend & API:</strong> Built a secure <strong>Token/JWT</strong> REST architecture using <strong>CodeIgniter 4</strong>.',
        exp_prox_p2_b2: '<strong>Mobile App:</strong> Built a <strong>.NET MAUI</strong> tablet application with local <strong>SQLite</strong> storage for full offline access.',
        exp_prox_p2_b3: '<strong>Synchronization:</strong> Engineered a reliable data sync strategy ensuring integrity of procedures and contact directories.',

        exp_assala_date: 'June – August 2024 | Fez, Morocco',
        exp_assala_role: 'Assala Iskane — Full-Stack Software Engineer (Internship)',
        exp_assala_sub: 'Design and development of a multi-site construction management ERP',
        exp_assala_b1: '<strong>Tech Stack:</strong> <strong>Spring Boot 3 (Java 17)</strong> backend, <strong>React 18</strong> frontend, and <strong>MySQL</strong> database.',
        exp_assala_b2: '<strong>Business Workflow:</strong> Implemented a 6-stage hierarchical approval workflow across site managers, project leads, finance, and logistics.',
        exp_assala_b3: '<strong>Security & RBAC:</strong> Granular role-based access control across 6 distinct roles with per-site data isolation.',
        exp_assala_b4: '<strong>Containerization:</strong> Multi-container deployment using <strong>Docker Compose</strong> and <strong>Nginx</strong> reverse proxy.',

        exp_med_date: 'June – August 2023 | France (Remote)',
        exp_med_role: 'Medzair — Full-Stack Web & Mobile Developer (Internship)',
        exp_med_sub: 'Medical staffing and replacement platform connecting healthcare facilities and practitioners',
        exp_med_b1: '<strong>Backend & Mobile:</strong> Developed using <strong>Node.js</strong> and <strong>Flutter / Dart</strong> for a cross-platform experience.',
        exp_med_b2: '<strong>Real-Time Data:</strong> Integrated <strong>Firebase Realtime Database</strong> for instant synchronization of replacement shifts.',
        exp_med_b3: '<strong>Features:</strong> Interactive availability calendar and automated booking notifications.',

        skills_eyebrow: '03 — Technical Stack',
        skills_title: 'Technical Skills',
        sk_dotnet: 'C#, Blazor, .NET MAUI, Entity Framework Core — applied on SEPA Pro and Astreinte Mobile.',
        sk_java: 'Spring Security, Spring Data JPA, REST APIs & RBAC — applied on Assala Iskane ERP.',
        sk_react: 'Reactive business UIs, dashboards, and state management — applied on Assala Iskane ERP.',
        sk_angular: 'Modular TypeScript SPAs, reusable components, and REST API integration.',
        sk_sql: 'Relational modeling, EF Core migrations, complex queries, and offline mobile persistence.',
        sk_docker: 'Docker Compose containerization, Nginx reverse proxy, and GitHub Actions CI/CD pipelines.',
        sk_solid: 'Separation of concerns, layered architecture, maintainability, and automated testing.',
        sk_uml: 'Domain modeling, Repository/Factory/Strategy patterns, and XML/XSD validation.',
        sk_api: 'Token/JWT authentication, Web/Mobile synchronization, and GDPR best practices.',
        sk_php: 'Structured MVC business applications and RESTful APIs.',
        sk_cloud: 'Cloud application environments and Infrastructure as Code fundamentals on Google Cloud.',
        sk_linux: 'Ubuntu/Linux administration, Bash scripting, and team Git workflows.',

        arch_eyebrow: '04 — Engineering & System Design',
        arch_title: 'Software Architecture',
        arch_intro: 'Educational and anonymized view of a layered <strong>.NET / ISO 20022</strong> architecture. Click each layer below to inspect the engineering design choices.',
        arch_tab_1: 'Presentation Layer',
        arch_tab_2: 'Business Logic Layer',
        arch_tab_3: 'Data Access Layer',
        arch_tab_4: 'Integrations & CI/CD',

        edu_eyebrow: '05 — Academic Background',
        edu_title: 'Education',
        edu_1_title: 'Bachelor\'s Degree in Computer Engineering',
        edu_1_school: 'ESISA — Graduate School of Engineering in Applied Sciences (Fez)',
        edu_1_desc: 'Advanced algorithms, data structures, object-oriented programming (C++, Java), SQL databases, computer networks, and Linux systems.',
        edu_2_title: 'Master 1 (M1) — Information Systems Engineering',
        edu_2_school: 'ESISA — Fez, Morocco',
        edu_2_desc: 'Software design (SOLID principles, Design Patterns, UML modeling), distributed architectures, and Full-Stack & mobile development.',
        edu_3_title: 'Level 7 RNCP Professional Qualification in IT & Information Systems',
        edu_3_school: 'EPSI Montpellier — Master\'s-level qualification (RNCP35584), awarded October 2026',
        edu_3_desc: 'Enterprise application architecture (.NET, Java/Spring), software quality, DevOps (Docker, CI/CD), Cloud infrastructure, and IT project leadership.',

        cert_eyebrow: '06 — Continuous Learning & Credentials',
        cert_title: 'Certifications',
        cert_verify: 'Verify Credential →',

        contact_eyebrow: '07 — Let\'s Connect',
        contact_title: 'Contact',
        contact_intro: 'Looking for a C#/.NET and Full-Stack Software Engineer for a full-time role? Feel free to reach out directly.',
        btn_copy: 'Copy Email',
        contact_loc: 'Montpellier, France — Open to relocation in France & internationally',
        ph_name: 'Your name',
        ph_email: 'Your professional email',
        ph_msg: 'Your message (job opportunity, technical discussion...)',
        btn_send: 'Send Message',
        form_hint_default: 'Connected form: direct email delivery with instant confirmation.',

        modal_prob: 'Business Challenge',
        modal_role: 'My Role & Scope',
        modal_contrib: 'Technical Solution & Key Deliverables',
        modal_arch_btn: 'Explore Architecture'
    },
    de: {
        nav_home: 'Startseite',
        nav_projects: 'Projekte',
        nav_experience: 'Erfahrung',
        nav_skills: 'Fähigkeiten',
        nav_arch: 'Architektur',
        nav_education: 'Ausbildung',
        nav_certs: 'Zertifikate',
        nav_contact: 'Kontakt',

        hero_avail_title: 'Verfügbar für eine Festanstellung (CDI)',
        hero_avail_sub: 'Mobil in Frankreich und international',
        hero_badge: 'SOFTWARE ENGINEER &nbsp;|&nbsp; C#/.NET &nbsp;|&nbsp; FULL-STACK &amp; DEVOPS',
        hero_bio_1: 'Software-Ingenieur mit Spezialisierung auf <strong>C#/.NET</strong> und <strong>Full-Stack</strong>-Entwicklung, mit Praxiserfahrung in der Konzeption von Banken-, Web- und Mobilanwendungen.',
        hero_bio_2: 'Leidenschaftlich für Softwarearchitektur, Codequalität und Prozessautomatisierung entwickle ich zuverlässige, wartbare und passgenaue Unternehmenslösungen.',
        stat_internships: 'Praktika im Unternehmen',
        stat_projects: 'Gelieferte Praxisprojekte',
        stat_degree: 'RNCP Stufe 7 (Master)',
        hero_cta_work: 'Projekte ansehen',
        hero_cta_cv: 'Lebenslauf herunterladen',

        term_cmds_label: 'Befehle:',

        proj_eyebrow: '01 — Konkrete Realisierungen',
        proj_title: 'Ausgewählte Projekte',
        lbl_role: 'Meine Rolle:',
        lbl_result: 'Ergebnis:',
        proj_cta: 'Detaillierte Fallstudie ansehen →',

        proj_sepa_title: 'SEPA Pro — Bankenautomatisierung',
        proj_sepa_desc: 'Konzeption und Entwicklung einer Geschäftsanwendung zur Verwaltung von SEPA-Überweisungen (SCT) und Lastschriften (SDD) gemäß ISO 20022.',
        proj_sepa_role: 'Full-Stack-Entwicklung C#/.NET 9 (Praktikum bei PROXIEL)',
        proj_sepa_res: 'Automatisierter Excel-Import & XSD-geprüfte XML-Generierung',

        proj_astw_title: 'Astreinte Web V2 — Back-Office & API',
        proj_astw_desc: 'Modernisierung eines Bereitschaftsdienstsystems für den öffentlichen Sektor zur Gewährleistung der Hochverfügbarkeit von Einsatzdaten.',
        proj_astw_role: 'REST/JWT-API-Konzeption & Back-Office-Neugestaltung',
        proj_astw_res: 'Zuverlässige Web/Mobil-Synchronisation & DSGVO-Konformität',

        proj_astm_title: 'Astreinte Mobile — Offline-Tablet-App',
        proj_astm_desc: 'Mobile Tablet-Anwendung mit vollständigem Offline-Betrieb für den Zugriff auf Notfallverfahren und Einsatzverzeichnisse.',
        proj_astm_role: '.NET MAUI-Entwicklung & lokale SQLite-Persistenz',
        proj_astm_res: '100 % autonomer Zugriff ohne Netzwerkverbindung',

        proj_erp_title: 'Assala Iskane ERP — Baustellenmanagement',
        proj_erp_desc: 'Standortübergreifende Unternehmenslösung zur Baustellensteuerung, rollenbasierten Zugriffskontrolle und Beschaffungsüberwachung.',
        proj_erp_role: 'Full-Stack Java/Spring Boot & React Entwicklung',
        proj_erp_res: '6-stufiger Genehmigungsworkflow containerisiert mit Docker',

        exp_eyebrow: '02 — Mein Werdegang',
        exp_title: 'Berufserfahrung',
        exp_prox_date: 'Februar – August 2026 | Montpellier, Frankreich',
        exp_prox_role: 'PROXIEL — Full-Stack Software-Ingenieur (Praktikum)',
        exp_prox_sub: 'Abschlusspraktikum — Konzeption von Unternehmensanwendungen & Finanzautomatisierung',
        exp_prox_p1_title: '1. SEPA Pro — Bankenautomatisierungslösung',
        exp_prox_p1_b1: '<strong>C#/.NET Stack:</strong> Entwicklung mit <strong>C# / .NET 9</strong>, <strong>Blazor</strong>, <strong>Entity Framework Core</strong> und <strong>SQL Server</strong>.',
        exp_prox_p1_b2: '<strong>SEPA-Prozesse:</strong> Automatisierung des Imports von Excel-Buchhaltungsdaten (Partner, Konten, Mandate) sowie Abwicklung von SCT-Überweisungen und SDD-Lastschriften.',
        exp_prox_p1_b3: '<strong>ISO 20022 Konformität:</strong> Generierung von SEPA-XML-Dateien mit strikter <strong>XSD</strong>-Schemavalidierung vor dem Export.',
        exp_prox_p1_b4: '<strong>Qualität & CI/CD:</strong> Automatisierung von Builds und Testausführungen über <strong>GitHub Actions</strong>.',
        exp_prox_p2_title: '2. Astreinte Web & Mobile — Öffentliches Bereitschaftssystem',
        exp_prox_p2_b1: '<strong>Backend & API:</strong> Entwicklung einer sicheren REST-Architektur mit <strong>Token/JWT</strong> unter <strong>CodeIgniter 4</strong>.',
        exp_prox_p2_b2: '<strong>Mobile App:</strong> Entwicklung einer <strong>.NET MAUI</strong>-Tablet-Anwendung mit lokaler <strong>SQLite</strong>-Datenbank für den Offline-Betrieb.',
        exp_prox_p2_b3: '<strong>Synchronisation:</strong> Implementierung einer zuverlässigen Synchronisationsstrategie zur Gewährleistung der Datenintegrität.',

        exp_assala_date: 'Juni – August 2024 | Fès, Marokko',
        exp_assala_role: 'Assala Iskane — Full-Stack Software-Ingenieur (Praktikum)',
        exp_assala_sub: 'Konzeption und Entwicklung eines ERP-Systems zur Baustellensteuerung',
        exp_assala_b1: '<strong>Technischer Stack:</strong> Backend mit <strong>Spring Boot 3 (Java 17)</strong>, Frontend mit <strong>React 18</strong> und <strong>MySQL</strong>-Datenbank.',
        exp_assala_b2: '<strong>Geschäftsworkflow:</strong> Implementierung einer 6-stufigen hierarchischen Genehmigungskette (Bauleiter → Projektleiter → Tech Manager → Buchhaltung → Technischer Dienst → Lager).',
        exp_assala_b3: '<strong>Sicherheit & RBAC:</strong> Granulare Zugriffskontrolle für 6 Rollen mit Datenisolation je Baustelle.',
        exp_assala_b4: '<strong>Containerisierung:</strong> Multi-Container-Bereitstellung über <strong>Docker Compose</strong> und <strong>Nginx</strong>-Reverse-Proxy.',

        exp_med_date: 'Juni – August 2023 | Frankreich (Remote)',
        exp_med_role: 'Medzair — Full-Stack Web- & Mobilentwickler (Praktikum)',
        exp_med_sub: 'Plattform zur Vermittlung ärztlicher Vertretungen zwischen Kliniken und Medizinern',
        exp_med_b1: '<strong>Backend & Mobil:</strong> Entwicklung mit <strong>Node.js</strong> und <strong>Flutter / Dart</strong> für eine plattformübergreifende Anwendung.',
        exp_med_b2: '<strong>Echtzeit:</strong> Integration der <strong>Firebase Realtime Database</strong> für sofortige Synchronisierung von Vertretungsangeboten.',
        exp_med_b3: '<strong>Funktionen:</strong> Interaktiver Verfügbarkeitskalender und automatisierte Buchungsbenachrichtigungen.',

        skills_eyebrow: '03 — Technisches Profil',
        skills_title: 'Technische Fähigkeiten',
        sk_dotnet: 'C#, Blazor, .NET MAUI, Entity Framework Core — angewendet bei SEPA Pro und Astreinte Mobile.',
        sk_java: 'Spring Security, Spring Data JPA, REST-APIs & RBAC — angewendet bei Assala Iskane ERP.',
        sk_react: 'Reaktive Geschäftsoberflächen, Dashboards und State-Management — angewendet bei Assala Iskane ERP.',
        sk_angular: 'Modulare TypeScript-SPAs, wiederverwendbare Komponenten und REST-API-Integration.',
        sk_sql: 'Relationale Modellierung, EF Core-Migrationen, komplexe Abfragen und lokale mobile Persistenz.',
        sk_docker: 'Docker Compose Containerisierung, Nginx Reverse Proxy und GitHub Actions CI/CD-Pipelines.',
        sk_solid: 'Separation of Concerns, Schichtenarchitektur, Wartbarkeit und automatisierte Tests.',
        sk_uml: 'Domänenmodellierung, Repository-, Factory- und Strategy-Muster sowie XML/XSD-Validierung.',
        sk_api: 'Token/JWT-Authentifizierung, Web/Mobil-Synchronisation und DSGVO-Best-Practices.',
        sk_php: 'Strukturierte MVC-Unternehmensanwendungen und RESTful APIs.',
        sk_cloud: 'Cloud-Anwendungsumgebungen und Grundlagen von Infrastructure as Code auf Google Cloud.',
        sk_linux: 'Ubuntu/Linux-Administration, Bash-Skripte und Git-Teamworkflows.',

        arch_eyebrow: '04 — Ingenieurwesen & Systemdesign',
        arch_title: 'Softwarearchitektur',
        arch_intro: 'Pädagogische und anonymisierte Darstellung einer mehrschichtigen <strong>.NET / ISO 20022</strong>-Architektur. Klicken Sie auf jede Schicht, um die Entwurfsentscheidungen zu erkunden.',
        arch_tab_1: 'Presentation Layer',
        arch_tab_2: 'Business Logic Layer',
        arch_tab_3: 'Data Access Layer',
        arch_tab_4: 'Integrations & CI/CD',

        edu_eyebrow: '05 — Akademischer Hintergrund',
        edu_title: 'Ausbildung',
        edu_1_title: 'Bachelor in Informatik-Ingenieurwesen (Computer Engineering)',
        edu_1_school: 'ESISA — Hochschule für Ingenieurwissenschaften (Fès)',
        edu_1_desc: 'Fortgeschrittene Algorithmen, Datenstrukturen, objektorientierte Programmierung (C++, Java), SQL-Datenbanken, Computernetzwerke und Linux-Systeme.',
        edu_2_title: 'Master 1 (M1) — Informationssysteme & Software-Engineering',
        edu_2_school: 'ESISA — Fès, Marokko',
        edu_2_desc: 'Software-Design (SOLID-Prinzipien, Design Patterns, UML), verteilte Architekturen sowie Full-Stack- und Mobilentwicklung.',
        edu_3_title: 'Experte für Informatik und Informationssysteme',
        edu_3_school: 'EPSI Montpellier — Staatlicher Abschluss RNCP Stufe 7 (Master-Niveau / Bac+5), verliehen im Oktober 2026',
        edu_3_desc: 'Unternehmensarchitektur (.NET, Java/Spring), Softwarequalität, DevOps (Docker, CI/CD), Cloud und IT-Projektleitung.',

        cert_eyebrow: '06 — Weiterbildung & Zertifikate',
        cert_title: 'Zertifizierungen',
        cert_verify: 'Zertifikat überprüfen →',

        contact_eyebrow: '07 — Kontakt aufnehmen',
        contact_title: 'Kontakt',
        contact_intro: 'Auf der Suche nach einem C#/.NET- und Full-Stack-Software-Ingenieur für eine Festanstellung? Kontaktieren Sie mich gerne direkt.',
        btn_copy: 'E-Mail kopieren',
        contact_loc: 'Montpellier, Frankreich — Einsatzbereit in Frankreich und international',
        ph_name: 'Ihr Name',
        ph_email: 'Ihre geschäftliche E-Mail',
        ph_msg: 'Ihre Nachricht (CDI-Möglichkeit, technischer Austausch...)',
        btn_send: 'Nachricht senden',
        form_hint_default: 'Integriertes Formular: direkter E-Mail-Versand mit sofortiger Bestätigung.',

        modal_prob: 'Geschäftliche Herausforderung',
        modal_role: 'Meine Rolle & Rahmenbedingungen',
        modal_contrib: 'Technische Lösung & Resultate',
        modal_arch_btn: 'Architektur erkunden'
    },
    ar: {
        nav_home: 'الرئيسية',
        nav_projects: 'المشاريع',
        nav_experience: 'الخبرة',
        nav_skills: 'المهارات',
        nav_arch: 'الهندسة المعمارية',
        nav_education: 'التكوين',
        nav_certs: 'الشهادات',
        nav_contact: 'اتصل بي',

        hero_avail_title: 'متاح للتوظيف بعقد دائم (CDI)',
        hero_avail_sub: 'مستعد للتنقل داخل فرنسا ودولياً',
        hero_badge: 'مهندس برمجيات &nbsp;|&nbsp; C#/.NET &nbsp;|&nbsp; FULL-STACK &amp; DEVOPS',
        hero_bio_1: 'مهندس برمجيات متخصص في تطوير <strong>C#/.NET</strong> و<strong>Full-Stack</strong>، بخبرة عملية في تصميم تطبيقات الأعمال البنكية، الويب والهواتف الذكية.',
        hero_bio_2: 'شغوف بهندسة البرمجيات، جودة الكود وأتمتة العمليات، وأقوم بتصميم حلول موثوقة وقابلة للتطوير ومطابقة لمتطلبات الأعمال.',
        stat_internships: 'تدريبات مهنية',
        stat_projects: 'مشاريع مؤسساتية منجزة',
        stat_degree: 'مستوى ماستر RNCP 7',
        hero_cta_work: 'استكشف مشاريعي',
        hero_cta_cv: 'تحميل السيرة الذاتية',

        term_cmds_label: 'الأوامر:',

        proj_eyebrow: '01 — إنجازات واقعية',
        proj_title: 'أبرز المشاريع',
        lbl_role: 'دوري في المشروع:',
        lbl_result: 'النتيجة المحققة:',
        proj_cta: 'عرض دراسة الحالة الكاملة ←',

        proj_sepa_title: 'SEPA Pro — أتمتة المعاملات البنكية',
        proj_sepa_desc: 'تصميم وتطوير تطبيق أعمال لإدارة التحويلات (SCT) والاقتطاعات البنكية (SDD) وفق المعيار الأوروبي ISO 20022.',
        proj_sepa_role: 'تطوير Full-Stack C#/.NET 9 (تدريب في PROXIEL)',
        proj_sepa_res: 'استيراد تلقائي لدفاتر Excel وتوليد XML معتمد بـ XSD',

        proj_astw_title: 'Astreinte Web V2 — الإدارة والـ API',
        proj_astw_desc: 'تحديث منصة إدارة فرق المداومة للقطاع العام لضمان الوصول الفوري والدائم لإجراءات ودلائل الطوارئ.',
        proj_astw_role: 'هندسة API REST/JWT وتحديث لوحة الإدارة',
        proj_astw_res: 'مزامنة آمنة بين الويب والأجهزة المحمولة مع احترام RGPD',

        proj_astm_title: 'Astreinte Mobile — لوحات التدخل الميداني',
        proj_astm_desc: 'تطبيق لوحي للهواتف والأجهزة اللوحية يدعم العمل الكامل بدون اتصال بالإنترنت (Offline-First).',
        proj_astm_role: 'تطوير .NET MAUI وقواعد بيانات SQLite محلية',
        proj_astm_res: 'استخدام ذاتي ومستقل بنسبة 100% خارج التغطية',

        proj_erp_title: 'Assala Iskane ERP — إدارة الأوراش العقارية',
        proj_erp_desc: 'منظومة سحابية لإدارة وتتبع مشاريع البناء والمشتريات وتدقيق الصلاحيات عبر عدة مواقع.',
        proj_erp_role: 'تطوير Full-Stack بـ Java/Spring Boot وReact',
        proj_erp_res: 'مسار مصادقة هرمي بـ 6 مستويات مع حاويات Docker',

        exp_eyebrow: '02 — المسار المهني',
        exp_title: 'الخبرة المهنية',
        exp_prox_date: 'فبراير – غشت 2026 | مونبلييه، فرنسا',
        exp_prox_role: 'PROXIEL — مهندس برمجيات Full-Stack (تدريب)',
        exp_prox_sub: 'مشروع نهاية التخرج — تصميم تطبيقات الأعمال والأتمتة المالية',
        exp_prox_p1_title: '1. SEPA Pro — منصة الأتمتة البنكية',
        exp_prox_p1_b1: '<strong>تقنيات C#/.NET:</strong> تطوير المنصة باستخدام <strong>C# / .NET 9</strong>، <strong>Blazor</strong>، <strong>Entity Framework Core</strong> و<strong>SQL Server</strong>.',
        exp_prox_p1_b2: '<strong>المعاملات البنكية:</strong> أتمتة استيراد الدفاتر الحسابية Excel (الأطراف، الحسابات، التفويضات) ومعالجة التحويلات والاقتطاعات.',
        exp_prox_p1_b3: '<strong>مطابقة ISO 20022:</strong> توليد دفعات XML البنكية مع التحقق الصارم عبر مخططات <strong>XSD</strong> قبل التصدير.',
        exp_prox_p1_b4: '<strong>الجودة و CI/CD:</strong> أتمتة البناء وتشغيل الاختبارات البرمجية عبر <strong>GitHub Actions</strong>.',
        exp_prox_p2_title: '2. Astreinte Web & Mobile — نظام المداومة العمومي',
        exp_prox_p2_b1: '<strong>الواجهة الخلفية و الـ API:</strong> تطوير معمارية REST محمية بنظام <strong>Token/JWT</strong> باستخدام <strong>CodeIgniter 4</strong>.',
        exp_prox_p2_b2: '<strong>التطبيق المحمول:</strong> تطوير تطبيق لوحي عبر <strong>.NET MAUI</strong> مع قاعدة بيانات محلية <strong>SQLite</strong> للعمل بدون إنترنت.',
        exp_prox_p2_b3: '<strong>المزامنة الذكية:</strong> تطبيق استراتيجية مزامنة موثوقة تضمن سلامة الإجراءات ودليل الاتصال.',

        exp_assala_date: 'يونيو – غشت 2024 | فاس، المغرب',
        exp_assala_role: 'Assala Iskane — مهندس برمجيات Full-Stack (تدريب)',
        exp_assala_sub: 'تصميم وتطوير نظام ERP متكامل لإدارة ومراقبة أوراش البناء',
        exp_assala_b1: '<strong>البنية التقنية:</strong> خلفية <strong>Spring Boot 3 (Java 17)</strong>، واجهة <strong>React 18</strong>، وقاعدة بيانات <strong>MySQL</strong>.',
        exp_assala_b2: '<strong>سير العمل الإداري:</strong> بناء مسار موافقات هرمي بـ 6 مستويات (رئيس الورش ← مسؤول المشروع ← المدير التقني ← المحاسبة ← المصلحة التقنية ← المستودع).',
        exp_assala_b3: '<strong>الأمان والصلاحيات:</strong> إدارة دقيقة للوصول لـ 6 أدوار مختلفة مع عزل تام لبيانات كل ورش.',
        exp_assala_b4: '<strong>الحاويات والنشر:</strong> نشر المنظومة عبر <strong>Docker Compose</strong> مع خادم عكسي <strong>Nginx</strong>.',

        exp_med_date: 'يونيو – غشت 2023 | فرنسا (عن بُعد)',
        exp_med_role: 'Medzair — مطور Full-Stack ويب ومحمول (تدريب)',
        exp_med_sub: 'منصة لربط المؤسسات الصحية بالأطباء لتعويض المناوبات الطبية',
        exp_med_b1: '<strong>الخلفية والمحمول:</strong> تطوير التطبيق باستخدام <strong>Node.js</strong> و<strong>Flutter / Dart</strong>.',
        exp_med_b2: '<strong>التحديث الفوري:</strong> ربط التطبيق بقاعدة <strong>Firebase Realtime Database</strong> لمزامنة عروض التعويض لحظياً.',
        exp_med_b3: '<strong>الخصائص:</strong> تقويم تفاعلي للأوقات المتاحة وإشعارات آلية عند قبول الطلبات.',

        skills_eyebrow: '03 — ما أتقنه تقنياً',
        skills_title: 'المهارات التقنية',
        sk_dotnet: 'C#, Blazor, .NET MAUI, Entity Framework Core — مطبق في مشروعي SEPA Pro و Astreinte Mobile.',
        sk_java: 'Spring Security, Spring Data JPA, REST APIs & RBAC — مطبق في مشروع Assala Iskane ERP.',
        sk_react: 'واجهات أعمال تفاعلية، لوحات تحكم وإدارة الحالة — مطبق في مشروع Assala Iskane ERP.',
        sk_angular: 'تطبيقات الويب الأحادية (SPA) عبر TypeScript ومكونات برمجية قابلة لإعادة الاستخدام.',
        sk_sql: 'النمذجة العلائقية، ترحيل البيانات EF Core، الاستعلامات المتقدمة والتخزين المحلي بدون إنترنت.',
        sk_docker: 'حاويات Docker Compose، خوادم Nginx العكسية، وأنابيب البناء والتكامل GitHub Actions.',
        sk_solid: 'فصل المهام والمسؤوليات، المعمارية الطبقية، قابلية الصيانة والاختبارات الآلية.',
        sk_uml: 'نمذجة الأنظمة، أنماط التصميم (Repository, Factory, Strategy) والتحقق من تدفقات XML/XSD.',
        sk_api: 'بناء واجهات API آمنة بنظام Token/JWT، مزامنة الويب والمحمول، ومطابقة معايير حماية البيانات.',
        sk_php: 'تطوير تطبيقات الأعمال وواجهات البرمجة وفق معمارية MVC المنظمة.',
        sk_cloud: 'بيئات التطبيقات السحابية ومبادئ البنية التحتية ككود (IaC) على Google Cloud.',
        sk_linux: 'إدارة خوادم أنظمة Ubuntu/Linux، نصوص Bash، وإدارة الإصدارات عبر Git ضمن فريق عمل.',

        arch_eyebrow: '04 — الهندسة وتصميم الأنظمة',
        arch_title: 'الهندسة المعمارية للبرمجيات',
        arch_intro: 'نظرة تعليمية ومبسطة لهندسة طبقية تعتمد على <strong>.NET / ISO 20022</strong>. اضغط على أي طبقة لاكتشاف المعايير الهندسية المتبعة.',
        arch_tab_1: 'Presentation Layer',
        arch_tab_2: 'Business Logic Layer',
        arch_tab_3: 'Data Access Layer',
        arch_tab_4: 'Integrations & CI/CD',

        edu_eyebrow: '05 — المسار الأكاديمي',
        edu_title: 'التكوين والشواهد',
        edu_1_title: 'إجازة في الهندسة المعلوماتية (Computer Engineering)',
        edu_1_school: 'المدرسة العليا للهندسة في العلوم التطبيقية (ESISA - فاس)',
        edu_1_desc: 'خوارزميات متقدمة، هياكل البيانات، البرمجة كائنية التوجه (C++, Java)، قواعد بيانات SQL، شبكات الحاسوب، وأنظمة Linux.',
        edu_2_title: 'ماستر 1 (M1) — هندسة نظم المعلومات',
        edu_2_school: 'ESISA — فاس، المغرب',
        edu_2_desc: 'تصميم البرمجيات (مبادئ SOLID، أنماط التصميم، نمذجة UML)، الأنظمة الموزعة وتطوير تطبيقات الويب والمحمول.',
        edu_3_title: 'خبير في المعلوميات ونظم المعلومات (مستوى ماستر)',
        edu_3_school: 'EPSI Montpellier — شهادة معتمدة من الدولة الفرنسية RNCP المستوى 7 (Bac+5)، أكتوبر 2026',
        edu_3_desc: 'معمارية تطبيقات الشركات الكبرى (.NET, Java/Spring)، جودة البرمجيات، DevOps (Docker, CI/CD)، الحوسبة السحابية وإدارة مشاريع نظم المعلومات.',

        cert_eyebrow: '06 — التكوين المستمر والشهادات',
        cert_title: 'الشهادات الاحترافية',
        cert_verify: 'التحقق من الشهادة ←',

        contact_eyebrow: '07 — لنتواصل معاً',
        contact_title: 'اتصل بي',
        contact_intro: 'هل تبحث عن مهندس برمجيات C#/.NET و Full-Stack لعقد عمل دائم (CDI)؟ يسعدني التواصل معك ومناقشة الفرص المتاحة.',
        btn_copy: 'نسخ البريد الإلكتروني',
        contact_loc: 'مونبلييه، فرنسا — متاح للتنقل داخل فرنسا ودولياً',
        ph_name: 'اسمك الكامل',
        ph_email: 'بريدك الإلكتروني المهني',
        ph_msg: 'رسالتك (فرصة عمل CDI، نقاش تقني...)',
        btn_send: 'إرسال الرسالة',
        form_hint_default: 'نموذج مباشر: إرسال فوري إلى بريدي الإلكتروني مع تأكيد الاستلام.',

        modal_prob: 'التحدي المؤسساتي',
        modal_role: 'دوري ونطاق العمل',
        modal_contrib: 'الحل التقني والإنجازات',
        modal_arch_btn: 'استكشاف الهندسة المعمارية'
    }
};

const ARCH_LAYERS = {
    presentation: {
        fr: {
            title: '01 — Presentation Layer (UI & Contrôle d\'accès)',
            desc: 'Interface web interactive basée sur des composants serveur (.NET / Blazor), offrant une validation des formulaires en temps réel, un contrôle d\'accès par rôle (RBAC) et une prévisualisation sécurisée des opérations avant validation.'
        },
        en: {
            title: '01 — Presentation Layer (UI & Access Control)',
            desc: 'Interactive server-side component UI (.NET / Blazor) providing real-time form validation, Role-Based Access Control (RBAC), and secure batch preview before final execution.'
        },
        de: {
            title: '01 — Presentation Layer (Benutzeroberfläche & Zugriffskontrolle)',
            desc: 'Interaktive serverseitige Komponenten-Benutzeroberfläche (.NET / Blazor) mit Formularvalidierung in Echtzeit, rollenbasierter Zugriffskontrolle (RBAC) und sicherer Batch-Vorschau vor der endgültigen Ausführung.'
        },
        ar: {
            title: '01 — Presentation Layer (واجهة المستخدم وضبط الصلاحيات)',
            desc: 'واجهة ويب تفاعلية مبنية على مكونات خادم متقدمة (.NET / Blazor)، تتيح التحقق الفوري من صحة النماذج، وضبط الصلاحيات وفق الأدوار (RBAC)، ومعاينة آمنة للعمليات قبل الاعتماد النهائي.'
        }
    },
    business: {
        fr: {
            title: '02 — Business Logic Layer (Services Métier & Conformité)',
            desc: 'Cœur métier découplé gérant la validation des coordonnées bancaires (IBAN/BIC), le cycle de vie des mandats SEPA, l\'import structuré de fichiers comptables et l\'assemblage des lots selon les règles ISO 20022.'
        },
        en: {
            title: '02 — Business Logic Layer (Domain Services & Compliance)',
            desc: 'Decoupled domain layer handling IBAN/BIC validation, SEPA mandate lifecycle, structured accounting file parsing, and payment batch assembly according to ISO 20022 rules.'
        },
        de: {
            title: '02 — Business Logic Layer (Geschäftslogik & Compliance)',
            desc: 'Entkoppelte Domänenschicht zur Validierung von Bankdaten (IBAN/BIC), Verwaltung des SEPA-Mandatslebenszyklus, Parsing von Buchhaltungsdateien und Zusammenstellung von Zahlungsstapeln nach ISO 20022.'
        },
        ar: {
            title: '02 — Business Logic Layer (خدمات الأعمال والمطابقة)',
            desc: 'طبقة المنطق التجاري المسؤولة عن تدقيق الحسابات البنكية (IBAN/BIC)، إدارة تفويضات SEPA، تحليل ملفات المحاسبة واستخراج الدفعات وفق معايير ISO 20022.'
        }
    },
    data: {
        fr: {
            title: '03 — Data Access Layer (Persistance & Intégrité)',
            desc: 'Accès aux données relationnelles via Entity Framework Core et SQL Server. Utilisation de transactions ACID, de migrations versionnées et d\'une journalisation d\'audit pour garantir la traçabilité des opérations.'
        },
        en: {
            title: '03 — Data Access Layer (Persistence & Integrity)',
            desc: 'Relational data access powered by Entity Framework Core and SQL Server, leveraging ACID transactions, versioned migrations, and audit logging for end-to-end traceability.'
        },
        de: {
            title: '03 — Data Access Layer (Datenzugriff & Integrität)',
            desc: 'Relationaler Datenzugriff über Entity Framework Core und SQL Server mit ACID-Transaktionen, versionierten Migrationen und lückenloser Audit-Protokollierung für höchste Nachvollziehbarkeit.'
        },
        ar: {
            title: '03 — Data Access Layer (حفظ وتكامل البيانات)',
            desc: 'الوصول لقواعد البيانات العلائقية عبر Entity Framework Core و SQL Server، بالاعتماد على معاملات ACID الصارمة وتتبع التغييرات لتأمين أعلى مستويات الموثوقية.'
        }
    },
    integration: {
        fr: {
            title: '04 — External Integrations & CI/CD (XML/XSD & Automatisation)',
            desc: 'Génération de fichiers XML SEPA (SCT/SDD) systématiquement validés contre les schémas officiels XSD avant export, accompagnée d\'un pipeline GitHub Actions automatisant la compilation et les tests.'
        },
        en: {
            title: '04 — External Integrations & CI/CD (XML/XSD & Automation)',
            desc: 'SEPA XML batch generation (SCT/SDD) strictly validated against official XSD schemas prior to export, backed by a GitHub Actions pipeline automating builds and test suites.'
        },
        de: {
            title: '04 — External Integrations & CI/CD (XML/XSD & Automatisierung)',
            desc: 'Generierung von SEPA-XML-Dateien (SCT/SDD) mit automatischer XSD-Prüfung vor dem Export, unterstützt durch eine GitHub Actions Pipeline für automatisierte Builds und Tests.'
        },
        ar: {
            title: '04 — External Integrations & CI/CD (تكامل XML/XSD والأتمتة)',
            desc: 'توليد ملفات XML البنكية (SCT/SDD) والتحقق التلقائي منها عبر مخططات XSD الرسمية قبل التصدير، مع خطوط تكامل مستمر GitHub Actions لأتمتة الاختبارات.'
        }
    }
};

function updateArchExplainer() {
    const titleEl = document.getElementById('archLayerTitle');
    const descEl = document.getElementById('archLayerDesc');
    const layerData = ARCH_LAYERS[currentArchLayer] && ARCH_LAYERS[currentArchLayer][currentLang];
    if (titleEl && descEl && layerData) {
        titleEl.textContent = layerData.title;
        descEl.textContent = layerData.desc;
    }
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }

    const dict = I18N[lang] || I18N.fr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });

    document.querySelectorAll('.lang-opt').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    const termInput = document.getElementById('terminalInput');
    if (termInput) {
        if (lang === 'en') {
            termInput.placeholder = 'Type a command: whoami, projects, skills, contact, sudo hire youssef...';
        } else if (lang === 'de') {
            termInput.placeholder = 'Befehl eingeben: whoami, projects, skills, contact, sudo hire youssef...';
        } else if (lang === 'ar') {
            termInput.placeholder = 'اكتب أمراً: whoami, projects, skills, contact, sudo hire youssef...';
        } else {
            termInput.placeholder = 'Tapez une commande : whoami, projects, skills, contact, sudo hire youssef...';
        }
    }

    updateArchExplainer();
}

// Bind all 4 language buttons
document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const chosen = btn.getAttribute('data-lang');
        if (chosen) {
            applyLanguage(chosen);
        }
    });
});

// Interactive Architecture Tabs
document.querySelectorAll('.arch-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.arch-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentArchLayer = tab.getAttribute('data-layer') || 'presentation';
        updateArchExplainer();
    });
});

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
                top: targetElement.offsetTop - 75,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// 2. Hero 3D Rotating Network Sphere (Canvas)
// ==========================================================================
const sphereCanvas = document.getElementById('heroSphereCanvas');
if (sphereCanvas && sphereCanvas.getContext) {
    const ctx = sphereCanvas.getContext('2d');
    const W = 640;
    const H = 640;
    sphereCanvas.width = W;
    sphereCanvas.height = H;

    const NUM_POINTS = 90;
    const RADIUS = 230;
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
    const angleX = 0.25;

    function renderSphere() {
        ctx.clearRect(0, 0, W, H);
        angleY += 0.0032;

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

        for (let i = 0; i < projected.length; i++) {
            for (let j = i + 1; j < projected.length; j++) {
                const dx = projected[i].px - projected[j].px;
                const dy = projected[i].py - projected[j].py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 90) {
                    const alpha = (1 - dist / 90) * 0.22;
                    ctx.strokeStyle = `rgba(57, 213, 255, ${alpha.toFixed(3)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(projected[i].px, projected[i].py);
                    ctx.lineTo(projected[j].px, projected[j].py);
                    ctx.stroke();
                }
            }
        }

        projected.forEach((pt, idx) => {
            const alpha = Math.max(0.18, (pt.z + RADIUS) / (2 * RADIUS));
            ctx.fillStyle = idx % 3 === 0
                ? `rgba(167, 139, 250, ${alpha.toFixed(2)})`
                : `rgba(57, 213, 255, ${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 2.2 * pt.scale, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(renderSphere);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        renderSphere();
    }
}

// ==========================================================================
// 3. Hero Typing Animation (4 Languages: FR / EN / DE / AR)
// ==========================================================================
const heroTypingText = document.getElementById('heroTypingText');
if (heroTypingText) {
    const phrasesByLang = {
        fr: [
            'Conception d\'applications métier C#/.NET & Full-Stack.',
            'Architecture logicielle propre, fiable et maintenable.',
            'Automatisation des flux et intégration continue.'
        ],
        en: [
            'Building reliable C#/.NET & Full-Stack applications.',
            'Clean software architecture & maintainable code.',
            'Workflow automation & continuous integration.'
        ],
        de: [
            'Entwicklung zuverlässiger C#/.NET & Full-Stack-Lösungen.',
            'Saubere Softwarearchitektur und wartbarer Code.',
            'Workflow-Automatisierung und kontinuierliche Integration.'
        ],
        ar: [
            'تصميم تطبيقات أعمال قوية بـ C#/.NET و Full-Stack.',
            'هندسة برمجيات نظيفة، موثوقة وقابلة للتطوير.',
            'أتمتة مسارات العمل وتكامل مستمر (CI/CD).'
        ]
    };
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tickHeroType() {
        const list = phrasesByLang[currentLang] || phrasesByLang.fr;
        const current = list[phraseIdx % list.length];

        if (isDeleting) {
            charIdx = Math.max(0, charIdx - 1);
            heroTypingText.textContent = current.substring(0, charIdx);
            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % list.length;
                setTimeout(tickHeroType, 320);
                return;
            }
            setTimeout(tickHeroType, 28);
        } else {
            charIdx = Math.min(current.length, charIdx + 1);
            heroTypingText.textContent = current.substring(0, charIdx);
            if (charIdx >= current.length) {
                isDeleting = true;
                setTimeout(tickHeroType, 2300);
                return;
            }
            setTimeout(tickHeroType, 48);
        }
    }

    setTimeout(tickHeroType, 1200);
}

// ==========================================================================
// 4. Interactive Card Mouse Spotlight
// ==========================================================================
document.querySelectorAll('.skill-card, .portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// ==========================================================================
// 5. Interactive Project Case Study Modal (FR / EN)
// ==========================================================================
const CASE_STUDIES = {
    'sepa': {
        fr: {
            tag: 'C# / .NET 9 · Blazor · Entity Framework Core · SQL Server',
            title: 'SEPA Pro — Automatisation des Flux Bancaires',
            sub: 'Application métier dédiée au traitement des virements (SCT) et prélèvements (SDD) au format européen ISO 20022.',
            challenge: 'Fiabiliser le traitement des données comptables issues de fichiers Excel et éliminer les erreurs manuelles lors de la préparation des remises bancaires XML.',
            solution: 'Stage de fin d\'études chez PROXIEL : développement Full-Stack C#/.NET 9 au sein de l\'équipe technique, de la modélisation EF Core jusqu\'à la validation XSD.',
            bullets: [
                'Développement d\'interfaces métier interactives sous C# / .NET 9 et Blazor avec contrôle d\'accès.',
                'Mise en place d\'un pipeline d\'import Excel structurant automatiquement les entités métier (Tiers, Comptes, Mandats).',
                'Génération de fichiers XML SEPA conformes à la norme ISO 20022 avec validation systématique par schéma XSD.',
                'Mise en place d\'un workflow CI/CD sous GitHub Actions pour automatiser la compilation et les tests.'
            ],
            techs: ['C#', '.NET 9', 'Blazor', 'EF Core', 'SQL Server', 'ISO 20022 / XSD', 'GitHub Actions'],
            showArchLink: true
        },
        en: {
            tag: 'C# / .NET 9 · Blazor · Entity Framework Core · SQL Server',
            title: 'SEPA Pro — Banking Workflow Automation',
            sub: 'Business application designed to process SEPA credit transfers (SCT) and direct debits (SDD) under the ISO 20022 standard.',
            challenge: 'Streamline accounting ledger imports from Excel and eliminate manual errors when preparing XML banking batches.',
            solution: 'Final-year internship at PROXIEL: Full-Stack C#/.NET 9 development within the engineering team, from EF Core data modeling to XSD validation.',
            bullets: [
                'Built interactive business views using C# / .NET 9 and Blazor with role-based access control.',
                'Engineered an Excel import pipeline automatically structuring domain entities (Third Parties, Accounts, Mandates).',
                'Implemented ISO 20022 SEPA XML generation with strict XSD schema validation before export.',
                'Configured a GitHub Actions CI/CD workflow to automate project builds and test runs.'
            ],
            techs: ['C#', '.NET 9', 'Blazor', 'EF Core', 'SQL Server', 'ISO 20022 / XSD', 'GitHub Actions'],
            showArchLink: true
        },
        de: {
            tag: 'C# / .NET 9 · Blazor · Entity Framework Core · SQL Server',
            title: 'SEPA Pro — Bankenautomatisierungsplattform',
            sub: 'Unternehmensanwendung zur Abwicklung von SEPA-Überweisungen (SCT) und Lastschriften (SDD) nach ISO 20022.',
            challenge: 'Automatisierung der fehleranfälligen manuellen Verarbeitung von Excel-Hauptbüchern und Vorbereitung fehlerfreier XML-Zahlungsdateien.',
            solution: 'Abschlusspraktikum bei PROXIEL: Full-Stack C#/.NET 9 Entwicklung im Engineering-Team, von EF Core Datenmodellen bis zur XSD-Validierung.',
            bullets: [
                'Entwicklung interaktiver Benutzeroberflächen mit C# / .NET 9 und Blazor inklusive rollenbasierter Zugriffskontrolle.',
                'Aufbau einer Excel-Import-Pipeline zur automatisierten Strukturierung von Geschäftsentitäten (Partner, Konten, Mandate).',
                'Erzeugung von ISO 20022 SEPA-XML-Dateien mit strikter XSD-Schemaprüfung vor dem Export.',
                'Einrichtung von CI/CD-Pipelines unter GitHub Actions zur Automatisierung von Builds und Tests.'
            ],
            techs: ['C#', '.NET 9', 'Blazor', 'EF Core', 'SQL Server', 'ISO 20022 / XSD', 'GitHub Actions'],
            showArchLink: true
        },
        ar: {
            tag: 'C# / .NET 9 · Blazor · Entity Framework Core · SQL Server',
            title: 'SEPA Pro — أتمتة المعاملات البنكية',
            sub: 'تطبيق أعمال لإدارة وتنفيذ التحويلات والاقتطاعات البنكية المعتمدة على المعيار الأوروبي ISO 20022.',
            challenge: 'أتمتة المعالجة اليدوية لدفاتر الحسابات وتفادي الأخطاء أثناء إعداد دفعات XML الموجهة للأبناك.',
            solution: 'تدريب نهاية الدراسة بشركة PROXIEL: تطوير كامل Full-Stack C#/.NET 9 من نمذجة قواعد البيانات حتى تدقيق XSD.',
            bullets: [
                'تطوير واجهات أعمال تفاعلية عبر C# / .NET 9 و Blazor مع ضبط الصلاحيات بدقة.',
                'إنشاء مسار آلي لمعالجة ملفات Excel واستخراج الكيانات (الأطراف، الحسابات، التفويضات).',
                'توليد ملفات XML SEPA مطابقة لمعايير ISO 20022 مع تدقيق صارم بمخططات XSD.',
                'إعداد أنابيب تكامل مستمر CI/CD عبر GitHub Actions لأتمتة البناء وفحص الأخطاء.'
            ],
            techs: ['C#', '.NET 9', 'Blazor', 'EF Core', 'SQL Server', 'ISO 20022 / XSD', 'GitHub Actions'],
            showArchLink: true
        }
    },
    'astreinte-web': {
        fr: {
            tag: 'PHP / CodeIgniter 4 · REST API · JWT',
            title: 'Astreinte Web V2 — Back-Office & API REST',
            sub: 'Modernisation d\'un système de gestion des astreintes pour le secteur public garantissant la disponibilité des procédures et annuaires.',
            challenge: 'Centraliser la gestion des procédures d\'astreinte et assurer une synchronisation sécurisée avec les terminaux mobiles des agents.',
            solution: 'Stage chez PROXIEL : conception de l\'API REST sécurisée par JWT sous CodeIgniter 4 et refonte de l\'interface d\'administration.',
            bullets: [
                'Développement d\'une API REST sous CodeIgniter 4 avec authentification stateless par Token/JWT.',
                'Conception d\'une stratégie de synchronisation garantissant la cohérence des données entre le serveur et les tablettes.',
                'Modernisation de l\'interface de back-office pour faciliter la mise à jour des annuaires et procédures.',
                'Respect des bonnes pratiques de sécurité et de protection des données (RGPD).'
            ],
            techs: ['PHP', 'CodeIgniter 4', 'REST API', 'JWT', 'MySQL', 'UI Back-Office'],
            showArchLink: false
        },
        en: {
            tag: 'PHP / CodeIgniter 4 · REST API · JWT',
            title: 'Astreinte Web V2 — Back-Office & REST API',
            sub: 'Modernization of a public-sector on-call management system ensuring availability of emergency procedures and directories.',
            challenge: 'Centralize on-call procedure management and ensure secure synchronization with field agents\' mobile tablets.',
            solution: 'Internship at PROXIEL: designed the JWT-secured REST API in CodeIgniter 4 and modernized the administration interface.',
            bullets: [
                'Developed a RESTful API using CodeIgniter 4 with stateless Token/JWT authentication.',
                'Designed a synchronization mechanism ensuring data consistency between the web server and field tablets.',
                'Modernized the back-office interface to streamline directory and procedure updates.',
                'Applied security and GDPR data protection best practices.'
            ],
            techs: ['PHP', 'CodeIgniter 4', 'REST API', 'JWT', 'MySQL', 'Back-Office UI'],
            showArchLink: false
        },
        de: {
            tag: 'PHP / CodeIgniter 4 · REST API · JWT',
            title: 'Astreinte Web V2 — Back-Office & REST-API',
            sub: 'Modernisierung eines Bereitschaftssystems für den öffentlichen Sektor zur Gewährleistung der Hochverfügbarkeit von Einsatzdaten.',
            challenge: 'Zentralisierung der Verwaltung von Notfallverfahren und sichere Synchronisierung mit mobilen Endgeräten.',
            solution: 'Praktikum bei PROXIEL: Konzeption der JWT-gesicherten REST-API in CodeIgniter 4 und Neugestaltung des Administrations-Backends.',
            bullets: [
                'Entwicklung einer REST-API unter CodeIgniter 4 mit zustandsloser Token/JWT-Authentifizierung.',
                'Entwurf einer robusten Synchronisationsstrategie zwischen Webserver und Einsatz-Tablets.',
                'Modernisierung der Benutzeroberfläche zur schnellen Pflege von Verzeichnissen und Alarmplänen.',
                'Einhaltung von Sicherheitsstandards und Datenschutzrichtlinien (DSGVO).'
            ],
            techs: ['PHP', 'CodeIgniter 4', 'REST API', 'JWT', 'MySQL', 'Back-Office'],
            showArchLink: false
        },
        ar: {
            tag: 'PHP / CodeIgniter 4 · REST API · JWT',
            title: 'Astreinte Web V2 — الواجهة الخلفية و الـ API',
            sub: 'تحديث نظام إدارة فرق المداومة للقطاع العام وتأمين التوفر الدائم للدلائل وإجراءات الطوارئ.',
            challenge: 'مركزية إدارة الإجراءات وتأمين التزامن السلس والمشفر مع الأجهزة اللوحية للفرق الميدانية.',
            solution: 'تدريب في PROXIEL: تصميم معمارية REST محمية بـ JWT وتحديث شامل للوحة تحكم الإدارة.',
            bullets: [
                'برمجة واجهة برمجة تطبيقات REST عبر CodeIgniter 4 بنظام توثيق Token/JWT.',
                'بناء آلية مزامنة موثوقة تضمن سلامة وتحديث البيانات عبر الخوادم والأجهزة الميدانية.',
                'تحديث واجهة لوحة التحكم لتسهيل تدبير الدلائل والإجراءات في حالات الطوارئ.',
                'تطبيق أفضل ممارسات الحماية والأمان واحترام القوانين المنظمة للبيانات (RGPD).'
            ],
            techs: ['PHP', 'CodeIgniter 4', 'REST API', 'JWT', 'MySQL', 'Back-Office'],
            showArchLink: false
        }
    },
    'astreinte-mobile': {
        fr: {
            tag: '.NET MAUI · C# · SQLite Offline-First',
            title: 'Astreinte Mobile — Application Tablette Hors-Ligne',
            sub: 'Application mobile destinée aux agents en intervention, permettant de consulter les procédures et annuaires sans connexion réseau.',
            challenge: 'Garantir aux agents sur le terrain un accès immédiat aux fiches réflexes et annuaires même en zone sans couverture réseau.',
            solution: 'Stage chez PROXIEL : développement d\'une application tablette sous .NET MAUI couplée à une base de données locale SQLite.',
            bullets: [
                'Développement de l\'application mobile cross-platform en C# / .NET MAUI adaptée aux tablettes.',
                'Mise en place d\'une persistance locale SQLite permettant un fonctionnement 100 % hors ligne.',
                'Synchronisation sécurisée via l\'API REST/JWT dès qu\'une connexion réseau est disponible.'
            ],
            techs: ['.NET MAUI', 'C#', 'SQLite', 'Mode Hors-Ligne', 'REST / JWT'],
            showArchLink: false
        },
        en: {
            tag: '.NET MAUI · C# · SQLite Offline-First',
            title: 'Astreinte Mobile — Offline-First Tablet App',
            sub: 'Mobile tablet application for field agents providing access to emergency procedures and directories without network coverage.',
            challenge: 'Ensure field agents have instant access to critical procedures and contact directories even in dead zones with no connectivity.',
            solution: 'Internship at PROXIEL: developed a .NET MAUI tablet application backed by a local SQLite database.',
            bullets: [
                'Built the cross-platform tablet application in C# / .NET MAUI optimized for field usability.',
                'Implemented local SQLite persistence enabling 100% offline consultation.',
                'Integrated secure synchronization with the REST/JWT API whenever connectivity is restored.'
            ],
            techs: ['.NET MAUI', 'C#', 'SQLite', 'Offline-First', 'REST / JWT'],
            showArchLink: false
        },
        de: {
            tag: '.NET MAUI · C# · SQLite Offline-First',
            title: 'Astreinte Mobile — Offline-Tablet-Applikation',
            sub: 'Mobile Tablet-Anwendung für Einsatzkräfte vor Ort zur unterbrechungsfreien Einsicht in Notfallpläne ohne Netzverbindung.',
            challenge: 'Sofortiger Zugriff auf kritische Handlungsanweisungen und Kontaktverzeichnisse auch in Funklöchern.',
            solution: 'Praktikum bei PROXIEL: Entwicklung einer .NET MAUI Tablet-Applikation mit lokaler SQLite-Datenbank.',
            bullets: [
                'Entwicklung der plattformübergreifenden Tablet-Anwendung mit C# / .NET MAUI für den Feldeinsatz.',
                'Einrichtung einer lokalen SQLite-Persistenz für den 100% autonomen Offline-Betrieb.',
                'Sichere Synchronisation über die REST/JWT-API sobald eine Netzwerkverbindung erkannt wird.'
            ],
            techs: ['.NET MAUI', 'C#', 'SQLite', 'Offline-First', 'REST / JWT'],
            showArchLink: false
        },
        ar: {
            tag: '.NET MAUI · C# · SQLite Offline-First',
            title: 'Astreinte Mobile — تطبيق لوحي ميداني',
            sub: 'تطبيق للأجهزة اللوحية مخصص لفرق المداومة والتدخل للوصول إلى الدلائل دون حاجة للإنترنت.',
            challenge: 'تمكين الأعوان في الميدان من الوصول اللحظي إلى خطط الطوارئ حتى في المناطق المعزولة.',
            solution: 'تدريب في PROXIEL: تطوير تطبيق .NET MAUI مدمج بقاعدة بيانات محلية سريعة SQLite.',
            bullets: [
                'تطوير تطبيق لوحي متكامل بـ C# / .NET MAUI ملائم لظروف الاستخدام الميداني.',
                'تضمين قاعدة بيانات محلية SQLite تتيح العمل المستقل 100% دون تغطية شبكية.',
                'إجراء مزامنة فورية وآمنة عبر REST/JWT عند استعادة الاتصال بالشبكة.'
            ],
            techs: ['.NET MAUI', 'C#', 'SQLite', 'Offline-First', 'REST / JWT'],
            showArchLink: false
        }
    },
    'assala-erp': {
        fr: {
            tag: 'Spring Boot 3 (Java 17) · React 18 · MySQL · Docker',
            title: 'Assala Iskane ERP — Pilotage de Chantiers Immobiliers',
            sub: 'Application métier multi-site pour la gestion des approvisionnements, le suivi de chantier et la validation hiérarchique des demandes.',
            challenge: 'Digitaliser un circuit de validation impliquant 6 rôles métier distincts tout en isolant les données propres à chaque chantier.',
            solution: 'Stage chez Assala Iskane (Fès) : conception et développement Full-Stack sous Spring Boot 3, React 18 et Docker Compose.',
            bullets: [
                'Développement du backend REST sous Spring Boot 3 (Java 17) et modélisation de la base MySQL.',
                'Implémentation du workflow de validation à 6 niveaux (Chef de Chantier → Responsable Projet → Tech Manager → Comptabilité → Service Technique → Magasin).',
                'Création de l\'interface React 18 avec contrôle d\'accès granulaire (RBAC) par rôle et par chantier.',
                'Conteneurisation de l\'ensemble de la stack avec Docker Compose et reverse-proxy Nginx.'
            ],
            techs: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'RBAC', 'Docker Compose', 'Nginx'],
            showArchLink: false
        },
        en: {
            tag: 'Spring Boot 3 (Java 17) · React 18 · MySQL · Docker',
            title: 'Assala Iskane ERP — Construction Site Management',
            sub: 'Multi-site business platform for procurement tracking, construction site monitoring, and hierarchical request approvals.',
            challenge: 'Digitize a multi-department approval workflow across 6 distinct roles while isolating data per construction site.',
            solution: 'Internship at Assala Iskane (Fez): Full-Stack design and development using Spring Boot 3, React 18, and Docker Compose.',
            bullets: [
                'Developed the Spring Boot 3 (Java 17) REST backend and relational MySQL database schema.',
                'Implemented the 6-stage validation workflow across site managers, project leads, finance, technical services, and warehouse teams.',
                'Built the React 18 frontend with role-based access control (RBAC) and per-site data isolation.',
                'Containerized the full application stack using Docker Compose and an Nginx reverse proxy.'
            ],
            techs: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'RBAC', 'Docker Compose', 'Nginx'],
            showArchLink: false
        },
        de: {
            tag: 'Spring Boot 3 (Java 17) · React 18 · MySQL · Docker',
            title: 'Assala Iskane ERP — Baustellenmanagement-System',
            sub: 'Standortübergreifende Geschäftsplattform für Beschaffungsmanagement, Baufortschrittsüberwachung und Genehmigungsworkflows.',
            challenge: 'Digitalisierung eines mehrstufigen Freigabeprozesses über 6 Rollen bei strikter Datenisolation je Baustelle.',
            solution: 'Praktikum bei Assala Iskane (Fès): Full-Stack-Entwicklung mit Spring Boot 3, React 18 und Docker Compose.',
            bullets: [
                'Entwicklung des REST-Backends mit Spring Boot 3 (Java 17) und relationale Modellierung der MySQL-Datenbank.',
                'Umsetzung des 6-stufigen Genehmigungsworkflows (Bauleiter → Projektleiter → Tech Manager → Buchhaltung → Technischer Dienst → Lager).',
                'Erstellung des React 18 Frontends mit rollenbasierter Zugriffskontrolle (RBAC) und standortspezifischer Isolation.',
                'Containerisierung des gesamten Applikations-Stacks mit Docker Compose und Nginx Reverse Proxy.'
            ],
            techs: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'RBAC', 'Docker Compose', 'Nginx'],
            showArchLink: false
        },
        ar: {
            tag: 'Spring Boot 3 (Java 17) · React 18 · MySQL · Docker',
            title: 'Assala Iskane ERP — إدارة الأوراش العقارية',
            sub: 'منظومة سحابية لإدارة ومتابعة طلبات المشتريات ومسارات المصادقة الهرمية وتتبع الأوراش.',
            challenge: 'رقمنة مسار موافقات معقد يشمل 6 أدوار مختلفة مع عزل تام وتأمين بيانات كل ورش عقاري.',
            solution: 'تدريب بشركة Assala Iskane (فاس): تطوير شامل Full-Stack بـ Spring Boot 3 و React 18 ونشر عبر Docker Compose.',
            bullets: [
                'برمجة الواجهة الخلفية REST بـ Spring Boot 3 ونمذجة قاعدة بيانات MySQL.',
                'بناء مسار موافقات إداري بـ 6 مستويات (رئيس الورش ← مسؤول المشروع ← المدير التقني ← المحاسبة ← المصلحة التقنية ← المستودع).',
                'تطوير واجهة React 18 تفاعلية بضبط دقيق للصلاحيات حسب الأدوار والمواقع.',
                'حزم وتشغيل التطبيق في حاويات مستقلة عبر Docker Compose وخادم Nginx.'
            ],
            techs: ['Java 17', 'Spring Boot 3', 'React 18', 'MySQL', 'RBAC', 'Docker Compose', 'Nginx'],
            showArchLink: false
        }
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
    const entry = CASE_STUDIES[projectKey];
    const data = entry && (entry[currentLang] || entry.fr);
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
// 6. Copy Email & Validated Contact Form (Web3Forms + Anti-Spam)
// ==========================================================================
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        const email = copyEmailBtn.getAttribute('data-email') || 'assoilyoussef02@gmail.com';
        const span = copyEmailBtn.querySelector('span');
        try {
            await navigator.clipboard.writeText(email);
            if (span) span.textContent = currentLang === 'en' ? '✔ Copied!' : '✔ Copié !';
            setTimeout(() => {
                if (span) span.textContent = I18N[currentLang].btn_copy;
            }, 2200);
        } catch (err) {
            if (span) span.textContent = email;
        }
    });
}

const form = document.getElementById('contactForm');
if (form) {
    const submitBtn = form.querySelector('.btn-submit');
    const hint = document.getElementById('formHint');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const botcheck = form.querySelector('input[name="botcheck"]');
        if (botcheck && botcheck.checked) return;

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name.length < 2 || !emailRegex.test(email) || message.length < 10) {
            if (hint) {
                hint.textContent = currentLang === 'en'
                    ? 'Please enter your name, a valid email address, and a message (min. 10 characters).'
                    : 'Veuillez renseigner votre nom, un email valide et un message (min. 10 caractères).';
                hint.className = 'form-hint form-hint-error';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === 'en' ? 'Sending...' : 'Envoi en cours...';
        }
        if (hint) {
            hint.textContent = currentLang === 'en' ? 'Sending your message...' : 'Transmission de votre message...';
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
                    hint.textContent = currentLang === 'en'
                        ? '✔ Thank you! Your message has been sent directly to my inbox.'
                        : '✔ Merci ! Votre message a bien été envoyé. Je vous répondrai très rapidement.';
                    hint.className = 'form-hint form-hint-success';
                }
            } else {
                throw new Error(result.message || 'Send error');
            }
        } catch (err) {
            if (hint) {
                hint.textContent = currentLang === 'en'
                    ? 'An error occurred. Please email me directly at assoilyoussef02@gmail.com.'
                    : 'Une erreur est survenue lors de l\'envoi. Vous pouvez m\'écrire directement à assoilyoussef02@gmail.com.';
                hint.className = 'form-hint form-hint-error';
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = I18N[currentLang].btn_send;
            }
        }
    });
}

// ==========================================================================
// 7. Scroll Reveal Animations
// ==========================================================================
const revealTargets = document.querySelectorAll(
    '.skill-card, .portfolio-card, .timeline-item, .section-title, .eyebrow, .contact-info, .contact-form, .architecture-intro, .arch-window, .edu-card'
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
} else {
    revealTargets.forEach(el => el.classList.add('in-view'));
}

// ==========================================================================
// 8. Interactive Terminal (whoami, projects, skills, contact, sudo hire youssef)
// ==========================================================================
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');

if (terminalOutput) {
    const lines = [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'Youssef ASSOIL — Software Engineer | C#/.NET & Full-Stack' },
        { type: 'cmd', text: 'cat stack.txt' },
        { type: 'out', text: 'C# / .NET 9 · Blazor · .NET MAUI · Java / Spring Boot · React · Angular · SQL · Docker' },
        { type: 'cmd', text: './run-tests.sh --suite=sepa-iso20022' },
        { type: 'ok', text: '✔ build succeeded (0 warnings)' },
        { type: 'ok', text: '✔ XSD schema validation passed' },
        { type: 'cmd', text: 'echo $STATUS' },
        { type: 'out', text: 'Disponible pour un CDI — Mobile en France et à l\'international' }
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
                    timers.push(setTimeout(() => typeLine(index + 1), 240));
                }
            }, 30);
            timers.push(typing);
        } else {
            lineEl.className = line.type === 'ok' ? 'ok' : '';
            lineEl.textContent = line.text;
            timers.push(setTimeout(() => typeLine(index + 1), 280));
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
            if (currentLang === 'en') {
                out.textContent = 'Youssef ASSOIL\nSoftware Engineer | C#/.NET & Full-Stack\nAvailable for a Full-Time Role (CDI) — France & International';
            } else if (currentLang === 'de') {
                out.textContent = 'Youssef ASSOIL\nSoftware-Ingenieur | C#/.NET & Full-Stack\nVerfügbar für eine Festanstellung (CDI) — Frankreich & International';
            } else if (currentLang === 'ar') {
                out.textContent = 'يوسف أصويل (Youssef ASSOIL)\nمهندس برمجيات | C#/.NET & Full-Stack\nمتاح لعقد دائم (CDI) — داخل فرنسا ودولياً';
            } else {
                out.textContent = 'Youssef ASSOIL\nIngénieur Logiciel | C#/.NET & Full-Stack\nDisponible pour un CDI — Mobile en France et à l\'international';
            }
        } else if (cmd === 'projects') {
            if (currentLang === 'en') {
                out.innerHTML = '<span class="ok">Delivered Projects:</span>\n' +
                    '  1. SEPA Pro          — C# / .NET 9, Blazor, EF Core, SQL Server, XML ISO 20022\n' +
                    '  2. Astreinte Web V2  — CodeIgniter 4, REST API / JWT, Back-Office\n' +
                    '  3. Astreinte Mobile  — .NET MAUI, C#, SQLite (Offline-First)\n' +
                    '  4. Assala Iskane ERP — Spring Boot 3 (Java 17), React 18, MySQL, Docker';
            } else if (currentLang === 'de') {
                out.innerHTML = '<span class="ok">Realisierte Projekte:</span>\n' +
                    '  1. SEPA Pro          — C# / .NET 9, Blazor, EF Core, SQL Server, XML ISO 20022\n' +
                    '  2. Astreinte Web V2  — CodeIgniter 4, REST-API / JWT, Back-Office\n' +
                    '  3. Astreinte Mobile  — .NET MAUI, C#, SQLite (Offline-Betrieb)\n' +
                    '  4. Assala Iskane ERP — Spring Boot 3 (Java 17), React 18, MySQL, Docker';
            } else if (currentLang === 'ar') {
                out.innerHTML = '<span class="ok">المشاريع المنجزة:</span>\n' +
                    '  1. SEPA Pro          — C# / .NET 9, Blazor, EF Core, SQL Server, XML ISO 20022\n' +
                    '  2. Astreinte Web V2  — CodeIgniter 4, REST API / JWT, Back-Office\n' +
                    '  3. Astreinte Mobile  — .NET MAUI, C#, SQLite (Offline-First)\n' +
                    '  4. Assala Iskane ERP — Spring Boot 3 (Java 17), React 18, MySQL, Docker';
            } else {
                out.innerHTML = '<span class="ok">Projets réalisés :</span>\n' +
                    '  1. SEPA Pro          — C# / .NET 9, Blazor, EF Core, SQL Server, XML ISO 20022\n' +
                    '  2. Astreinte Web V2  — CodeIgniter 4, API REST / JWT, Back-Office\n' +
                    '  3. Astreinte Mobile  — .NET MAUI, C#, SQLite (Mode Hors-Ligne)\n' +
                    '  4. Assala Iskane ERP — Spring Boot 3 (Java 17), React 18, MySQL, Docker';
            }
        } else if (cmd === 'skills') {
            out.textContent = 'C#/.NET      : .NET 9, Blazor, .NET MAUI, Entity Framework Core\nBackend      : Java 17, Spring Boot 3, PHP (Symfony, CodeIgniter 4)\nFrontend     : React 18, TypeScript, Angular\nData & DevOps: SQL Server, MySQL, SQLite, Docker, GitHub Actions, Linux';
        } else if (cmd === 'contact') {
            out.innerHTML = 'Email        : <span class="ok">assoilyoussef02@gmail.com</span>\nTéléphone    : +33 7 66 31 93 53\nLinkedIn     : linkedin.com/in/assoilyoussef\nLocalisation : Montpellier, France (Mobile France & International)';
        } else if (cmd.startsWith('sudo hire')) {
            if (currentLang === 'en') {
                out.innerHTML = '<span class="ok">✔ [ACCESS GRANTED] — Candidate profile verified!</span>\n  • C#/.NET & Full-Stack Engineering : READY\n  • RNCP Level 7 Qualification (Master\'s level) : CONFIRMED\n  ➜ Scroll down to the Contact section to start the conversation!';
            } else if (currentLang === 'de') {
                out.innerHTML = '<span class="ok">✔ [ZUGRIFF ERLAUBT] — Ingenieursprofil verifiziert!</span>\n  • C#/.NET & Full-Stack Engineering : EINSATZBEREIT\n  • RNCP Stufe 7 Abschluss (Master-Niveau) : BESTÄTIGT\n  ➜ Scrollen Sie zum Kontaktbereich, um den Austausch zu starten!';
            } else if (currentLang === 'ar') {
                out.innerHTML = '<span class="ok">✔ [تمت المصادقة] — تم التحقق من مؤهلات المهندس بنجاح!</span>\n  • تطوير C#/.NET و Full-Stack : جاهز بنسبة 100%\n  • شهادة RNCP المستوى 7 (ماستر) : معتمدة رسمياً\n  ➜ تفضل بالنزول إلى قسم التواصل لبدء المحادثة!';
            } else {
                out.innerHTML = '<span class="ok">✔ [ACCÈS AUTORISÉ] — Profil ingénieur vérifié !</span>\n  • Développement C#/.NET & Full-Stack : OPÉRATIONNEL\n  • Titre RNCP Niveau 7 (Bac+5) : CONFIRMÉ\n  ➜ Rendez-vous dans la section Contact juste en bas pour échanger !';
            }
        } else if (cmd === 'help') {
            out.textContent = currentLang === 'de'
                ? 'Befehle : whoami, projects, skills, contact, sudo hire youssef, clear'
                : currentLang === 'ar'
                ? 'الأوامر المتاحة : whoami, projects, skills, contact, sudo hire youssef, clear'
                : 'Commandes / Commands : whoami, projects, skills, contact, sudo hire youssef, clear';
        } else {
            out.textContent = `zsh: command not found: ${raw}. (whoami, projects, skills, contact, sudo hire youssef, clear)`;
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

// Initialize language on page load
applyLanguage(currentLang);
