(() => {
  /**
   * Expected global data source (from js/data/data.js):
   *   window.SITE_DATA.projects = [{ id, title, field, type, summary, status, accent, links?, hero? }]
   */
  const grid = document.getElementById("projects-grid");
  const pills = Array.from(document.querySelectorAll(".pillbar .pill"));

  if (!grid) return;

  const source =
    (window.SITE_DATA && Array.isArray(window.SITE_DATA.projects) && window.SITE_DATA.projects) ||
    (window.DATA && Array.isArray(window.DATA.projects) && window.DATA.projects) ||
    (Array.isArray(window.projects) && window.projects) ||
    [];

  const projects = source.slice(); // shallow copy to prevent accidental mutation
  console.log("projects.js loaded", projects.length);

  const FIELD_LABELS = {
    "religion-culture": "Religion & Culture",
    csr: "Cognitive Science of Religion",
    publishing: "Publishing & Editorial",
    all: "All"
  };

  let activeField = "all";
  let openId = null;

  function setActivePill(field) {
    pills.forEach((btn) => {
      const isActive = btn.dataset.field === field;
      btn.classList.toggle("pill--active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function filteredProjects() {
    if (activeField === "all") return projects;
    return projects.filter((p) => p.field === activeField);
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
    console.log("activeField", activeField, "openId", openId);
    const list = filteredProjects();

    const html = list
      .map((p) => {
        const id = p.id || p.slug || p.title;
        const isOpen = openId === id;
        const accent = p.accent || "";
        const tag = p.type || "Project";
        const fieldLabel = FIELD_LABELS[p.field] || "";

        const hero = p.hero ? " is-hero" : "";
        const open = isOpen ? " is-open" : "";

        const status = p.status
          ? `<div class="project-meta"><strong>Current status:</strong> ${escapeHtml(p.status)}</div>`
          : "";
        const summary = p.summary ? `<p>${escapeHtml(p.summary)}</p>` : "";
        const links =
          p.links && p.links.length
            ? `<div class="project-links">${p.links
                .map(
                  (l) =>
                    `<a href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`
                )
                .join(" · ")}</div>`
            : "";

        return `
        <article class="project-card${hero}${open}" data-id="${escapeHtml(
          id
        )}" data-accent="${escapeHtml(accent)}">
          <div class="project-card__header" role="button" tabindex="0" aria-expanded="${
            isOpen ? "true" : "false"
          }">
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
      })
      .join("");

    grid.innerHTML = html || `<p class="section-intro">No projects in this category yet.</p>`;
  }

  function toggleCardById(id) {
    openId = openId === id ? null : id;
    render();
  }

  function onCardActivate(target) {
    const header = target.closest(".project-card__header");
    if (!header) return;
    const card = header.closest(".project-card");
    if (!card) return;
    const id = card.getAttribute("data-id");
    if (!id) return;
    toggleCardById(id);
  }

  grid.addEventListener("click", (e) => {
    onCardActivate(e.target);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    onCardActivate(e.target);
    e.preventDefault();
  });

  pills.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextField = btn.dataset.field || "all";
      if (nextField === activeField) return;
      activeField = nextField;
      openId = null;
      setActivePill(activeField);
      render();
    });
  });

  setActivePill(activeField);
  render();
})();
