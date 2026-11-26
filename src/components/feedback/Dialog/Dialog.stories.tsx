import type { ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import { BankAssets } from "../../illustrations/BankAssets";
import { Campaign } from "../../illustrations/Campaign";
import { Coin } from "../../illustrations/Coin";
import { OpenBanking } from "../../illustrations/OpenBanking";
import { SmallColumnsGraph } from "../../illustrations/SmallColumnsGraph";
import { WomanAnalyze } from "../../illustrations/WomanAnalyze";
import Dialog, {
  type DialogProps,
  type DialogActions,
  type DialogMedia,
} from "./Dialog";

const meta = {
  title: "Components/Feedback/Dialog",
  component: Dialog,
  // open=true iken overlay `position: fixed`; telefon boyutlu çerçeve (transform) onu içine hapseder,
  // böylece Docs sayfasını ve kontrolleri örtmez.
  decorators: [
    (Story, context) =>
      context.args?.open ? (
        <div
          style={{
            position: "relative",
            width: 375,
            maxWidth: "100%",
            height: 667,
            transform: "translateZ(0)",
            overflow: "hidden",
            borderRadius: 16,
            background: "var(--odea-background-canvas)",
          }}
        >
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Dialog. Ekranın ortasında karar isteyen modal: işlem onayı, silme/iptal, oturum uyarısı, kritik bilgi. Stacked alt alta (uzun etiketler, varsayılan), Inline yan yana (VAZGEÇ / ONAYLA) düzenindedir. Primary olumlu ana aksiyon, Secondary vazgeç (gizlenebilir → tek butonlu bilgilendirme). Media=Icon iken Security setinden Info / Warning / ShieldCheck ikonu (32 px), Media=Illustration iken 120x120 illüstrasyon gösterilir. role=dialog aria-modal aria-labelledby taşır; open verilirse yarı saydam arka planla ortalanır.",
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const dialogIcons = {
  Info: { set: "Security", name: "Info" },
  Warning: { set: "Security", name: "Warning" },
  ShieldCheck: { set: "Security", name: "ShieldCheck" },
} as const;

type DialogIllustration =
  | "Woman Analyze"
  | "Campaign"
  | "Open Banking"
  | "Coin"
  | "Bank Assets"
  | "Small Columns Graph";

const dialogIllustrations: Record<
  DialogIllustration,
  ComponentType<{ size?: number }>
> = {
  "Woman Analyze": WomanAnalyze,
  Campaign,
  "Open Banking": OpenBanking,
  Coin,
  "Bank Assets": BankAssets,
  "Small Columns Graph": SmallColumnsGraph,
};

const illustrationOptions = Object.keys(
  dialogIllustrations,
) as DialogIllustration[];

const renderIllustration = (name?: DialogIllustration) => {
  const Illustration = dialogIllustrations[name ?? "Woman Analyze"];
  return <Illustration size={120} />;
};

type PlaygroundArgs = {
  titleText: string;
  messageText: string;
  media: DialogMedia;
  showMedia: boolean;
  iconAsset: IconChoice<typeof dialogIcons>;
  illustration: DialogIllustration;
  secondaryAction: boolean;
  actions: DialogActions;
  primaryLabelText: string;
  secondaryLabelText: string;
  open: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): DialogProps => {
  const media = a.media ?? "icon";
  const iconAsset = a.iconAsset ?? "Info";
  return {
    title: a.titleText,
    message: a.messageText,
    media,
    showMedia:
      a.showMedia && (media !== "icon" || iconAsset !== NONE),
    iconAsset: iconAsset === NONE ? undefined : dialogIcons[iconAsset],
    illustration:
      media === "illustration" ? renderIllustration(a.illustration) : undefined,
    secondaryAction: a.secondaryAction,
    actions: a.actions,
    primaryLabel: a.primaryLabelText,
    secondaryLabel: a.secondaryLabelText,
    open: a.open || undefined,
  };
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    titleText: "Title",
    messageText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media: "icon",
    showMedia: true,
    iconAsset: "Info",
    illustration: "Woman Analyze",
    secondaryAction: true,
    actions: "stacked",
    primaryLabelText: "BUTTON",
    secondaryLabelText: "BUTTON",
    open: false,
  },
  argTypes: {
    ...themeArgTypes,
    titleText: { name: "Title", table: { category: "İçerik" } },
    messageText: { name: "Message", table: { category: "İçerik" } },
    media: {
      name: "Media",
      control: "inline-radio",
      options: ["icon", "illustration"],
      table: { category: "Medya" },
    },
    showMedia: { name: "Show Media", table: { category: "Medya" } },
    iconAsset: {
      name: "Icon",
      control: "select",
      options: withNone(dialogIcons),
      table: { category: "Medya" },
      if: { arg: "media", eq: "icon" },
    },
    illustration: {
      name: "Illustration",
      control: "select",
      options: illustrationOptions,
      table: { category: "Medya" },
      if: { arg: "media", eq: "illustration" },
    },
    secondaryAction: { name: "Secondary Action", table: { category: "Aksiyonlar" } },
    actions: {
      name: "Actions",
      control: "inline-radio",
      options: ["stacked", "inline"],
      table: { category: "Aksiyonlar" },
    },
    primaryLabelText: { name: "Primary Label", table: { category: "Aksiyonlar" } },
    secondaryLabelText: {
      name: "Secondary Label",
      table: { category: "Aksiyonlar" },
      if: { arg: "secondaryAction" },
    },
    open: { name: "Open", table: { category: "Görünüm" } },
  },
  render: (args) => <Dialog {...toProps(args)} />,
};

export const OnayStacked: Story = {
  name: "Onay · stacked",
  args: {
    title: "Title",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    showMedia: true,
    iconAsset: { set: "Security", name: "Info" },
    secondaryAction: true,
    actions: "stacked",
    primaryLabel: "BUTTON",
    secondaryLabel: "BUTTON",
  },
};

export const OnayInline: Story = {
  name: "Onay · inline",
  args: {
    title: "Title",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    showMedia: true,
    iconAsset: { set: "Security", name: "Info" },
    secondaryAction: true,
    actions: "inline",
    primaryLabel: "BUTTON",
    secondaryLabel: "BUTTON",
  },
};

export const Bilgilendirme: Story = {
  name: "Bilgilendirme · tek buton",
  args: {
    title: "Title",
    message: "Lorem ipsum dolor sit amet.",
    showMedia: true,
    iconAsset: { set: "Security", name: "ShieldCheck" },
    secondaryAction: false,
    actions: "stacked",
    primaryLabel: "BUTTON",
  },
};

export const Uyari: Story = {
  name: "Uyarı · warning",
  args: {
    title: "Title",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    showMedia: true,
    iconAsset: { set: "Security", name: "Warning" },
    secondaryAction: false,
    actions: "stacked",
    primaryLabel: "BUTTON",
  },
};

export const Overlay: Story = {
  name: "Overlay",
  args: {
    title: "Title",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    showMedia: true,
    iconAsset: { set: "Security", name: "Info" },
    secondaryAction: true,
    actions: "stacked",
    primaryLabel: "BUTTON",
    secondaryLabel: "BUTTON",
    open: true,
  },
};

export const Illustrasyonlu: Story = {
  name: "İllüstrasyonlu",
  args: {
    title: "Title",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media: "illustration",
    showMedia: true,
    secondaryAction: true,
    actions: "stacked",
    primaryLabel: "BUTTON",
    secondaryLabel: "BUTTON",
  },
};

export const Senaryolar: Story = {
  args: {
    title: "Title",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, padding: 24, background: "var(--odea-background-canvas)" }}>
      <Dialog
        title="Title"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        iconAsset={{ set: "Security", name: "Info" }}
        actions="stacked"
        primaryLabel="BUTTON"
        secondaryLabel="BUTTON"
      />
      <Dialog
        title="Title"
        message="Lorem ipsum dolor sit amet."
        iconAsset={{ set: "Security", name: "ShieldCheck" }}
        secondaryAction={false}
        actions="stacked"
        primaryLabel="BUTTON"
      />
    </div>
  ),
};

Playground.parameters = {
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
