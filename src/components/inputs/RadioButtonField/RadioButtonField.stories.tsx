import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import RadioButtonField, {
  type RadioButtonFieldLayout,
} from "./RadioButtonField";

const meta = {
  title: "Components/Inputs/Radio Button Field",
  component: RadioButtonField,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Radio Button Field. Etiketli seçim düğmesi. Tek seçenek ya da birbirini dışlayan seçenek grubu (dikey/yatay) olabilir. Gruplar role=radiogroup ile işaretlenir; bağımsız çoklu seçim için kullanılmaz.",
      },
    },
  },
} satisfies Meta<typeof RadioButtonField>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  layout: RadioButtonFieldLayout;
  status: "base" | "active";
  isDisabled: boolean;
  multiLine: boolean;
  fieldLabel: string;
  title: string;
  info: string;
  optionTop: string;
  optionBottom: string;
  optionTopInfo: string;
  optionBottomInfo: string;
  optionLeft: string;
  optionRight: string;
  selected: "top" | "bottom" | "left" | "right" | "none";
} & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    layout: "vertical-options",
    status: "active",
    isDisabled: false,
    multiLine: false,
    fieldLabel: "Text goes here",
    title: "Label",
    info: "Sub text goes here",
    optionTop: "Text goes here",
    optionBottom: "Text goes here",
    optionTopInfo: "Sub text goes here",
    optionBottomInfo: "Sub text goes here",
    optionLeft: "Text",
    optionRight: "Text",
    selected: "bottom",
  },
  argTypes: {
    ...themeArgTypes,
    layout: {
      name: "Layout",
      table: { category: "Yapı" },
      control: "select",
      options: ["single", "vertical-options", "horizontal-options"],
    },
    status: {
      name: "Status",
      table: { category: "Durum" },
      control: "inline-radio",
      options: ["base", "active"],
      if: { arg: "layout", eq: "single" },
    },
    isDisabled: { name: "Disabled", table: { category: "Durum" } },
    multiLine: {
      name: "Multi Line",
      description: "Single: başlık + açıklama. Vertical Options: her seçenek başlık + açıklama.",
      table: { category: "Yapı" },
      if: { arg: "layout", neq: "horizontal-options" },
    },
    fieldLabel: {
      name: "Field Label",
      table: { category: "Metin" },
      if: { arg: "layout", neq: "vertical-options" },
    },
    // Storybook `if` tek koşul alır; layout single değilken multiLine render'da yok sayılır.
    title: { name: "Title", table: { category: "Tek seçenek" }, if: { arg: "layout", eq: "single" } },
    info: { name: "Info", table: { category: "Tek seçenek" }, if: { arg: "layout", eq: "single" } },
    optionTop: {
      name: "Option Top",
      table: { category: "Seçenekler" },
      if: { arg: "layout", eq: "vertical-options" },
    },
    optionBottom: {
      name: "Option Bottom",
      table: { category: "Seçenekler" },
      if: { arg: "layout", eq: "vertical-options" },
    },
    optionTopInfo: {
      name: "Option Top Info",
      table: { category: "Seçenekler" },
      if: { arg: "multiLine" },
    },
    optionBottomInfo: {
      name: "Option Bottom Info",
      table: { category: "Seçenekler" },
      if: { arg: "multiLine" },
    },
    optionLeft: {
      name: "Option Left",
      table: { category: "Seçenekler" },
      if: { arg: "layout", eq: "horizontal-options" },
    },
    optionRight: {
      name: "Option Right",
      table: { category: "Seçenekler" },
      if: { arg: "layout", eq: "horizontal-options" },
    },
    selected: {
      name: "Seçili seçenek",
      table: { category: "Seçenekler" },
      control: "select",
      options: ["top", "bottom", "left", "right", "none"],
      if: { arg: "layout", neq: "single" },
    },
  },
  render: (args) => (
    <RadioButtonField
      layout={args.layout}
      checked={args.layout === "single" && args.status === "active"}
      disabled={args.isDisabled}
      multiLine={args.layout !== "horizontal-options" && args.multiLine}
      fieldLabel={args.fieldLabel}
      title={args.title}
      info={args.info}
      optionTop={args.optionTop}
      optionBottom={args.optionBottom}
      optionTopInfo={args.optionTopInfo}
      optionBottomInfo={args.optionBottomInfo}
      optionLeft={args.optionLeft}
      optionRight={args.optionRight}
      value={args.layout === "single" || args.selected === "none" ? "" : args.selected}
    />
  ),
};

export const TekSatir: Story = {
  name: "Tek satır",
  args: { layout: "single", checked: true, fieldLabel: "Text goes here" },
};

export const CokSatir: Story = {
  name: "Çok satır",
  args: {
    layout: "single",
    checked: true,
    multiLine: true,
    title: "Label",
    info: "Sub text goes here",
  },
};

export const DikeySecenekler: Story = {
  name: "Dikey seçenekler",
  args: {
    layout: "vertical-options",
    optionTop: "Text goes here",
    optionBottom: "Text goes here",
    value: "bottom",
  },
};

export const DikeySeceneklerCokSatir: Story = {
  name: "Dikey seçenekler · çok satır",
  args: {
    layout: "vertical-options",
    multiLine: true,
    optionTop: "Title",
    optionTopInfo: "TR00 0000 0000 0000 0000 0000 00",
    optionBottom: "Title 2",
    optionBottomInfo: "TR00 0000 0000 0000 0000 0000 00",
    value: "top",
  },
};

export const YataySecenekler: Story = {
  name: "Yatay seçenekler",
  args: {
    layout: "horizontal-options",
    fieldLabel: "Text goes here",
    optionLeft: "Text",
    optionRight: "Text",
    value: "left",
  },
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
