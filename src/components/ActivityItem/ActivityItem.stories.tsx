import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import ActivityItem, { type ActivityItemProps } from "./ActivityItem";

const kartHarcamasi: ActivityItemProps = {
  date: { day: "7", month: "HAZ", year: "2023" },
  title: "Title",
  description: "Sub text goes here",
  meta: [
    "Text goes here",
    { icon: { set: "Commerce", name: "Coin" }, text: "1.234,56 TL - Label" },
  ],
  amount: "-1.234,56 TL",
  status: "Label",
  action: {
    label: "TEXT LINK",
    icon: { set: "Banking", name: "Installment" },
    onClick: () => {},
  },
  iconActions: [
    {
      icon: { set: "Commerce", name: "Tag" },
      label: "Label",
      onClick: () => {},
    },
    {
      icon: { set: "Commerce", name: "Receipt" },
      label: "Label",
      onClick: () => {},
    },
  ],
};

const hesaptanParaCekme: ActivityItemProps = {
  date: { day: "7", month: "HAZ", year: "2023" },
  title: "Title 2",
  description: "Text goes here",
  amount: "-1.234,56 TL",
};

const gelenTransfer: ActivityItemProps = {
  date: { day: "7", month: "HAZ", year: "2023" },
  title: "Title 3",
  description: "Name Surname - Text goes here",
  amount: "+1.234,56 TL",
};

const paraTransferi: ActivityItemProps = {
  date: { day: "7", month: "HAZ", year: "2023" },
  title: "Title 4",
  description: "Text goes here",
  amount: "-1.234,56 TL",
  status: "Label",
  action: {
    label: "TEXT LINK",
    icon: { set: "Banking", name: "Installment" },
    onClick: () => {},
  },
  iconActions: [
    {
      icon: { set: "Commerce", name: "Receipt" },
      label: "Label",
      onClick: () => {},
    },
  ],
};

const sadeSatir: ActivityItemProps = {
  date: { day: "7", month: "HAZ", year: "2023" },
  title: "Title 5",
  description: "Sub text goes here",
  amount: "-1.234,56 TL",
};

const meta = {
  title: "Components/Cards/Activity Item",
  component: ActivityItem,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Activity Item. Odea Mobil işlem hareketi satırı; tek görünümü vardır; giden işlemde (-) tutar birincil metin renginde, hesaba gelen parada (+) yeşildir. Tarih, başlık, açıklama, meta bilgileri (isteğe bağlı ikonlu/ikonsuz), tutar, durum ve aksiyonlar prop olarak verilir; boş bırakılan bölüm render edilmez. iconActions ikon-only butonlardır ve aria-label taşır. Playground ekranında Figma ile aynı aç/kapa kontrolleri ve Light/Dark tema seçimi vardır.",
      },
    },
  },
} satisfies Meta<typeof ActivityItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const actionIcons = {
  Tag: { set: "Commerce", name: "Tag" },
  Receipt: { set: "Commerce", name: "Receipt" },
  Ticket: { set: "Commerce", name: "Ticket" },
  Gift: { set: "Commerce", name: "Gift" },
} as const;

const rewardIcons = {
  Coin: { set: "Commerce", name: "Coin" },
  Gift: { set: "Commerce", name: "Gift" },
  "Giving Heart": { set: "Commerce", name: "Giving Heart" },
} as const;

const linkIcons = {
  Installment: { set: "Banking", name: "Installment" },
  Eft: { set: "Banking", name: "Eft" },
  "Money Transfer": { set: "Banking", name: "Money Transfer" },
} as const;

type PlaygroundArgs = {
  incoming: boolean;
  titleText: string;
  descriptionText: string;
  chipPara: string;
  reward: string;
  linkLabel: string;
  amountText: string;
  statusText: string;
  showChipPara: boolean;
  showStatus: boolean;
  showLink: boolean;
  actionIcon1: IconChoice<typeof actionIcons>;
  actionIcon2: IconChoice<typeof actionIcons>;
  showActionIcons: boolean;
  rewardIcon: keyof typeof rewardIcons;
  linkIcon: IconChoice<typeof linkIcons>;
  showReward: boolean;
} & ThemeArgs;

const withSign = (amount: string, incoming: boolean) =>
  `${incoming ? "+" : "-"}${amount.replace(/^[+-]/, "")}`;

const toProps = (a: PlaygroundArgs): ActivityItemProps => ({
  date: { day: "7", month: "HAZ", year: "2023" },
  title: a.titleText,
  description: a.descriptionText || undefined,
  amount: withSign(a.amountText, a.incoming),
  direction: a.incoming ? "incoming" : "outgoing",
  status: a.showStatus ? a.statusText : undefined,
  meta: [
    ...(a.showChipPara ? [a.chipPara] : []),
    ...(a.showReward
      ? [
          {
            icon: rewardIcons[a.rewardIcon],
            text: a.reward,
          },
        ]
      : []),
  ],
  action: a.showLink
    ? {
        label: a.linkLabel,
        icon: a.linkIcon === NONE ? undefined : linkIcons[a.linkIcon],
        onClick: () => {},
      }
    : undefined,
  iconActions: a.showActionIcons
    ? [
        ...(a.actionIcon1 === NONE
          ? []
          : [{ icon: actionIcons[a.actionIcon1], label: "Label", onClick: () => {} }]),
        ...(a.actionIcon2 === NONE
          ? []
          : [{ icon: actionIcons[a.actionIcon2], label: "Label", onClick: () => {} }]),
      ]
    : [],
});

/** Figma'daki aç/kapa özellikleriyle birebir: her ikon ve metin ayrı ayrı açılıp kapanır. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    incoming: false,
    titleText: "Title",
    descriptionText: "Sub text goes here",
    amountText: "-1.234,56 TL",
    showStatus: true,
    statusText: "Label",
    showChipPara: true,
    chipPara: "Text goes here",
    showReward: true,
    reward: "12,34 TL - Label",
    rewardIcon: "Coin",
    showLink: true,
    linkLabel: "TEXT LINK",
    linkIcon: "Installment",
    showActionIcons: true,
    actionIcon1: "Tag",
    actionIcon2: "Receipt",
  },
  argTypes: {
    ...themeArgTypes,
    incoming: { name: "Incoming", table: { category: "İçerik" } },
    titleText: { name: "Title", table: { category: "İçerik" } },
    descriptionText: { name: "Description", table: { category: "İçerik" } },
    amountText: { name: "Amount", table: { category: "İçerik" } },
    showStatus: { name: "Show Status", table: { category: "Durum" } },
    statusText: { name: "Status Text", table: { category: "Durum" }, if: { arg: "showStatus" } },
    showChipPara: { name: "Show Chip-Para", table: { category: "Chip-Para" } },
    chipPara: { name: "Chip-Para Text", table: { category: "Chip-Para" }, if: { arg: "showChipPara" } },
    showReward: { name: "Show Reward", table: { category: "Ödül" } },
    reward: { name: "Reward Text", table: { category: "Ödül" }, if: { arg: "showReward" } },
    rewardIcon: {
      name: "Reward Icon", table: { category: "Ödül" },
      control: "select",
      options: Object.keys(rewardIcons),
      if: { arg: "showReward" },
    },
    showLink: { name: "Show Text Link", table: { category: "Metin linki" } },
    linkLabel: { name: "Link Label", table: { category: "Metin linki" }, if: { arg: "showLink" } },
    linkIcon: {
      name: "Link Icon", table: { category: "Metin linki" },
      control: "select",
      options: withNone(linkIcons),
      if: { arg: "showLink" },
    },
    showActionIcons: { name: "Show Action Icons", table: { category: "Aksiyon ikonları" } },
    actionIcon1: {
      name: "Action Icon 1", table: { category: "Aksiyon ikonları" },
      control: "select",
      options: withNone(actionIcons),
      if: { arg: "showActionIcons" },
    },
    actionIcon2: {
      name: "Action Icon 2", table: { category: "Aksiyon ikonları" },
      control: "select",
      options: withNone(actionIcons),
      if: { arg: "showActionIcons" },
    },
  },
  render: (args) => <ActivityItem {...toProps(args)} />,
};

export const KartHarcamasi: Story = {
  name: "Kart harcaması",
  args: kartHarcamasi,
};

export const HesaptanParaCekme: Story = {
  name: "Hesaptan para çekme",
  args: hesaptanParaCekme,
};

export const GelenTransfer: Story = {
  name: "Hesaba gelen para",
  args: gelenTransfer,
};

export const ParaTransferi: Story = {
  name: "Para transferi",
  args: paraTransferi,
};

export const SadeSatir: Story = {
  name: "Sade satır",
  args: sadeSatir,
};

export const UzunMetin: Story = {
  name: "Uç durum · Uzun metin",
  args: {
    ...kartHarcamasi,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const EksikVeri: Story = {
  name: "Uç durum · Eksik veri",
  args: {
    date: { day: "7", month: "HAZ", year: "2023" },
    title: "Title 4",
    amount: "-1.234,56 TL",
  },
};

export const BuyukTutar: Story = {
  name: "Uç durum · Büyük tutar",
  args: { ...hesaptanParaCekme, amount: "-1.234.567,89 TL" },
};

const senaryolar: ActivityItemProps[] = [
  kartHarcamasi,
  hesaptanParaCekme,
  gelenTransfer,
  paraTransferi,
  sadeSatir,
];

export const Senaryolar: Story = {
  args: kartHarcamasi,
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 16,
        padding: 24,
      }}
    >
      {senaryolar.map((args) => (
        <ActivityItem key={args.title} {...args} />
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
