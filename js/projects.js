(() => {
  const gridId = "projects-grid";
  window.addEventListener("DOMContentLoaded", () => {
    if (typeof window.renderProjectsDirectory === "function") {
      window.renderProjectsDirectory(gridId, { pillSelector: ".pillbar .pill" });
    }
  });
})();
