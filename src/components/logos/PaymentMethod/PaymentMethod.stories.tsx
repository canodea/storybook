import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import PaymentMethod, {
  paymentMethods,
  paymentMethodLabels,
  type PaymentMethodName,
} from "./PaymentMethod";

const description = `ODEA MOBILE | Payment Method. 39 ödeme yöntemi logosu. Bu varlıklar bir ödeme yönteminin Odea tarafından desteklendiği, sunulduğu veya etkin olduğu anlamına GELMEZ; yalnızca ürün ve hukuk/marka onayı verilmiş kanallarda, marka kullanım koşulları doğrulanarak kullanılır. Logo oranı (35:24) hiçbir boyutta bozulmaz. Playground ekranında Figma'daki Method özelliği, boyut ve erişilebilir ad kontrol edilir. Tema: renkler asset içinde sabittir; koyu temada logo zemini değişmez.`;

const meta = {
  title: "Foundations/Logos/Payment Method",
  component: PaymentMethod,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof PaymentMethod>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  method: PaymentMethodName;
  size: number;
  alt: string;
} & ThemeArgs;

/** Figma'daki Method özelliği, logo boyutu ve erişilebilir ad. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    method: "visa",
    size: 24,
    alt: "",
  },
  argTypes: {
    ...themeArgTypes,
    method: {
      name: "Method",
      control: "select",
      options: paymentMethods,
      table: { category: "Logo" },
    },
    size: {
      name: "Size",
      control: { type: "number", min: 16, max: 96, step: 4 },
      description: "Yükseklik (px); genişlik 35:24 oranında hesaplanır.",
      table: { category: "Logo" },
    },
    alt: {
      name: "Alt",
      control: "text",
      description: "Erişilebilir ad. Boş bırakılırsa marka adı kullanılır.",
      table: { category: "Erişilebilirlik" },
    },
  },
  render: (args) => <PaymentMethod method={args.method} size={args.size} alt={args.alt || undefined} />,
};

export const OdemeYontemiSatiri: Story = {
  name: "Ödeme yöntemi satırı",
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 16,
        padding: 24,
        background: "var(--odea-surface-default)",
      }}
    >
      {(["visa", "mastercard", "amex", "maestro", "paypal", "googlepay"] as const).map(
        (method) => (
          <PaymentMethod key={method} method={method} size={32} />
        ),
      )}
    </div>
  ),
};

export const BuyukBoyut: Story = {
  name: "Uç durum · Büyük boyut",
  args: { method: "mastercard", size: 72 },
};

export const TumLogolar: Story = {
  name: "Tüm logolar",
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 24,
        padding: 32,
        background: "var(--odea-surface-default)",
      }}
    >
      {paymentMethods.map((method) => (
        <div
          key={method}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
            width: 104,
          }}
        >
          <PaymentMethod method={method} alt="" />
          <span
            style={{
              fontFamily: "var(--font-family-body, 'Inter', sans-serif)",
              fontSize: 12,
              lineHeight: "18px",
              color: "var(--odea-text-label)",
              textAlign: "center",
            }}
          >
            {paymentMethodLabels[method]}
          </span>
        </div>
      ))}
    </div>
  ),
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
