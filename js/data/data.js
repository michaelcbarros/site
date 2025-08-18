// data/data.js
// Edit these arrays to control what shows on the homepage.

window.SITE_DATA = {
  taglines: [
    "Exploring how culture becomes a site of religious experience.",
    "Religion, imagination, and popular culture.",
    "Where myth and meaning surface in games, film, and fiction."
  ],

  essays: [
    {
      id: "zelda-myth",
      title: "Zelda as Mythopoesis",
      thesis: "On narrative, symbol, and play as meaning-making.",
      category: "Games",
      reading_time: 12,
      published_date: "2024-11-01",
      featured: true,
      url: "essays/zelda-myth.html"   // individual page (create later)
    },
    {
      id: "pkd-theology",
      title: "Philip K. Dick’s Theological Imagination",
      thesis: "Time, agency, and revelation in speculative fiction.",
      category: "Sci-Fi",
      reading_time: 14,
      published_date: "2025-01-05",
      featured: true,
      url: "essays/pkd-theology.html"
    },
    {
      id: "simulation-sacrament",
      title: "Simulation vs. Sacrament",
      thesis: "Authenticity and presence in digital culture.",
      category: "Theory",
      reading_time: 15,
      published_date: "2024-12-10",
      featured: true,
      url: "essays/simulation-sacrament.html"
    }
  ],

  projects: [
    {
      id: "book-zelda",
      title: "Zelda & Religion",
      description: "Ritual, time, and meaning in interactive worlds.",
      status: "Active",           // or "Paused" / "Complete"
      type: "Book",
      featured: true,
      url: "#"                    // replace when you have a page
    },
    {
      id: "book-pkd",
      title: "The Theology of Philip K. Dick",
      description: "Metaphysics, agency, and revelation.",
      status: "Active",
      type: "Book",
      featured: true,
      url: "#"
    },
    {
      id: "chardin-dick",
      title: "Chardin / Dick Monograph (Proposed)",
      description: "Eschatology reimagined through speculative fiction.",
      status: "Proposed",
      type: "Book",
      featured: true,
      url: "#"
    }
  ]
};

