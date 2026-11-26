import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Campaign from "../Campaign/Campaign";
import OpenBanking from "../OpenBanking/OpenBanking";
import WomanAnalyze from "../WomanAnalyze/WomanAnalyze";
import IllustrationPlace from "./IllustrationPlace";

const description = `ODEA MOBILE | Illustration Place. İllüstrasyonu sabit ölçülü bir alanda tutar; içine konan görsel kutuyu taşmadan sığar. Size Figma'daki altı ölçüden birini seçer (68/80/120/200/240/280). İçerik verilmezse sarı daire yer tutucusu gösterilir. Kutu dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur.`;

const meta = {
  title: "Foundations/Illustrations/Illustration Place",
  component: IllustrationPlace,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof IllustrationPlace>;

export default meta;
type Story = StoryObj<typeof meta>;

const illustrations = {
  campaign: <Campaign />,
  "woman-analyze": <WomanAnalyze />,
  "open-banking": <OpenBanking />,
} as const;

const SIZES = ["xsmall", "small", "medium", "large", "xlarge", "2xlarge"] as const;

type PlaygroundArgs = ThemeArgs & {
  size: (typeof SIZES)[number];
  illustration: "none" | keyof typeof illustrations;
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: "medium", illustration: "campaign" },
  argTypes: {
    ...themeArgTypes,
    size: {
      name: "Size",
      description: "Figma: Size. Kutu kenarı piksel cinsinden.",
      control: "inline-radio",
      options: [...SIZES],
      table: { category: "Görünüm" },
    },
    illustration: {
      name: "İllüstrasyon",
      description: "Kutuya konan örnek illüstrasyon; Yok = yer tutucu.",
      control: "select",
      options: ["none", ...Object.keys(illustrations)],
      table: { category: "İçerik" },
    },
  },
  render: (a) => (
    <IllustrationPlace size={a.size}>
      {a.illustration === "none" ? undefined : illustrations[a.illustration]}
    </IllustrationPlace>
  ),
};

export const IcerikYok: Story = {
  name: "Uç durum · İçerik yok",
  render: () => <IllustrationPlace size="small" />,
};

export const KucukOlcek: Story = {
  name: "Uç durum · Küçük ölçek",
  render: () => (
    <IllustrationPlace size="xsmall">
      <Campaign />
    </IllustrationPlace>
  ),
};

export const Senaryolar: Story = {
  name: "Senaryolar",
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        alignItems: "center",
        padding: 32,
        background: "var(--odea-background-canvas)",
      }}
    >
      {SIZES.map((size) => (
        <IllustrationPlace key={size} size={size}>
          <Campaign />
        </IllustrationPlace>
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
