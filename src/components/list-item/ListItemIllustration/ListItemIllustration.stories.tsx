import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import ListItemIllustration, { type ListItemIllustrationProps } from "./ListItemIllustration";

const meta = {
  title: "Components/List Item/Illustration",
  component: ListItemIllustration,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | List Item Illustration. Ürün/özellik tanıtımı için 80x80 illüstrasyonlu satır. Sarı yer tutucu yerine anlamlı, onaylı bir illüstrasyon seçilmelidir.",
      },
    },
  },
} satisfies Meta<typeof ListItemIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

const arrowIcons = {
  "Caret Right": { set: "Arrows / Caret", name: "Right" },
  "Caret Down": { set: "Arrows / Caret", name: "Down" },
  "Caret Up": { set: "Arrows / Caret", name: "Up" },
} as const;

type PlaygroundArgs = {
  headingText: string;
  supportingText: string;
  trailingArrow: IconChoice<typeof arrowIcons>;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ListItemIllustrationProps => ({
  headingText: a.headingText,
  supportingText: a.supportingText,
  trailingArrow: a.trailingArrow === NONE ? null : arrowIcons[a.trailingArrow],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    headingText: "Label",
    supportingText: "Sub text goes here",
    trailingArrow: NONE,
  },
  argTypes: {
    ...themeArgTypes,
    headingText: { name: "Heading Text", table: { category: "İçerik" } },
    supportingText: { name: "Supporting Text", table: { category: "İçerik" } },
    trailingArrow: {
      name: "Trailing Arrow",
      table: { category: "İkonlar" },
      control: "select",
      options: withNone(arrowIcons),
    },
  },
  render: (args) => <ListItemIllustration {...toProps(args)} />,
};

export const YerTutucu: Story = {
  name: "Yer tutuculu",
  args: { headingText: "Title", supportingText: "Sub text goes here" },
};

export const Oklu: Story = {
  name: "Tıklanabilir",
  args: {
    headingText: "Title",
    supportingText: "Sub text goes here",
    trailingArrow: { set: "Arrows / Caret", name: "Right" },
    onClick: () => {},
  },
};

export const UzunMetin: Story = {
  name: "Uç durum · Uzun metin",
  args: {
    headingText: "Lorem ipsum dolor sit amet consectetur adipiscing",
    supportingText: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do",
  },
};

export const Senaryolar: Story = {
  args: { headingText: "Label" },
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 16,
        padding: 24,
      }}
    >
      <ListItemIllustration headingText="Title" supportingText="Sub text goes here" />
      <ListItemIllustration
        headingText="Title"
        supportingText="Sub text goes here"
        trailingArrow={{ set: "Arrows / Caret", name: "Right" }}
        onClick={() => {}}
      />
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
