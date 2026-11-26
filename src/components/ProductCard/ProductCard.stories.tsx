import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
  NONE,
  withNone,
  type IconChoice,
} from "../../docs-ui/playgroundTheme";
import ProductCard, { type ProductCardProps } from "./ProductCard";

const chevronOptions = {
  Right: { set: "Arrows / Caret", name: "Right" },
  Down: { set: "Arrows / Caret", name: "Down" },
  "Double Right": { set: "Arrows / Caret", name: "Double Right" },
  "Circle Right": { set: "Arrows / Caret Circle", name: "Right" },
} as const;
const description = `ODEA MOBILE | Product Card. Yalnızca doğru ürün içeriği, geçerli açıklama ve onaylı illustration asset kullanılır. Teklif metni ve tutarı gerçek kampanya koşullarıyla eşleşmeli; görsel kart tek başına kampanya onaylandığı anlamına gelmez. İsimlendirme İngilizce, davranış açıklamaları Türkçedir. Görsel zorunludur (görselsiz kullanılmaz). Playground ekranında Figma'daki Show Chevron ve Chevron Icon özellikleri vardır; Show Chevron ile Chevron Icon tek seçimde birleşir (Yok = chevron yok). Bu set içinde olmayan eksen, durum veya tema kombinasyonu üretilmez. Gerçek master component instance kullanılır; detach edilmez. Tema: Dark Mode varyantı yoktur. Koyu tema için instance’ı veya üst frame’i 02 - Renkler - Anlamsal ve 12 - Buton koleksiyonlarında Dark moda al; renkler token üzerinden otomatik değişir.`;

const meta = {
  title: "Components/Cards/Product Card",
  component: ProductCard,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  chevronIcon: IconChoice<typeof chevronOptions>;
  title: string;
  subtitleText: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ProductCardProps => ({
  showChevron: a.chevronIcon !== NONE,
  chevronIcon: a.chevronIcon === NONE ? undefined : chevronOptions[a.chevronIcon],
  title: a.title || undefined,
  subtitleText: a.subtitleText || undefined,
});

/** Figma'daki Show Chevron ve Chevron Icon özellikleri; chevron aç/kapa ile ikon tek seçimde. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    title: "Title",
    subtitleText: "Sub text goes here",
    chevronIcon: "Right",
  },
  argTypes: {
    ...themeArgTypes,
    title: { name: "Title", table: { category: "İçerik" } },
    subtitleText: { name: "Subtitle Text", table: { category: "İçerik" } },
    chevronIcon: {
      name: "Chevron Icon",
      description: "Figma: Show Chevron + Chevron Icon. Yok = chevron gösterilmez.",
      control: "select",
      options: withNone(chevronOptions),
      table: { category: "Chevron" },
    },
  },
  render: (args) => <ProductCard {...toProps(args)} />,
};

export const BaskaBankaHesabiEkle: Story = {
  name: "Başka banka hesabı ekle",
};

export const UzunBaslik: Story = {
  name: "Uç durum · Uzun başlık",
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
  },
};

export const UzunAltMetin: Story = {
  name: "Uç durum · Uzun alt metin",
  args: {
    subtitleText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const Senaryolar: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        alignItems: "flex-start",
        padding: 32,
        background: "var(--odea-background-canvas)",
      }}
    >
      <ProductCard />
      <ProductCard showChevron={false} />
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (className vb.) burada gizlenir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
