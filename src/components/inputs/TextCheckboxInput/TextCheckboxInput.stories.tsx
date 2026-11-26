import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import TextCheckboxInput, { type TextCheckboxInputProps } from "./TextCheckboxInput";

const meta = {
  title: "Components/Inputs/Text Checkbox Input",
  component: TextCheckboxInput,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Text Checkbox Input. Bir açıklama metni ve altında onay kutusu; sözleşme/onay alanlarında kullanılır. Sözleşme metninin altında onay kutusu + etiket gösterir.",
      },
    },
  },
} satisfies Meta<typeof TextCheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  sectionText: string;
  checkboxLabel: string;
  checked: boolean;
  isDisabled: boolean;
} & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    sectionText: "Text goes here",
    checkboxLabel: "Text goes here",
    checked: true,
    isDisabled: false,
  },
  argTypes: {
    ...themeArgTypes,
    sectionText: { name: "Section Text", table: { category: "İçerik" } },
    checkboxLabel: { name: "Checkbox Label", table: { category: "İçerik" } },
    checked: { name: "Checked", table: { category: "Durum" } },
    isDisabled: { name: "Disabled", table: { category: "Durum" } },
  },
  render: (args) => (
    <TextCheckboxInput
      sectionText={args.sectionText}
      checkboxLabel={args.checkboxLabel}
      checked={args.checked}
      disabled={args.isDisabled}
    />
  ),
};

export const Sozlesme: Story = {
  name: "Sözleşme",
  args: {
    sectionText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    checkboxLabel: "Text goes here",
    checked: true,
  },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: {
    sectionText: "Text goes here",
    checkboxLabel: "Text goes here",
    checked: false,
    disabled: true,
  },
};

const senaryolar: TextCheckboxInputProps[] = [
  Sozlesme.args as TextCheckboxInputProps,
  DevreDisi.args as TextCheckboxInputProps,
];

export const Senaryolar: Story = {
  args: Sozlesme.args,
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {senaryolar.map((args, i) => (
        <TextCheckboxInput key={i} {...args} />
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
