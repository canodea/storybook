import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Logo, { type LogoBrand } from "./Logo";

const description = `ODEA MOBILE | Logo. Odea ve Odeabank marka logoları tek bileşende toplanır. Oranlar bozulmadan ölçeklenir, renk değiştirilmez. Varsayılan yükseklik Figma değeridir (Odea 24 px, Odeabank 22 px). Playground ekranında Figma'daki Brand ve Height özellikleri vardır. Tema: logolar koyu gridedir; koyu zeminde görünürlük düşer, ayrı dark CSS yazılmaz. Koyu zeminde kullanım için marka onaylı açık renk sürüm gerekir (Figma'da yok).`;

const meta = {
  title: "Foundations/Logos/Logo",
  component: Logo,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  brand: LogoBrand;
  height: number;
} & ThemeArgs;

const heights: Record<LogoBrand, number> = { odea: 24, odeabank: 22 };

/** Figma'daki Brand ve Height özellikleri. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    brand: "odea",
    height: 24,
  },
  argTypes: {
    ...themeArgTypes,
    brand: {
      name: "Brand",
      control: "select",
      options: ["odea", "odeabank"],
      table: { category: "Logo" },
    },
    height: {
      name: "Height",
      control: { type: "number", min: 12, max: 64, step: 2 },
      description: "Yükseklik (px); genişlik oranla hesaplanır.",
      table: { category: "Logo" },
    },
  },
  render: (args) => (
    <Logo
      brand={args.brand}
      height={args.height || heights[args.brand]}
    />
  ),
};

export const IkiLogo: Story = {
  name: "Odea ve Odeabank",
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 40,
        padding: 32,
        background: "var(--odea-surface-default)",
      }}
    >
      <Logo brand="odea" />
      <Logo brand="odeabank" />
    </div>
  ),
};

export const BuyukBoyut: Story = {
  name: "Uç durum · Büyük boyut",
  args: { brand: "odeabank", height: 48 },
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
