const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

const navToggle = $("#navToggle");
const navMenu = $("#navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  $$("#navMenu a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    const within = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!within) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealEls = $$(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => io.observe(el));


const filters = $$(".filter");
const cards = $$(".workCard");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const key = btn.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(",").map(t => t.trim());
      const show = key === "all" || tags.includes(key);
      card.classList.toggle("is-hidden", !show);
    });
  });
});

const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());

const LANG_KEY = "site_lang";

const translations = {
  fr: {
    "nav.openMenu": "Ouvrir le menu",
    "nav.what": "Ce que je fais",
    "nav.work": "Projets",
    "nav.services": "Services",
    "nav.about": "À propos",
    "nav.cta": "On travaille ensemble",

    "hero.stamp": "Disponible en freelance et projets",
    "hero.titleA": "Je conçois et je développe",
    "hero.titleB": "des sites web",
    "hero.titleC": "qui ont de la vie.",
    "hero.sub": "Je suis un <strong>développeur créatif</strong> avec l’œil d’un designer. Je crée des sites modernes et des apps mobiles fluides avec une identité visuelle forte et premium, pas générique. Le design et la vidéo sont des outils que j’utilise quand ils renforcent vraiment le résultat.",
    "hero.btnWork": "Voir une sélection",
    "hero.btnContact": "Travaillons ensemble",

    "metrics.fast.big": "Rapide",
    "metrics.fast.small": "Livraison qui respecte les délais",
    "metrics.clean.big": "Propre",
    "metrics.clean.small": "Visuels premium + structure claire",
    "metrics.human.big": "Humain",
    "metrics.human.small": "Une communication que tu ne dois pas relancer",

    "hero.tags.creative": "créatif",
    "hero.tags.developer": "développeur",
    "hero.tags.designer": "designer",

    "ticker.bold": "Visuels audacieux",
    "ticker.story": "Mise en page orientée histoire",
    "ticker.type": "Typographie premium",
    "ticker.mobile": "Mobile-first",
    "ticker.fast": "Livraison rapide",

    "what.title": "Ce que je fais",
    "what.note": "Résultat propre et moderne.",

    "what.card1.title": "Des sites qui paraissent “haut de gamme”",
    "what.card1.desc": "Des sites modernes qui inspirent confiance et guident vers l’action.",
    "what.card1.li1": "Landing pages & portfolios",
    "what.card1.li2": "Mise en page forte + CTA clair",
    "what.card1.li3": "Mobile-first + rapide",

    "what.card2.title": "Des apps mobiles fluides",
    "what.card2.desc": "Des apps Flutter avec un parcours simple et des écrans polis — faciles à utiliser, agréables au quotidien.",
    "what.card2.li1": "Écrans UI & navigation",
    "what.card2.li2": "Interactions soignées",
    "what.card2.li3": "Prêtes à évoluer",

    "what.card3.title": "Une identité visuelle qui soutient le produit",
    "what.card3.desc": "Quand c’est utile, j’ajoute du design + de la vidéo pour rendre le résultat plus complet et distinctif.",
    "what.card3.li1": "Kits de marque & templates sociaux",
    "what.card3.li2": "Affiches & systèmes visuels",
    "what.card3.li3": "Montages courts",

    "disruption.a": "Je ne fais pas “moyen”.",
    "disruption.b": "On construit quelque chose avec du goût.",

    "work.title": "Projets sélectionnés",
    "work.note": "Quelques-uns de mes projets précédents.",

    "filters.all": "Tous",
    "filters.web": "Web",
    "filters.apps": "Apps",
    "filters.design": "Design",
    "filters.video": "Vidéo",

    "work.tags.web": "Web",
    "work.tags.app": "App",
    "work.tags.design": "Design",
    "work.tags.video": "Vidéo",
    "work.tags.webid": "Web + Identité",
    "work.tags.appui": "App + UI",

    "work.c1.title": "Landing page restaurant",
    "work.c1.desc": "<strong>Problème :</strong> la marque était oubliable en ligne.<br /><strong>Résultat :</strong> une page audacieuse qui rend la carte premium et pousse les réservations.",
    "work.c1.m1": "Clarté",
    "work.c1.m2": "Confiance",
    "work.c1.m3": "Réservations",

    "work.c2.title": "Portfolio marque personnelle",
    "work.c2.desc": "<strong>Problème :</strong> “je fais plein de choses” ne passait pas.<br /><strong>Résultat :</strong> un site centré sur la personnalité intentionnel, mémorable, “hireable”.",
    "work.c2.m1": "Story",
    "work.c2.m2": "Présence",
    "work.c2.m3": "Mémorable",

    "work.c3.title": "Habit tracker Flutter",
    "work.c3.desc": "<strong>Problème :</strong> les gens quittent les apps “brouillon”.<br /><strong>Résultat :</strong> un flow calme et satisfaisant qui rend l’usage quotidien simple.",
    "work.c3.m1": "Fluide",
    "work.c3.m2": "Simple",
    "work.c3.m3": "Habitudes",

    "work.c4.title": "UI kit app de commande",
    "work.c4.desc": "<strong>Problème :</strong> commander était lent et confus.<br /><strong>Résultat :</strong> une UI claire qui réduit la friction et accélère le checkout.",
    "work.c4.m1": "Vitesse",
    "work.c4.m2": "Flow",
    "work.c4.m3": "Conversion",

    "work.c5.title": "Pack branding",
    "work.c5.desc": "<strong>Problème :</strong> aucun style cohérent.<br /><strong>Résultat :</strong> un système visuel solide et immédiatement reconnaissable.",
    "work.c5.m1": "Identité",
    "work.c5.m2": "Cohérence",
    "work.c5.m3": "Impact",

    "work.c6.title": "Montages courts (short-form)",
    "work.c6.desc": "<strong>Problème :</strong> des edits “random” qui perdent l’attention.<br /><strong>Résultat :</strong> meilleur rythme + sous-titres propres pour la rétention.",
    "work.c6.m1": "Rythme",
    "work.c6.m2": "Rétention",
    "work.c6.m3": "Clarté",

    "work.soon.view": "Voir ",
    "work.soon.case": "Cas ",
    "work.soon.details": "Détails ",
    "work.soon.demo": "Démo ",
    "work.soon.shots": "Screens ",
    "work.soon.preview": "Aperçu ",
    "work.soon.flow": "Flow ",
    "work.soon.gallery": "Galerie (bientôt)",
    "work.soon.behance": "Behance (bientôt)",
    "work.soon.reel": "Reel (bientôt)",
    "work.soon.samples": "Demander des exemples",

    "services.title": "Services",
    "services.note": "Que puis-je faire pour vous.",

    "services.s1.title": "Site / landing page",
    "services.s1.desc": "Pour les entreprises qui veulent un look moderne et des résultats.",
    "services.s1.li1": "Design + développement",
    "services.s1.li2": "Mobile-first",
    "services.s1.li3": "Prêt à déployer",

    "services.s2.title": "Écrans Flutter",
    "services.s2.desc": "Des écrans UI propres, un flow fluide, des détails polis.",
    "services.s2.li1": "UI + navigation",
    "services.s2.li2": "Composants réutilisables",
    "services.s2.li3": "Prêt à évoluer",

    "services.s3.title": "Support branding (optionnel)",
    "services.s3.desc": "Quand ton produit a besoin d’une identité plus forte pour se démarquer.",
    "services.s3.li1": "Brand kit",
    "services.s3.li2": "Templates sociaux",
    "services.s3.li3": "Système visuel",

    "services.s4.title": "Support vidéo (optionnel)",
    "services.s4.desc": "Des montages courts propres quand ça sert ton lancement ou ton contenu.",
    "services.s4.li1": "Sous-titres",
    "services.s4.li2": "Rythme",
    "services.s4.li3": "Exports plateforme",

    "about.title": "À propos",
    "about.lead": "Je crois qu’un bon produit digital doit sembler évident comme s’il devait exister ainsi.",
    "about.text": "J’accorde beaucoup d’importance à la <strong>clarté</strong> : celle qui donne confiance en quelques secondes. Et j’évite les sites “bruyants”, lents, ou “faits pour impressionner les designers” au lieu d’aider des gens réels.",
    "about.badge1": "Créatif d’abord",
    "about.badge2": "Livraison fiable",
    "about.badge3": "Obsédé du détail",

    "about.fit.title": "Idéal pour",
    "about.fit.li1": "Petites entreprises qui veulent un site premium",
    "about.fit.li2": "Créateurs qui construisent une marque personnelle",
    "about.fit.li3": "Startups qui veulent design + build",

    "about.style.title": "Façon de travailler",
    "about.style.li1": "Boucles de feedback rapides",
    "about.style.li2": "Étapes claires",
    "about.style.li3": "Process simple, pas compliqué",

    "contact.title": "Créons quelque chose que tu seras fier(ère) de partager.",
    "contact.text": "Si tu as une idée (ou même un brouillon), envoie-la. Je réponds avec une direction claire et ce que je ferais en premier sans pression.",
    "contact.email.label": "Email",
    "contact.elsewhere.label": "Ailleurs",
    "contact.social.instagram": "Instagram",
    "contact.social.behance": "Behance",
    "contact.social.github": "GitHub",
    "contact.footer.remote": "Disponible à distance",
    "contact.footer.btn": "Voir les projets",

    "footer.muted": "Portfolio développeur créatif + designer",
  },

  en: {
    "nav.openMenu": "Open menu",
    "nav.what": "What I do",
    "nav.work": "Work",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.cta": "Let’s work",

    "hero.stamp": "Available for freelance and projects",
    "hero.titleA": "I design & build",
    "hero.titleB": "websites",
    "hero.titleC": "that feel alive.",
    "hero.sub": "I’m a <strong>creative developer</strong> with a designer’s eye. I make modern websites and smooth mobile apps with a strong visual identity that feels premium, not generic. Design and video are supporting tools I use when they make the work hit harder.",
    "hero.btnWork": "See selected work",
    "hero.btnContact": "Let’s work together",

    "metrics.fast.big": "Fast",
    "metrics.fast.small": "Delivery that respects deadlines",
    "metrics.clean.big": "Clean",
    "metrics.clean.small": "Premium visuals + clear structure",
    "metrics.human.big": "Human",
    "metrics.human.small": "Communication you don’t chase",

    "hero.tags.creative": "creative",
    "hero.tags.developer": "developer",
    "hero.tags.designer": "designer",

    "ticker.bold": "Bold visuals",
    "ticker.story": "Story-first layout",
    "ticker.type": "Premium typography",
    "ticker.mobile": "Mobile first",
    "ticker.fast": "Fast turnaround",

    "what.title": "What I do",
    "what.note": "Clean, modern outcome",

    "what.card1.title": "Websites that look expensive",
    "what.card1.desc": "Modern websites that feel premium and guide people to take action.",
    "what.card1.li1": "Landing pages & portfolios",
    "what.card1.li2": "Strong layout + clear CTA",
    "what.card1.li3": "Mobile-first + fast",

    "what.card2.title": "Mobile apps that feel smooth",
    "what.card2.desc": "Flutter apps with a clean flow and polished screens, easy to use, easy to love.",
    "what.card2.li1": "UI screens & navigation",
    "what.card2.li2": "Polished interactions",
    "what.card2.li3": "Ready to expand",

    "what.card3.title": "Visual identity that supports the build",
    "what.card3.desc": "When needed, I add design + video to make the final product feel complete and distinctive.",
    "what.card3.li1": "Brand kits & social templates",
    "what.card3.li2": "Posters & visual systems",
    "what.card3.li3": "Short-form edits",

    "disruption.a": "I don’t do “fine”.",
    "disruption.b": "We build something with taste.",

    "work.title": "Selected work",
    "work.note": "Some of my previous projects",

    "filters.all": "All",
    "filters.web": "Web",
    "filters.apps": "Apps",
    "filters.design": "Design",
    "filters.video": "Video",

    "work.tags.web": "Web",
    "work.tags.app": "App",
    "work.tags.design": "Design",
    "work.tags.video": "Video",
    "work.tags.webid": "Web + Identity",
    "work.tags.appui": "App + UI",

    "work.c1.title": "Restaurant landing page",
    "work.c1.desc": "<strong>Problem:</strong> the brand looked forgettable online.<br /><strong>Outcome:</strong> a bold page that makes the menu feel premium and pushes bookings.",
    "work.c1.m1": "Clarity",
    "work.c1.m2": "Trust",
    "work.c1.m3": "Bookings",

    "work.c2.title": "Personal brand portfolio",
    "work.c2.desc": "<strong>Problem:</strong> “I do many things” wasn’t landing.<br /><strong>Outcome:</strong> a personality first site that makes the work feel intentional and hireable.",
    "work.c2.m1": "Story",
    "work.c2.m2": "Presence",
    "work.c2.m3": "Memorable",

    "work.c3.title": "Flutter habit tracker",
    "work.c3.desc": "<strong>Problem:</strong> people quit apps that feel messy.<br /><strong>Outcome:</strong> a calm flow with satisfying screens that makes daily use feel easy.",
    "work.c3.m1": "Smooth",
    "work.c3.m2": "Simple",
    "work.c3.m3": "Habit-friendly",

    "work.c4.title": "Ordering app UI kit",
    "work.c4.desc": "<strong>Problem:</strong> ordering felt slow and confusing.<br /><strong>Outcome:</strong> a clean UI that reduces friction and makes checkout feel fast.",
    "work.c4.m1": "Speed",
    "work.c4.m2": "Flow",
    "work.c4.m3": "Conversion",

    "work.c5.title": "Branding pack",
    "work.c5.desc": "<strong>Problem:</strong> visuals had no consistency.<br /><strong>Outcome:</strong> a tight identity system that makes the brand instantly recognizable.",
    "work.c5.m1": "Identity",
    "work.c5.m2": "Consistency",
    "work.c5.m3": "Impact",

    "work.c6.title": "Short-form video edits",
    "work.c6.desc": "<strong>Problem:</strong> edits felt random and lost attention.<br /><strong>Outcome:</strong> tighter pacing + clean captions built for retention.",
    "work.c6.m1": "Rhythm",
    "work.c6.m2": "Retention",
    "work.c6.m3": "Clarity",

    "work.soon.view": "View",
    "work.soon.case": "Case",
    "work.soon.details": "Details",
    "work.soon.demo": "Demo",
    "work.soon.shots": "Shots",
    "work.soon.preview": "Preview",
    "work.soon.flow": "Flow",
    "work.soon.gallery": "Gallery (soon)",
    "work.soon.behance": "Behance (soon)",
    "work.soon.reel": "Reel (soon)",
    "work.soon.samples": "Request samples",

    "services.title": "Services",
    "services.note": "What can I do for you.",

    "services.s1.title": "Website / landing page",
    "services.s1.desc": "For businesses that want a modern look and real results.",
    "services.s1.li1": "Design + build",
    "services.s1.li2": "Mobile-first",
    "services.s1.li3": "Deploy ready",

    "services.s2.title": "Flutter app screens",
    "services.s2.desc": "Clean UI screens with smooth flow and polished details.",
    "services.s2.li1": "UI + navigation",
    "services.s2.li2": "Reusable components",
    "services.s2.li3": "Ready to expand",

    "services.s3.title": "Brand support (optional)",
    "services.s3.desc": "When your product needs a stronger visual identity to stand out.",
    "services.s3.li1": "Brand kit",
    "services.s3.li2": "Social templates",
    "services.s3.li3": "Visual system",

    "services.s4.title": "Video support (optional)",
    "services.s4.desc": "Short edits that feel clean, used when it supports your launch or content.",
    "services.s4.li1": "Captions",
    "services.s4.li2": "Pacing",
    "services.s4.li3": "Platform exports",

    "about.title": "About",
    "about.lead": "I believe great digital work should feel obvious, like it was always meant to exist that way.",
    "about.text": "I care deeply about <strong>clarity</strong>: the kind that makes people trust you in seconds. And I avoid websites that feel noisy, slow, or “designed to impress other designers” instead of helping real people.",
    "about.badge1": "Creative-first",
    "about.badge2": "Reliable delivery",
    "about.badge3": "Detail obsessed",

    "about.fit.title": "Best fit for",
    "about.fit.li1": "Small businesses needing a premium website",
    "about.fit.li2": "Creators building a personal brand",
    "about.fit.li3": "Startups that want design + build in one",

    "about.style.title": "Working style",
    "about.style.li1": "Fast feedback loops",
    "about.style.li2": "Clear milestones",
    "about.style.li3": "No overcomplicated process",

    "contact.title": "Let’s make something you’ll be proud to share.",
    "contact.text": "If you have an idea (or even a messy draft), send it. I’ll reply with a clear direction and what I’d do first no pressure.",
    "contact.email.label": "Email",
    "contact.elsewhere.label": "Elsewhere",
    "contact.social.instagram": "Instagram",
    "contact.social.behance": "Behance",
    "contact.social.github": "GitHub",
    "contact.footer.remote": "Available remotely",
    "contact.footer.btn": "View work",

    "footer.muted": "Creative developer + designer portfolio",
  }
};

function getSavedLang() {
  return localStorage.getItem(LANG_KEY);
}

function setSavedLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

function t(lang, key) {
  return (translations[lang] && translations[lang][key])
    || (translations.fr && translations.fr[key])
    || "";
}

function applyLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);

  const nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach(node => {
    const key = node.getAttribute("data-i18n");
    const value = t(lang, key);

    if (/<[a-z][\s\S]*>/i.test(value)) node.innerHTML = value;
    else node.textContent = value;
  });

  const btns = document.querySelectorAll(".langBtn");
  btns.forEach(b => {
    const active = b.dataset.lang === lang;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", String(active));
  });

  setSavedLang(lang);
}

function initLanguage() {
  const initial = getSavedLang() || "fr";
  applyLanguage(initial);

  document.querySelectorAll(".langBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.dataset.lang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLanguage);
