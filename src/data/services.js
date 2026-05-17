// Service catalog (mock). Prices in USD.
// `i18nKey` maps to dict.services.items.<key>.{name,desc}
export const SERVICES = [
  { id: "signatureCut", i18nKey: "signatureCut", price: 45, duration: 35, category: "hair",  popular: true,  emoji: "✂️" },
  { id: "skinFade",     i18nKey: "skinFade",     price: 40, duration: 35, category: "hair",  popular: true,  emoji: "💈" },
  { id: "taperFade",    i18nKey: "taperFade",    price: 38, duration: 35, category: "hair",  popular: false, emoji: "💇" },
  { id: "kidsCut",      i18nKey: "kidsCut",      price: 28, duration: 25, category: "kids",  popular: false, emoji: "🧒" },
  { id: "seniorCut",    i18nKey: "seniorCut",    price: 32, duration: 30, category: "kids",  popular: false, emoji: "👴" },
  { id: "beardSculpt",  i18nKey: "beardSculpt",  price: 30, duration: 25, category: "beard", popular: true,  emoji: "🪒" },
  { id: "hotTowel",     i18nKey: "hotTowel",     price: 45, duration: 35, category: "shave", popular: true,  emoji: "🔥" },
  { id: "headShave",    i18nKey: "headShave",    price: 45, duration: 35, category: "shave", popular: false, emoji: "🪒" },
  { id: "cutBeard",     i18nKey: "cutBeard",     price: 65, duration: 55, category: "combo", popular: true,  emoji: "✂️" },
  { id: "cutShave",     i18nKey: "cutShave",     price: 80, duration: 70, category: "combo", popular: true,  emoji: "🔥" },
  { id: "greyBlend",    i18nKey: "greyBlend",    price: 25, duration: 20, category: "hair",  popular: false, emoji: "🎨" },
  { id: "lineUp",       i18nKey: "lineUp",       price: 20, duration: 15, category: "hair",  popular: false, emoji: "📏" },
]

export const BARBERS = [
  { id: "tony",   i18nKey: "tony",   years: 17, color: "#c8a24c",
    img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&auto=format&fit=crop&q=80" },
  { id: "javier", i18nKey: "javier", years: 14, color: "#c8392f",
    img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&auto=format&fit=crop&q=80" },
  { id: "marcus", i18nKey: "marcus", years: 9,  color: "#e6c977",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&auto=format&fit=crop&q=80" },
  { id: "ricky",  i18nKey: "ricky",  years: 22, color: "#8e6e22",
    img: "https://images.unsplash.com/photo-1582771498000-8c5b5fc92eb6?w=900&auto=format&fit=crop&q=80" },
]

export const GALLERY = [
  { id: 1,  cat: "cuts",   src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&auto=format&fit=crop&q=80" },
  { id: 2,  cat: "beards", src: "https://images.unsplash.com/photo-1635273051937-a76dffe92252?w=900&auto=format&fit=crop&q=80" },
  { id: 3,  cat: "shop",   src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&auto=format&fit=crop&q=80" },
  { id: 4,  cat: "cuts",   src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&auto=format&fit=crop&q=80" },
  { id: 5,  cat: "beards", src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&auto=format&fit=crop&q=80" },
  { id: 6,  cat: "shop",   src: "https://images.unsplash.com/photo-1599387737163-9b8c5b8d5a64?w=900&auto=format&fit=crop&q=80" },
  { id: 7,  cat: "cuts",   src: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=900&auto=format&fit=crop&q=80" },
  { id: 8,  cat: "beards", src: "https://images.unsplash.com/photo-1593702288056-f1735915e864?w=900&auto=format&fit=crop&q=80" },
  { id: 9,  cat: "shop",   src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=900&auto=format&fit=crop&q=80" },
  { id: 10, cat: "cuts",   src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&auto=format&fit=crop&q=80" },
  { id: 11, cat: "beards", src: "https://images.unsplash.com/photo-1622296020666-1e0e3a7d35c7?w=900&auto=format&fit=crop&q=80" },
  { id: 12, cat: "shop",   src: "https://images.unsplash.com/photo-1622288432454-2b1b3f1e3a3b?w=900&auto=format&fit=crop&q=80" },
]
