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

  (function initMobileNavDropdown() {
    const header = document.querySelector('.site-header');
    const nav = header && header.querySelector('.nav');
    if (!header || !nav) return;

    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'primary-nav');
    toggle.innerHTML = '<span class="nav-toggle__icon" aria-hidden="true">☰</span><span>Menu</span>';

    if (!nav.id) nav.id = 'primary-nav';
    header.insertBefore(toggle, nav);

    const closeMenu = () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('nav-open')) return;
      if (header.contains(event.target)) return;
      closeMenu();
    });
  })();

  (function initFeaturedBookCollapse() {
    const bookCopy = document.querySelector('.book-copy');
    if (!bookCopy) return;

    const description = bookCopy.querySelector('p');
    const actionRow = bookCopy.querySelector('.cta-row');
    if (!description || !actionRow) return;

    bookCopy.classList.add('is-collapsed');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'btn ghost book-copy__toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Read summary';

    actionRow.insertAdjacentElement('beforebegin', toggle);

    toggle.addEventListener('click', () => {
      const isCollapsed = bookCopy.classList.toggle('is-collapsed');
      const isExpanded = !isCollapsed;
      toggle.textContent = isExpanded ? 'Hide summary' : 'Read summary';
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  })();
})();
