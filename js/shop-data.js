/**
 * NOTES WALLAH — SHOP DATA
 * Curated student study materials, merchandise, stationery and accessories.
 * Marketplace referral model (Flipkart, Amazon, Meesho, Official Store)
 * STRICT RULE: No prices, no buy buttons, referral links only.
 */

const SHOP_CATEGORIES = [
  { id: "all", name: "All", icon: "fa-solid fa-border-all" },
  { id: "books", name: "Books", icon: "fa-solid fa-book-open" },
  { id: "tshirts", name: "T-Shirts", icon: "fa-solid fa-shirt" },
  { id: "mugs", name: "Cups & Mugs", icon: "fa-solid fa-mug-hot" },
  { id: "stationery", name: "Stationery", icon: "fa-solid fa-pen-ruler" },
  { id: "accessories", name: "Accessories", icon: "fa-solid fa-backpack" }
];

const SHOP_PRODUCTS = [
  {
    id: "p1",
    name: "NCERT Science Class 10 Notes",
    category: "books",
    categoryLabel: "Books & Notes",
    description: "Chapter-wise concise handwritten summary sheets covering Physics, Chemistry, and Biology. Packed with formula cheat sheets, ray diagrams, and board exam tips.",
    imageUrl: "",
    icon: "fa-solid fa-book-bookmark",
    iconBg: "#2B6DEF",
    isFeatured: true,
    flipkartUrl: "https://www.flipkart.com",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "",
    otherStoreName: "",
    otherStoreUrl: ""
  },
  {
    id: "p2",
    name: "Notes Wallah Study Tee",
    category: "tshirts",
    categoryLabel: "Apparel",
    description: "Premium breathable 100% combed cotton t-shirt designed for marathon late-night study sessions. Minimalist chest emblem and motivational typography.",
    imageUrl: "",
    icon: "fa-solid fa-shirt",
    iconBg: "#1D4ED8",
    isFeatured: false,
    flipkartUrl: "",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "https://www.meesho.com",
    otherStoreName: "Official Store",
    otherStoreUrl: "https://noteswallah.in/store/tee"
  },
  {
    id: "p3",
    name: "Maths Board Formula Handbook",
    category: "books",
    categoryLabel: "Formula Book",
    description: "Pocket handbook containing all Class 10 NCERT theorems, geometric proofs, trigonometric identities, coordinate formulas, and solved previous year questions.",
    imageUrl: "",
    icon: "fa-solid fa-square-root-variable",
    iconBg: "#FF8A00",
    isFeatured: true,
    flipkartUrl: "https://www.flipkart.com",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "https://www.meesho.com",
    otherStoreName: "",
    otherStoreUrl: ""
  },
  {
    id: "p4",
    name: "Focus & Hustle Ceramic Mug",
    category: "mugs",
    categoryLabel: "Drinkware",
    description: "Matte-finish 350ml ceramic coffee and chai mug with heat-resistant ergonomic grip and inspirational study quote. Microwave and dishwasher safe.",
    imageUrl: "",
    icon: "fa-solid fa-mug-hot",
    iconBg: "#7C3AED",
    isFeatured: false,
    flipkartUrl: "",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "https://www.meesho.com",
    otherStoreName: "",
    otherStoreUrl: ""
  },
  {
    id: "p5",
    name: "Exam Prep Highlighting Kit",
    category: "stationery",
    categoryLabel: "Stationery",
    description: "Pack of 6 pastel quick-dry dual-tip chisel highlighters and fine liners. Does not bleed through standard NCERT textbook paper.",
    imageUrl: "",
    icon: "fa-solid fa-highlighter",
    iconBg: "#10B981",
    isFeatured: false,
    flipkartUrl: "https://www.flipkart.com",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "",
    otherStoreName: "Official Store",
    otherStoreUrl: "https://noteswallah.in/store/highlighters"
  },
  {
    id: "p6",
    name: "Notes Wallah Spiral Study Journal",
    category: "stationery",
    categoryLabel: "Notebooks",
    description: "160-page A5 wirebound study planner with 90 GSM natural shade paper, daily goal checklist, revision habit tracker, and perforated tear-off formula sheets.",
    imageUrl: "",
    icon: "fa-solid fa-book",
    iconBg: "#059669",
    isFeatured: true,
    flipkartUrl: "https://www.flipkart.com",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "https://www.meesho.com",
    otherStoreName: "",
    otherStoreUrl: ""
  },
  {
    id: "p7",
    name: "Motivation Study Badge & Pin Set",
    category: "accessories",
    categoryLabel: "Accessories",
    description: "Set of 5 enamel lapel pins and metallic badges with student affirmations ('Future Topper', 'Keep Grinding', 'Notes Wallah Elite') for backpacks and jackets.",
    imageUrl: "",
    icon: "fa-solid fa-certificate",
    iconBg: "#EA580C",
    isFeatured: false,
    flipkartUrl: "",
    amazonUrl: "",
    meeshoUrl: "https://www.meesho.com",
    otherStoreName: "Official Store",
    otherStoreUrl: "https://noteswallah.in/store/pins"
  },
  {
    id: "p8",
    name: "Insulated Stainless Steel Desk Flask",
    category: "accessories",
    categoryLabel: "Study Gear",
    description: "750ml double-walled vacuum insulated water bottle keeping liquids cold for 24h or hot for 12h. Leak-proof flip spout with matte powder coat grip.",
    imageUrl: "",
    icon: "fa-solid fa-bottle-water",
    iconBg: "#0284C7",
    isFeatured: false,
    flipkartUrl: "https://www.flipkart.com",
    amazonUrl: "https://www.amazon.in",
    meeshoUrl: "",
    otherStoreName: "",
    otherStoreUrl: ""
  }
];

function getProductById(productId) {
  return SHOP_PRODUCTS.find(p => p.id === productId) || null;
}
