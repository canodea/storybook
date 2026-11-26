import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import RadioButton, { type RadioButtonProps } from "./RadioButton";

const meta = {
  title: "Components/Inputs/Primitives/Radio Button",
  component: RadioButton,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Radio Button (primitive). Birbirini dışlayan seçim düğmesi. Ürün ekranında TEK BAŞINA kullanılamaz; yalnızca Radio Button Field gibi üst bileşenlerin içinde kullanılır. Gerçek radio elemanıdır; görünümü CSS ile çizilir.",
      },
    },
  },
} satisfies Meta<typeof RadioButton>;

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
    checked: { name: "Status", table: { category: "Durum" } },
    isDisabled: { name: "Disabled", table: { category: "Durum" } },
  },
  render: (args) => <RadioButton checked={args.checked} disabled={args.isDisabled} />,
};

export const Secili: Story = {
  name: "Seçili",
  args: { checked: true },
};

export const SeciliDegil: Story = {
  name: "Seçili değil",
  args: { checked: false },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: { checked: false, disabled: true },
};

const senaryolar: RadioButtonProps[] = [
  { checked: false },
  { checked: true },
  { checked: false, disabled: true },
];

export const Senaryolar: Story = {
  args: Secili.args,
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
      {senaryolar.map((args, i) => (
        <RadioButton key={i} {...args} />
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
