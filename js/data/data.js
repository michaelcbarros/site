/* js/data/data.js
   Central, declarative data model for the site.
   - Primary:    window.SITE_DATA (preferred)
   - Legacy:     window.BOOKS, window.PROJECTS, window.SUBSTACK_POSTS (for older scripts)
   Keep URLs **relative** so Pages works under a project baseurl.
*/
(function () {
  // ---------- Links / globals ----------
  const LINKS = {
    blog: "https://mythonoesis.substack.com/",
    research: "https://www.researchgate.net/profile/Michael-Barros-2",
    contact: "barrostheology@gmail.com"
  };

  // ---------- Taglines (homepage rotator) ----------
  const TAGLINES = [
    "Where myth and meaning surface in games, film, and fiction.",
    "Exploring how culture becomes a site of religious experience.",
    "Religion, imagination, and popular culture."
  ];

  // ---------- Books ----------
  const BOOKS = [
    {
      id: "pkd-theology",
      title: "The Theology of Philip K. Dick",
      featured: true,                       // homepage & books hero will pick this one
      status: "Published",
      cover: "./assets/images/books/pkd.jpg", // <-- path is project-relative (no leading slash)
      url: "./books.html#pkd-theology",
      summary:
        "A scholarly collection on Philip K. Dick’s mystical experiences and esoteric Christian gnosis.",
      description:
        "This volume collects chapters written to commemorate the 50th anniversary of Philip K. Dick's transformative 1974 mystical experiences, through which he ultimately contextualized his influential and posthumously much-adapted science-fiction and speculative fiction. Contributing authors here examine the enduring significance of Philip K. Dick and his work, drawing on diverse scholarly perspectives that engage seriously with his self-understanding as Christian, gnostic, mystic, and theologian. Including contextual introduction and overviews, individual chapters focusing on specific works of PKD (as well as some of their adaptations), critical analysis, and examination of their significance within the life and worldview of PKD and his milieu, this collection continues foundational work that has characterized PKD's contributions to science fiction and speculative fiction as significant to its increasingly gnostic trajectory, as well as opening new avenues of exploration that situates PKD's impact within the broader appeal of esoteric worldviews as they have continued to propagate through the counterculture into the mainstream. PKD's commitment and dedication to Christian belief, faith, and practice, as well as Christian gnosis and mystical experience, are foci of particular interest, and this volume challenges the frequent misconception of PKD as exclusively relevant to Gnostic counter-cultural mysticism. Instead, his esoteric Christian gnosis is identified and analyzed as the basis of his ultimately moral and consistently humanistic theology.",
      buy_links: [
        { label: "Buy on Amazon", url: "https://amzn.to/46Fn12N" }
      ],
      reviews: [
        {
          quote:
            "Philip K. Dick has had a fantastic impact on American science fiction, film, and television. Here, however, we find a sci-fi master that is not generally known: the gnostic author who is inspired by his own direct mystical experience of some cosmic mind but who had long been involved in intensely religious questions about death, free will, capitalism, colonialism, and the end of all things (and people). Here is a stunningly honest interpretation of God (and Satan) that is superhuman, that is, fully human and historical, even rogue, but also transcendent to any local society or personalized ego. Here is a 'gospel' about our doubled identity coming from the future.",
          source:
            "Jeffrey J. Kripal, author of How to Think Impossibly: About Souls, UFOs, Time, Belief, and Everything Else"
        }
      ]
    }
    // Add more books here later
  ];

  // ---------- Projects (Waypoint, works-in-progress, collaborations) ----------
  const PROJECTS = [
    {
      id: "waypoint",
      title: "Waypoint Institute",
      status: "Lab",
      type: "Collaboration",
      tags: ["Collaboration", "Institute"],
      short: "Research & publishing initiative.",
      description: "A space for myth, meaning, and media praxis.",
      url: "./projects.html#waypoint",
      external: false
    },
    {
      id: "pkd-theology-proj",
      title: "Theology of Philip K. Dick",
      status: "Forthcoming",
      type: "Book",
      tags: ["PKD", "Editing"],
      short: "Edited volume of essays.",
      description:
        "Commemorating 50 years since PKD’s 1974 experiences; theological and cultural analysis.",
      url: "./books.html#pkd-theology",
      external: false
    },
    {
      id: "zelda-religion",
      title: "Zelda & Religion",
      status: "In Progress",
      type: "Book",
      tags: ["Games", "Myth"],
      short: "Time, sacrifice, and mythopoesis in Zelda.",
      url: "./books.html#zelda-religion",
      external: false
    }
  ];

  // ---------- Substack (homepage & projects feed) ----------
  const SUBSTACK_HOME = "https://mythonoesis.substack.com/";
  const SUBSTACK_POSTS = [
    {
      title:
        "Disney Adults Want God, but May Settle for Simulation",
      url: "https://open.substack.com/pub/mythonoesis/p/disney-adults-want-god-but-may-settle?r=5opgoc&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false",
      summary:
        "A Baudrillardian reflection on Natasha Burge's 'Disney Adults Just Want God'.",
      date: "2025-05-20"
    },
    {
      title: "Tolkien, Freud, and the Source of Story",
      url: "https://open.substack.com/pub/mythonoesis/p/is-tolkiens-private-stock-just-freuds?r=5opgoc&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false",
      summary:
        "A long discussion on a short exchange in the 1962 BBC interview.",
      date: "2025-05-13"
    },
    {
      title: "Example: Film, Ritual, Memory",
      url: "https://YOUR-SUBSTACK-URL/p/example-post-3",
      summary: "Cinema as a vessel of communal meaning.",
      date: "2025-05-10"
    }
  ];

  // ---------- Optional: Featured writing (leave empty if using ResearchGate) ----------
  const ESSAYS = [
    // example shape shown for future use
    // {
    //   id: "sacred-time-hyrule",
    //   title: "Sacred Time in Hyrule",
    //   date: "2025-09-01",
    //   thesis: "Divine causality and temporal logic across Ocarina & Majora.",
    //   summary: "Divine causality and temporal logic across Ocarina & Majora.",
    //   tags: ["Games","Theology"],
    //   url: null,                // null => opens modal reader if content present
    //   content: "<p>Full HTML content here…</p>",
    //   featured: true
    // }
  ];

  // ---------- Optional: Reading list (Books page) ----------
  const READING = [
    // { title: "How to Think Impossibly", author: "Jeffrey J. Kripal", cover: "./assets/images/reading/kripal.jpg", link: "https://amzn.to/..." }
  ];

  // ---------- Assemble primary model ----------
  window.SITE_DATA = {
    taglines: TAGLINES,
    links: LINKS,

    // primary collections
    books: BOOKS,
    projects: PROJECTS,

    // optional feeds/sections
    substack: {
      url: SUBSTACK_HOME,
      posts: SUBSTACK_POSTS
    },
    essays: ESSAYS,
    reading: READING
  };

  // ---------- Legacy globals for older scripts (safe to keep) ----------
  window.LINKS = LINKS;
  window.SUBSTACK_HOME = SUBSTACK_HOME;
  window.SUBSTACK_POSTS = SUBSTACK_POSTS;
  window.BOOKS = BOOKS;
  window.PROJECTS = PROJECTS;
  window.ESSAYS = ESSAYS;
  window.READING = READING;
})();
