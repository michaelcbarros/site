// /js/essays.js
(function(){
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

  // ---- Substack (manual list from data.js)
  if (SUBSTACK_POSTS && SUBSTACK_POSTS.length){
    // default "View all" goes to your main substack
    const first = new URL(SUBSTACK_POSTS[0].url);
    substackViewAll.href = first.origin + "/"; 

    SUBSTACK_POSTS
      .sort((a,b)=> new Date(b.date)-new Date(a.date))
      .slice(0,3)
      .forEach(p=>{
        const card = document.createElement('a');
        card.className = 'card';
        card.href = p.url;
        card.target = "_blank";
        card.rel = "noopener";
        card.innerHTML = `
          <div class="meta">${new Date(p.date).toLocaleDateString()}</div>
          <h3 style="margin:.2rem 0 .4rem">${p.title}</h3>
          <div class="muted" style="font-family:'IBM Plex Mono',monospace;font-size:.85rem">Open on Substack →</div>
        `;
        substackFeed.appendChild(card);
      });
  } else {
    substackFeed.innerHTML = `<div class="card muted">Add posts in <code>data/data.js</code> (SUBSTACK_POSTS array).</div>`;
  }

  // ---- Filters
  const categories = ["All Essays","Games","Film","Sci-Fi","Ritual","Simulation","Theory"];
  let active = "All Essays";

  function renderFilters(){
    filtersEl.innerHTML = '';
    categories.forEach(cat=>{
      const b = document.createElement('button');
      b.className = 'chip'+(cat===active?' active':'');
      b.textContent = cat;
      b.onclick = ()=> { active = cat; renderGrid(); renderFilters(); }
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
    readerMeta.textContent = `${e.category || ''}${e.reading_time?` • ${e.reading_time} min`:''}${e.published_date?` • ${new Date(e.published_date).toLocaleDateString()}:''}`;
    readerContent.innerHTML = e.content || '<p>No content.</p>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }

  function closeReader(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
  closeTop.onclick = closeBottom.onclick = (ev)=>{ ev.preventDefault(); closeReader(); };

  function renderGrid(){
    const list = (ESSAYS||[]).slice().sort((a,b)=> new Date(b.published_date)-new Date(a.published_date));
    const filtered = active==="All Essays" ? list : list.filter(e=> e.category===active);
    gridEl.innerHTML = '';

    if (!filtered.length){
      gridEl.innerHTML = `<div class="card muted" style="grid-column:1/-1;text-align:center">No essays found in this category.</div>`;
      return;
    }

    filtered.forEach(e=>{
      const a = document.createElement('a');
      a.href = `#${e.id}`;
      a.className = 'card';
      a.onclick = (ev)=>{ ev.preventDefault(); openReader(e); };
      a.innerHTML = `
        <div class="meta"><span class="badge">${e.category||'Essay'}</span> ${e.reading_time?`${e.reading_time}m • `:''}${e.published_date?new Date(e.published_date).toLocaleDateString():''}</div>
        <div style="font-size:1.25rem;margin-bottom:.25rem">${iconFor(e.category)} ${e.title}</div>
        <div class="muted">${e.thesis||''}</div>
      `;
      gridEl.appendChild(a);
    });
  }

  renderFilters();
  renderGrid();
})();
