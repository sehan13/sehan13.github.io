// ---------- 1. Mobile menu ----------
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after clicking a link (on mobile)
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// ---------- 2. Dark mode (remembers your choice) ----------
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');

function getSavedTheme() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}
function saveTheme(theme) {
  try { localStorage.setItem('theme', theme); } catch { /* storage blocked: ignore */ }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = getSavedTheme() || (prefersDark ? 'dark' : 'light');

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  saveTheme(next);
});

// ---------- 3. Typing effect in the hero ----------
const roles = ['Web Developer', 'Python Developer', 'Data Analyst', 'CS Graduate'];
const typed = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
  } else if (deleting && charIndex > 0) {
    charIndex--;
  } else if (!deleting) {
    deleting = true;
    return setTimeout(typeLoop, 1500);   // pause on full word
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typeLoop();
}

// ---------- 4. Fade-in sections on scroll ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- 5. Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
