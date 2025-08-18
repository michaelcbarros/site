(function(){
  const D = window.SITE_DATA || {};
  const books = Array.isArray(D.books) ? D.books.slice() : [];

  const order = ["Active", "Forthcoming", "Complete"];
  // group by status with desired order
  const groups = order.map(status => ({
    status,
    items: books.filter(b => (b.status||"").toLowerCase() === status.toLowerCase())
  })).filter(g => g.items.length);

  const root = document.getElementById('books-root');
  if (!root){
    console.warn("books-root not found");
    return;
  }
  if (!groups.length){
    root.innerHTML = `<div class="empty">No books yet. Add entries to <code>SITE_DATA.books</code> in <code>data/data.js</code>.</div>`;
    return;
  }

  const fmtMonth = iso => {
    try {
      const d = new Date(iso);
      if (isNaN(d)) return "";
      return d.toLocaleDateString('en-US', {year:'numeric', month:'long'});
    } catch { return ""; }
  };

  const statusClass = s => {
    const k = (s||"").toLowerCase();
    return k === 'active' ? 'status active' :
           k === 'forthcoming' ? 'status forthcoming' :
           'status complete';
  };

  const groupHtml = g => `
    <section class="mb-20">
      <div class="section-head">
        <h2 style="font-family:'EB Garamond',serif;font-weight:500;font-size:1.5rem;margin:0">
          ${g.status === 'Complete' ? 'Published' : g.status}
        </h2>
        <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(160,125,59,.3),transparent)"></div>
        <span class="count">${g.items.length}</span>
      </div>
      <div class="grid">
        ${g.items.map(book => `
          <article class="book">
            <div class="top">
              <div class="mark">
                <span class="badge">Book</span>
              </div>
              <span class="${statusClass(book.status)}">${book.status || ''}</span>
            </div>
            <h3>${book.title || ''}</h3>
            ${book.description ? `<p class="desc">${book.description}</p>` : ``}
            <div class="meta">
              ${book.publisher ? `<div class="meta-row">🏛️ <span><strong>${book.publisher}</strong></span></div>` : ``}
              ${book.expected_date ? `<div class="meta-row">📅 <span>${(book.status||'')==='Complete'?'Published: ':'Expected: '}${fmtMonth(book.expected_date)}</span></div>` : ``}
              ${book.url ? `<div class="meta-row">🔗 <a href="${book.url}" target="_blank" rel="noopener">More details</a></div>` : ``}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  root.innerHTML = groups.map(groupHtml).join('');
})();
