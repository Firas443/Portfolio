/* Update these records as new verified work or credential URLs become available. */
const projects = [{title:'Restaurant Landing Page',category:'Web Development',summary:'A restaurant landing-page design presented on Behance.',tags:['Landing page','UI design'],link:'https://www.behance.net/gallery/241208507/Restaurant-Landing-Page',linkLabel:'View on Behance'}];
const certifications = [
  {title:'Fundamentals of Deep Learning',issued:'October 2025'},
  {title:'Introduction to Transformer-Based Natural Language Processing',issued:'November 2025'},
  {title:'Building LLM Applications With Prompt Engineering',issued:'December 2025'},
  {title:'Building RAG Agents with LLMs',issued:'December 2025'},
  {title:'Rapid Application Development with Large Language Models (LLMs)',issued:'December 2025'}
];
const projectGrid=document.querySelector('#project-grid'), filterHost=document.querySelector('#project-filters');
function renderProjects(category='All'){const visible=category==='All'?projects:projects.filter(p=>p.category===category);projectGrid.innerHTML=visible.map(p=>`<article class="project-card reveal is-visible"><div class="project-art" aria-hidden="true"></div><span class="project-meta">${p.category}</span><h3>${p.title}</h3><p>${p.summary}</p><div class="project-footer"><div class="tag-list">${p.tags.map(tag=>`<span class="tag">${tag}</span>`).join('')}</div><a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel} ↗</a></div></article>`).join('');}
function setupFilters(){const categories=['All',...new Set(projects.map(p=>p.category))];filterHost.innerHTML=categories.map((category,index)=>`<button class="filter" type="button" aria-pressed="${index===0}" data-category="${category}">${category}</button>`).join('');filterHost.addEventListener('click',e=>{const button=e.target.closest('.filter');if(!button)return;filterHost.querySelectorAll('.filter').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));renderProjects(button.dataset.category);});}
document.querySelector('#certification-list').innerHTML=certifications.map((cert,index)=>`<li class="reveal"><span class="cert-number">0${index+1}</span><div><div class="cert-title">${cert.title}</div><div class="cert-issuer">NVIDIA · Deep Learning Institute</div></div><span class="cert-date">Issued ${cert.issued}</span></li>`).join('');
setupFilters();renderProjects();document.querySelector('#year').textContent=new Date().getFullYear();
const toggle=document.querySelector('#menu-toggle'),nav=document.querySelector('#primary-nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});nav.addEventListener('click',e=>{if(e.target.matches('a')){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});
function closeNavigation(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open')){closeNavigation();toggle.focus();}});
document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!toggle.contains(event.target))closeNavigation();});
window.matchMedia('(min-width: 801px)').addEventListener('change',event=>{if(event.matches)closeNavigation();});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
