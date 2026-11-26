import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Divider, { type DividerSize } from "../Divider";
import ListItem, { type ListItemProps } from "./ListItem";

const meta = {
  title: "Components/List Item/List Item",
  component: ListItem,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | List Item. Hesap, kart, ayar ve işlem listeleri için satır; tek satır 56px, iki satır 72px. `onClick` verilirse tüm satır bir buton olur. Varsayılan küp ikon gerçek bir işlemi temsil etmez; anlamlı bir ikon seçilmelidir.",
      },
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const leadingIcons = {
  Cube: { set: "Design", name: "Cube" },
  House: { set: "Maps", name: "House" },
  Coin: { set: "Commerce", name: "Coin" },
  "Credit Card": { set: "Banking", name: "CreditCard" },
  Bank: { set: "Math", name: "Bank" },
  User: { set: "People", name: "User" },
  Bell: { set: "System", name: "Bell" },
  Gear: { set: "System", name: "Gear" },
} as const;

const arrowIcons = {
  "Caret Right": { set: "Arrows / Caret", name: "Right" },
  "Caret Down": { set: "Arrows / Caret", name: "Down" },
  "Caret Up": { set: "Arrows / Caret", name: "Up" },
} as const;

const dividerSizes: DividerSize[] = ["full", "half", "short", "xshort"];

type PlaygroundArgs = {
  label: string;
  supportingText: string;
  multiLine: boolean;
  heading: boolean;
  leadingIcon: IconChoice<typeof leadingIcons>;
  trailingArrow: IconChoice<typeof arrowIcons>;
  clickable: boolean;
  listMode: boolean;
  rows: number;
  showDivider: boolean;
  dividerSize: DividerSize;
  background: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ListItemProps => ({
  label: a.label,
  supportingText: a.supportingText,
  multiLine: a.multiLine,
  heading: a.heading,
  leadingIcon: a.leadingIcon === NONE ? undefined : leadingIcons[a.leadingIcon],
  trailingArrow: a.trailingArrow === NONE ? null : arrowIcons[a.trailingArrow],
  onClick: a.clickable ? () => {} : undefined,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    label: "Label",
    supportingText: "Sub text goes here",
    multiLine: false,
    heading: false,
    leadingIcon: NONE,
    trailingArrow: "Caret Right",
    clickable: false,
    listMode: false,
    rows: 4,
    showDivider: true,
    dividerSize: "half",
    background: true,
  },
  argTypes: {
    ...themeArgTypes,
    label: { name: "Label", table: { category: "İçerik" } },
    supportingText: { name: "Supporting Text", table: { category: "İçerik" } },
    multiLine: { name: "Multi Line", table: { category: "Görünüm" } },
    heading: { name: "Heading", table: { category: "Görünüm" } },
    leadingIcon: {
      name: "Leading Icon",
      table: { category: "İkonlar" },
      control: "select",
      options: withNone(leadingIcons),
    },
    trailingArrow: {
      name: "Trailing Arrow",
      table: { category: "İkonlar" },
      control: "select",
      options: withNone(arrowIcons),
    },
    clickable: {
      name: "Clickable",
      control: "boolean",
      table: { category: "Davranış" },
    },
    listMode: {
      name: "List Mode",
      control: "boolean",
      table: { category: "Liste" },
    },
    rows: {
      name: "Rows",
      control: { type: "range", min: 1, max: 6, step: 1 },
      table: { category: "Liste" },
      if: { arg: "listMode" },
    },
    showDivider: {
      name: "Show Divider",
      control: "boolean",
      table: { category: "Liste" },
      if: { arg: "listMode" },
    },
    dividerSize: {
      name: "Divider Size",
      control: "select",
      options: dividerSizes,
      table: { category: "Liste" },
      if: { arg: "listMode" },
    },
    background: {
      name: "Background",
      control: "boolean",
      table: { category: "Liste" },
      if: { arg: "listMode" },
    },
  },
  render: (args) => {
    if (!args.listMode) return <ListItem {...toProps(args)} />;
    return (
      <div
        style={{
          width: 375,
          background: args.background ? "var(--odea-surface-default)" : "transparent",
        }}
      >
        {Array.from({ length: args.rows }, (_, i) => (
          <Fragment key={i}>
            <ListItem {...toProps(args)} />
            {args.showDivider && i < args.rows - 1 && <Divider size={args.dividerSize} />}
          </Fragment>
        ))}
      </div>
    );
  },
};

export const TekSatir: Story = {
  name: "Tek satır",
  args: { label: "Title", heading: true },
};

export const IkiSatir: Story = {
  name: "İki satır",
  args: {
    label: "Title",
    supportingText: "Sub text goes here",
    multiLine: true,
    heading: true,
  },
};

export const Ikonlu: Story = {
  name: "İkonlu satır",
  args: {
    label: "Title 2",
    heading: true,
    leadingIcon: { set: "Commerce", name: "Coin" },
  },
};

export const ButonSatir: Story = {
  name: "Tıklanabilir satır",
  args: {
    label: "Label",
    heading: true,
    leadingIcon: { set: "Maps", name: "House" },
    onClick: () => {},
  },
};

export const UzunMetin: Story = {
  name: "Uç durum · Uzun metin",
  args: {
    label: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    supportingText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    multiLine: true,
    heading: true,
  },
};

export const SadeSatir: Story = {
  name: "Uç durum · İkonsuz satır",
  args: { label: "Label", trailingArrow: null },
};

export const Liste: Story = {
  name: "Liste",
  args: { label: "Label" },
  render: () => (
    <div style={{ background: "var(--odea-background-canvas)", padding: 24 }}>
      <div
        style={{
          width: 375,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          background: "var(--odea-surface-default)",
        }}
      >
        <ListItem label="Label" heading />
        <Divider size="half" />
        <ListItem label="Label" supportingText="Sub text goes here" multiLine heading />
        <Divider size="half" />
        <ListItem label="Label" supportingText="Sub text goes here" multiLine />
        <Divider size="half" />
        <ListItem label="Label" />
      </div>
    </div>
  ),
};

export const Senaryolar: Story = {
  args: { label: "Label" },
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
      <ListItem label="Title" heading />
      <ListItem label="Title" supportingText="Sub text goes here" multiLine heading />
      <ListItem label="Title 2" heading leadingIcon={{ set: "Commerce", name: "Coin" }} />
      <ListItem label="Label" heading onClick={() => {}} />
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
