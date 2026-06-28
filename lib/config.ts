// ============================================================
// WEDDING SITE CONFIG — edit all values here before going live
// ============================================================

export const COUPLE = {
  partner1: "Nathan",
  partner2: "Solape",
  date: "August 2026",
  // ISO format for countdown, e.g. "2025-06-14"
  dateISO: "2025-06-14",
  // Monogram shown in footer and nav
  monogram: "N & S",
};

export const CEREMONY = {
  name: "[REPLACE: Ceremony Venue Name]",
  address: "[REPLACE: Ceremony Address, City, State]",
  time: "[REPLACE: e.g. 12:00 PM]",
  mapsUrl: "https://maps.google.com/?q=[REPLACE]",
};

export const COCKTAIL = {
  time: "[REPLACE: e.g. 2:00 PM]",
  note: "[REPLACE: e.g. Garden Terrace — cocktails & canapés]",
};

export const RECEPTION = {
  name: "[REPLACE: Reception Venue Name]",
  address: "[REPLACE: Reception Address, City, State]",
  time: "[REPLACE: e.g. 4:00 PM]",
  mapsUrl: "https://maps.google.com/?q=[REPLACE]",
};

export const DRESS_CODE = {
  label: "Butter Yellow & Rose Gold",
  colors: [
    {
      name: "Butter Yellow",
      swatch: "linear-gradient(135deg, #FCE38A 0%, #F4C04E 45%, #FDEBA8 100%)",
    },
    {
      name: "Rose Gold",
      swatch: "linear-gradient(135deg, #E8C4B8 0%, #C98A72 45%, #F0D3C4 100%)",
    },
  ],
};

// Scripture shown in the Hero section
export const SCRIPTURE = {
  text: "“And if one prevail against him, two shall withstand him; and a threefold cord is not quickly broken.”",
  reference: "Ecclesiastes 4:12 (KJV)",
};

// Hero background image — swap with a real photo path in /public or an external URL
export const HERO_IMAGE = "/solaaa.jpeg"; // Leave empty to use gradient fallback: ;

export const BANK_ACCOUNTS = [
  {
    label: "Rubles ₽",
    bankName: "Sberbank",
    logo: "/bank-logos/sber.png",
    accountName: "Nathaniel Ehizode E.",
    accountNumber: "+79621125455",
  },
  {
    label: "Naira ₦",
    bankName: "FCMB",
    logo: "/bank-logos/fcmb.png",
    accountName: "Olusola Tofunmi ",
    accountNumber: "1047363719",
  },
  {
    label: "USD $",
    bankName: "GTB",
    logo: "/bank-logos/gtb.png",
    accountName: "Timothy Olusola Ogunmiluyi",
    accountNumber: "0231507690 ",
  },
];

// Registry items — WhatsApp config is set here
// Set NEXT_PUBLIC_WA_NUMBER in .env.local to override this default
export const WA_NUMBER = "[REPLACE: e.g. 2348012345678]";
export const WA_MESSAGE_TEMPLATE = (itemName: string) =>
  `Hi! I'd love to gift you the ${itemName} 🎁 — congratulations Solape & Nathan!`;

export const REGISTRY_ITEMS = [
  {
    id: 5,
    name: "[REPLACE: Item Name 5]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift5/400/400",
  },
  {
    id: 1,
    name: "[REPLACE: Item Name 1]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift1/400/400",
  },
  {
    id: 2,
    name: "[REPLACE: Item Name 2]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift2/400/400",
  },

  {
    id: 4,
    name: "[REPLACE: Item Name 4]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift4/400/400",
  },
];

// Gallery images — replace src with your real photos

const WEDDING_PICTURES = [
  "/sola_and_nath_3.jpeg",
  "/Solape_Nathan_2.jpg",
  "/solape_Nathan.jpg",
  "/Sola_and_nathan.jpeg",
];

const GALLERY_IMAGES_2 = WEDDING_PICTURES.map((src, index) => ({
  id: index + 1,
  src,
  alt: `Wedding photo ${index + 1}`,
}));

export const GALLERY_IMAGES_PLACEHOLDER = Array.from({ length: 8 }, (_, i) => ({
  id: WEDDING_PICTURES.length + 3,
  src: `https://picsum.photos/seed/wedding${i + 1}/800/800`,
  alt: `Wedding photo ${i + 1}`,
}));

export const GALLERY_IMAGES = [
  ...GALLERY_IMAGES_2,
  // ...GALLERY_IMAGES_PLACEHOLDER,
];

export type WellWish = {
  name: string;
  message: string;
};

// Our Story — replace placeholder text
export const STORY = {
  solape: {
    label: "Solape's Side",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/solape_2.jpg",
  },
  nathan: {
    label: "Nathan's Side",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/Nathnn.jpg",
  },
};
