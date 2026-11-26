// Üretildi: scripts/gen-foundation.py — Figma Foundation değişkenleri. Elle düzenlemeyin.

export type TokenRow = { name: string; value: string; alias: string | null };
export type TextStyleRow = { figma: string; group: string; className: string; varPrefix: string | null; family: 'display' | 'body'; weight: string; size: string; line: string; letter: string; note: string | null };
export const TEXT_GROUPS = [
  {
    "key": "Heading",
    "title": "Başlık",
    "use": "Ekran ve bölüm başlıkları; içerik hiyerarşisi."
  },
  {
    "key": "Text",
    "title": "Metin",
    "use": "Gövde ve uzun okuma metni (paragraf, açıklama); satır yüksekliği %150."
  },
  {
    "key": "UI Display",
    "title": "UI Display",
    "use": "Kısa, vurgulu başlık ve etiketler (kart başlığı, sekme, bölüm etiketi); pozitif harf aralığı."
  },
  {
    "key": "UI Text",
    "title": "UI Text",
    "use": "Arayüz metni: input değeri, liste satırı, yardımcı metin, kısa açıklama."
  },
  {
    "key": "UI Numbers",
    "title": "UI Numbers",
    "use": "Tutar, bakiye, fiyat ve oran gibi sayısal değerler; -%3 harf aralığı."
  }
] as const;
export const TEXT_STYLES: TextStyleRow[] = [
  {
    "figma": "Heading/4XL",
    "group": "Heading",
    "className": "odea-heading-4xl",
    "varPrefix": "heading-4xl",
    "family": "display",
    "weight": "Bold",
    "size": "60",
    "line": "60",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/3XL",
    "group": "Heading",
    "className": "odea-heading-3xl",
    "varPrefix": "heading-3xl",
    "family": "display",
    "weight": "Bold",
    "size": "48",
    "line": "48",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/2XL",
    "group": "Heading",
    "className": "odea-heading-2xl",
    "varPrefix": "heading-2xl",
    "family": "display",
    "weight": "Bold",
    "size": "36",
    "line": "43.2",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/XL",
    "group": "Heading",
    "className": "odea-heading-xl",
    "varPrefix": "heading-xl",
    "family": "display",
    "weight": "Bold",
    "size": "30",
    "line": "39.9",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/LG",
    "group": "Heading",
    "className": "odea-heading-lg",
    "varPrefix": "heading-lg",
    "family": "display",
    "weight": "Bold",
    "size": "24",
    "line": "31.92",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/MD",
    "group": "Heading",
    "className": "odea-heading-md",
    "varPrefix": "heading-md",
    "family": "display",
    "weight": "Bold",
    "size": "20",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/Base",
    "group": "Heading",
    "className": "odea-heading-base",
    "varPrefix": "heading-base",
    "family": "display",
    "weight": "Bold",
    "size": "16",
    "line": "19.2",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Heading/SM",
    "group": "Heading",
    "className": "odea-heading-sm",
    "varPrefix": "heading-sm",
    "family": "display",
    "weight": "Bold",
    "size": "14",
    "line": "16.8",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/4XL",
    "group": "Text",
    "className": "odea-text-4xl",
    "varPrefix": "text-4xl",
    "family": "body",
    "weight": "Regular",
    "size": "36",
    "line": "54",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/3XL",
    "group": "Text",
    "className": "odea-text-3xl",
    "varPrefix": "text-3xl",
    "family": "body",
    "weight": "Regular",
    "size": "30",
    "line": "45",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/2XL",
    "group": "Text",
    "className": "odea-text-2xl",
    "varPrefix": "text-2xl",
    "family": "body",
    "weight": "Regular",
    "size": "24",
    "line": "36",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/XL",
    "group": "Text",
    "className": "odea-text-xl",
    "varPrefix": "text-xl",
    "family": "body",
    "weight": "Regular",
    "size": "20",
    "line": "30",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/LG",
    "group": "Text",
    "className": "odea-text-lg",
    "varPrefix": "text-lg",
    "family": "body",
    "weight": "Regular",
    "size": "18",
    "line": "27",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/MD",
    "group": "Text",
    "className": "odea-text-md",
    "varPrefix": "text-md",
    "family": "body",
    "weight": "Regular",
    "size": "16",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/Base",
    "group": "Text",
    "className": "odea-text-base",
    "varPrefix": "text-base",
    "family": "body",
    "weight": "Regular",
    "size": "14",
    "line": "21",
    "letter": "0",
    "note": null
  },
  {
    "figma": "Text/SM",
    "group": "Text",
    "className": "odea-text-sm",
    "varPrefix": "text-sm",
    "family": "body",
    "weight": "Regular",
    "size": "12",
    "line": "18",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Display/XL",
    "group": "UI Display",
    "className": "odea-ui-display-xl",
    "varPrefix": "ui-display-xl",
    "family": "display",
    "weight": "Bold",
    "size": "22",
    "line": "24",
    "letter": "1.1",
    "note": null
  },
  {
    "figma": "UI Display/LG",
    "group": "UI Display",
    "className": "odea-ui-display-lg",
    "varPrefix": "ui-display-lg",
    "family": "display",
    "weight": "Bold",
    "size": "18",
    "line": "24",
    "letter": "0.9",
    "note": null
  },
  {
    "figma": "UI Display/MD",
    "group": "UI Display",
    "className": "odea-ui-display-md",
    "varPrefix": "ui-display-md",
    "family": "display",
    "weight": "Bold",
    "size": "16",
    "line": "24",
    "letter": "0.8",
    "note": null
  },
  {
    "figma": "UI Display/Base",
    "group": "UI Display",
    "className": "odea-ui-display-base",
    "varPrefix": "ui-display-base",
    "family": "display",
    "weight": "Bold",
    "size": "14",
    "line": "24",
    "letter": "0.7",
    "note": null
  },
  {
    "figma": "UI Display/SM",
    "group": "UI Display",
    "className": "odea-ui-display-sm",
    "varPrefix": "ui-display-sm",
    "family": "display",
    "weight": "Bold",
    "size": "12",
    "line": "16",
    "letter": "1.2",
    "note": "Küçük vurgulu etiket (Section Divider, hafta günleri). FULL CAPS, %10 harf aralığı."
  },
  {
    "figma": "UI Display/Button LG",
    "group": "UI Display",
    "className": "odea-ui-display-button-lg",
    "varPrefix": "ui-display-md",
    "family": "display",
    "weight": "Bold",
    "size": "16",
    "line": "24",
    "letter": "1.6",
    "note": "Buton etiketi, büyük boy. FULL CAPS, %10 harf aralığı."
  },
  {
    "figma": "UI Display/Button SM",
    "group": "UI Display",
    "className": "odea-ui-display-button-sm",
    "varPrefix": "ui-display-base",
    "family": "display",
    "weight": "Bold",
    "size": "14",
    "line": "24",
    "letter": "1.4",
    "note": "Buton etiketi, küçük/varsayılan boy. FULL CAPS, %10 harf aralığı."
  },
  {
    "figma": "UI Text/2XL",
    "group": "UI Text",
    "className": "odea-ui-text-2xl",
    "varPrefix": "ui-text-2xl",
    "family": "body",
    "weight": "Medium",
    "size": "24",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Text/XL",
    "group": "UI Text",
    "className": "odea-ui-text-xl",
    "varPrefix": "ui-text-xl",
    "family": "body",
    "weight": "Medium",
    "size": "22",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Text/LG",
    "group": "UI Text",
    "className": "odea-ui-text-lg",
    "varPrefix": "ui-text-lg",
    "family": "body",
    "weight": "Medium",
    "size": "18",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Text/MD",
    "group": "UI Text",
    "className": "odea-ui-text-md",
    "varPrefix": "ui-text-md",
    "family": "body",
    "weight": "Regular",
    "size": "16",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Text/Base",
    "group": "UI Text",
    "className": "odea-ui-text-base",
    "varPrefix": "ui-text-base",
    "family": "body",
    "weight": "Regular",
    "size": "14",
    "line": "24",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Text/SM",
    "group": "UI Text",
    "className": "odea-ui-text-sm",
    "varPrefix": "ui-text-sm",
    "family": "body",
    "weight": "Regular",
    "size": "12",
    "line": "16",
    "letter": "0",
    "note": null
  },
  {
    "figma": "UI Text/XS",
    "group": "UI Text",
    "className": "odea-ui-text-xs",
    "varPrefix": null,
    "family": "body",
    "weight": "Regular",
    "size": "10",
    "line": "auto",
    "letter": "0",
    "note": "En küçük yardımcı metin (10 px): tarih rozeti, mikro etiket. Gövde metni için kullanma."
  },
  {
    "figma": "UI Text/XS Medium",
    "group": "UI Text",
    "className": "odea-ui-text-xs-medium",
    "varPrefix": null,
    "family": "body",
    "weight": "Medium",
    "size": "10",
    "line": "auto",
    "letter": "0",
    "note": "Kısayol ikon etiketi gibi 10 px vurgulu mikro etiket."
  },
  {
    "figma": "UI Numbers/2XL",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-2xl",
    "varPrefix": "ui-numbers-2xl",
    "family": "body",
    "weight": "Medium",
    "size": "24",
    "line": "24",
    "letter": "-0.72",
    "note": null
  },
  {
    "figma": "UI Numbers/XL",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-xl",
    "varPrefix": "ui-numbers-xl",
    "family": "body",
    "weight": "Medium",
    "size": "22",
    "line": "24",
    "letter": "-0.66",
    "note": null
  },
  {
    "figma": "UI Numbers/LG",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-lg",
    "varPrefix": "ui-numbers-lg",
    "family": "body",
    "weight": "Medium",
    "size": "18",
    "line": "24",
    "letter": "-0.54",
    "note": null
  },
  {
    "figma": "UI Numbers/MD",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-md",
    "varPrefix": "ui-numbers-md",
    "family": "body",
    "weight": "Regular",
    "size": "16",
    "line": "24",
    "letter": "-0.48",
    "note": null
  },
  {
    "figma": "UI Numbers/Base",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-base",
    "varPrefix": "ui-numbers-base",
    "family": "body",
    "weight": "Regular",
    "size": "14",
    "line": "24",
    "letter": "-0.42",
    "note": null
  },
  {
    "figma": "UI Numbers/SM",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-sm",
    "varPrefix": "ui-numbers-sm",
    "family": "body",
    "weight": "Regular",
    "size": "12",
    "line": "16",
    "letter": "-0.36",
    "note": null
  },
  {
    "figma": "UI Numbers/SM Semi Bold",
    "group": "UI Numbers",
    "className": "odea-ui-numbers-sm-semi-bold",
    "varPrefix": "ui-numbers-sm",
    "family": "body",
    "weight": "Semi Bold",
    "size": "12",
    "line": "16",
    "letter": "-0.36",
    "note": "Küçük vurgulu rakam/yüzde (trend göstergesi, özet değeri)."
  }
];
export const SPACE_TOKENS: TokenRow[] = [
  {
    "name": "--space-0",
    "value": "0",
    "alias": null
  },
  {
    "name": "--space-2",
    "value": "2",
    "alias": null
  },
  {
    "name": "--space-4",
    "value": "4",
    "alias": null
  },
  {
    "name": "--space-8",
    "value": "8",
    "alias": null
  },
  {
    "name": "--space-12",
    "value": "12",
    "alias": null
  },
  {
    "name": "--space-16",
    "value": "16",
    "alias": null
  },
  {
    "name": "--space-24",
    "value": "24",
    "alias": null
  },
  {
    "name": "--space-32",
    "value": "32",
    "alias": null
  },
  {
    "name": "--space-40",
    "value": "40",
    "alias": null
  },
  {
    "name": "--space-48",
    "value": "48",
    "alias": null
  },
  {
    "name": "--space-64",
    "value": "64",
    "alias": null
  },
  {
    "name": "--space-80",
    "value": "80",
    "alias": null
  },
  {
    "name": "--space-96",
    "value": "96",
    "alias": null
  },
  {
    "name": "--gap-xs",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--gap-sm",
    "value": "12",
    "alias": "--space-12"
  },
  {
    "name": "--gap-md",
    "value": "16",
    "alias": "--space-16"
  },
  {
    "name": "--gap-lg",
    "value": "24",
    "alias": "--space-24"
  },
  {
    "name": "--inset-sm",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--inset-md",
    "value": "16",
    "alias": "--space-16"
  },
  {
    "name": "--inset-lg",
    "value": "24",
    "alias": "--space-24"
  },
  {
    "name": "--inset-xl",
    "value": "32",
    "alias": "--space-32"
  }
];
export const SIZE_TOKENS: TokenRow[] = [
  {
    "name": "--size-16",
    "value": "16",
    "alias": null
  },
  {
    "name": "--size-20",
    "value": "20",
    "alias": null
  },
  {
    "name": "--size-24",
    "value": "24",
    "alias": null
  },
  {
    "name": "--size-32",
    "value": "32",
    "alias": null
  },
  {
    "name": "--size-36",
    "value": "36",
    "alias": null
  },
  {
    "name": "--size-40",
    "value": "40",
    "alias": null
  },
  {
    "name": "--size-44",
    "value": "44",
    "alias": null
  },
  {
    "name": "--size-48",
    "value": "48",
    "alias": null
  },
  {
    "name": "--size-56",
    "value": "56",
    "alias": null
  },
  {
    "name": "--size-58",
    "value": "58",
    "alias": null
  },
  {
    "name": "--size-64",
    "value": "64",
    "alias": null
  },
  {
    "name": "--icon-sm",
    "value": "16",
    "alias": "--size-16"
  },
  {
    "name": "--icon-md",
    "value": "24",
    "alias": "--size-24"
  },
  {
    "name": "--icon-lg",
    "value": "32",
    "alias": "--size-32"
  },
  {
    "name": "--control-height-sm",
    "value": "40",
    "alias": "--size-40"
  },
  {
    "name": "--control-height-md",
    "value": "48",
    "alias": "--size-48"
  },
  {
    "name": "--control-height-lg",
    "value": "56",
    "alias": "--size-56"
  },
  {
    "name": "--touch-target-min",
    "value": "44",
    "alias": "--size-44"
  }
];
export const GRID_TOKENS: TokenRow[] = [
  {
    "name": "--grid-mobile-gutter",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--grid-mobile-margin",
    "value": "24",
    "alias": "--space-24"
  },
  {
    "name": "--grid-tablet-gutter",
    "value": "16",
    "alias": "--space-16"
  },
  {
    "name": "--grid-desktop-gutter",
    "value": "24",
    "alias": "--space-24"
  },
  {
    "name": "--grid-tablet-column-width",
    "value": "36",
    "alias": "--size-36"
  },
  {
    "name": "--grid-desktop-column-width",
    "value": "58",
    "alias": "--size-58"
  }
];
export const RADIUS_TOKENS: TokenRow[] = [
  {
    "name": "--radius-none",
    "value": "0",
    "alias": null
  },
  {
    "name": "--radius-xs",
    "value": "2",
    "alias": null
  },
  {
    "name": "--radius-sm",
    "value": "4",
    "alias": null
  },
  {
    "name": "--radius-md",
    "value": "8",
    "alias": null
  },
  {
    "name": "--radius-lg",
    "value": "12",
    "alias": null
  },
  {
    "name": "--radius-xl",
    "value": "16",
    "alias": null
  },
  {
    "name": "--radius-2xl",
    "value": "24",
    "alias": null
  },
  {
    "name": "--radius-full",
    "value": "9999",
    "alias": null
  }
];
export const BORDER_TOKENS: TokenRow[] = [
  {
    "name": "--border-width-none",
    "value": "0",
    "alias": null
  },
  {
    "name": "--border-width-hairline",
    "value": "0.5",
    "alias": null
  },
  {
    "name": "--border-width-thin",
    "value": "1",
    "alias": null
  },
  {
    "name": "--border-width-medium",
    "value": "2",
    "alias": null
  },
  {
    "name": "--border-width-strong",
    "value": "4",
    "alias": null
  }
];
export const OPACITY_TOKENS: TokenRow[] = [
  {
    "name": "--opacity-0",
    "value": "0",
    "alias": null
  },
  {
    "name": "--opacity-4",
    "value": "4",
    "alias": null
  },
  {
    "name": "--opacity-8",
    "value": "8",
    "alias": null
  },
  {
    "name": "--opacity-10",
    "value": "10",
    "alias": null
  },
  {
    "name": "--opacity-14",
    "value": "14",
    "alias": null
  },
  {
    "name": "--opacity-18",
    "value": "18",
    "alias": null
  },
  {
    "name": "--opacity-36",
    "value": "36",
    "alias": null
  },
  {
    "name": "--opacity-40",
    "value": "40",
    "alias": null
  },
  {
    "name": "--opacity-60",
    "value": "60",
    "alias": null
  },
  {
    "name": "--opacity-64",
    "value": "64",
    "alias": null
  },
  {
    "name": "--opacity-92",
    "value": "92",
    "alias": null
  },
  {
    "name": "--opacity-100",
    "value": "100",
    "alias": null
  },
  {
    "name": "--opacity-state-disabled",
    "value": "40",
    "alias": "--opacity-40"
  },
  {
    "name": "--opacity-overlay-default",
    "value": "36",
    "alias": "--opacity-36"
  },
  {
    "name": "--opacity-surface-subtle",
    "value": "4",
    "alias": "--opacity-4"
  }
];
export const SHADOW_TOKENS: TokenRow[] = [
  {
    "name": "--shadow-card-offset-x",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-card-offset-y",
    "value": "2",
    "alias": null
  },
  {
    "name": "--shadow-card-blur",
    "value": "8",
    "alias": null
  },
  {
    "name": "--shadow-card-spread",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-dropdown-offset-x",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-dropdown-offset-y",
    "value": "8",
    "alias": null
  },
  {
    "name": "--shadow-dropdown-blur",
    "value": "24",
    "alias": null
  },
  {
    "name": "--shadow-dropdown-spread",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-modal-offset-x",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-modal-offset-y",
    "value": "16",
    "alias": null
  },
  {
    "name": "--shadow-modal-blur",
    "value": "48",
    "alias": null
  },
  {
    "name": "--shadow-modal-spread",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-default-offset-x",
    "value": "0",
    "alias": null
  },
  {
    "name": "--shadow-default-offset-y",
    "value": "8",
    "alias": null
  },
  {
    "name": "--shadow-default-blur",
    "value": "16",
    "alias": null
  },
  {
    "name": "--shadow-default-spread",
    "value": "0",
    "alias": null
  }
];
export const BUTTON_TOKENS: TokenRow[] = [
  {
    "name": "--button-radius",
    "value": "8",
    "alias": "--radius-md"
  },
  {
    "name": "--button-gap",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--button-counter-gap",
    "value": "0",
    "alias": "--space-0"
  },
  {
    "name": "--button-opacity-full",
    "value": "100",
    "alias": "--opacity-100"
  },
  {
    "name": "--button-typography-font-family",
    "value": "Red Hat Display",
    "alias": "--font-family-display"
  },
  {
    "name": "--button-typography-font-style",
    "value": "Bold",
    "alias": "--font-weight-bold"
  },
  {
    "name": "--button-typography-line-height",
    "value": "24",
    "alias": "--ui-display-base-line-height"
  },
  {
    "name": "--button-typography-paragraph-spacing",
    "value": "0",
    "alias": "--space-0"
  },
  {
    "name": "--button-typography-paragraph-indent",
    "value": "0",
    "alias": "--space-0"
  },
  {
    "name": "--button-shadow-offset-x",
    "value": "0",
    "alias": null
  },
  {
    "name": "--button-shadow-offset-y",
    "value": "8",
    "alias": null
  },
  {
    "name": "--button-shadow-blur",
    "value": "16",
    "alias": null
  },
  {
    "name": "--button-shadow-spread",
    "value": "0",
    "alias": null
  },
  {
    "name": "--button-size-small-padding-y",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--button-size-small-padding-x-icon-only",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--button-size-small-height",
    "value": "40",
    "alias": "--size-40"
  },
  {
    "name": "--button-border-default",
    "value": "1",
    "alias": "--border-width-thin"
  },
  {
    "name": "--button-icon-standalone-size",
    "value": "24",
    "alias": "--size-24"
  },
  {
    "name": "--button-size-small-padding-x-label",
    "value": "8",
    "alias": "--space-8"
  },
  {
    "name": "--button-typography-small-font-size",
    "value": "14",
    "alias": "--ui-display-base-font-size"
  },
  {
    "name": "--button-typography-small-letter-spacing",
    "value": "1.4",
    "alias": null
  },
  {
    "name": "--button-icon-small-leading-size",
    "value": "20",
    "alias": "--size-20"
  },
  {
    "name": "--button-border-focused",
    "value": "2",
    "alias": "--border-width-medium"
  },
  {
    "name": "--button-size-large-padding-y",
    "value": "16",
    "alias": "--space-16"
  },
  {
    "name": "--button-size-large-padding-x-icon-only",
    "value": "16",
    "alias": "--space-16"
  },
  {
    "name": "--button-size-large-height",
    "value": "56",
    "alias": "--size-56"
  },
  {
    "name": "--button-size-large-padding-x-label",
    "value": "32",
    "alias": "--space-32"
  },
  {
    "name": "--button-typography-large-font-size",
    "value": "16",
    "alias": "--ui-display-md-font-size"
  },
  {
    "name": "--button-typography-large-letter-spacing",
    "value": "1.6",
    "alias": null
  },
  {
    "name": "--button-icon-large-leading-size",
    "value": "24",
    "alias": "--size-24"
  }
];
export const SHADOW_COLORS = [
  {
    "name": "--shadow-card-color",
    "value": "var(--odea-effect-shadow)"
  },
  {
    "name": "--shadow-dropdown-color",
    "value": "#9faab924"
  },
  {
    "name": "--shadow-modal-color",
    "value": "#9faab92e"
  },
  {
    "name": "--shadow-default-color",
    "value": "var(--odea-effect-shadow)"
  },
  {
    "name": "--shadow-default-dark-color",
    "value": "#00000033"
  }
];
