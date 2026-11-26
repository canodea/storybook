import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import { WomanAnalyze } from "../illustrations/WomanAnalyze";
import { Campaign } from "../illustrations/Campaign";
import { OpenBanking } from "../illustrations/OpenBanking";
import { Coin } from "../illustrations/Coin";
import { BankAssets } from "../illustrations/BankAssets";
import CampaignCard, { type CampaignCardProps } from "./CampaignCard";

const description = `ODEA MOBILE | Campaign Card. Solda 104 px medya paneli, sağda başlık, açıklama ve metin linki. Kart yüksekliği sabit 120 px'dir; başlık ve link tek satırda, açıklama en çok iki satırda kesilir. Medya panelinin zemini yoktur; illüstrasyonun kendi çizimi görünür. Kart genişliği bulunduğu alana göre %100'dür. Bağlantı metni FULL CAPS yazılır ve tek bir eylem anlatır. İllüstrasyon Figma'daki instance swap ile değişir; verilmezse Woman Analyze (88 px) kullanılır. Metinler dummy örnektir. Tema: Dark Mode varyantı yoktur; renkler token üzerinden otomatik değişir.`;

const ILLUSTRATIONS = {
  "Woman Analyze": <WomanAnalyze size={88} />,
  Campaign: <Campaign size={88} />,
  "Open Banking": <OpenBanking size={88} />,
  Coin: <Coin size={88} />,
  "Bank Assets": <BankAssets size={88} />,
} as const;

type IllustrationChoice = keyof typeof ILLUSTRATIONS;

const meta = {
  title: "Components/Cards/Campaign Card",
  component: CampaignCard,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof CampaignCard>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  titleText: string;
  descriptionText: string;
  linkText: string;
  showLinkToggle: boolean;
  illustration: IllustrationChoice;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CampaignCardProps => ({
  title: a.titleText || undefined,
  description: a.descriptionText || undefined,
  linkLabel: a.linkText || undefined,
  showLink: a.showLinkToggle,
  // Storybook `if` ile gizlenen kontrolün değeri boş gelebilir; o zaman varsayılan kullanılır.
  illustration: ILLUSTRATIONS[a.illustration ?? "Woman Analyze"],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    titleText: "Title",
    descriptionText: "Description goes here",
    linkText: "TEXT LINK",
    showLinkToggle: true,
    illustration: "Woman Analyze",
  },
  argTypes: {
    ...themeArgTypes,
    titleText: { name: "Title", table: { category: "İçerik" } },
    descriptionText: { name: "Description", table: { category: "İçerik" } },
    linkText: { name: "Link Label", table: { category: "İçerik" } },
    showLinkToggle: {
      name: "Show Link",
      table: { category: "Görünüm" },
    },
    illustration: {
      name: "Illustration",
      control: "select",
      options: Object.keys(ILLUSTRATIONS),
      table: { category: "Görsel" },
    },
  },
  render: (args) => (
    <div style={{ width: 327 }}>
      <CampaignCard {...toProps(args)} />
    </div>
  ),
};

const kartlar: CampaignCardProps[] = [
  {
    title: "Title",
    description: "Description goes here",
    linkLabel: "TEXT LINK",
    illustration: <WomanAnalyze size={88} />,
  },
  {
    title: "Title 2",
    description: "Description goes here",
    linkLabel: "TEXT LINK",
    illustration: <Campaign size={88} />,
  },
  {
    title: "Title 3",
    description: "Description goes here",
    linkLabel: "TEXT LINK",
    illustration: <OpenBanking size={88} />,
  },
];

export const Liste: Story = {
  name: "Liste",
  args: kartlar[0],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 327,
        padding: 24,
        background: "var(--odea-background-canvas)",
      }}
    >
      {kartlar.map((args, i) => (
        <CampaignCard key={i} {...args} />
      ))}
    </div>
  ),
};

const senaryolar: CampaignCardProps[] = [
  {
    title: "Title",
    description: "Description goes here",
    linkLabel: "TEXT LINK",
    illustration: <Coin size={88} />,
  },
  {
    title: "Title",
    description: "Description goes here",
    showLink: false,
    illustration: <BankAssets size={88} />,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.",
    linkLabel: "TEXT LINK",
    illustration: <Campaign size={88} />,
  },
];

export const UzunMetin: Story = {
  name: "Uç durum · Uzun metin",
  args: kartlar[0],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 327,
        padding: 24,
        background: "var(--odea-background-canvas)",
      }}
    >
      <CampaignCard
        title="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor"
        description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Parturient diam aliquam cursus egestas sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        linkLabel="HEMEN BAŞVUR VE KAMPANYA DETAYLARINI İNCELE"
        illustration={<Campaign size={88} />}
      />
    </div>
  ),
};

export const Senaryolar: Story = {
  args: kartlar[0],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 327,
        padding: 24,
        background: "var(--odea-background-canvas)",
      }}
    >
      {senaryolar.map((args, i) => (
        <CampaignCard key={i} {...args} />
      ))}
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları burada gizlenir.
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
