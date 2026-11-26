import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import CurrencyConverter, {
  type CurrencyConverterProps,
  type CurrencyConverterStatus,
} from "./CurrencyConverter";

const meta = {
  title: "Components/Modules/Currency Converter",
  component: CurrencyConverter,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Currency Converter. Döviz dönüştürücü; üstte ve altta para birimi blokları, ortada kur ve değiştir butonu. Tutar yazılabilir, All Balance bakiyeyi doldurur, ⇅ para birimlerini yer değiştirir. status yalnız başlangıç görünümüdür; örnek kur ve bakiyeler gerçek veri değildir.",
      },
    },
  },
} satisfies Meta<typeof CurrencyConverter>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  status: CurrencyConverterStatus;
  rate: number;
  topCodeText: string;
  topNameText: string;
  topBalanceText: string;
  bottomCodeText: string;
  bottomNameText: string;
  bottomBalanceText: string;
  showButton: boolean;
  buttonLabelText: string;
  showHelper: boolean;
  helperMessageText: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CurrencyConverterProps => ({
  status: a.status,
  rate: a.rate,
  currencyCode2: a.topCodeText,
  currencyName2: a.topNameText,
  balanceAmount2: a.topBalanceText,
  currencyCode1: a.bottomCodeText,
  currencyName1: a.bottomNameText,
  balanceAmount1: a.bottomBalanceText,
  button: a.showButton,
  buttonLabel: a.buttonLabelText,
  helperText: a.showHelper,
  helperMessage: a.helperMessageText,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    status: "default",
    rate: 1.2345,
    topCodeText: "TL",
    topNameText: "Turkish Lira",
    topBalanceText: "1.234,56",
    bottomCodeText: "USD",
    bottomNameText: "American Dollar",
    bottomBalanceText: "1.234,56",
    showButton: false,
    buttonLabelText: "BUTTON",
    showHelper: false,
    helperMessageText: "Helper Text",
  },
  argTypes: {
    ...themeArgTypes,
    status: {
      name: "Status",
      table: { category: "Durum" },
      control: "select",
      options: ["default", "tapped", "balance", "filled"],
    },
    rate: { name: "Rate", table: { category: "Kur" }, control: { type: "number", step: 0.0001 } },
    topCodeText: { name: "Top Code", table: { category: "Para birimleri" } },
    topNameText: { name: "Top Name", table: { category: "Para birimleri" } },
    topBalanceText: { name: "Top Balance", table: { category: "Para birimleri" } },
    bottomCodeText: { name: "Bottom Code", table: { category: "Para birimleri" } },
    bottomNameText: { name: "Bottom Name", table: { category: "Para birimleri" } },
    bottomBalanceText: { name: "Bottom Balance", table: { category: "Para birimleri" } },
    showButton: { name: "Button", table: { category: "Aksiyon" } },
    buttonLabelText: {
      name: "Button Label",
      table: { category: "Aksiyon" },
      if: { arg: "showButton" },
    },
    showHelper: { name: "Helper Text", table: { category: "Yardım" } },
    helperMessageText: {
      name: "Helper Message",
      table: { category: "Yardım" },
      if: { arg: "showHelper" },
    },
  },
  render: (args) => <CurrencyConverter {...toProps(args)} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
  args: { status: "default" },
};

export const TutarGirisi: Story = {
  name: "Tutar girişi (tapped)",
  args: { status: "tapped" },
};

export const TumBakiye: Story = {
  name: "Tüm bakiye",
  args: { status: "balance" },
};

export const Dolu: Story = {
  name: "Dolu",
  args: { status: "filled" },
};

export const AlSat: Story = {
  name: "Al/Sat butonlu",
  args: {
    status: "filled",
    button: true,
    buttonLabel: "BUTTON",
  },
};

export const YardimMetni: Story = {
  name: "Yardım metinli",
  args: {
    status: "filled",
    button: true,
    buttonLabel: "BUTTON",
    helperText: true,
    helperMessage: "Helper Text",
  },
};

export const EtkilesimliDonusturucu: Story = {
  name: "Etkileşimli dönüştürücü",
  args: {
    status: "default",
    button: true,
    buttonLabel: "BUTTON",
  },
};

export const UzunTutar: Story = {
  name: "Uzun tutar",
  args: {
    balanceAmount2: "999.999.999.999,99",
  },
};

// Playground yalnız Figma'daki özellikleri gösterir.
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
