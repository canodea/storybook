import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import Toggle, { type ToggleProps } from "./Toggle";

const meta = {
  title: "Components/Inputs/Primitives/Toggle",
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Toggle (primitive). Açık/kapalı anahtarı. Ürün ekranında TEK BAŞINA kullanılamaz; yalnızca Toggle Input gibi üst bileşenlerin içinde kullanılır. Gerçek switch elemanıdır (role=switch, aria-checked); görünümü CSS ile çizilir.",
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  checked: boolean;
  isDisabled: boolean;
} & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    checked: true,
    isDisabled: false,
  },
  argTypes: {
    ...themeArgTypes,
    checked: { name: "Active", table: { category: "Durum" } },
    isDisabled: { name: "Disabled", table: { category: "Durum" } },
  },
  render: (args) => <Toggle checked={args.checked} disabled={args.isDisabled} />,
};

export const Acik: Story = {
  name: "Açık",
  args: { checked: true },
};

export const Kapali: Story = {
  name: "Kapalı",
  args: { checked: false },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: { checked: false, disabled: true },
};

const senaryolar: ToggleProps[] = [
  { checked: true },
  { checked: false },
  { checked: false, disabled: true },
];

export const Senaryolar: Story = {
  args: Acik.args,
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
      {senaryolar.map((args, i) => (
        <Toggle key={i} {...args} />
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
