import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import ToastMessage, { type ToastMessageProps } from "./ToastMessage";

const meta = {
  title: "Components/Modules/Toast Message",
  component: ToastMessage,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Toast Message. İşlem geri bildirimi için kısa süreli mesaj. Önde success StatusTag (isteğe bağlı) ve mesaj metni bulunur; role=status ve aria-live=polite ile ekran okuyuculara duyurulur.",
      },
    },
  },
} satisfies Meta<typeof ToastMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  messageText: string;
} & Omit<ToastMessageProps, "message"> &
  ThemeArgs;

const toProps = (a: PlaygroundArgs): ToastMessageProps => ({
  message: a.messageText,
  icon: a.icon,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    messageText: "Text goes here",
    icon: true,
  },
  argTypes: {
    ...themeArgTypes,
    messageText: { name: "Message", table: { category: "İçerik" } },
    icon: { name: "Icon", table: { category: "Görünüm" } },
  },
  render: (args) => <ToastMessage {...toProps(args)} />,
};

export const Ikonlu: Story = {
  name: "İkonlu",
  args: {
    message: "Text goes here",
    icon: true,
  },
};

export const Ikonsuz: Story = {
  name: "İkonsuz",
  args: {
    message: "Text goes here",
    icon: false,
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
