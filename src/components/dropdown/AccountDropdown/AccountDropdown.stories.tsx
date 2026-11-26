import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import AccountDropdown, {
  type AccountDropdownProps,
  type AccountDropdownState,
} from "./AccountDropdown";

const meta = {
  title: "Components/Dropdown/Account Dropdown",
  component: AccountDropdown,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Account Dropdown. Hesap kartı; hesap adı, alt bilgi ve iki tutar satırı gösterir. Dropdown=True kartı hesap seçme alanına dönüştürür; State=Checkbox çoklu seçimde kullanılır ve oku gizler. Tutarlar tek satırdır.",
      },
    },
  },
} satisfies Meta<typeof AccountDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATES: AccountDropdownState[] = ["default", "hover", "checkbox"];

type PlaygroundArgs = {
  stateValue: AccountDropdownState;
  dropdownOn: boolean;
  checkedValue: boolean;
  nameText: string;
  accountInfoText: string;
  info1: string;
  amount1: string;
  info2: string;
  amount2: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): AccountDropdownProps => ({
  state: a.stateValue,
  dropdown: a.dropdownOn,
  checked: a.checkedValue,
  title: a.nameText,
  info: a.accountInfoText,
  balanceLabel: a.info1,
  balance: a.amount1,
  availableLabel: a.info2,
  available: a.amount2,
  onClick: () => {},
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    stateValue: "default",
    dropdownOn: true,
    checkedValue: false,
    nameText: "Title",
    accountInfoText: "Sub text goes here",
    info1: "Label",
    amount1: "1.234,56 TL",
    info2: "Label",
    amount2: "1.234,56 TL",
  },
  argTypes: {
    ...themeArgTypes,
    stateValue: {
      name: "State",
      control: "select",
      options: STATES,
      table: { category: "Durum" },
    },
    dropdownOn: {
      name: "Dropdown",
      table: { category: "Durum" },
      if: { arg: "stateValue", neq: "checkbox" },
    },
    checkedValue: {
      name: "Checked",
      table: { category: "Durum" },
      if: { arg: "stateValue", eq: "checkbox" },
    },
    nameText: { name: "Name", table: { category: "İçerik" } },
    accountInfoText: { name: "Account Info", table: { category: "İçerik" } },
    info1: { name: "Info 1", table: { category: "Bakiye" } },
    amount1: { name: "Amount 1", table: { category: "Bakiye" } },
    info2: { name: "Info 2", table: { category: "Bakiye" } },
    amount2: { name: "Amount 2", table: { category: "Bakiye" } },
  },
  render: (args) => <AccountDropdown {...toProps(args)} />,
};

export const HesapSecici: Story = {
  name: "Hesap seçici",
  args: {
    title: "Title",
    info: "Sub text goes here",
    balanceLabel: "Label",
    balance: "1.234,56 TL",
    availableLabel: "Label",
    available: "1.234,56 TL",
    dropdown: true,
    onClick: () => {},
  },
};

export const Hover: Story = {
  name: "Üzerine gelme",
  args: {
    title: "Title",
    info: "Sub text goes here",
    balanceLabel: "Label",
    balance: "1.234,56 TL",
    availableLabel: "Label",
    available: "1.234,56 TL",
    state: "hover",
  },
};

export const CokluHesapSecimi: Story = {
  name: "Çoklu hesap seçimi",
  args: {
    state: "checkbox",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <AccountDropdown state="checkbox" title="Title" info="Sub text goes here" />
      <AccountDropdown state="checkbox" title="Title 2" info="Sub text goes here" checked />
      <AccountDropdown state="checkbox" title="Title 3" info="Sub text goes here" />
    </div>
  ),
};

export const UzunMetin: Story = {
  name: "Uç durum · uzun metin",
  args: {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    balanceLabel: "Label",
    balance: "1.234.567,89 TL",
    availableLabel: "Label",
    available: "1.234.567,89 TL",
  },
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (className vb.) burada gizlenir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
