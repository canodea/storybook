import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import Checkbox, { type CheckboxProps, type CheckboxStatus } from "./Checkbox";

const meta = {
  title: "Components/Inputs/Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'ODEA MOBILE | Checkbox (primitive). Onay kutusu. Ürün ekranında TEK BAŞINA kullanılamaz; yalnızca Checkbox Input / Text Checkbox Input gibi üst bileşenlerin içinde kullanılır. Gerçek checkbox elemanıdır (aria-checked); görünümü CSS ile çizilir.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  status: CheckboxStatus;
  isDisabled: boolean;
} & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    status: "active",
    isDisabled: false,
  },
  argTypes: {
    ...themeArgTypes,
    status: {
      name: "Status",
      table: { category: "Durum" },
      control: "select",
      options: ["base", "active", "indeterminate"],
    },
    isDisabled: { name: "Disabled", table: { category: "Durum" } },
  },
  render: (args) => <Checkbox status={args.status} disabled={args.isDisabled} />,
};

export const Aktif: Story = {
  name: "Aktif",
  args: { status: "active" },
};

export const Bos: Story = {
  name: "Boş",
  args: { status: "base" },
};

export const Belirsiz: Story = {
  name: "Belirsiz",
  args: { status: "indeterminate" },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: { status: "base", disabled: true },
};

const senaryolar: CheckboxProps[] = [
  { status: "base" },
  { status: "active" },
  { status: "indeterminate" },
  { status: "base", disabled: true },
];

export const Senaryolar: Story = {
  args: Aktif.args,
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
      {senaryolar.map((args, i) => (
        <Checkbox key={i} {...args} />
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
