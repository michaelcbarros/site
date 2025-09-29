<!-- js/nav.js -->
<script>
(function () {
  // Grab links from SITE_DATA (falls back to safe defaults)
  const LINKS = (window.SITE_DATA && window.SITE_DATA.links) || window.LINKS || {};

  function setHref(id, href) {
    var el = document.getElementById(id);
    if (el && href) el.setAttribute('href', href);
  }

  // Wire every place we might use these links
  const blog   = LINKS.blog     || 'https://mythonoesis.substack.com/';
  const rg     = LINKS.research || 'https://www.researchgate.net/';

  setHref('nav-blog', blog);
  setHref('cta-blog', blog);
  setHref('open-substack', blog);
  setHref('nav-research', rg);

  // Optional: mark active page in nav by pathname
  try {
    const path = (location.pathname || '').split('/').pop() || 'index.html';
    const map = {
      'index.html': null,
      'books.html': './books.html',
      'projects.html': './projects.html',
      'about.html': './about.html',
      'contact.html': './contact.html'
    };
    const activeHref = map[path];
    if (activeHref) {
      const active = document.querySelector(`.nav a[href="${activeHref}"]`);
      if (active) active.setAttribute('aria-current','page');
    }
  } catch {}
})();
</script>
