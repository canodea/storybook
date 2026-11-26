import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import TextField, { type TextFieldProps, type TextFieldState } from "./TextField";

const meta = {
  title: "Components/Inputs/Text Field",
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Text Field. Tek satırlık metin girişi; ad-soyad, IBAN, telefon numarası gibi kısa değerler için kullanılır. Durumlar (boş, yazma, dolu, hata, devre dışı) görsel önizleme amaçlıdır; gerçek odakta da focused görünür. Number Selector telefon numarası girişinde ülke kodu + numara gösterir ve trailing ikonu kapatır.",
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const trailingIcons = {
  "Circle - Circle": { set: "Design", name: "Circle - Circle" },
  "Eye": { set: "Design", name: "Eye" },
  "Eye Slash": { set: "Design", name: "Eye Slash" },
  "Person": { set: "People", name: "Person" },
} as const;

type PlaygroundArgs = {
  labelText: string;
  valueText: string;
  helperText: string;
  showHelper: boolean;
  state: TextFieldState;
  numberSelector: boolean;
  countryCode: string;
  phoneNumber: string;
  phoneEntry: string;
  fullWidth: boolean;
  trailingIcon: IconChoice<typeof trailingIcons>;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): TextFieldProps => ({
  label: a.labelText,
  // Figma: Default boş alandır (etiket alanın içinde); değer diğer durumlarda gösterilir.
  value: a.state === "default" ? "" : a.valueText,
  helperMessage: a.helperText,
  showHelper: a.showHelper,
  state: a.state,
  numberSelector: a.numberSelector,
  countryCode: a.countryCode,
  phoneNumber: a.phoneNumber,
  phoneEntry: a.phoneEntry,
  fullWidth: a.fullWidth,
  trailingIcon: a.trailingIcon === NONE ? undefined : trailingIcons[a.trailingIcon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    labelText: "Label",
    valueText: "Text goes here",
    helperText: "Helper Text",
    showHelper: true,
    state: "filled",
    numberSelector: false,
    countryCode: "0500",
    phoneNumber: "000",
    phoneEntry: "05",
    fullWidth: false,
    trailingIcon: "Yok",
  },
  argTypes: {
    ...themeArgTypes,
    labelText: { name: "Label", table: { category: "İçerik" } },
    valueText: { name: "Value", table: { category: "İçerik" }, if: { arg: "state", neq: "default" } },
    helperText: { name: "Helper Text", table: { category: "Yardım" }, if: { arg: "showHelper" } },
    showHelper: { name: "Show Helper", table: { category: "Yardım" } },
    state: {
      name: "State",
      table: { category: "Durum" },
      control: "select",
      options: ["default", "disabled", "focused", "filled", "error"],
    },
    numberSelector: { name: "Number Selector", table: { category: "Telefon" } },
    countryCode: { name: "Country Code", table: { category: "Telefon" }, if: { arg: "numberSelector" } },
    phoneNumber: { name: "Phone Number", table: { category: "Telefon" }, if: { arg: "numberSelector" } },
    phoneEntry: {
      name: "Phone Entry",
      description: "Focused durumunda yazılmakta olan numara.",
      table: { category: "Telefon" },
      if: { arg: "numberSelector" },
    },
    fullWidth: { name: "Full Width", table: { category: "Boyut" } },
    trailingIcon: {
      name: "Trailing Icon",
      table: { category: "İkon" },
      control: "select",
      options: withNone(trailingIcons),
      if: { arg: "numberSelector", truthy: false },
    },
  },
  render: (args) => <TextField {...toProps(args)} />,
};

export const AdSoyad: Story = {
  name: "Ad soyad",
  args: {
    label: "Label",
    value: "Name Surname",
    helperMessage: "Helper Text",
    showHelper: true,
    state: "filled",
  },
};

export const Iban: Story = {
  name: "IBAN",
  args: {
    label: "Label",
    value: "TR00 0000 0000 0000 0000 0000 00",
    helperMessage: "Helper Text",
    showHelper: true,
    state: "focused",
  },
};

export const TelefonNumarasi: Story = {
  name: "Telefon numarası",
  args: {
    label: "Label",
    numberSelector: true,
    countryCode: "0500",
    phoneNumber: "000 00 00",
    helperMessage: "Helper Text",
    showHelper: true,
    state: "filled",
  },
};

export const Hata: Story = {
  name: "Hata",
  args: {
    label: "Label",
    value: "TR00 0000 0000 0000 0000 0000 00",
    helperMessage: "Error message",
    showHelper: true,
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
    state: "disabled",
  },
};

export const UzunDeger: Story = {
  name: "Uç durum · Uzun değer",
  args: {
    label: "Label",
    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    helperMessage: "Helper Text",
    showHelper: true,
    state: "filled",
  },
};

const senaryolar: TextFieldProps[] = [
  AdSoyad.args as TextFieldProps,
  Iban.args as TextFieldProps,
  TelefonNumarasi.args as TextFieldProps,
  Hata.args as TextFieldProps,
];

export const Senaryolar: Story = {
  args: AdSoyad.args,
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
      {senaryolar.map((args, i) => (
        <TextField key={i} {...args} />
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
