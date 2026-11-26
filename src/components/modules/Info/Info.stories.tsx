import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Info, { type InfoProps } from "./Info";

const meta = {
  title: "Components/Modules/Info",
  component: Info,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Info. Öncelikli/ikincil bilgi, gereklilik listesi ve repo bilgisi için bilgi kutusu; yalnız mevcut düzenler kullanılır. primary/secondary tek satır bilgi (isteğe bağlı aksiyon linki), requirements tek sütunlu gereklilik listesi, bonds-repo ise blok notu + etiket/değer satırıdır.",
      },
    },
  },
} satisfies Meta<typeof Info>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  messageText: string;
  showAction: boolean;
  actionLabelText: string;
  requirementsList: string[];
  blockedNoteText: string;
  bondsRepoLabelText: string;
  bondsRepoValueText: string;
} & Omit<
  InfoProps,
  | "message"
  | "textButton"
  | "actionLabel"
  | "requirements"
  | "blockedNote"
  | "bondsRepoLabel"
  | "bondsRepoValue"
> &
  ThemeArgs;

const toProps = (a: PlaygroundArgs): InfoProps => ({
  style: a.style,
  message: a.messageText,
  textButton: a.showAction,
  actionLabel: a.actionLabelText,
  requirements: a.requirementsList,
  blockedNote: a.blockedNoteText || undefined,
  bondsRepoLabel: a.bondsRepoLabelText || undefined,
  bondsRepoValue: a.bondsRepoValueText || undefined,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    style: "primary",
    messageText: "Text",
    showAction: true,
    actionLabelText: "Create",
    requirementsList: ["Label", "Label 2", "Label 3", "Label 4"],
    blockedNoteText: "Text goes here",
    bondsRepoLabelText: "Label",
    bondsRepoValueText: "1.234,56 TL",
  },
  argTypes: {
    ...themeArgTypes,
    style: {
      name: "Style",
      table: { category: "Görünüm" },
      control: "select",
      options: ["primary", "secondary", "requirements", "bonds-repo"],
    },
    messageText: { name: "Message", table: { category: "İçerik" } },
    showAction: { name: "Text Button", table: { category: "Aksiyon" } },
    actionLabelText: {
      name: "Action Label",
      table: { category: "Aksiyon" },
      if: { arg: "showAction" },
    },
    requirementsList: {
      name: "Requirements",
      control: "object",
      table: { category: "İçerik" },
      if: { arg: "style", eq: "requirements" },
    },
    blockedNoteText: {
      name: "Blocked Note",
      table: { category: "İçerik" },
      if: { arg: "style", eq: "bonds-repo" },
    },
    bondsRepoLabelText: {
      name: "Label",
      table: { category: "Bono / Repo" },
      if: { arg: "style", eq: "bonds-repo" },
    },
    bondsRepoValueText: {
      name: "Value",
      table: { category: "Bono / Repo" },
      if: { arg: "style", eq: "bonds-repo" },
    },
  },
  render: (args) => <Info {...toProps(args)} />,
};

export const Birincil: Story = {
  name: "Birincil bilgi",
  args: {
    style: "primary",
    message: "Text goes here",
  },
};

export const Ikincil: Story = {
  name: "İkincil bilgi",
  args: {
    style: "secondary",
    message: "Text goes here",
    textButton: true,
    actionLabel: "Create",
  },
};

export const Gereklilikler: Story = {
  name: "Gereklilikler",
  args: {
    style: "requirements",
    message: "Text goes here",
    requirements: ["Label", "Label 2", "Label 3", "Label 4"],
  },
};

export const BonoRepo: Story = {
  name: "Bono / Repo",
  args: {
    style: "bonds-repo",
    message: "Text goes here",
    blockedNote: "Text goes here",
    bondsRepoLabel: "Label",
    bondsRepoValue: "1.234,56 TL",
  },
};

export const UzunMetin: Story = {
  name: "Uç durum · Uzun metin",
  args: {
    style: "primary",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
};

const senaryolar: InfoProps[] = [
  { style: "primary", message: "Text goes here" },
  { style: "secondary", message: "Text goes here" },
  {
    style: "requirements",
    message: "Text goes here",
    requirements: ["Label", "Label 2", "Label 3", "Label 4"],
  },
  {
    style: "bonds-repo",
    message: "Text goes here",
    blockedNote: "Text goes here",
    bondsRepoLabel: "Label",
    bondsRepoValue: "1.234,56 TL",
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
        <Info key={i} {...args} />
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
