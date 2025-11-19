diff --git a/js/data/data.js b/js/data/data.js
index 43fa601c0b13efd56e7927f81872af9242d07db0..b6482347ee5117a0bbc315411eb763b161dc4677 100644
--- a/js/data/data.js
+++ b/js/data/data.js
@@ -1,44 +1,44 @@
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
-    "Scholar of religion & culture exploring dreams, ritual, and imagination in media.",
-    "Analysing contemporary storytelling through theological and cultural history.",
-    "Grounded cognition, sacred imagination, and popular culture."
+    "Scholar of religion & culture and researcher in the cognitive science of religion exploring dreams, ritual, and imagination in media.",
+    "Analysing contemporary storytelling through theological and cultural history with cognitive science of religion methods.",
+    "Grounded cognition, sacred imagination, and popular culture across religion & culture scholarship."
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
      status: "Institute",
      type: "Collaboration",
      tags: ["Education", "Theology", "Great Books"],
      short:
        "Tuition-free Christian education: great-books core, cohort-based, donor-supported.",
      description:
        "Waypoint is a donor-supported, tuition-free Christian education project. We deliver a great-books core in Scripture, classical theology, and the liberal arts through online cohorts, clear syllabi, and a curated public-domain library. The emphasis is formation and rigorous study, with straightforward credit pathways for students who need them—so learners focus on reading, discussion, and service rather than cost or bureaucracy.",
      url: "./projects.html#waypoint",
      external: false
    },
    {
      id: "dissertation",
      title: "Formation of Supernatural Agents in Dreams Through Simulation: A Grounded Cognition Perspective",
      status: "Dissertation",
      type: "Research Study",
      tags: ["Dreams", "Grounded Cognition", "Religion"],
      short:
        "Dream simulation and belief—an embodied, grounded-cognition account.",
      description:
        "My dissertation develops a grounded-cognition model of how dream simulations help people form and sustain concepts of supernatural agents. It operationalizes “simulation richness” (sensorimotor detail, agency, narrative) in dream reports and examines its relationship to religious and paranormal beliefs. The aim is a mechanistic, embodied alternative to simple “agency-detection” explanations in the cognitive science of religion.",
      url: "./projects.html#dissertation",
      external: false
    },
    {
      id: "zelda",
      title: "The Legend of Zelda and Religion",
      status: "Edited Volume",
      type: "Edited Volume",
      tags: ["Games", "Religion", "Edited Volume"],
      short:
        "Zelda as theology—religion emerging from inside the game world.",
      description:
        "An edited volume arguing that religious meaning in The Legend of Zelda arises from within the games themselves—mechanics, spaces, symbols, and narrative time—rather than from imported doctrine. Contributors treat ritual performance, sacred time and place, law and normativity, technology and landscape, player phenomenology, and theological motifs, making the case for games as genuine sites of theological reflection.",
      url: "./projects.html#zelda",
      external: false
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
