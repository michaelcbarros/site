(() => {
  const getProjects = () =>
    (window.SITE_DATA && Array.isArray(window.SITE_DATA.projects) && window.SITE_DATA.projects.slice()) || [];

  const sortProjects = (list) =>
    list
      .slice()
      .sort((a, b) => {
        if (a.hero && !b.hero) return -1;
        if (b.hero && !a.hero) return 1;
        return (a.title || "").localeCompare(b.title || "");
      });

  const escapeHtml = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  function renderProjectsPreview(containerId, options = {}) {
    const limit = Number(options.limit) || 5;
    const container = document.getElementById(containerId);
    const projects = sortProjects(getProjects()).slice(0, limit);
    if (!container) return;

    container.innerHTML = projects
      .map(
        (p) => `
      <article class="project-item project-item--preview" data-accent="${escapeHtml(p.accent || "")}">
        <a class="project-item__header" href="./projects.html#${escapeHtml(p.id)}">
          <span class="project-item__type">${escapeHtml((p.type || "").toUpperCase())}</span>
          <span class="project-item__title">${escapeHtml(p.title || "")}</span>
          <span class="project-item__chevron" aria-hidden="true"></span>
        </a>
      </article>
    `
      )
      .join("");
  }

  function renderProjectsDirectory(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pills = Array.from(document.querySelectorAll(options.pillSelector || ".pillbar .pill"));
    let activeField = "all";
    let openProjectId = null;

    const projects = sortProjects(getProjects());
    console.log("Projects loaded:", projects.length);

    const findById = (id) => projects.find((p) => p.id === id);

    function visible() {
      return activeField === "all" ? projects : projects.filter((p) => p.field === activeField);
    }

    function render() {
      console.log("Active field:", activeField);
      console.log("Open project:", openProjectId);

      container.innerHTML = visible()
        .map((p) => {
          const isOpen = openProjectId === p.id;
          const links =
            Array.isArray(p.links) && p.links.length
              ? `<div class="project-item__links">${p.links
                  .map(
                    (l) =>
                      `<a href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`
                  )
                  .join(" · ")}</div>`
              : "";

          return `
        <article class="project-item project-item--directory${p.hero ? " is-hero" : ""}${isOpen ? " is-open" : ""}" data-accent="${escapeHtml(
            p.accent || ""
          )}" data-id="${escapeHtml(p.id)}">
          <button class="project-item__header" type="button" aria-expanded="${isOpen ? "true" : "false"}">
            <span class="project-item__type">${escapeHtml((p.type || "").toUpperCase())}</span>
            <span class="project-item__title">${escapeHtml(p.title || "")}</span>
            <span class="project-item__chevron" aria-hidden="true"></span>
          </button>
          <div class="project-item__body">
            <p class="summary">${escapeHtml(p.summary || "")}</p>
            <p class="status"><strong>Current status:</strong> ${escapeHtml(p.status || "")}</p>
            ${links}
          </div>
        </article>
      `;
        })
        .join("");
    }

    function toggle(id) {
      openProjectId = openProjectId === id ? null : id;
      render();
    }

    container.addEventListener("click", (e) => {
      const header = e.target.closest(".project-item__header");
      if (!header) return;
      const item = header.closest(".project-item");
      if (!item) return;
      toggle(item.dataset.id);
    });

    container.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const header = e.target.closest(".project-item__header");
      if (!header) return;
      e.preventDefault();
      const item = header.closest(".project-item");
      if (!item) return;
      toggle(item.dataset.id);
    });

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const nextField = pill.dataset.field || "all";
        activeField = nextField;
        openProjectId = null;
        pills.forEach((p) => {
          const isActive = p === pill;
          p.classList.toggle("pill--active", isActive);
          p.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        render();
      });
    });

    function applyHashOpen() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const match = findById(hash);
      if (match) {
        activeField = match.field || "all";
        openProjectId = match.id;
        pills.forEach((p) => {
          const isActive = p.dataset.field === activeField;
          p.classList.toggle("pill--active", isActive);
          p.setAttribute("aria-selected", isActive ? "true" : "false");
        });
      }
    }

    applyHashOpen();
    render();
  }

  window.renderProjectsPreview = renderProjectsPreview;
  window.renderProjectsDirectory = renderProjectsDirectory;
})();
