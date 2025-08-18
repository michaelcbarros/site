// data/data.js  (append below your existing SITE_DATA)
window.SITE_DATA.books = [
  {
    id: "book-zelda",
    title: "Zelda & Religion",
    description: "Ritual, time, and meaning in interactive worlds.",
    status: "Active",                 // Active | Forthcoming | Complete
    publisher: "",                    // optional
    expected_date: "2026-03-01",      // ISO date; month shown
    url: ""                           // optional detail page or retailer link
  },
  {
    id: "book-pkd",
    title: "The Theology of Philip K. Dick",
    description: "Metaphysics, agency, and revelation.",
    status: "Active",
    publisher: "",
    expected_date: "2026-11-01",
    url: ""
  },
  {
    id: "book-chardin",
    title: "Chardin / Dick (Proposed)",
    description: "Eschatology reimagined through speculative fiction.",
    status: "Forthcoming",
    publisher: "",
    expected_date: "2027-06-01",
    url: ""
  }
  // add past books with status: "Complete", set publisher + expected_date = actual pub date
];
