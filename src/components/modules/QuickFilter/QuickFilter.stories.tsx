import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import QuickFilter, { type QuickFilterProps } from "./QuickFilter";

const meta = {
  title: "Components/Modules/Quick Filter",
  component: QuickFilter,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Quick Filter. Yatay kaydırılabilir hızlı filtre satırı; Quick Filter Tag alt modülünün etiketlerinden oluşur. selected değer ya da indeks olarak verilebilir; tıklanan etiket onChange ile seçili indeks olarak bildirilir ve iç durum güncellenir.",
      },
    },
  },
} satisfies Meta<typeof QuickFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  tagCount: number;
  selected: string | number;
} & Omit<QuickFilterProps, "tags" | "selected"> &
  ThemeArgs;

const toProps = (a: PlaygroundArgs): QuickFilterProps => ({
  tags: Array.from({ length: a.tagCount }, (_, i) => `LABEL ${i + 1}`),
  selected: a.selected,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    tagCount: 8,
    selected: 0,
  },
  argTypes: {
    ...themeArgTypes,
    tagCount: {
      name: "Tag Count",
      control: { type: "range", min: 1, max: 12, step: 1 },
      table: { category: "İçerik" },
    },
    selected: { name: "Selected", table: { category: "Durum" } },
  },
  render: (args) => <QuickFilter {...toProps(args)} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
  args: {
    tags: ["LABEL 1", "LABEL 2", "LABEL 3", "LABEL 4", "LABEL 5"],
    selected: 0,
  },
};

export const SeciliDeger: Story = {
  name: "Değerle seçili",
  args: {
    tags: ["LABEL 1", "LABEL 2", "LABEL 3", "LABEL 4", "LABEL 5"],
    selected: "LABEL 4",
  },
};

export const Kaydirilabilir: Story = {
  name: "Kaydırılabilir (12 etiket)",
  args: {
    tags: Array.from({ length: 12 }, (_, i) => `LABEL ${i + 1}`),
    selected: 0,
  },
};

export const TekEtiket: Story = {
  name: "Uç durum · Tek etiket",
  args: {
    tags: ["LABEL"],
    selected: 0,
  },
};

// Playground yalnız Figma'daki özellikleri gösterir.
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
