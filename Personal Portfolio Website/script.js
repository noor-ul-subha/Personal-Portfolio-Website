const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function showThemeIcon() {
    themeIcon.innerHTML = root.getAttribute('data-theme') === 'dark' ? '&#9728;' : '&#9790;';
}

themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
        localStorage.setItem('theme', next);
    } catch (e) {

    }
    showThemeIcon();
});

showThemeIcon();

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

const sections = document.querySelectorAll('main section[id]');
const menuLinks = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
});

const form = document.getElementById('contactForm');
const statusText = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    statusText.className = 'form-status';

    if (!name || !message) {
        statusText.textContent = 'Please fill in your name and message.';
        statusText.classList.add('error');
        return;
    }

    if (!emailOk) {
        statusText.textContent = 'Please enter a valid email address.';
        statusText.classList.add('error');
        return;
    }

    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');

    window.location.href = 'mailto:noorulsubha4@gmail.com?subject=' + subject + '&body=' + body;

    statusText.textContent = 'Opening your email app. Press send there to deliver the message.';
    statusText.classList.add('ok');
    form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
