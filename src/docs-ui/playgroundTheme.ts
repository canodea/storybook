/** Playground'larda Light/Dark tema kontrolü. preview.tsx'teki withArgTheme dekoratörü `theme` arg'ını okur. */
export type ThemeArgs = { theme: "light" | "dark" };

export const themeArgs: ThemeArgs = { theme: "light" };

export const themeArgTypes = {
  theme: {
    name: "Theme",
    control: "inline-radio",
    options: ["light", "dark"],
    description:
      "Bileşeni açık ya da koyu temada gösterir; renkler --odea-* token’larından otomatik değişir.",
    table: { category: "Görünüm" },
  },
} as const;

/** İkon seçimi; "Yok" ikonu gizler. Figma'daki "Show … Icon" anahtarı + ikon değiştirme tek kontrolde birleşir. */
export const NONE = "Yok" as const;
export type IconChoice<T> = keyof T | typeof NONE;
export const withNone = (icons: object) => [NONE, ...Object.keys(icons)];
