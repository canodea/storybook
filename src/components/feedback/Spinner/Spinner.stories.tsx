import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Spinner, { type SpinnerProps, type SpinnerSize, type SpinnerTone } from "./Spinner";

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Spinner. İşlemin sürdüğünü gösteren yüklenme halkası. İz (track) ince kenarlık renginde, gösterge yayı brand ya da neutral tondadır. small/medium/large boyutları 24/40/56 px'dir; 360° CSS animasyonu döner ve prefers-reduced-motion altında yavaşlar. role=\"status\" ile ekran okuyucuya duyurulur.",
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  size: SpinnerSize;
  tone: SpinnerTone;
  labelText: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): SpinnerProps => ({
  size: a.size,
  tone: a.tone,
  label: a.labelText,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    size: "medium",
    tone: "brand",
    labelText: "Yükleniyor",
  },
  argTypes: {
    ...themeArgTypes,
    size: {
      name: "Size",
      control: "inline-radio",
      options: ["small", "medium", "large"],
      table: { category: "Boyut" },
    },
    tone: {
      name: "Tone",
      control: "inline-radio",
      options: ["brand", "neutral"],
      table: { category: "Görünüm" },
    },
    labelText: { name: "Label", table: { category: "Erişilebilirlik" } },
  },
  render: (args) => <Spinner {...toProps(args)} />,
};

export const Kucuk: Story = {
  name: "Small · brand",
  args: { size: "small", tone: "brand" },
};

export const Orta: Story = {
  name: "Medium · brand",
  args: { size: "medium", tone: "brand" },
};

export const Buyuk: Story = {
  name: "Large · brand",
  args: { size: "large", tone: "brand" },
};

export const Neutral: Story = {
  name: "Medium · neutral",
  args: { size: "medium", tone: "neutral" },
};

const senaryolar: SpinnerProps[] = [
  { size: "small", tone: "brand" },
  { size: "medium", tone: "brand" },
  { size: "large", tone: "brand" },
  { size: "small", tone: "neutral" },
  { size: "medium", tone: "neutral" },
  { size: "large", tone: "neutral" },
];

export const Senaryolar: Story = {
  args: { size: "medium", tone: "brand" },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 24 }}>
      {senaryolar.map((args, i) => (
        <Spinner key={i} {...args} />
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
