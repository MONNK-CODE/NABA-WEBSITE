// mobile menu toggle
const burger = document.getElementById('hamburger');
const mobile = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobile.classList.toggle('open');
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// close mobile menu after clicking a link
document.querySelectorAll('#mobileMenu a').forEach(a => {
  a.addEventListener('click', () => {
    mobile.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// auto year in footer
document.getElementById('year').textContent = new Date().getFullYear();