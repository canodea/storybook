import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import TextArea, { type TextAreaProps, type TextAreaState } from "./TextArea";

const meta = {
  title: "Components/Inputs/Text Area",
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Text Area. Çok satırlı serbest metin girişi; transfer açıklaması, talep/şikâyet, not gibi uzun metinler içindir. Altta yardım metni ve karakter sayacı gösterir. Alana yazılabilir: boşken Default, yazınca Filled, odakta Focused görünür. Tek satırlık değerler için Text Field kullanılır.",
      },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  labelText: string;
  valueText: string;
  helperText: string;
  showHelper: boolean;
  showCounter: boolean;
  state: TextAreaState;
  maxLength: number;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): TextAreaProps => ({
  label: a.labelText,
  // Figma: Default boş alandır (etiket alanın içinde); değer diğer durumlarda gösterilir.
  value: a.state === "default" ? "" : a.valueText,
  helperMessage: a.helperText,
  showHelper: a.showHelper,
  showCounter: a.showCounter,
  state: a.state,
  maxLength: a.maxLength,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    labelText: "Label",
    valueText: "Lorem ipsum dolor sit amet, consectetur.",
    helperText: "Helper Text",
    showHelper: true,
    showCounter: true,
    state: "filled",
    maxLength: 250,
  },
  argTypes: {
    ...themeArgTypes,
    labelText: { name: "Label", table: { category: "İçerik" } },
    valueText: { name: "Value", table: { category: "İçerik" }, if: { arg: "state", neq: "default" } },
    helperText: { name: "Helper Text", table: { category: "Yardım" }, if: { arg: "showHelper" } },
    showHelper: { name: "Show Helper", table: { category: "Yardım" } },
    showCounter: { name: "Show Counter", table: { category: "Sayaç" } },
    maxLength: { name: "Max Length", table: { category: "Sayaç" } },
    state: {
      name: "State",
      table: { category: "Durum" },
      control: "select",
      options: ["default", "focused", "filled", "error", "disabled"],
    },
  },
  render: (args) => <TextArea {...toProps(args)} />,
};

export const Aciklama: Story = {
  name: "Açıklama",
  args: {
    label: "Label",
    value: "Text goes here",
    helperMessage: "Helper Text",
    showHelper: true,
    showCounter: true,
    state: "filled",
  },
};

export const Hata: Story = {
  name: "Hata",
  args: {
    label: "Label",
    value: "Error message",
    helperMessage: "Error message",
    showHelper: true,
    showCounter: true,
    state: "error",
  },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: {
    label: "Label",
    value: "",
    helperMessage: "Helper Text",
    showHelper: true,
    showCounter: true,
    state: "disabled",
  },
};

export const UzunMetin: Story = {
  name: "Uç durum · Uzun metin",
  args: {
    label: "Label",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    helperMessage: "Helper Text",
    showHelper: true,
    showCounter: true,
    state: "filled",
  },
};

const senaryolar: TextAreaProps[] = [
  Aciklama.args as TextAreaProps,
  Hata.args as TextAreaProps,
  DevreDisi.args as TextAreaProps,
];

export const Senaryolar: Story = {
  args: Aciklama.args,
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
      {senaryolar.map((args, i) => (
        <TextArea key={i} {...args} />
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
