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
      if (p.cover) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flip';
        wrapper.innerHTML = `
          <div class="flip-inner">
            <a class="flip-face" href="${p.url || '#'}" ${p.external ? 'target="_blank" rel="noopener"' : ''}>
              <img src="${p.cover}" alt="" style="width:100%;height:140px;object-fit:cover;border-radius:12px;margin-bottom:.6rem" />
              <span class="badge">${p.status}</span>
              <h3>${p.title}</h3>
              <div class="meta-row">
                ${p.date ? `<time datetime="${p.date}">${formatDate(p.date)}</time>` : ''}
                ${p.tags.length ? `· ${p.tags.join(', ')}` : ''}
              </div>
              <p class="muted">${p.short}</p>
            </a>
            <a class="flip-back" href="${p.url || '#'}" ${p.external ? 'target="_blank" rel="noopener"' : ''}>
              <h3>${p.title}</h3>
              ${p.description ? `<p class="muted">${p.description}</p>` : ''}
              ${p.url ? `<div style="margin-top:.65rem"><span class="badge">${p.external ? 'External' : 'Details'}</span></div>` : ''}
            </a>
          </div>
        `;
        grid.appendChild(wrapper);
      } else {
        const card = document.createElement('a');
        card.className = 'card';
        card.href = p.url || '#';
        if (p.external) {
          card.target = '_blank';
          card.rel = 'noopener';
        }
        card.innerHTML = `
          <span class="badge">${p.status}</span>
          <h3>${p.title}</h3>
          <div class="meta-row">
            ${p.date ? `<time datetime="${p.date}">${formatDate(p.date)}</time>` : ''}
            ${p.tags.length ? `· ${p.tags.join(', ')}` : ''}
          </div>
          ${p.short ? `<p class="muted">${p.short}</p>` : ''}
        `;
        grid.appendChild(card);
      }
    });
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
