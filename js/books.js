// /js/books.js
(function(){
  const container = document.getElementById('books-container');

  const statusOrder = ['Active','Forthcoming','Complete'];

  function section(title, items){
    const sec = document.createElement('section');
    sec.innerHTML = `
      <div class="section-head">
        <h2>${title}</h2>
        <span class="count">${items.length}</span>
      </div>
      <div class="grid cols-2" id="grid"></div>
    `;
    const grid = sec.querySelector('#grid');

    items.forEach(b=>{
      const card = document.createElement('div');
      card.className = 'card';
      const statusClass = (
        b.status==='Active' ? 'style="background:rgba(178,30,43,.08);border-color:rgba(178,30,43,.25);color:#B21E2B"' :
        b.status==='Forthcoming' ? 'style="background:rgba(160,125,59,.08);border-color:rgba(160,125,59,.25);color:#A07D3B"' :
        'style="background:rgba(110,110,110,.08);border-color:rgba(110,110,110,.25);color:#6E6E6E"'
      );
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
          <div class="muted" style="font-family:'IBM Plex Mono',monospace;text-transform:uppercase">Book</div>
          <span class="badge" ${statusClass}>${b.status||''}</span>
        </div>
        <h3 style="font-size:1.5rem;margin:.2rem 0 .6rem">${b.title}</h3>
        <p class="muted" style="margin-bottom:1rem">${b.description||''}</p>
        <div class="divider"></div>
        <div class="muted">${b.publisher?`<strong>Publisher:</strong> ${b.publisher}`:''}</div>
        <div class="muted">${b.expected_date?`${b.status==='Complete'?'Published:':'Expected:'} ${new Date(b.expected_date).toLocaleDateString('en-US',{year:'numeric',month:'long'})}`:''}</div>
      `;
      grid.appendChild(card);
    });

    return sec;
  }

  const groups = statusOrder
    .map(s => ({status:s, items:(BOOKS||[]).filter(b=>b.status===s)}))
    .filter(g => g.items.length);

  if (!groups.length){
    container.innerHTML = `<div class="card muted" style="text-align:center">No books yet. Add entries in <code>data/data.js</code>.</div>`;
    return;
  }

  groups.forEach(g => container.appendChild(section(g.status==='Complete'?'Published':g.status, g.items)));
})();
