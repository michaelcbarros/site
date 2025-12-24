(() => {
  const grid = document.getElementById("projects-grid");
  const pills = Array.from(document.querySelectorAll(".pillbar .pill"));

  if (!grid) return;

  function getProjects() {
    // Adjust this to match your data.js shape.
    // Common possibilities:
    // - window.SITE_DATA.projects
    // - window.DATA.projects
    // - window.projects
    const d = window.SITE_DATA || window.DATA || window;
    return (d.projects || (d.SITE_DATA && d.SITE_DATA.projects) || []);
  }

  const projects = getProjects();

  // Map your fields to user-facing group labels
  // Each project should have `field` matching one of these keys.
  const FIELD_LABELS = {
    "religion-culture": "Religion & Culture",
    "csr": "Cognitive Science of Religion",
    "publishing": "Publishing & Editorial",
    "all": "All"
  };

  let activeField = "all";
  let openId = null;

  function setActivePill(field) {
    pills.forEach(btn => {
      const isActive = btn.dataset.field === field;
      btn.classList.toggle("pill--active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function filteredProjects() {
    if (activeField === "all") return projects;
    return projects.filter(p => p.field === activeField);
  }

  function escapeHtml(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function render() {
    const list = filteredProjects();

    // If you want Waypoint to remain a “hero” when visible:
    // add is-hero if p.slug/id matches waypoint.
    const html = list.map(p => {
      const id = p.id || p.slug || p.title;
      const isOpen = openId === id;
      const accent = p.accent || ""; // gold/green/violet/blue
      const tag = p.tag || p.type || "Project";
      const fieldLabel = FIELD_LABELS[p.field] || "";

      const hero = p.hero ? " is-hero" : "";
      const open = isOpen ? " is-open" : "";

      const status = p.status ? `<div class="project-meta"><strong>Current status:</strong> ${escapeHtml(p.status)}</div>` : "";
      const summary = p.summary ? `<p>${escapeHtml(p.summary)}</p>` : "";
      const links = (p.links && p.links.length)
        ? `<div class="project-links">${
            p.links.map(l => `<a href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join(" · ")
          }</div>`
        : "";

      return `
        <article class="project-card${hero}${open}" role="listitem" data-id="${escapeHtml(id)}" data-accent="${escapeHtml(accent)}">
          <div class="project-card__header" role="button" tabindex="0" aria-expanded="${isOpen ? "true" : "false"}">
            <div class="project-card__topline">
              <span class="project-card__tag">${escapeHtml(tag)}${fieldLabel ? ` · ${escapeHtml(fieldLabel)}` : ""}</span>
              <span class="project-card__chevron" aria-hidden="true"></span>
            </div>
            <h3 class="project-card__title">${escapeHtml(p.title || "")}</h3>
          </div>
          <div class="project-card__body">
            ${summary}
            ${status}
            ${links}
          </div>
        </article>
      `;
    }).join("");

    grid.innerHTML = html || `<p class="section-intro">No projects in this category yet.</p>`;
  }

  function closeAll() {
    openId = null;
    render();
  }

  function toggleCardById(id) {
    // Accordion semantics within current field:
    // - click closed card -> open it (and close others)
    // - click open card -> close it
    openId = (openId === id) ? null : id;
    render();
  }

  function onCardActivate(el) {
    const id = el.getAttribute("data-id");
    if (!id) return;
    toggleCardById(id);
  }

  // Event delegation for clicks + keyboard activation
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    onCardActivate(card);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const header = e.target.closest(".project-card__header");
    if (!header) return;
    e.preventDefault();
    const card = header.closest(".project-card");
    if (card) onCardActivate(card);
  });

  // Pill bar
  pills.forEach(btn => {
    btn.addEventListener("click", () => {
      activeField = btn.dataset.field || "all";
      openId = null; // reset accordion on filter change
      setActivePill(activeField);
      render();
    });
  });

  // Initial
  setActivePill(activeField);
  render();
})();
