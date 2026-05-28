// Curated, high-resolution stock imagery (Pexels CDN - reliable direct links)
// All URLs use compression + crop parameters for consistent HD delivery.

export const IMG = {
  // Hero / Exterior
  heroPalace:
    "https://images.pexels.com/photos/33726142/pexels-photo-33726142.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  heroTaj:
    "https://images.pexels.com/photos/29396983/pexels-photo-29396983.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  heroFacade:
    "https://images.pexels.com/photos/30619805/pexels-photo-30619805.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",

  // Lobby
  lobby1:
    "https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  lobby2:
    "https://images.pexels.com/photos/14036253/pexels-photo-14036253.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  lobbyStairs:
    "https://images.pexels.com/photos/3926482/pexels-photo-3926482.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  lobbyOrnate:
    "https://images.pexels.com/photos/29058903/pexels-photo-29058903.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",

  // Rooms / Suites
  room1:
    "https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  room2:
    "https://images.pexels.com/photos/35868592/pexels-photo-35868592.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  room3:
    "https://images.pexels.com/photos/7722153/pexels-photo-7722153.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  room4:
    "https://images.pexels.com/photos/28247932/pexels-photo-28247932.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  room5:
    "https://images.pexels.com/photos/6466236/pexels-photo-6466236.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  room6:
    "https://images.pexels.com/photos/6466484/pexels-photo-6466484.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",

  // Pool & Amenities
  pool1:
    "https://images.pexels.com/photos/7546610/pexels-photo-7546610.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  pool2:
    "https://images.pexels.com/photos/2291619/pexels-photo-2291619.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  pool3:
    "https://images.pexels.com/photos/14022381/pexels-photo-14022381.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  pool4:
    "https://images.pexels.com/photos/14012203/pexels-photo-14012203.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  poolside:
    "https://images.pexels.com/photos/12695275/pexels-photo-12695275.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",

  // Dining
  dining1:
    "https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  dining2:
    "https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  dining3:
    "https://images.pexels.com/photos/8856555/pexels-photo-8856555.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  dining4:
    "https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  dining5:
    "https://images.pexels.com/photos/2290737/pexels-photo-2290737.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",

  // Spa
  spa1:
    "https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  spa2:
    "https://images.pexels.com/photos/6186738/pexels-photo-6186738.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  spa3:
    "https://images.pexels.com/photos/6628646/pexels-photo-6628646.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
  spa4:
    "https://images.pexels.com/photos/6187653/pexels-photo-6187653.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",

  // Service
  service1:
    "https://images.pexels.com/photos/6466285/pexels-photo-6466285.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85",
};

export const ROOMS = [
  {
    id: "royal-suite",
    name: "The Royal Suite",
    category: "Signature Suite",
    size: "185 m²",
    guests: "2 Adults · 2 Children",
    price: 2850,
    image: IMG.room4,
    description:
      "A palatial retreat draped in gilded accents, with hand-loomed silks, a marble en-suite, and a private terrace overlooking the royal gardens.",
    amenities: ["King bed", "Butler service", "Private terrace", "Marble bath", "Living salon"],
  },
  {
    id: "duchess-chamber",
    name: "Duchess Chamber",
    category: "Heritage Room",
    size: "92 m²",
    guests: "2 Adults",
    price: 1450,
    image: IMG.room1,
    description:
      "Timeless grace in every detail — hand-carved furnishings, Venetian mirrors, and floor-to-ceiling drapery frame an unforgettable stay.",
    amenities: ["Queen bed", "City view", "Clawfoot tub", "Writing desk", "Fireplace"],
  },
  {
    id: "emperor-suite",
    name: "Emperor Grand Suite",
    category: "Presidential Suite",
    size: "240 m²",
    guests: "4 Adults",
    price: 4200,
    image: IMG.room2,
    description:
      "Our most distinguished residence — a two-bedroom sanctuary with a grand piano, private dining, and a dedicated concierge.",
    amenities: ["2 Bedrooms", "Grand piano", "Private dining", "Study", "Wine cellar"],
  },
  {
    id: "crown-jewel",
    name: "Crown Jewel Room",
    category: "Deluxe Room",
    size: "68 m²",
    guests: "2 Adults",
    price: 980,
    image: IMG.room3,
    description:
      "Refined luxury with a modern sensibility. Sunlit interiors, handpicked antiques, and an opulent marble bath.",
    amenities: ["King bed", "Garden view", "Rainfall shower", "Minibar", "Work lounge"],
  },
  {
    id: "ivory-suite",
    name: "The Ivory Suite",
    category: "Junior Suite",
    size: "110 m²",
    guests: "2 Adults · 1 Child",
    price: 1850,
    image: IMG.room5,
    description:
      "An airy sanctuary of cream and gold, with a separate parlour, bespoke linens, and a private balcony.",
    amenities: ["King bed", "Parlour", "Balcony", "Espresso bar", "Soaking tub"],
  },
  {
    id: "heritage-loft",
    name: "Heritage Loft",
    category: "Loft Suite",
    size: "145 m²",
    guests: "3 Adults",
    price: 2200,
    image: IMG.room6,
    description:
      "A duplex of understated grandeur — vaulted ceilings, curated artworks, and an indulgent master chamber above.",
    amenities: ["Duplex", "Vaulted ceiling", "Library", "Skylight", "Dining alcove"],
  },
];

export const AMENITIES = [
  {
    title: "The Aurelia Spa",
    subtitle: "Wellness & Rituals",
    description:
      "An ancient-meets-modern sanctuary offering thermal baths, aromatherapy hammams, and bespoke restorative journeys.",
    image: IMG.spa1,
  },
  {
    title: "Le Jardin Doré",
    subtitle: "Fine Dining",
    description:
      "Our Michelin-celebrated restaurant presents seasonal tasting menus paired with a sommelier-curated cellar of over 800 labels.",
    image: IMG.dining1,
  },
  {
    title: "The Infinity Terrace",
    subtitle: "Pool & Lounges",
    description:
      "A heated infinity pool suspended above the city skyline, flanked by private cabanas and champagne service.",
    image: IMG.pool2,
  },
  {
    title: "The Sovereign Bar",
    subtitle: "Cocktails & Cellar",
    description:
      "Rare vintages, artisanal spirits, and handcrafted cocktails served beneath crystal chandeliers and live jazz.",
    image: IMG.dining2,
  },
  {
    title: "Royal Atelier",
    subtitle: "Private Events",
    description:
      "From intimate soirées to grand galas — our event ateliers are tailored by master planners with regal precision.",
    image: IMG.dining4,
  },
  {
    title: "The Concierge",
    subtitle: "24-Hour Service",
    description:
      "A devoted team at your service — from private aviation and yacht charters to exclusive cultural access across the city.",
    image: IMG.service1,
  },
];
