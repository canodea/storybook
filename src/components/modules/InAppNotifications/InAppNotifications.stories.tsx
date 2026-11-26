import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import InAppNotifications, {
  type InAppNotificationsProps,
} from "./InAppNotifications";

const meta = {
  title: "Components/Modules/In-App Notifications",
  component: InAppNotifications,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | In-App Notifications. Ana sayfa kartı; Status (Offer, Reminder, Warning) illüstrasyonu ve durum rengini belirler. Durum satırında nokta ve etiket aynı durum rengini alır.",
      },
    },
  },
} satisfies Meta<typeof InAppNotifications>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  titleText: string;
  descriptionText: string;
  textLinkText: string;
  statusLabelText: string;
} & Omit<InAppNotificationsProps, "title" | "description" | "textLink" | "statusLabel"> &
  ThemeArgs;

const toProps = (a: PlaygroundArgs): InAppNotificationsProps => ({
  status: a.status,
  title: a.titleText,
  description: a.descriptionText || undefined,
  textLink: a.textLinkText,
  statusLabel: a.statusLabelText || undefined,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    status: "offer",
    titleText: "Lorem ipsum dolor sit amet.",
    descriptionText:
      "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLinkText: "TEXT LINK",
    statusLabelText: "",
  },
  argTypes: {
    ...themeArgTypes,
    status: { name: "Status", table: { category: "Durum" } },
    titleText: { name: "Title", table: { category: "İçerik" } },
    descriptionText: { name: "Description", table: { category: "İçerik" } },
    textLinkText: { name: "Text Link", table: { category: "İçerik" } },
    statusLabelText: { name: "Status Label", table: { category: "Durum" } },
  },
  render: (args) => <InAppNotifications {...toProps(args)} />,
};

export const Teklif: Story = {
  name: "Teklif",
  args: {
    status: "offer",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
};

export const Hatirlatma: Story = {
  name: "Hatırlatma",
  args: {
    status: "reminder",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
};

export const Uyari: Story = {
  name: "Uyarı",
  args: {
    status: "warning",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
};

export const KoyuBaslikAlaninda: Story = {
  name: "Koyu başlık alanında",
  args: {
    status: "offer",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
  render: (args) => (
    <div
      data-theme="dark"
      style={{
        background: "var(--odea-surface-muted)",
        padding: 24,
      }}
    >
      <InAppNotifications {...args} />
    </div>
  ),
};

const senaryolar: InAppNotificationsProps[] = [
  {
    status: "offer",
    title: "Lorem ipsum dolor sit amet.",
    description: "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
  {
    status: "reminder",
    title: "Lorem ipsum dolor sit amet.",
    description: "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
  {
    status: "warning",
    title: "Lorem ipsum dolor sit amet.",
    description: "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    textLink: "TEXT LINK",
  },
];

export const Senaryolar: Story = {
  args: senaryolar[0],
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
        padding: 24,
      }}
    >
      {senaryolar.map((args, i) => (
        <InAppNotifications key={i} {...args} />
      ))}
    </div>
  ),
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
