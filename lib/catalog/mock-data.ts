import type { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "cat-women",
    slug: "women",
    name: "Women",
    description:
      "Modern pieces designed for comfort, confidence, and everyday expression.",
    sortOrder: 1,
  },
  {
    id: "cat-men",
    slug: "men",
    name: "Men",
    description:
      "Clean everyday essentials with an effortless, comfortable feel.",
    sortOrder: 2,
  },
  {
    id: "cat-lingerie",
    slug: "lingerie",
    name: "Lingerie",
    description:
      "Elegant intimates designed to feel soft, personal, and beautiful.",
    sortOrder: 3,
  },
  {
    id: "cat-unisex",
    slug: "unisex",
    name: "Unisex",
    description:
      "Relaxed styles made to move naturally across wardrobes and personal style.",
    sortOrder: 4,
  },
];

const placeholderImages = {
  essential: [
    {
      id: "img-essential-1",
      url: "https://placehold.co/800x1000/fcf0f2/622937?text=Essential+Set",
      alt: "Nini Bare Essential Set",
      width: 800,
      height: 1000,
      sortOrder: 1,
    },
    {
      id: "img-essential-2",
      url: "https://placehold.co/800x1000/e08c9a/ffffff?text=Essential+Set",
      alt: "Nini Bare Essential Set alternate view",
      width: 800,
      height: 1000,
      sortOrder: 2,
    },
    {
      id: "img-essential-3",
      url: "https://placehold.co/800x1000/c83f67/ffffff?text=Essential+Set",
      alt: "Nini Bare Essential Set detail view",
      width: 800,
      height: 1000,
      sortOrder: 3,
    },
  ],
  everyday: [
    {
      id: "img-everyday-1",
      url: "https://placehold.co/800x1000/fcf0f2/622937?text=Everyday+Essential",
      alt: "Nini Bare Everyday Essential",
      width: 800,
      height: 1000,
      sortOrder: 1,
    },
    {
      id: "img-everyday-2",
      url: "https://placehold.co/800x1000/e08c9a/ffffff?text=Everyday+Essential",
      alt: "Nini Bare Everyday Essential alternate view",
      width: 800,
      height: 1000,
      sortOrder: 2,
    },
    {
      id: "img-everyday-3",
      url: "https://placehold.co/800x1000/c83f67/ffffff?text=Everyday+Essential",
      alt: "Nini Bare Everyday Essential detail view",
      width: 800,
      height: 1000,
      sortOrder: 3,
    },
  ],
  lace: [
    {
      id: "img-lace-1",
      url: "https://placehold.co/800x1000/fcf0f2/622937?text=Soft+Lace+Set",
      alt: "Nini Bare Soft Lace Set",
      width: 800,
      height: 1000,
      sortOrder: 1,
    },
    {
      id: "img-lace-2",
      url: "https://placehold.co/800x1000/e08c9a/ffffff?text=Soft+Lace+Set",
      alt: "Nini Bare Soft Lace Set alternate view",
      width: 800,
      height: 1000,
      sortOrder: 2,
    },
    {
      id: "img-lace-3",
      url: "https://placehold.co/800x1000/c83f67/ffffff?text=Soft+Lace+Set",
      alt: "Nini Bare Soft Lace Set detail view",
      width: 800,
      height: 1000,
      sortOrder: 3,
    },
  ],
  lounge: [
    {
      id: "img-lounge-1",
      url: "https://placehold.co/800x1000/fcf0f2/622937?text=Classic+Lounge+Set",
      alt: "Nini Bare Classic Lounge Set",
      width: 800,
      height: 1000,
      sortOrder: 1,
    },
    {
      id: "img-lounge-2",
      url: "https://placehold.co/800x1000/e08c9a/ffffff?text=Classic+Lounge+Set",
      alt: "Nini Bare Classic Lounge Set alternate view",
      width: 800,
      height: 1000,
      sortOrder: 2,
    },
    {
      id: "img-lounge-3",
      url: "https://placehold.co/800x1000/c83f67/ffffff?text=Classic+Lounge+Set",
      alt: "Nini Bare Classic Lounge Set detail view",
      width: 800,
      height: 1000,
      sortOrder: 3,
    },
  ],
};

export const products: Product[] = [
  {
    id: "prod-essential-set",
    slug: "essential-set",
    name: "Essential Set",
    shortDescription: "A simple everyday piece made for comfort.",
    description:
      "A simple everyday piece made for comfort, confidence, and effortless style.",
    categorySlugs: ["women"],
    status: "active",
    publishedAt: "2026-09-01T00:00:00.000Z",
    featured: true,
    price: {
      amount: 1800000,
      currency: "NGN",
    },
    images: placeholderImages.essential,
    variants: [
      {
        id: "var-essential-s",
        sku: "NB-ESS-S",
        size: { value: "S", label: "S" },
        availability: "in_stock",
      },
      {
        id: "var-essential-m",
        sku: "NB-ESS-M",
        size: { value: "M", label: "M" },
        availability: "in_stock",
      },
      {
        id: "var-essential-l",
        sku: "NB-ESS-L",
        size: { value: "L", label: "L" },
        availability: "in_stock",
      },
      {
        id: "var-essential-xl",
        sku: "NB-ESS-XL",
        size: { value: "XL", label: "XL" },
        availability: "in_stock",
      },
    ],
  },
  {
    id: "prod-everyday-essential",
    slug: "everyday-essential",
    name: "Everyday Essential",
    shortDescription: "Clean, comfortable style for everyday living.",
    description: "Clean, comfortable style designed for everyday living.",
    categorySlugs: ["men"],
    status: "active",
    publishedAt: "2026-09-01T00:00:00.000Z",
    featured: true,
    price: {
      amount: 2200000,
      currency: "NGN",
    },
    images: placeholderImages.everyday,
    variants: [
      {
        id: "var-everyday-s",
        sku: "NB-EVE-S",
        size: { value: "S", label: "S" },
        availability: "in_stock",
      },
      {
        id: "var-everyday-m",
        sku: "NB-EVE-M",
        size: { value: "M", label: "M" },
        availability: "in_stock",
      },
      {
        id: "var-everyday-l",
        sku: "NB-EVE-L",
        size: { value: "L", label: "L" },
        availability: "in_stock",
      },
      {
        id: "var-everyday-xl",
        sku: "NB-EVE-XL",
        size: { value: "XL", label: "XL" },
        availability: "in_stock",
      },
    ],
  },
  {
    id: "prod-soft-lace-set",
    slug: "soft-lace-set",
    name: "Soft Lace Set",
    shortDescription: "Elegant intimates with a soft, effortless feel.",
    description:
      "Elegant intimates designed to feel soft, personal, and beautiful.",
    categorySlugs: ["lingerie"],
    status: "active",
    publishedAt: "2026-09-01T00:00:00.000Z",
    featured: false,
    price: {
      amount: 1600000,
      currency: "NGN",
    },
    images: placeholderImages.lace,
    variants: [
      {
        id: "var-lace-s",
        sku: "NB-LAC-S",
        size: { value: "S", label: "S" },
        availability: "in_stock",
      },
      {
        id: "var-lace-m",
        sku: "NB-LAC-M",
        size: { value: "M", label: "M" },
        availability: "in_stock",
      },
      {
        id: "var-lace-l",
        sku: "NB-LAC-L",
        size: { value: "L", label: "L" },
        availability: "in_stock",
      },
      {
        id: "var-lace-xl",
        sku: "NB-LAC-XL",
        size: { value: "XL", label: "XL" },
        availability: "out_of_stock",
      },
    ],
  },
  {
    id: "prod-classic-lounge-set",
    slug: "classic-lounge-set",
    name: "Classic Lounge Set",
    shortDescription: "Relaxed everyday comfort with a polished finish.",
    description: "Relaxed everyday comfort with a polished finish.",
    categorySlugs: ["unisex"],
    status: "active",
    publishedAt: "2026-09-01T00:00:00.000Z",
    featured: false,
    price: {
      amount: 2500000,
      currency: "NGN",
    },
    images: placeholderImages.lounge,
    variants: [
      {
        id: "var-lounge-s",
        sku: "NB-LOU-S",
        size: { value: "S", label: "S" },
        availability: "in_stock",
      },
      {
        id: "var-lounge-m",
        sku: "NB-LOU-M",
        size: { value: "M", label: "M" },
        availability: "in_stock",
      },
      {
        id: "var-lounge-l",
        sku: "NB-LOU-L",
        size: { value: "L", label: "L" },
        availability: "in_stock",
      },
      {
        id: "var-lounge-xl",
        sku: "NB-LOU-XL",
        size: { value: "XL", label: "XL" },
        availability: "in_stock",
      },
    ],
  },
];
