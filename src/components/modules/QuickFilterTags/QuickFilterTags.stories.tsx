import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import QuickFilterTags, { type QuickFilterTagsProps } from "./QuickFilterTags";

const meta = {
  title: "Components/Modules/Primitives/Quick Filter Tag",
  component: QuickFilterTags,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Quick Filter Tag. Quick Filter'ın alt modülü; tek başına kullanılmaz. Hızlı filtre etiketi (pill); seçiliyken ters zeminde (inverse) çizilir ve seçim durumu aria-pressed ile bildirilir.",
      },
    },
  },
} satisfies Meta<typeof QuickFilterTags>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  filterLabelText: string;
} & Omit<QuickFilterTagsProps, "filterLabel"> &
  ThemeArgs;

const toProps = (a: PlaygroundArgs): QuickFilterTagsProps => ({
  filterLabel: a.filterLabelText,
  selected: a.selected,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    filterLabelText: "LABEL",
    selected: false,
  },
  argTypes: {
    ...themeArgTypes,
    filterLabelText: { name: "Filter Label", table: { category: "İçerik" } },
    selected: { name: "Selected", table: { category: "Durum" } },
  },
  render: (args) => <QuickFilterTags {...toProps(args)} />,
};

export const Secilmemis: Story = {
  name: "Seçilmemiş",
  args: { filterLabel: "LABEL", selected: false },
};

export const Secili: Story = {
  name: "Seçili",
  args: { filterLabel: "LABEL", selected: true },
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
