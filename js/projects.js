(() => {
  /**
   * Data source: window.SITE_DATA.projects
   * Shape: [{ id, title, field, type, accent, summary, status, links?, hero? }]
   */
  const grid = document.getElementById("projects-grid");
  const pills = Array.from(document.querySelectorAll(".pillbar .pill"));
  if (!grid) return;

  const projects =
    (window.SITE_DATA && Array.isArray(window.SITE_DATA.projects) && window.SITE_DATA.projects.slice()) || [];

  let activeField = "all";
  let openProjectId = null;

  console.log("Projects loaded:", projects.length);

  function setActivePill(field) {
    pills.forEach((btn) => {
      const isActive = btn.dataset.field === field;
      btn.classList.toggle("pill--active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function getVisibleProjects() {
    const filtered = activeField === "all" ? projects : projects.filter((p) => p.field === activeField);
    return filtered
      .slice()
      .sort((a, b) => {
        if (a.hero && !b.hero) return -1;
        if (b.hero && !a.hero) return 1;
        return (a.title || "").localeCompare(b.title || "");
      });
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
    console.log("Active field:", activeField);
    console.log("Open project:", openProjectId);

    const html = getVisibleProjects()
      .map((p) => {
        const isOpen = openProjectId === p.id;
        const openClass = isOpen ? " is-open" : "";
        const heroClass = p.hero ? " is-hero" : "";
        const links =
          Array.isArray(p.links) && p.links.length
            ? `<div class="project-row__links">${p.links
                .map(
                  (l) =>
                    `<a href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`
                )
                .join(" · ")}</div>`
            : "";

        return `
      <article class="project-row${openClass}${heroClass}" data-accent="${escapeHtml(p.accent || "")}" data-id="${escapeHtml(
          p.id
        )}">
        <button class="project-row__header" type="button" aria-expanded="${isOpen ? "true" : "false"}">
          <span class="project-row__type">${escapeHtml((p.type || "").toUpperCase())}</span>
          <h3 class="project-row__title">${escapeHtml(p.title || "")}</h3>
          <span class="project-row__chevron" aria-hidden="true"></span>
        </button>
        <div class="project-row__body">
          <p class="summary">${escapeHtml(p.summary || "")}</p>
          <p class="status"><strong>Current status:</strong> ${escapeHtml(p.status || "")}</p>
          ${links}
        </div>
      </article>
    `;
      })
      .join("");

    grid.innerHTML = html || `<p class="section-intro">No projects in this category yet.</p>`;
  }

  function toggleProject(id) {
    openProjectId = openProjectId === id ? null : id;
    render();
  }

  grid.addEventListener("click", (e) => {
    const header = e.target.closest(".project-row__header");
    if (!header) return;
    const card = header.closest(".project-row");
    if (!card) return;
    toggleProject(card.dataset.id);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const header = e.target.closest(".project-row__header");
    if (!header) return;
    e.preventDefault();
    const card = header.closest(".project-row");
    if (!card) return;
    toggleProject(card.dataset.id);
  });

  pills.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextField = btn.dataset.field || "all";
      activeField = nextField;
      openProjectId = null;
      setActivePill(activeField);
      render();
    });
  });

  setActivePill(activeField);
  render();
})();
