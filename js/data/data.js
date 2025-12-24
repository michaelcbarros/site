/* js/data/data.js
   Central, declarative data model for the site.
   - Primary:    window.SITE_DATA (preferred)
   - Legacy:     window.BOOKS, window.PROJECTS (for older scripts)
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

    "Scholar of religion & culture and researcher in the cognitive science of religion exploring dreams, ritual, and imagination in media.",
    "Analysing contemporary storytelling through theological and cultural history with cognitive science of religion methods.",
    "Grounded cognition, sacred imagination, and popular culture across religion & culture scholarship."
   ];
 
   // ---------- Books ----------
   const BOOKS = [
     {
       id: "pkd-theology",
       title: "The Esoteric Theology of Philip K. Dick",
       featured: true,                       // homepage & books hero will pick this one
       status: "Forthcoming",
       cover: "./assets/images/books/pkd.jpg", // project-relative (no leading slash)
       url: "./books.html#pkd-theology",
       summary:
         "Edited scholarly volume (Bloomsbury, 2025) examining Philip K. Dick's theological imagination across literature and adaptation.",
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
      field: "religion-culture",
      type: "Institute",
      summary:
        "A supporter-funded, tuition-free initiative focused on Scripture, doctrine, culture, and mission through modular checkpoints and oral capstones.",
      status:
        "Completed first development phase and initial beta testing; incorporating feedback ahead of a second beta cohort. Targeting full launch in 2026.",
      accent: "blue",
      hero: true
    },
    {
      id: "zelda",
      title: "The Legend of Zelda and Religion",
      field: "religion-culture",
      type: "Book",
      summary:
        "An edited volume exploring how religious meaning in The Legend of Zelda emerges from in-world mechanics, symbols, and sacred play.",
      status: "Edited volume in development.",
      accent: "green"
    },
    {
      id: "omega-point",
      title: "The Omega Point of Philip K. Dick",
      field: "publishing",
      type: "Book",
      summary:
        "A monograph examining how Philip K. Dick adapts the theology of Pierre Teilhard de Chardin across his fiction and essays.",
      status:
        "Contract signed (Anti-Oedipus Press). Manuscript due late 2027; publication to follow.",
      accent: "violet",
      links: [
        { label: "Publisher", href: "https://anti-oedipus.com/" }
      ]
    },
    {
      id: "dissertation",
      title: "Formation of Supernatural Agents in Dreams Through Simulation: A Grounded Cognition Perspective",
      field: "csr",
      type: "Dissertation",
      summary:
        "Develops a grounded-cognition model of how dream simulations help people form and sustain concepts of supernatural agents.",
      status: "Chapters 1–2 complete; data analysis underway and Chapter 3 in progress.",
      accent: "gold"
    },
    {
      id: "rse-generation",
      title: "The Generation of Religious and Spiritual Experiences study",
      field: "csr",
      type: "Study",
      summary:
        "Qualitative and computational study extending McNamara’s Tripartite Model to five recurrent domains of religious and spiritual experience.",
      status: "Model drafted, undergoing iterative testing.",
      accent: "blue"
    }
  ];

  // ---------- Substack (homepage & projects feed) ----------
  const SUBSTACK_HOME = "https://mythonoesis.substack.com/";
  const SUBSTACK = {
    url: SUBSTACK_HOME,
    posts: []
  };

  // ---------- Optional: Featured writing (leave empty if using ResearchGate) ----------
  const ESSAYS = [
    // See example shape in earlier messages if you decide to surface curated writing later.
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
    substack: SUBSTACK,
    essays: ESSAYS,
    reading: READING
  };

  // ---------- Legacy globals for older scripts (safe to keep) ----------
  window.LINKS = LINKS;
  window.SUBSTACK_HOME = SUBSTACK_HOME;
  window.SUBSTACK = SUBSTACK;
  window.BOOKS = BOOKS;
  window.PROJECTS = PROJECTS;
  window.ESSAYS = ESSAYS;
  window.READING = READING;
})();
