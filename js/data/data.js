// js/data/data.js
// One file to feed the whole site. Backward compatible with old globals.

// ---------- Helpers ----------
(function () {
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const slugify = (s) =>
    String(s || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // ---------- Legacy globals (preserve your current shape) ----------
  // Substack
  window.SUBSTACK_HOME = window.SUBSTACK_HOME || "https://mythonoesis.substack.com/";
  window.SUBSTACK_POSTS = window.SUBSTACK_POSTS || [
    {
      title: "Tolkien, Freud, and the Source of Story",
      url: "https://open.substack.com/pub/mythonoesis/p/is-tolkiens-private-stock-just-freuds?r=5opgoc&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false",
      summary: "A long discussion on a short exchange in the 1962 BBC interview.",
      date: "2025-05-13",
    },
    {
      title: "Disney Adults Want God, but May Settle for Simulation",
      url: "https://open.substack.com/pub/mythonoesis/p/disney-adults-want-god-but-may-settle?r=5opgoc&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false",
      summary: "A Baudrillardian reflection on Natasha Burge's 'Disney Adults Just Want God'",
      date: "2025-05-20",
    },
    {
      title: "Example: Film, Ritual, Memory",
      url: "https://YOUR-SUBSTACK-URL/p/example-post-3",
      summary: "Cinema as a vessel of communal meaning.",
      date: "2025-05-10",
    },
  ];

  // Essays
  window.ESSAYS = (window.ESSAYS || [
    {
      id: "zelda-paradigm",
      title: "The Zelda Paradigm",
      thesis: "Video games as contemporary myth-making.",
      category: "Games",
      reading_time: 12,
      published_date: "2025-04-18",
      content: "<p>Full HTML content goes here. You can paste formatted HTML.</p>",
    },
    {
      id: "simulation-sacrament",
      title: "Simulation vs. Sacrament",
      thesis: "Virtual experience vs. authentic encounter.",
      category: "Theory",
      reading_time: 15,
      published_date: "2025-03-02",
      content: "<p>Another essay’s content…</p>",
    },
  ]).map((e) => ({
    // normalize & keep legacy fields
    id: e.id || slugify(e.title),
    slug: e.slug || e.id || slugify(e.title),
    title: e.title || "Untitled",
    thesis: e.thesis || e.summary || "",
    category: e.category || "Essay",
    tags: Array.isArray(e.tags) ? e.tags : [e.category || "Essay"],
    reading_time: e.reading_time || null,
    published_date: e.published_date || e.date || "",
    url: e.url || null, // if set (external), readers will link out
    content: e.content || "",
    featured: !!e.featured, // opt-in; set true on a few to pin on home/essays
  }));

  // Books
  window.BOOKS = (window.BOOKS || [
    {
      id: "zelda-religion",
      title: "Zelda & Religion",
      status: "Active",
      description: "A monograph on time, sacrifice, and mythopoesis in The Legend of Zelda.",
      publisher: "",
      expected_date: "2026-05-01",
    },
    {
      id: "pkd-theology",
      title: "The Theology of Philip K. Dick",
      status: "Forthcoming",
      description: "Dick’s metaphysics, eschatology, and religious imagination.",
      publisher: "",
      expected_date: "2027-01-01",
    },
    {
      id: "chardin-dick",
      title: "Teilhard & Dick: Omega and Time",
      status: "Complete",
      description: "Dialogue between Teilhard’s eschatology and PKD’s metaphysics of time.",
      publisher: "",
      expected_date: "2024-10-01",
    },
  ]).map((b) => ({
    id: b.id || slugify(b.title),
    slug: b.slug || b.id || slugify(b.title),
    title: b.title || "Untitled",
    status: b.status || "In Progress",
    publisher: b.publisher || "",
    description: b.description || "",
    summary: b.summary || b.description || "",
    expected_date: b.expected_date || "",
    url: b.url || null, // set to external project page if you have one
    featured: !!b.featured, // set true to pin on home
  }));

  // ---------- Unified shape consumed by new scripts ----------
  window.SITE_DATA = {
    // Hero rotating taglines (optional)
    taglines: window.SITE_DATA?.taglines || [
      "Exploring how culture becomes a site of religious experience.",
      "Religion, imagination, and popular culture.",
      "Where myth and meaning surface in games, film, and fiction.",
    ],

    // Substack block
    substack: {
      url: window.SUBSTACK_HOME,
      posts: window.SUBSTACK_POSTS.map((p) => ({
        title: p.title || "Untitled",
        url: p.url,
        date: p.date || "",
        summary: p.summary || "",
      })),
    },

    // Essays (normalized)
    essays: window.ESSAYS.map((e) => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      date: e.published_date || "",
      summary: e.thesis || "",
      thesis: e.thesis || "",
      content: e.content || "",
      url: e.url || null,
      category: e.category || "Essay",
      tags: Array.isArray(e.tags) ? e.tags : [e.category || "Essay"],
      reading_time: e.reading_time || null,
      featured: !!e.featured,
      type: "Essay",
    })),

    // Books / Projects
    books: window.BOOKS.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      status: b.status,
      publisher: b.publisher,
      summary: b.summary || b.description || "",
      description: b.description || "",
      expected_date: b.expected_date || "",
      url: b.url || null,
      featured: !!b.featured,
      type: "Book",
    })),

    // (Optional) Media collection — add items here when you have them
    media: window.SITE_DATA?.media || [
      // Example:
      // {
      //   title: "Interview on Game & Myth Podcast",
      //   date: "2025-09-10",
      //   summary: "On religion in video games and sacred time.",
      //   external_url: "https://podcast.example/episode",
      //   featured: true,
      //   type: "Media"
      // }
    ],
  };

  // You can add `featured: true` to any essay/book/media item to pin it
  // to the “Featured” grids on the homepage and essays page.

  // Optional: sort normalized lists newest-first where helpful
  window.SITE_DATA.essays.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  window.SITE_DATA.media.sort((a, b) => String(b.date).localeCompare(String(a.date)));
})();
