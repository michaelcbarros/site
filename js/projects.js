// js/projects.js
(function () {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const cards = Array.from(document.querySelectorAll('.proj-card'));
  if (!cards.length) return;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reducedMotion = mediaQuery.matches;

  const toggleClass = (card) => {
    if (!card || reducedMotion) return;
    card.classList.toggle('is-flipped');
  };

  document.addEventListener('click', (event) => {
    const card = event.target.closest('.proj-card');
    if (!card) return;
    if (event.target.closest('a, button')) return;
    toggleClass(card);
  });

  cards.forEach((card) => {
    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-flipped');
    });
    card.addEventListener('blur', () => {
      card.classList.remove('is-flipped');
    });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggleClass(card);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    cards.forEach((card) => card.classList.remove('is-flipped'));
  });
})();
