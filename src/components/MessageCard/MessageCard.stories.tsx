import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
  NONE,
  withNone,
  type IconChoice,
} from "../../docs-ui/playgroundTheme";
import { MessageCard, type MessageCardProps } from "./MessageCard";

const description = `ODEA MOBILE | Message Card. Odea Mobil mesaj kartı; başlık, açıklama ve metin butonu alır. Tek varyantı vardır: Type=Promo + Description. Show Media illüstrasyonu gösterir/gizler. onClose verilirse kapatma ikon-only butonu render edilir ve aria-label taşır. Renkler token üzerinden gelir. İsimlendirme İngilizce, davranış açıklamaları Türkçedir. Playground ekranında Figma'daki Show Media, Show Close ve Close Icon özellikleri vardır; Show Close ile Close Icon tek seçimde birleşir (Yok = kapatma yok). Tema: Dark Mode varyantı yoktur.`;

const kampanyaMesaji: MessageCardProps = {
  showMedia: true,
  title: "Text goes here",
  description: "Lorem ipsum sit dolorem amet quare id faciam fortasse requiris",
  action: { label: "TEXT LINK", onClick: () => {} },
  onClose: () => {},
};

const meta = {
  title: "Components/Cards/Message Card",
  component: MessageCard,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof MessageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  titleText: string;
  descriptionText: string;
  actionLabel: string;
  showMediaToggle: boolean;
  closeIconChoice: IconChoice<typeof closeIcons>;
} & ThemeArgs;

const closeIcons = {
  X: { set: "Math", name: "X" },
  "X Circle": { set: "System", name: "XCircle" },
  "X Square": { set: "System", name: "XSquare" },
} as const;

const toProps = (a: PlaygroundArgs): MessageCardProps => ({
  showMedia: a.showMediaToggle,
  title: a.titleText,
  description: a.descriptionText,
  action: { label: a.actionLabel, onClick: () => {} },
  onClose: a.closeIconChoice === NONE ? undefined : () => {},
  closeIcon: a.closeIconChoice === NONE ? undefined : closeIcons[a.closeIconChoice],
});

/** Figma'daki aç/kapa özellikleriyle birebir: kapatma ve medya ayrı ayrı kontrol edilir. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    titleText: "Alert",
    descriptionText:
      "Lorem ipsum sit dolorem amet quare id faciam fortasse requiris",
    actionLabel: "TEXT LINK",
    showMediaToggle: true,
    closeIconChoice: "X",
  },
  argTypes: {
    ...themeArgTypes,
    titleText: { name: "Title", table: { category: "İçerik" } },
    descriptionText: {
      name: "Description",
      table: { category: "İçerik" },
    },
    actionLabel: { name: "Action Label", table: { category: "İçerik" } },
    showMediaToggle: { name: "Show Media", table: { category: "Görsel" } },
    closeIconChoice: {
      name: "Close Icon",
      description: "Figma: Show Close + Close Icon. Yok = kapatma ikonu gösterilmez.",
      control: "select",
      options: withNone(closeIcons),
      table: { category: "Kapatma" },
    },
  },
  render: (args) => <MessageCard {...toProps(args)} />,
};

export const KampanyaMesaji: Story = {
  name: "Kampanya mesajı",
  args: kampanyaMesaji,
};

export const UzunBaslik: Story = {
  name: "Uç durum · Uzun başlık",
  args: {
    showMedia: true,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description:
      "Lorem ipsum sit dolorem amet quare id faciam fortasse requiris",
    action: { label: "TEXT LINK", onClick: () => {} },
    onClose: () => {},
  },
};

const senaryolar: MessageCardProps[] = [
  kampanyaMesaji,
  { ...kampanyaMesaji, showMedia: false, title: "Title 2", action: { label: "TEXT LINK", onClick: () => {} } },
];

export const Senaryolar: Story = {
  args: kampanyaMesaji,
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        padding: 16,
        display: "inline-flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {senaryolar.map((args) => (
        <MessageCard key={args.title} {...args} />
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
