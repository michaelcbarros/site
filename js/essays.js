(function() {
  const categories = ["Games","Film","Sci-Fi","Ritual","Simulation","Theory"];
  const essays = (window.ESSAYS || []).sort((a,b) => (b.published_date||"").localeCompare(a.published_date||""));

  // Substack
  const home = window.SUBSTACK_HOME || "#";
  const posts = window.SUBSTACK_POSTS || [];
  const substackBtn = document.getElementById('substack-view-all');
  const substackFeed = document.getElementById('substack-feed');
  if (substackBtn) substackBtn.href = home;
  if (substackFeed) {
    substackFeed.innerHTML = posts.map(p => `
      <a class="card" href="${p.url}" target="_blank" rel="noopener">
        <div class="card-head">
          <span class="mono muted upper">Substack</span>
          <span class="mono muted">${new Date(p.date).toLocaleDateString('en-US',{month:'short', day:'numeric', year:'numeric'})}</span>
        </div>
        <h3>${p.title}</h3>
        <p class="muted">${p.summary || ''}</p>
      </a>
    `).join('');
  }

  // Filters
  const filtersEl = document.getElementById('filters');
  const gridEl = document.getElementById('essays-grid');
  const modal = document.getElementById('reader-modal');
  const closeA = document.getElementById('close-reader');
  const closeB = document.getElementById('close-reader-bottom');

  let active = 'all';

  function renderFilters() {
    if (!filtersEl) return;
    const chips = [`<button class="chip ${active==='all'?'active':''}" data-cat="all">All Essays</button>`]
      .concat(categories.map(c => `<button class="chip ${active===c?'active':''}" data-cat="${c}">${c}</button>`));
    filtersEl.innerHTML = chips.join('');
    filtersEl.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        active = btn.dataset.cat;
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    if (!gridEl) return;
    const items = active==='all' ? essays : essays.filter(e => e.category===active);
    if (!items.length) {
      gridEl.innerHTML = `<div class="empty">No essays found in this category.</div>`;
      return;
    }
    gridEl.innerHTML = items.map(e => `
      <article class="card" data-id="${e.id}">
        <div class="card-head">
          <span class="badge">${e.category}</span>
          <span class="mono muted">${e.reading_time ? `${e.reading_time}m` : ''}</span>
        </div>
        <h3>${e.title}</h3>
        <p class="muted">${e.thesis || ''}</p>
        <div class="meta">
          ${e.published_date ? new Date(e.published_date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : ''}
        </div>
      </article>
    `).join('');

    gridEl.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => openReader(card.getAttribute('data-id')));
    });
  }

  function openReader(id) {
    const e = essays.find(x => x.id===id);
    if (!e || !modal) return;
    document.getElementById('reader-title').textContent = e.title;
    document.getElementById('reader-thesis').textContent = e.thesis || '';
    document.getElementById('reader-meta').innerHTML = `
      <span class="badge">${e.category}</span>
      <span class="mono muted">${e.reading_time ? `${e.reading_time} min read` : ''}</span>
    `;
    document.getElementById('reader-content').innerHTML = e.content || '<p>(No content yet.)</p>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }

  function closeReader(ev){
    ev && ev.preventDefault();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }

  closeA && closeA.addEventListener('click', closeReader);
  closeB && closeB.addEventListener('click', closeReader);

  renderFilters();
  renderGrid();
<script src="../data/data.js"></script>
<script src="../js/essays.js"></script>

})();
