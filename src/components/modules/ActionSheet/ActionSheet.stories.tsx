import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Divider from "../../list-item/Divider";
import ListItem from "../../list-item/ListItem";
import ActionSheet, { type ActionSheetProps } from "./ActionSheet";

const meta = {
  title: "Components/Modules/Action Sheet",
  component: ActionSheet,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Action Sheet. Alttan açılan, tutamaçlı ve SectionDivider başlıklı levha. textLink başlığı cta'ya, icon başlığı tek ikona çevirir; ikisi de yoksa base başlık kullanılır. children ile içerik (ör. List Item satırları) verilir; en altta HomeIndicator bulunur.",
      },
    },
  },
} satisfies Meta<typeof ActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  labelText: string;
} & Omit<ActionSheetProps, "label"> &
  ThemeArgs;

const toProps = (a: PlaygroundArgs): ActionSheetProps => ({
  label: a.labelText,
  icon: a.icon,
  textLink: a.textLink,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    labelText: "Divider",
    icon: false,
    textLink: false,
  },
  argTypes: {
    ...themeArgTypes,
    labelText: { name: "Label", table: { category: "İçerik" } },
    icon: { name: "Icon", table: { category: "Başlık" } },
    textLink: { name: "Text Link", table: { category: "Başlık" } },
  },
  render: (args) => <ActionSheet {...toProps(args)} />,
};

export const Islemler: Story = {
  name: "İşlemler",
  args: {
    label: "Label",
    children: (
      <>
        <ListItem label="Label" leadingIcon={{ set: "Banking", name: "Money Transfer" }} />
        <Divider size="half" />
        <ListItem label="Label" leadingIcon={{ set: "Banking", name: "Money Income" }} />
        <Divider size="half" />
        <ListItem label="Label" leadingIcon={{ set: "Banking", name: "Payment" }} />
      </>
    ),
  },
};

export const IconBaslik: Story = {
  name: "İkonlu başlık",
  args: {
    label: "Label",
    icon: true,
  },
};

export const LinkBaslik: Story = {
  name: "Metin linkli başlık",
  args: {
    label: "Label",
    textLink: true,
  },
};

export const Bos: Story = {
  name: "Uç durum · İçeriksiz",
  args: {
    label: "Divider",
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
