// ============================================================
// WEDDING SITE CONFIG — edit all values here before going live
// ============================================================

export const COUPLE = {
  partner1: "Nathan",
  partner2: "Solape",
  date: "Saturday, 14th August 2026",
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
    id: 3,
    name: "[REPLACE: Item Name 3]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift3/400/400",
  },
  {
    id: 4,
    name: "[REPLACE: Item Name 4]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift4/400/400",
  },
  {
    id: 5,
    name: "[REPLACE: Item Name 5]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift5/400/400",
  },
  {
    id: 6,
    name: "[REPLACE: Item Name 6]",
    note: "[REPLACE: optional note / price]",
    image: "https://picsum.photos/seed/gift6/400/400",
  },
];

// Gallery images — replace src with your real photos
export const GALLERY_IMAGES_PLACEHOLDER = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/wedding${i + 1}/800/800`,
  alt: `Wedding photo ${i + 1}`,
}));

export const GALLERY_IMAGES_2 = [
  {
    id: GALLERY_IMAGES_PLACEHOLDER.length + 1,
    src: "/Sola_and_nath_3.jpeg",
    alt: `Wedding photo ${GALLERY_IMAGES_PLACEHOLDER?.length + 1}`,
  },
];

export const GALLERY_IMAGES = [
  ...GALLERY_IMAGES_2,
  ...GALLERY_IMAGES_PLACEHOLDER,
];

// Our Story — replace placeholder text
export const STORY = {
  solape: {
    label: "Solape's Side",
    text: "[REPLACE: Solape's story of how they met — write in first person, keep it warm and personal. E.g. 'I remember the first time I saw Nathan at…']",
    image: "https://picsum.photos/seed/solape/600/700",
  },
  nathan: {
    label: "Nathan's Side",
    text: "[REPLACE: Nathan's story of how they met — write in first person, keep it warm and personal. E.g. 'I knew from the moment I met Solape that…']",
    image: "https://picsum.photos/seed/nathan/600/700",
  },
};
