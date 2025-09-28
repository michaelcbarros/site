// js/projects.js
(function () {
  "use strict";

  // ----- Links from data.js for nav -----
  const LINKS =
    (window.SITE_DATA && window.SITE_DATA.links) ||
    window.LINKS || {
      blog: "https://mythonoesis.substack.com/",
      research: "https://www.researchgate.net/",
    };

  const blogA = document.getElementById("nav-blog");
  const resA = document.getElementById("nav-research");
  if (blogA) blogA.href = LINKS.blog;
  if (resA) resA.href = LINKS.research;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ----- Utilities -----
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const slugify = (s) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  const fmt = (iso) => {
    try {
      return new Date(iso).toISOString().slice(0, 10);
    } catch {
      return "";
    }
  };

  // ----- Data normalization -----
  function getProjects() {
    const D = window.SITE_DATA || {};
    let list = Array.isArray(D.projects) ? D.projects.slice() : window.PROJECTS || [];
    return list.map((p) => ({
      id: p.id || slugify(p.title || ""),
      title: p.title || "Untitled project",
      status: p.status || p.type || "Project", // badge
      type: p.type || "",
      tags: Array.isArray(p.tags)
        ? p.tags
        : p.tags
        ? String(p.tags)
            .split(",")
            .map((t) => t.trim())
        : [],
      date: p.date || p.started || "",
      short: p.short || p.summary || "",
      description: p.description || "",
      url: p.url || null,
      external: !!p.external,
    }));
  }

  // ----- Filters + Search -----
  function buildFilters(items) {
    const filters = $("#filters");
    if (!filters) return;
    const kinds = new Set(["All"]);
    items.forEach((p) => {
      if (p.status) kinds.add(p.status);
      if (p.type) kinds.add(p.type);
    });
    filters.innerHTML = "";
    [...kinds].forEach((k, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "filter-btn" + (i === 0 ? " active" : "");
      b.dataset.k = k;
      b.textContent = k;
      filters.appendChild(b);
    });
  }

  function renderGrid(items, { k = "All", q = "" } = {}) {
    const grid = $("#projects-grid");
    const empty = $("#empty");
    if (!grid) return;

    const ql = q.trim().toLowerCase();
    const filtered = items.filter((p) => {
      const inKind = k === "All" || p.status === k || p.type === k;
      const inSearch =
        !ql ||
        [p.title, p.short, p.description, p.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(ql);
      return inKind && inSearch;
    });

    if (!filtered.length) {
      grid.innerHTML = "";
      if (empty) empty.style.display = "block";
      return;
    } else if (empty) empty.style.display = "none";

    grid.innerHTML = "";
    filtered.forEach((p) => {
      // Flip card if we have a back description; otherwise standard card
      if (p.description) {
        const c = document.createElement("div");
        c.className = "flip";
        c.innerHTML = `
          <a class="flip-inner" href="${p.url || "#"}" ${p.external ? 'target
