// /js/essays.js
(function(){
  "use strict";

  // Elements
  const substackFeed = document.getElementById('substack-feed');
  const substackViewAll = document.getElementById('substack-view-all');
  const filtersEl = document.getElementById('filters');
  const gridEl = document.getElementById('essays-grid');

  const modal = document.getElementById('reader-modal');
  const closeTop = document.getElementById('close-reader');
  const closeBottom = document.getElementById('close-reader-bottom');
  const readerTitle = document.getElementById('reader-title');
  const readerThesis = document.getElementById('reader-thesis');
  const readerMeta = document.getElementById('reader-meta');
  const readerContent = document.getElementById('reader-content');

  // Utilities
  const fmtDate = iso => {
    try { return new Date(iso).toISOString().slice(0,10); }
    catch { return ""; }
  };
  const esc = s => String(s||"").replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const slugify = s => (s||"").toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-");

  const SUBSTACK = (typeof SUBSTACK_POSTS !== "undefined" ? SUBSTACK_POSTS : []) || [];
  const ESSAYS = (typeof window.ESSAYS !== "undefined" ? window.ESSAYS : []) || [];

  // ---- Substack
  if (substackFeed){
    if (SUBSTACK.length){
      substack.sort((a,b)=> new Date(b.date)-new Date(a.date));
      const first = new URL(SUBSTACK[0].url);
      if (substackViewAll) substackViewAll.href = first.origin + "/";
      SUBSTACK.slice(0,3).forEach(p=>{
        const card = document.createElement('a');
        card.className = 'card';
        card.href = p.url;
        card.target = "_blank";
        card.rel = "noopener";
        card.innerHTML = `
          <div class="meta">${fmtDate(p.date)}</div>
          <h3 style="margin:.2rem 0 .4rem">${esc(p.title)}</h3>
          <div class="muted" style="font-family:'IBM Plex Mono',monospace;font-size:.85rem">Open on Substack →</div>
        `;
        substackFeed.appendChild(card);
      });
    } else {
      substackFeed.innerHTML = `<div class="card muted">Add posts in <code>data/data.js</code> (SUBSTACK_POSTS array).</div>`;
    }
  }

  // ---- Filters
  let active = "All";
  function renderFilters(){
    if (!filtersEl) return;
    const cats = new Set(ESSAYS.map(e=>e.category).filter(Boolean));
    filtersEl.innerHTML = "";
    ["All", ...Array.from(cats).sort()].forEach(cat=>{
      const b = document.createElement('button');
      b.className = 'chip'+(cat===active?' active':'');
      b.textContent = cat;
      b.onclick = ()=> { active = cat; renderFilters(); renderGrid(); };
      filtersEl.appendChild(b);
    });
  }

  // ---- Archive grid
  function iconFor(cat){
    return ({
      "Games":"🎮","Film":"🎬","Sci-Fi":"🚀","Ritual":"✨","Simulation":"💫","Theory":"📚"
    })[cat] || "📖";
  }

  function openReader(e){
    readerTitle.textContent = e.title;
    readerThesis.textContent = e.thesis || '';
    const bits = [];
    if (e.category) bits.push(e.category);
    if (e.reading_time) bits.push(`${e.reading_time} min`);
    if (e.published_date) bits.push(fmtDate(e.published_date));
    readerMeta.textContent = bits.join(" • ");
    readerContent.innerHTML = e.content || '<p>No content.</p>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    location.hash = "essay="+encodeURIComponent(e.slug||slugify(e.title));
  }

  function closeReader(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    if (location.hash.startsWith("#essay=")){
      history.replaceState(null,"",location.pathname+location.search);
    }
  }

  if (closeTop) closeTop.onclick = closeBottom.onclick = ev=>{ev.preventDefault(); closeReader();};
  modal?.addEventListener("click",ev=>{if(ev.target===modal) closeReader();});
  document.addEventListener("keydown",ev=>{if(ev.key==="Escape") closeReader();});

  function renderGrid(query=""){
    if (!gridEl) return;
    const q = query.toLowerCase().trim();
    const list = ESSAYS.slice().sort((a,b)=> new Date(b.published_date)-new Date(a.published_date));
    const filtered = list.filter(e=>{
      const inCat = active==="All" || e.category===active;
      const inQ = !q || [e.title,e.thesis,e.category].join(" ").toLowerCase().includes(q);
      return inCat && inQ;
    });
    gridEl.innerHTML = '';

    if (!filtered.length){
      gridEl.innerHTML = `<div class="card muted" style="grid-column:1/-1;text-align:center">No essays found.</div>`;
      return;
    }

    filtered.forEach(e=>{
      const a = document.createElement('a');
      a.href = `#essay=${encodeURIComponent(e.slug||slugify(e.title))}`;
      a.className = 'card';
      a.onclick = (ev)=>{ev.preventDefault(); openReader(e);};
      a.innerHTML = `
        <div class="meta"><span class="badge">${esc(e.category||'Essay')}</span> 
          ${e.reading_time?`${e.reading_time}m • `:''}
          ${e.published_date?fmtDate(e.published_date):''}</div>
        <div style="font-size:1.25rem;margin-bottom:.25rem">${iconFor(e.category)} ${esc(e.title)}</div>
        <div class="muted">${esc(e.thesis||'')}</div>
      `;
      gridEl.appendChild(a);
    });
  }

  // ---- Search input
  const searchBox = document.createElement("input");
  searchBox.type = "search";
  searchBox.placeholder = "Search essays…";
  searchBox.style.margin = "0.5rem 0 1.25rem";
  searchBox.oninput = ()=> renderGrid(searchBox.value);
  if (filtersEl) filtersEl.insertAdjacentElement("afterend", searchBox);

  // ---- Boot
  renderFilters();
  renderGrid();

  // Hash-based deep linking
  function hydrateFromHash(){
    const m = location.hash.match(/^#?essay=([^&]+)/);
    if (m){
      const slug = decodeURIComponent(m[1]);
      const e = ESSAYS.find(x=> (x.slug||slugify(x.title))===slug);
      if (e) openReader(e);
    }
  }
  hydrateFromHash();
  window.addEventListener("hashchange",hydrateFromHash);

})();
