import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Skeleton, { type SkeletonProps, type SkeletonShape } from "./Skeleton";

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Skeleton. Yüklenen içeriğin yerini tutan şekil. line 160x12, circle 40x40, block 327x96 varsayılan ölçülerdedir; width/height ile ezilebilir. list-item 327x72 satırı (circle 40 + iki satır + sağda 64) count kadar tekrarlar; card 327 genişlikte iki satır ve 295x48 blok içerir. Zemin --odea-surface-chip (card: surface-default), nabız animasyonu reduced-motion altında kapanır. Dekoratif olduğu için aria-hidden'dır.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  shape: SkeletonShape;
  count: number;
  widthText: string;
  heightText: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): SkeletonProps => ({
  shape: a.shape,
  count: a.count,
  width: a.widthText || undefined,
  height: a.heightText || undefined,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    shape: "line",
    count: 3,
    widthText: "",
    heightText: "",
  },
  argTypes: {
    ...themeArgTypes,
    shape: {
      name: "Shape",
      control: "inline-radio",
      options: ["line", "circle", "block", "list-item", "card"],
      table: { category: "Şekil" },
    },
    count: {
      name: "Count",
      control: { type: "number", min: 1, max: 6, step: 1 },
      table: { category: "Şekil" },
      if: { arg: "shape", eq: "list-item" },
    },
    widthText: {
      name: "Width",
      table: { category: "Boyut" },
    },
    heightText: {
      name: "Height",
      table: { category: "Boyut" },
    },
  },
  render: (args) => <Skeleton {...toProps(args)} />,
};

export const Satir: Story = {
  name: "Line",
  args: { shape: "line" },
};

export const Daire: Story = {
  name: "Circle",
  args: { shape: "circle" },
};

export const Blok: Story = {
  name: "Block",
  args: { shape: "block" },
};

export const Liste: Story = {
  name: "List item",
  args: { shape: "list-item", count: 3 },
};

export const Kart: Story = {
  name: "Card",
  args: { shape: "card" },
};

const senaryolar: SkeletonProps[] = [
  { shape: "line" },
  { shape: "circle" },
  { shape: "block" },
  { shape: "line", width: 96 },
  { shape: "list-item", count: 3 },
  { shape: "card" },
];

export const Senaryolar: Story = {
  args: { shape: "line" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 24,
        padding: 24,
        background: "var(--odea-background-canvas)",
      }}
    >
      {senaryolar.map((args, i) => (
        <Skeleton key={i} {...args} />
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
