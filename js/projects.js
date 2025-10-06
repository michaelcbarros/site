// js/projects.js
(function () {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const projects = getProjects();
  buildFilters(projects);

  const state = { k: 'All', q: '' };
  renderGrid(projects, state);

  const filters = document.getElementById('filters');
  if (filters) {
    filters.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-k]');
      if (!btn) return;
      filters.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.k = btn.dataset.k || 'All';
      renderGrid(projects, state);
    });
  }

  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', (event) => {
      state.q = event.target.value || '';
      renderGrid(projects, state);
    });
  }

  function getProjects() {
    const D = window.SITE_DATA || {};
    const list = Array.isArray(D.projects) ? D.projects.slice() : window.PROJECTS || [];
    return list.map((p) => ({
      id: slugify(p.id || p.title || ''),
      title: p.title || 'Untitled project',
      status: p.status || p.type || 'Project',
      type: p.type || '',
      tags: Array.isArray(p.tags)
        ? p.tags
        : p.tags
        ? String(p.tags)
            .split(',')
            .map((t) => t.trim())
        : [],
      date: p.date || p.started || '',
      short: p.short || p.summary || '',
      description: p.description || '',
      url: p.url || null,
      cover: p.cover || p.image || null,
      external: !!p.external,
    }));
  }

  function buildFilters(items) {
    const node = document.getElementById('filters');
    if (!node) return;
    const kinds = new Set(['All']);
    items.forEach((p) => {
      if (p.status) kinds.add(p.status);
      if (p.type) kinds.add(p.type);
    });
    node.innerHTML = '';
    Array.from(kinds).forEach((kind, idx) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-btn' + (idx === 0 ? ' active' : '');
      button.dataset.k = kind;
      button.textContent = kind;
      node.appendChild(button);
    });
  }

  function renderGrid(items, { k = 'All', q = '' } = {}) {
    const grid = document.getElementById('projects-grid');
    const empty = document.getElementById('empty');
    if (!grid) return;

    const ql = q.trim().toLowerCase();
    const filtered = items.filter((p) => {
      const inKind = k === 'All' || p.status === k || p.type === k;
      const haystack = [p.title, p.short, p.description, p.tags.join(' ')].join(' ').toLowerCase();
      const inSearch = !ql || haystack.includes(ql);
      return inKind && inSearch;
    });

    if (!filtered.length) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    grid.innerHTML = '';

    filtered.forEach((p) => {
      const card = document.createElement('a');
      const id = p.id || slugify(p.title);
      card.className = `card card--${id}`;
      card.href = p.url || '#';
      if (p.external) {
        card.target = '_blank';
        card.rel = 'noopener';
      }
      const tags = p.tags.length
        ? `<div class="meta-row">${p.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>`
        : '';
      card.innerHTML = `
        ${motifMarkup(id)}
        <span class="badge">${p.status || 'Research'}</span>
        <h3>${p.title}</h3>
        ${p.date ? `<p class="muted small">${formatDate(p.date)}</p>` : ''}
        ${p.short ? `<p class="muted">${p.short}</p>` : ''}
        ${p.description ? `<p class="muted small">${p.description}</p>` : ''}
        ${tags}
      `;
      grid.appendChild(card);
    });
  }

  function motifMarkup(id) {
    const svg = (function () {
      switch (id) {
        case 'waypoint':
          return '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="40" /><path d="M60 26v68M26 60h68" /><path d="M60 18l12 24-12 10-12-10z" /></svg>';
        case 'zelda-religion':
          return '<svg viewBox="0 0 120 120"><path d="M60 26l22 38H38z" /><path d="M60 26l-11 19h22z" /><path d="M60 64l11 19H49z" /></svg>';
        case 'dream-simulation':
          return '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="34" /><path d="M36 60c0-13.3 10.7-24 24-24s24 10.7 24 24-10.7 24-24 24" /><path d="M48 78c-9 0-16-7-16-16" /></svg>';
        default:
          return '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" /><path d="M28 60h64M60 28v64" /></svg>';
      }
    })();
    return `<span class="card__motif" aria-hidden="true">${svg}</span>`;
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function formatDate(value) {
    try {
      return new Date(value).toISOString().slice(0, 10);
    } catch (err) {
      return value;
    }
  }
})();
