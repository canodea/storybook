import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import Divider, { type DividerSize } from "./Divider";

const meta = {
  title: "Components/List Item/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Divider. Etkileşimsiz liste ayırıcı; liste gruplarını böler. Sağa yaslı 2px çizgi, `size` prop'uyla dört genişlikte gelir (full, half, short, xshort).",
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = { size: DividerSize } & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    size: "full",
  },
  argTypes: {
    ...themeArgTypes,
    size: {
      name: "Size",
      control: "select",
      options: ["full", "half", "short", "xshort"],
      table: { category: "Görünüm" },
    },
  },
  render: (args) => <Divider size={args.size} />,
};

export const Full: Story = {
  name: "Tam genişlik",
  args: { size: "full" },
};

export const Half: Story = {
  name: "Yarım",
  args: { size: "half" },
};

export const Short: Story = {
  name: "Kısa",
  args: { size: "short" },
};

export const XShort: Story = {
  name: "Çok kısa",
  args: { size: "xshort" },
};

export const Senaryolar: Story = {
  args: { size: "full" },
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 24,
      }}
    >
      {(["full", "half", "short", "xshort"] as DividerSize[]).map((size) => (
        <Divider key={size} size={size} />
      ))}
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
