import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import { Icon } from "../../../foundations";
import Badge, { type BadgeProps, type BadgeType, type BadgeColor } from "./Badge";

const meta = {
  title: "Components/Feedback/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Badge. Sayaç rozeti (okunmamış bildirim, bekleyen işlem) ve yeni içerik işareti. count sayısı 99 üzerindeyse \"99+\" gösterir; dot yalnızca işarettir ve metin taşımaz. Danger dikkat, Neutral bilgi içindir; durum etiketi için Badge değil Status Tag kullanılır. Rozet, ikon/avatar üzerine sağ üst köşeye bindirilerek kullanılır.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  badgeType: BadgeType;
  badgeColor: BadgeColor;
  countValue: number;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): BadgeProps => ({
  type: a.badgeType,
  color: a.badgeColor,
  count: a.countValue,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    badgeType: "count",
    badgeColor: "danger",
    countValue: 3,
  },
  argTypes: {
    ...themeArgTypes,
    badgeType: {
      name: "Type",
      control: "inline-radio",
      options: ["count", "dot"],
      table: { category: "Tür" },
    },
    badgeColor: {
      name: "Color",
      control: "inline-radio",
      options: ["danger", "neutral"],
      table: { category: "Tür" },
    },
    countValue: {
      name: "Count",
      control: { type: "number", min: 0, step: 1 },
      table: { category: "Tür" },
      if: { arg: "badgeType", eq: "count" },
    },
  },
  render: (args) => <Badge {...toProps(args)} />,
};

export const SayacDanger: Story = {
  name: "Sayaç rozeti · danger",
  args: { type: "count", color: "danger", count: 3 },
};

export const SayacNeutral: Story = {
  name: "Sayaç rozeti · neutral",
  args: { type: "count", color: "neutral", count: 3 },
};

export const Nokta: Story = {
  name: "Nokta · danger",
  args: { type: "dot", color: "danger" },
};

export const IkonUzerinde: Story = {
  name: "İkon üzerinde",
  args: { type: "count", color: "danger", count: 3 },
  render: (args) => (
    <div style={{ position: "relative", display: "inline-flex", padding: 8 }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 9999,
          background: "var(--odea-surface-chip)",
          color: "var(--odea-icon-color-default)",
        }}
      >
        <Icon set="System" name="Bell" size={24} />
      </span>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <Badge {...args} />
      </span>
    </div>
  ),
};

export const YuzUzeri: Story = {
  name: "Uç durum · 99 üzeri",
  args: { type: "count", color: "danger", count: 150 },
};

const senaryolar: BadgeProps[] = [
  { type: "count", color: "danger", count: 3 },
  { type: "count", color: "neutral", count: 3 },
  { type: "dot", color: "danger" },
  { type: "dot", color: "neutral" },
  { type: "count", color: "danger", count: 150 },
];

export const Senaryolar: Story = {
  args: { type: "count", color: "danger", count: 3 },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 24 }}>
      {senaryolar.map((args, i) => (
        <Badge key={i} {...args} />
      ))}
    </div>
  ),
};

Playground.parameters = {
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
