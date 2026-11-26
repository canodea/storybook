import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import Dropdown, { type DropdownProps, type DropdownStyle } from "./Dropdown";

const meta = {
  title: "Components/Dropdown/Dropdown",
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Dropdown. Seçim listesi. Full Width yalnız web içindir; mobilde inset (Full Width=False) kullanılır. `style` önizleme içindir; gerçek kullanımda tıklayınca açılır. Checkbox/Radio iç kontrolleri Dropdown dışında kullanılmaz.",
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const STYLES: DropdownStyle[] = [
  "default",
  "disabled",
  "focused",
  "filled",
  "error",
  "opened",
  "default-opened",
  "radio-button-opened",
  "picker-opened",
  "picker-range-opened",
];

const OPTIONS = ["Option One", "Option Two", "Option Three", "Option Four"];

type PlaygroundArgs = {
  style: DropdownStyle;
  fullWidth: boolean;
  fieldLabel: string;
  valueText: string;
  helperText: boolean;
  helperMessage: string;
  search: boolean;
  searchPlaceholder: string;
  checkbox: boolean;
  selectedDate: string;
  dateCaption: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): DropdownProps => ({
  style: a.style,
  fullWidth: a.fullWidth,
  fieldLabel: a.fieldLabel,
  value: a.valueText || undefined,
  options: OPTIONS,
  helperText: a.helperText,
  helperMessage: a.helperMessage,
  search: a.search,
  searchPlaceholder: a.searchPlaceholder,
  checkbox: a.checkbox,
  selectedDate: a.selectedDate,
  dateCaption: a.dateCaption,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    style: "default",
    fullWidth: false,
    fieldLabel: "Select an option",
    valueText: "",
    helperText: false,
    helperMessage: "Helper Text",
    search: false,
    searchPlaceholder: "Search",
    checkbox: false,
    selectedDate: "8th November 2021",
    dateCaption: "Selected date",
  },
  argTypes: {
    ...themeArgTypes,
    style: { name: "Style", control: "select", options: STYLES, table: { category: "Görünüm" } },
    fullWidth: { name: "Full Width", table: { category: "Görünüm" } },
    fieldLabel: { name: "Field Label", table: { category: "İçerik" } },
    valueText: { name: "Value", table: { category: "İçerik" } },
    helperText: { name: "Helper Text", table: { category: "Yardımcı metin" } },
    helperMessage: {
      name: "Helper Message",
      table: { category: "Yardımcı metin" },
      if: { arg: "helperText" },
    },
    search: { name: "Search", table: { category: "Arama" } },
    searchPlaceholder: { name: "Search Placeholder", table: { category: "Arama" }, if: { arg: "search" } },
    checkbox: {
      name: "Checkbox",
      table: { category: "Radyo/Onay" },
      if: { arg: "style", eq: "radio-button-opened" },
    },
    selectedDate: {
      name: "Selected Date",
      table: { category: "Tarih seçici" },
      if: { arg: "style", eq: "picker-opened" },
    },
    dateCaption: {
      name: "Date Caption",
      table: { category: "Tarih seçici" },
      if: { arg: "style", eq: "picker-opened" },
    },
  },
  render: (args) => <Dropdown {...toProps(args)} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
  args: { fieldLabel: "Label", options: OPTIONS },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: { style: "disabled", fieldLabel: "Label", options: OPTIONS },
};

export const Odakli: Story = {
  name: "Odaklı",
  args: { style: "focused", fieldLabel: "Label", options: OPTIONS },
};

export const Hata: Story = {
  name: "Hata",
  args: { style: "error", fieldLabel: "Label", helperText: true, helperMessage: "Error message", options: OPTIONS },
};

export const Dolu: Story = {
  name: "Dolu",
  args: { style: "filled", fieldLabel: "Label", value: "Option One", options: OPTIONS },
};

export const Acik: Story = {
  name: "Açık",
  args: { style: "default-opened", fieldLabel: "Label", value: "Option Two", options: OPTIONS },
};

export const AcikArama: Story = {
  name: "Açık · arama",
  args: { style: "default-opened", fieldLabel: "Label", search: true, searchPlaceholder: "Search", options: OPTIONS },
};

export const RadyoButonlu: Story = {
  name: "Radyo butonlu açık",
  args: { style: "radio-button-opened", value: "Option Two", options: OPTIONS },
};

export const OnayKutulu: Story = {
  name: "Onay kutulu açık",
  args: { style: "radio-button-opened", checkbox: true, value: "Option Two", options: OPTIONS },
};

export const TarihSecici: Story = {
  name: "Tarih seçici",
  args: { style: "picker-opened", selectedDate: "8th November 2021", dateCaption: "Selected date" },
};

export const TarihAraligi: Story = {
  name: "Tarih aralığı",
  args: { style: "picker-range-opened", selectedDate: "8th November 2021", dateCaption: "Selected date" },
};

export const UzunSecenek: Story = {
  name: "Uç durum · Uzun seçenek",
  args: {
    style: "default-opened",
    options: ["Lorem ipsum dolor sit amet consectetur adipiscing", "Option Two", "Option Three"],
  },
};

export const Senaryolar: Story = {
  args: { options: OPTIONS },
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 16,
        padding: 24,
      }}
    >
      <Dropdown fieldLabel="Label" options={OPTIONS} />
      <Dropdown style="default-opened" fieldLabel="Label" options={OPTIONS} />
      <Dropdown style="radio-button-opened" options={OPTIONS} />
      <Dropdown style="picker-opened" />
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
