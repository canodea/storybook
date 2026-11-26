import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import {
  InAppNotification,
  type InAppNotificationProps,
} from "./InAppNotification";

const meta = {
  title: "Components/Cards/In-App Notification",
  component: InAppNotification,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | In-App Notification. Odea Mobil kart biçimindeki uygulama içi bildirimi; tek görünümü vardır, varyantı yoktur. Sol ikon (Icon Avatar) bildirim türünü gösterir; Show Avatar, Show Close ve Show Text Link aç/kapa özellikleridir. Kapatma ikon-only butondur ve aria-label taşır; davranış onClose ile uygulamada bağlanır. Text Link metni FULL CAPS yazılır. Metinler dummy'dir; gerçek veri ve bildirim davranışı uygulamada sağlanır. İsimlendirme İngilizce, davranış açıklamaları Türkçedir. Playground ekranında Figma'daki Show Avatar, Show Close, Show Text Link, Title, Description ve Text Link kontrolleri vardır. Tema: Dark Mode varyantı yoktur.",
      },
    },
  },
} satisfies Meta<typeof InAppNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  titleText: string;
  bodyText: string;
  linkLabel: string;
  showAvatarToggle: boolean;
  showCloseToggle: boolean;
  showTextLinkToggle: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): InAppNotificationProps => ({
  title: a.titleText,
  body: a.bodyText,
  actionLabel: a.linkLabel,
  showAvatar: a.showAvatarToggle,
  showClose: a.showCloseToggle,
  showTextLink: a.showTextLinkToggle,
});

/** Figma'daki aç/kapa özellikleriyle birebir: avatar, kapatma ve metin linki ayrı ayrı kontrol edilir. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    titleText: "Alert",
    bodyText: "Lorem ipsum sit dolorem amet quare id faciam fortasse requiris",
    linkLabel: "TEXT LINK",
    showAvatarToggle: true,
    showCloseToggle: true,
    showTextLinkToggle: true,
  },
  argTypes: {
    ...themeArgTypes,
    showAvatarToggle: { name: "Show Avatar", table: { category: "İkonlar" } },
    showCloseToggle: { name: "Show Close", table: { category: "İkonlar" } },
    showTextLinkToggle: { name: "Show Text Link", table: { category: "Metin linki" } },
    titleText: { name: "Title", table: { category: "İçerik" } },
    bodyText: { name: "Description", table: { category: "İçerik" } },
    linkLabel: {
      name: "Text Link",
      table: { category: "Metin linki" },
      if: { arg: "showTextLinkToggle" },
    },
  },
  render: (args) => <InAppNotification {...toProps(args)} />,
};

const tamBildirim: InAppNotificationProps = {
  title: "Alert",
  body: "Lorem ipsum sit dolorem amet quare id faciam fortasse requiris",
  actionLabel: "TEXT LINK",
};

const linksizBildirim: InAppNotificationProps = {
  ...tamBildirim,
  showTextLink: false,
};

const kaliciBildirim: InAppNotificationProps = {
  ...tamBildirim,
  showClose: false,
};

const ikonsuzBildirim: InAppNotificationProps = {
  ...tamBildirim,
  showAvatar: false,
};

export const TamBildirim: Story = {
  name: "Tam bildirim",
  args: tamBildirim,
};

export const LinksizBildirim: Story = {
  name: "Linksiz bildirim",
  args: linksizBildirim,
};

export const KaliciBildirim: Story = {
  name: "Kalıcı bildirim",
  args: kaliciBildirim,
};

export const IkonsuzBildirim: Story = {
  name: "İkonsuz bildirim",
  args: ikonsuzBildirim,
};

export const UzunBaslik: Story = {
  name: "Uç durum · Uzun başlık",
  args: {
    ...tamBildirim,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do",
  },
};

export const Senaryolar: Story = {
  args: tamBildirim,
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
      {[tamBildirim, linksizBildirim, kaliciBildirim, ikonsuzBildirim].map((args, index) => (
        <InAppNotification key={index} {...args} />
      ))}
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (className, onClose vb.) burada gizlenir.
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
