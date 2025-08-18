(function(){
  const D = window.SITE_DATA || { essays: [], substackPosts: [] };

  // ===== Substack section (manual links from data.js) =====
  const substackFeed = document.getElementById('substack-feed');
  const substackViewAll = document.getElementById('substack-view-all');
  if (D.substackPosts && D.substackPosts.length) {
    // Try to infer base URL from first item
    try {
      const u = new URL(D.substackPosts[0].url);
      substackViewAll.href = `${u.origin}/archive`;
    } catch(e){ substackViewAll.remove(); }

    substackFeed.innerHTML = D.substackPosts.slice(0,6).map(p => `
      <a class="card" href="${p.url}" target="_blank" rel="noopener">
        <div class="badge">Substack</div>
        <h3>${p.title}</h3>
        <div class="muted">${p.source || ""}${p.minutes ? ` • ${p.minutes} min` : ""}</div>
      </a>
    `).join('');
  } else {
    substackViewAll.remove();
    substackFeed.innerHTML = `<div class="empty">Add posts to <code>substackPosts</code> in <code>data/data.js</code>.</div>`;
  }

  // ===== Categories from essays =====
  const cats = Array.from(new Set(D.essays.map(e => e.category).filter(Boolean))).sort();
  const filters = document.getElementById('filters');
  const grid = document.getElementById('essays-grid');
  let active = 'all';

  function renderFilters(){
    filters.innerHTML = [
      `<button class="chip ${active==='all'?'active':''}" data-cat="all">All Essays</button>`,
      ...cats.map(c => `<button class="chip ${active===c?'active':''}" data-cat="${c}">${c}</button>`)
    ].join('');
    filters.querySelectorAll('.chip').forEach(btn=>{
      btn.onclick = () => { active = btn.dataset.cat; renderFilters(); renderGrid(); };
    });
  }

  const iconFor = (cat) => ({
    "Games":"🎮","Film":"🎬","Sci-Fi":"🚀","Ritual":"✨","Simulation":"💫","Theory":"📚"
  }[cat] || "📖");

  function renderGrid(){
    const list = (active==='all') ? D.essays : D.essays.filter(e => e.category===active);
    if (!list.length){
      grid.innerHTML = `<div class="empty">No essays found in this category.</div>`;
      return;
    }
    grid.innerHTML = list
      .sort((a,b)=> (b.published_date||"").localeCompare(a.published_date||""))
      .map(e => {
        const date = e.published_date ? new Date(e.published_date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : '';
        const meta = [
          e.category ? `<span class="badge">${e.category}</span>` : '',
          e.reading_time ? `<span class="muted">${e.reading_time}m</span>` : '',
          date ? `<span class="muted">${date}</span>` : ''
        ].filter(Boolean).join(' ');
        // Prefer modal snippet if provided, else href
        const onclick = e.snippet ? `data-id="${e.id}" class="card essay-card"` : `class="card" href="${e.url||'#'}"`;
        return `
          <a ${onclick}>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem">
              <span style="font-size:1.25rem">${iconFor(e.category)}</span>
              <div>${meta}</div>
            </div>
            <h3>${e.title||''}</h3>
            <p class="muted">${e.thesis||''}</p>
          </a>`;
      }).join('');

    // Attach modal open handlers
    grid.querySelectorAll('.essay-card').forEach(a=>{
      a.onclick = (ev)=>{
        ev.preventDefault();
        const id = a.getAttribute('data-id');
        openReader(id);
      };
    });
  }

  renderFilters();
  renderGrid();

  // ===== Reader Modal (optional) =====
  const modal = document.getElementById('reader-modal');
  const titleNode = document.getElementById('reader-title');
  const thesisNode = document.getElementById('reader-thesis');
  const metaNode = document.getElementById('reader-meta');
  const contentNode = document.getElementById('reader-content');
  document.getElementById('close-reader').onclick = closeReader;
  document.getElementById('close-reader-bottom').onclick = closeReader;

  async function openReader(id){
    const e = D.essays.find(x=>x.id===id);
    if (!e || !e.snippet){ return; }
    titleNode.textContent = e.title || '';
    thesisNode.textContent = e.thesis || '';
    const bits = [];
    if (e.category) bits.push(`<span class="badge">${e.category}</span>`);
    if (e.reading_time) bits.push(`<span class="muted">${e.reading_time} min read</span>`);
    if (e.published_date){
      bits.push(`<span class="muted">${new Date(e.published_date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span>`);
    }
    metaNode.innerHTML = bits.join(' ');
    contentNode.innerHTML = "Loading…";
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');

    try{
      const res = await fetch(`../${e.snippet}`);
      const html = await res.text();
      contentNode.innerHTML = html; // your snippet is trusted, lives in repo
      // update URL (?id=) for deep link
      const u = new URL(window.location);
      u.searchParams.set('id', id);
      history.replaceState(null, "", u.toString());
    }catch(err){
      contentNode.innerHTML = `<div class="empty">Could not load content.</div>`;
    }
  }

  function closeReader(ev){
    if (ev) ev.preventDefault();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    // remove ?id
    const u = new URL(window.location);
    u.searchParams.delete('id');
    history.replaceState(null, "", u.toString());
  }

  // Deep link (?id=zelda-myth) => open modal
  const params = new URLSearchParams(location.search);
  const deepId = params.get('id');
  if (deepId){
    const e = D.essays.find(x=>x.id===deepId);
    if (e && e.snippet){ openReader(deepId); }
  }
})();
