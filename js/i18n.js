/* English remains in the source HTML. Official credential titles retain NVIDIA's wording. */
(() => {
  const french = {
    'Skip to content':'Aller au contenu',
    'Firas Ben Abdallah — home':'Firas Ben Abdallah — accueil',
    'Open navigation menu':'Ouvrir le menu',
    'Primary navigation':'Navigation principale',
    'Language':'Langue',
    'About':'À propos', 'Projects':'Projets', 'Skills':'Compétences',
    'Education':'Formation',
    'Artificial Intelligence & Software Engineering':'Intelligence artificielle & génie logiciel',
    '3rd-Year AI Engineering Student at ESPRIT':'Étudiant en 3e année d’ingénierie en IA à ESPRIT',
    'Exploring Artificial Intelligence.':'Explorer l’intelligence artificielle.',
    'Building Thoughtful Software.':'Concevoir des logiciels avec soin.',
    "I'm a third-year Artificial Intelligence Engineering student at ESPRIT with a background in front-end development, Flutter, and backend fundamentals. I'm currently expanding my knowledge of deep learning, NLP, and LLM-based applications while building practical software solutions.":'Étudiant en troisième année d’ingénierie en intelligence artificielle à ESPRIT, j’ai une expérience en développement front-end, en Flutter et des bases en backend. J’approfondis actuellement mes connaissances en deep learning, en NLP et en applications basées sur les LLM, tout en développant des solutions logicielles concrètes.',
    'View projects':'Voir les projets',
    'Portrait of Firas Ben Abdallah':'Portrait de Firas Ben Abdallah',
    'Firas Ben Abdallah wearing sunglasses':'Firas Ben Abdallah portant des lunettes de soleil',
    'Currently learning':'En cours d’apprentissage', 'Based in':'Basé en', 'Tunisia':'Tunisie',
    'AI Engineering':'Ingénierie en IA', 'Student':'Étudiant',
    'Web & Mobile':'Web & mobile', 'Development':'Développement',
    'Deep Learning':'Deep learning', 'Foundations':'Fondamentaux',
    '01 — About':'01 — À propos', 'From interfaces':'Des interfaces',
    'to intelligent systems.':'aux systèmes intelligents.',
    "My path into software started with responsive websites and interactive interfaces. Since then, I've worked with Flutter for mobile applications and Node.js for backend functionality.":'Mon parcours en développement a commencé par des sites web adaptatifs et des interfaces interactives. J’ai ensuite travaillé avec Flutter pour les applications mobiles et Node.js pour les fonctionnalités backend.',
    "Now, as a third-year AI Engineering student at ESPRIT in Tunisia, I'm building on that development foundation through deep learning, NLP, and LLM training. I'm interested in how these ideas become useful, reliable software.":'Aujourd’hui, étudiant en troisième année d’ingénierie en IA à ESPRIT en Tunisie, je complète ces bases par des formations en deep learning, NLP et LLM. Je m’intéresse à la manière de transformer ces concepts en logiciels utiles et fiables.',
    'I learn by experimenting, working through technical challenges, and improving what I build.':'J’apprends en expérimentant, en relevant des défis techniques et en améliorant mes réalisations.',
    'Current focus':'En ce moment', 'Learning with':'Apprendre avec', 'a direction.':'un objectif.',
    'Exploring':'Explorer', 'Deep learning, NLP & transformers':'Deep learning, NLP & transformers',
    'Connecting':'Faire le lien', 'LLMs, prompt engineering & RAG':'LLM, ingénierie des prompts & RAG',
    'Working toward':'Mon objectif',
    'Practical AI applications & stronger software engineering foundations':'Des applications d’IA concrètes et des bases solides en génie logiciel',
    'View my training':'Voir mes formations',
    '02 — Selected work':'02 — Projets sélectionnés', 'Projects built with intent.':'Des projets conçus avec soin.',
    'Filter projects':'Filtrer les projets', 'All':'Tous', 'Web Development':'Développement web',
    'Restaurant Landing Page':'Page web de restaurant',
    'A restaurant landing-page design presented on Behance.':'Une conception de page web pour un restaurant, présentée sur Behance.',
    'Landing page':'Page de présentation', 'UI design':'Design d’interface', 'View on Behance ↗':'Voir sur Behance ↗',
    '03 — Technical skills':'03 — Compétences techniques', 'A practical foundation,':'Des bases concrètes,',
    'with deliberate depth.':'des connaissances approfondies.',
    'Programming &':'Programmation &', 'Mobile':'Mobile',
    'AI & Machine Learning':'IA & apprentissage automatique', 'Learning & foundations':'Apprentissage & fondamentaux',
    'Natural Language Processing':'Traitement du langage naturel', 'Transformers':'Transformers',
    'Large Language Models':'Grands modèles de langage', 'Prompt Engineering':'Ingénierie des prompts',
    'Retrieval-Augmented Generation':'Génération augmentée par la recherche',
    'Tools':'Outils',
    '04 — Certifications':'04 — Certifications', 'Continued learning in AI.':'Approfondir mes connaissances en IA.',
    'Issued October 2025':'Délivrée en octobre 2025', 'Issued November 2025':'Délivrée en novembre 2025',
    'Issued December 2025':'Délivrée en décembre 2025',
    '05 — Education':'05 — Formation', 'Program':'Cursus',
    'Artificial Intelligence Engineering':'Ingénierie en intelligence artificielle',
    'Current level':'Niveau actuel', '3rd Year':'3e année', 'Location':'Pays',
    '06 — Contact':'06 — Contact', "Let's connect.":'Échangeons.',
    "I'm open to academic opportunities, internships, technical collaborations, and interesting software projects.":'Je suis ouvert aux opportunités académiques, aux stages, aux collaborations techniques et aux projets logiciels intéressants.',
    'Back to top ↑':'Retour en haut ↑'
  };
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let language = 'en';
  try { language = localStorage.getItem('portfolio-language') === 'fr' ? 'fr' : 'en'; } catch {}

  function translate(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest('script, style, .language-switch')) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      let translated = language === 'fr' ? french[source.trim()] : null;
      if (language === 'fr' && node.parentElement.closest('.skill-card:last-child h3')) {
        translated = {'Development':'Outils de', 'Tools':'développement'}[source.trim()] || translated;
      }
      node.nodeValue = translated ? source.replace(source.trim(), translated) : source;
    }
    root.querySelectorAll('[aria-label], img[alt]').forEach(element => {
      if (!originalAttributes.has(element)) originalAttributes.set(element, {
        'aria-label': element.getAttribute('aria-label'), alt: element.getAttribute('alt')
      });
      Object.entries(originalAttributes.get(element)).forEach(([attribute, source]) => {
        if (source !== null) element.setAttribute(attribute, language === 'fr' ? french[source] || source : source);
      });
    });
  }

  const titles = {
    en:'Firas Ben Abdallah | AI Engineering Student & Software Developer',
    fr:'Firas Ben Abdallah | Étudiant en ingénierie IA & développeur logiciel'
  };
  const descriptions = {
    en:'Portfolio of Firas Ben Abdallah, a third-year AI Engineering student at ESPRIT exploring artificial intelligence, software engineering, web development, and Flutter.',
    fr:'Portfolio de Firas Ben Abdallah, étudiant en troisième année d’ingénierie en IA à ESPRIT : intelligence artificielle, génie logiciel, développement web et Flutter.'
  };
  function applyLanguage(next) {
    language = next === 'fr' ? 'fr' : 'en';
    document.documentElement.lang = language;
    translate(document.body);
    document.title = titles[language];
    document.querySelector('meta[name="description"]').content = descriptions[language];
    document.querySelector('meta[property="og:title"]').content = titles[language];
    document.querySelector('meta[property="og:description"]').content = descriptions[language];
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    try { localStorage.setItem('portfolio-language', language); } catch {}
  }
  document.querySelector('.language-switch').addEventListener('click', event => {
    const button = event.target.closest('[data-language]');
    if (button) applyLanguage(button.dataset.language);
  });
  // Project filtering replaces cards; translate new content using the active language.
  new MutationObserver(records => {
    if (records.some(record => record.addedNodes.length)) translate(document.body);
  }).observe(document.querySelector('#project-grid'), {childList:true});
  applyLanguage(language);
  document.querySelectorAll('.cert-title').forEach(title => title.lang = 'en');
})();
