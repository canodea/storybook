import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import Pin, { type PinProps, type PinState } from "./Pin";

const meta = {
  title: "Components/Inputs/Primitives/Pin",
  component: Pin,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Pin (primitive). Doğrulama kodu hücresi. Ürün ekranında TEK BAŞINA kullanılamaz; yalnızca Pin Input gibi üst bileşenlerin içinde kullanılır. PIN rakamları asla açık gösterilmez; dolu hücre her zaman maskelenir.",
      },
    },
  },
} satisfies Meta<typeof Pin>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  state: PinState;
} & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    state: "filled",
  },
  argTypes: {
    ...themeArgTypes,
    state: {
      name: "State",
      table: { category: "Durum" },
      control: "select",
      options: ["default", "focused", "filled", "error"],
    },
  },
  render: (args) => <Pin state={args.state} />,
};

export const Bos: Story = {
  name: "Boş",
  args: { state: "default" },
};

export const Odakli: Story = {
  name: "Odaklı",
  args: { state: "focused" },
};

export const Dolu: Story = {
  name: "Dolu",
  args: { state: "filled" },
};

export const Hatali: Story = {
  name: "Hatalı",
  args: { state: "error" },
};

const senaryolar: PinProps[] = [
  { state: "default" },
  { state: "focused" },
  { state: "filled" },
  { state: "error" },
];

export const Senaryolar: Story = {
  args: Bos.args,
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      {senaryolar.map((args, i) => (
        <Pin key={i} {...args} />
      ))}
    </div>
  ),
};

Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
