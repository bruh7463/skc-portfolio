/* ============================================================
   scripts/main.js
   Section switching, animated headings, active nav, flip cards
   ============================================================ */
(function () {
  'use strict';

  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  const homeAnchors = document.querySelectorAll('[data-target]');

  /* ---------- Animated letter-by-letter headings ---------- */
  function animateLetters(el) {
    const text = el.getAttribute('data-text') || el.textContent.trim();
    // Decode HTML entities (e.g. &amp;) that were placed in data-text
    const decoded = decodeEntities(text);
    el.textContent = '';
    Array.from(decoded).forEach(function (char, i) {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = (i * 0.03).toFixed(2) + 's';
      el.appendChild(span);
    });
  }

  function decodeEntities(str) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  function animatePageTitle(page) {
    const heading = page.querySelector('[data-text]');
    if (heading) animateLetters(heading);
  }

  /* ---------- Section switching ---------- */
  function showPage(target, updateHash) {
    let found = null;
    pages.forEach(function (page) {
      const isActive = page.id === target;
      page.classList.toggle('active', isActive);
      if (isActive) found = page;
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('data-target') === target;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (found) {
      animatePageTitle(found);
      // Build the skills word cloud now that the page has dimensions
      if (target === 'skills' && window.SKCWordCloud) {
        window.SKCWordCloud();
      }
      // Scroll to top of content on switch
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (updateHash !== false && window.location.hash !== '#' + target) {
      history.replaceState(null, '', '#' + target);
    }
  }

  /* ---------- Wire up navigation ---------- */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      if (link.classList.contains('active')) return;
      showPage(target);
    });
  });

  // Home page CTAs and sidebar email link that target sections
  homeAnchors.forEach(function (el) {
    el.addEventListener('click', function (e) {
      const target = el.getAttribute('data-target');
      if (!target) return;
      // Only intercept same-page section links
      if (el.classList.contains('btn') || el.classList.contains('social-mail')) {
        e.preventDefault();
      }
      if (target) showPage(target);
    });
  });

  // Respect any incoming URL hash on load
  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      showPage(hash, false);
    } else {
      animatePageTitle(document.getElementById('home'));
    }
  }

  /* ---------- Flip cards (tap-to-flip on touch, plus keyboard) ---------- */
  document.querySelectorAll('.flip-card').forEach(function (card) {
    function toggle() {
      card.classList.toggle('is-flipped');
    }
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleHash);
  } else {
    handleHash();
  }
})();
