(function () {
  const LINKS = (window.SITE_DATA && window.SITE_DATA.links) || window.LINKS || {};
  const blog = LINKS.blog || 'https://mythonoesis.substack.com/';
  const research = LINKS.research || 'https://www.researchgate.net/';

  [
    { selector: '#nav-blog', href: blog },
    { selector: '#cta-blog', href: blog },
    { selector: '#open-substack', href: blog },
    { selector: '#about-blog', href: blog }
  ].forEach(({ selector, href }) => {
    const el = document.querySelector(selector);
    if (el && href) el.setAttribute('href', href);
  });

  [
    { selector: '#nav-research', href: research },
    { selector: '#about-research', href: research }
  ].forEach(({ selector, href }) => {
    const el = document.querySelector(selector);
    if (el && href) el.setAttribute('href', href);
  });

  try {
    const path = (location.pathname || '').split('/').pop() || 'index.html';
    const map = {
      'index.html': './index.html',
      'books.html': './books.html',
      'projects.html': './projects.html',
      'about.html': './about.html',
      'contact.html': './contact.html'
    };
    const target = map[path];
    if (target) {
      const link = document.querySelector(`.nav__link[href="${target}"]`);
      if (link && !link.hasAttribute('aria-current')) {
        link.setAttribute('aria-current', 'page');
      }
    }
  } catch (err) {
    // no-op if location parsing fails
  }
})();
