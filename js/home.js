// js/home.js
(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Baseurl-safe: infer from <base> or compute from path
  const BASEURL =
    (document.querySelector("base") && document.querySelector("base").getAttribute("href")) ||
    (function () {
      // For project sites like /michaelcbarros/, use the first path segment as base.
      const segs = location.pathname.split("/").filter(Boolean);
      return segs.length > 0 ? "/" + segs[0] : "";
    })();

  const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const iconFor = (cat) =>
    ({
      Games: "🎮",
      Film: "🎬",
      "Sci-Fi": "🚀",
      Ritual: "✨",
      Simulation: "💫",
      Theory: "📚",
    }[cat] || "📖");

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  const slugify = (s) =>
    String(s || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const isExternal = (url) => /^https?:\/\//i.test(url || "");

  // Derive a primary category from either 'category' or first tag
  function deriveCategory(item) {
    if (item.category) return item.category;
    if (Array.isArray(item.tags) && item.tags.length) return item.tags[0];
    return "Essay";
  }

  // Compute a conservative reading time if needed
  function readingTime(item) {
    if (item.reading_time) return `${item.reading_time} min read`;
    const src = (item.content || item.thesis || item.summary || "").trim();
    if (!src) return "";
    const words = src.split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 230)); // 230 wpm
    return `${mins} min read`;
  }

  // Make internal, baseurl-safe URL to an essay fallback route (modal hash)
  function internalEssayHref(item) {
    const slug = item.slug || slugify(item.title || "");
    return `${BASEURL}/essays.html#essay=${encodeURIComponent(slug)}`;
  }

  // Smart link chooser: external URL wins, else internal reader route
  function hrefFor(item) {
    if (item.url) return isExternal(item.url) ? item.url : prefixBase(item.url);
    return internalEssayHref(item);
  }

  function prefixBase(url) {
    if (!url) return BASEURL || "/";
    // Already absolute
    if (/^https?:\/\//i.test(url)) return url;
    // Already base-prefixed
    if (BASEURL && url.startsWith(BASEURL + "/")) return url;
    // Relative -> base + rel (avoid double slashes)
    if (url.startsWith("./")) url = url.slice(1);
    if (!url.startsWith("/")) url = "/" + url;
    return (BASEURL || "") + url;
  }

  // Tiny shimmer (inlined, no CSS file dependency)
  function shimmerHTML(lines = 3) {
    const blocks = Array.from({ length: lines })
      .map(
        () =>
          `<div style="height:10px;background:linear-gradient(90deg,#eee,#f6f6f6,#eee);background-size:200% 100%;border-radius:6px;animation:shimmer 1.2s linear infinite;margin:8px 0"></div>`
      )
      .join("");
    if (!document.getElementById("shimmer-keyframes")) {
      const style = document.createElement("style");
      style.id = "shimmer-keyframes";
      style.textContent = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;
      document.head.appendChild(style);
    }
    return `<div class="card">${blocks}</div>`;
  }

  // ---------- Data ----------
  const D = window.SITE_DATA || {};
  const TAGLINES = Array.isArray(D.taglines) && D.taglines.length
    ? D.taglines
    : [
        "Exploring how culture becomes a site of religious experience.",
        "Religion, imagination, and popular culture.",
        "Where myth and meaning surface in games, film, and fiction.",
      ];

  const ESSAYS = Array.isArray(D.essays) ? D.essays.slice() : [];
  const PROJECTS = Array.isArray(D.projects) ? D.projects.slice() : [];

  // Normalize minimal fields
  ESSAYS.forEach((e) => {
    e.title = e.title || "Untitled";
    e.slug = e.slug || slugify(e.title);
    e.thesis = e.thesis || e.summary || "";
    e.category = deriveCategory(e);
  });
  PROJECTS.forEach((p) => {
    p.title = p.title || "Untitled";
    p.status = p.status || "In Progress";
    p.type = p.type || "Project";
  });

  // ---------- Tagline rotation ----------
  (function rotateTagline() {
    const node = $("#rotating-tagline");
    if (!node) return;

    let i = 0;
    node.textContent = TAGLINES[0];

    if (rm || TAGLINES.length < 2) return; // respect reduced motion

    setInterval(() => {
      i = (i + 1) % TAGLINES.length;
      node.style.transition = "opacity .22s ease";
      node.style.opacity = 0;
      setTimeout(() => {
        node.textContent = TAGLINES[i];
        node.style.opacity = 1;
      }, 180);
    }, 4200);
  })();

  // ---------- Featured Essays ----------
  (function renderFeaturedEssays() {
    const wrap = $("#featured-essays");
    if (!wrap) return;

    const featured = ESSAYS.filter((e) => !!e.featured).slice(0, 3);
    if (!featured.length) {
      // Show either a shimmer or a friendly empty
      wrap.innerHTML =
        ESSAYS.length === 0
          ? `
        <div class="empty">
          <div style="font-size:1.4rem">✍️</div>
          <p>Featured essays will appear here.</p>
          <p class="muted small">Set <code>featured: true</code> on a few entries in <code>SITE_DATA.essays</code>.</p>
        </div>`
          : shimmerHTML(4);
    }

    const list = (featured.length ? featured : ESSAYS.slice(0, 3))
      .map((e) => {
        const href = hrefFor(e);
        const cat = esc(e.category);
        const icon = iconFor(cat);
        const thesis = esc(e.thesis || "");
        const rt = readingTime(e);
        const extAttrs = isExternal(href) ? ` target="_blank" rel="noopener"` : "";

        return `
          <a class="card" href="${href}"${extAttrs} aria-label="${esc(e.title)}">
            <div class="mcb-card-top" style="display:flex;justify-content:space-between;align-items:center">
              <span aria-hidden="true" style="font-size:1.15rem">${icon}</span>
              <span class="badge">${cat}</span>
            </div>
            <h4 class="mcb-card-title" style="margin:.4rem 0 .3rem">${esc(e.title)}</h4>
            <p class="mcb-card-desc" style="color:var(--muted)">${thesis}</p>
            ${rt ? `<div class="mcb-meta" style="margin-top:.45rem;color:var(--muted);font-size:.9rem">${rt}</div>` : ``}
          </a>
        `;
      })
      .join("");

    // If we showed shimmer earlier, replace it; else just set content
    wrap.innerHTML = list || wrap.innerHTML;
  })();

  // ---------- Featured Projects (right column) ----------
  (function renderFeaturedProjects() {
    const wrap = $("#featured-projects");
    if (!wrap) return;

    const featured = PROJECTS.filter((p) => !!p.featured).slice(0, 2);
    if (!featured.length && PROJECTS.length === 0) {
      wrap.innerHTML = shimmerHTML(3);
      return;
    }
    const src = (featured.length ? featured : PROJECTS.slice(0, 2))
      .map((p) => {
        const href = hrefFor(p);
        const extAttrs = isExternal(href) ? ` target="_blank" rel="noopener"` : "";
        const status = esc(p.status);
        const type = esc(p.type);
        const desc = esc(p.description || "");
        return `
          <a class="card" href="${href}"${extAttrs}>
            <div class="mcb-card-top" style="display:flex;justify-content:space-between;align-items:center">
              <span class="status" style="font-family:'IBM Plex Mono',monospace;font-size:.8rem">${status}</span>
              <span class="mcb-meta" style="color:var(--muted);font-size:.85rem">${type}</span>
            </div>
            <h4 class="mcb-card-title" style="margin:.4rem 0 .3rem">${esc(p.title)}</h4>
            <p class="mcb-card-desc" style="color:var(--muted)">${desc}</p>
          </a>
        `;
      })
      .join("");
    wrap.innerHTML = src;
  })();
})();
