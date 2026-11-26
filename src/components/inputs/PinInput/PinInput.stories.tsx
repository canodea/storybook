import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import PinInput, { type PinInputProps } from "./PinInput";

const meta = {
  title: "Components/Inputs/Pin Input",
  component: PinInput,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Pin Input. Doğrulama kodu girişi. Altı hücreli tek gizli input ile yönetilir; yapıştırma ve geri silme desteklenir. PIN rakamları asla açık gösterilmez.",
      },
    },
  },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  length: number;
  error: boolean;
} & ThemeArgs;

function InteractivePinInput(props: PinInputProps) {
  const [value, setValue] = useState(props.value ?? "");
  return <PinInput {...props} value={value} onChange={setValue} />;
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    length: 6,
    error: false,
  },
  argTypes: {
    ...themeArgTypes,
    length: { name: "Length", table: { category: "Yapı" } },
    error: { name: "Error", table: { category: "Durum" } },
  },
  render: (args) => <InteractivePinInput length={args.length} error={args.error} />,
};

export const Dolu: Story = {
  name: "Dolu",
  args: { value: "123456" },
};

export const HataliPin: Story = {
  name: "Hatalı PIN",
  args: { value: "123456", error: true },
};

export const KismiGiris: Story = {
  name: "Kısmi giriş",
  args: { value: "12" },
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
