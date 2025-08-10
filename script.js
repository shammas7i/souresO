// Basic interactive behaviors: typewriter, particles, gallery, settings
const sampleCreations = [
  {title:'Stone Mini Robot', desc:'A small battle-bot I built using two motors and an RC module.', img:'assets/cre1.jpg'},
  {title:'Custom Racing Setup', desc:'Phone-based racing rig with detachable steering and haptic motor.', img:'assets/cre2.jpg'},
  {title:'Hydro Dip Foam Runners', desc:'Black hydro-dipped Yeezy foam runners experimental result.', img:'assets/cre3.jpg'}
];

// DOM
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const themeToggle = document.getElementById('themeToggle');
const accentColor = document.getElementById('accentColor');
const animToggle = document.getElementById('animToggle');
const fontSize = document.getElementById('fontSize');

// Inject gallery cards
function buildGallery(){
  gallery.innerHTML = '';
  sampleCreations.forEach((c,i)=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <img src="${c.img}" alt="${c.title}" loading="lazy">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div style="text-align:right"><button class="btn open" data-index="${i}">Open</button></div>
    `;
    gallery.appendChild(card);
  });
}

// Modal open
gallery.addEventListener('click', e=>{
  const btn = e.target.closest('button.open');
  if(!btn) return;
  const idx = Number(btn.dataset.index);
  const data = sampleCreations[idx];
  modalContent.innerHTML = `<h2>${data.title}</h2><img src="${data.img}" style="width:100%;border-radius:8px;margin-top:12px"><p style="margin-top:10px">${data.desc}</p>`;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
});

modalClose.addEventListener('click', ()=>{ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); });

// Settings open/close
settingsBtn.addEventListener('click', ()=>{
  settingsPanel.classList.toggle('hidden');
});
closeSettings.addEventListener('click', ()=>settingsPanel.classList.add('hidden'));

// Theme toggle
let dark = true;
themeToggle.addEventListener('click', ()=>{
  dark = !dark;
  if(dark){
    document.documentElement.style.setProperty('--bg','#0d0d0d');
    document.documentElement.style.setProperty('--panel','#111');
    document.documentElement.style.setProperty('--text','#eaeaea');
  } else {
    document.documentElement.style.setProperty('--bg','#f6f7fb');
    document.documentElement.style.setProperty('--panel','#ffffff');
    document.documentElement.style.setProperty('--text','#101217');
  }
});

// Accent color control
accentColor.addEventListener('input', (e)=>{
  document.documentElement.style.setProperty('--accent', e.target.value);
});

// Animations toggle
animToggle.addEventListener('change', (e)=>{
  const enabled = e.target.checked;
  if(!enabled){
    if(window.gsap) gsap.globalTimeline.pause();
  } else {
    if(window.gsap) gsap.globalTimeline.resume();
  }
});

// Font size change
fontSize.addEventListener('change', ()=>{
  document.documentElement.style.fontSize = fontSize.value + 'px';
});

// Typewriter effect
const phrases = ['Inventor • Creator • Gamer', 'Build. Test. Share.', 'Make. Break. Improve.'];
let typeIndex=0, charIndex=0;
const typeEl = document.getElementById('typewriter');
function typeLoop(){
  const p = phrases[typeIndex];
  typeEl.textContent = p.slice(0,charIndex);
  charIndex++;
  if(charIndex>p.length){
    setTimeout(()=>{ charIndex=0; typeIndex=(typeIndex+1)%phrases.length }, 1200);
  }
  setTimeout(typeLoop, 80);
}
typeLoop();

// Particles init
if(window.particlesJS){
  particlesJS('particles-js', {
    particles: { number: { value: 50 }, color: { value: ['#00f7ff','#ff00d4','#ffd500'] }, size:{value:3}, line_linked:{enable:true,opacity:0.06} },
    interactivity: { events: { onhover: { enable: true, mode: 'grab' } } }
  });
}

// small entrance animation with GSAP
window.addEventListener('load', ()=>{
  buildGallery();
  if(window.gsap){
    gsap.from('.card', {y:30, opacity:0, stagger:0.12, duration:0.7, ease:'power3.out'});
    gsap.from('.hero-content h1', {y:20, opacity:0, duration:0.8});
    gsap.from('.hero-content .btn', {y:10, opacity:0, duration:0.6, stagger:0.12});
  }
});
