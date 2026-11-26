import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import { Icon } from "../../foundations";
import Tooltip, { type TooltipPlacement, type TooltipProps } from "./Tooltip";

const description = `ODEA MOBILE | Tooltip. Bilgi ikonuna bağlı kısa açıklama balonu. Başlık UI Display SM (FULL CAPS), açıklama UI Text SM'dir; kapatma butonu 20×20 Math/X ikonudur. Ok 16×16 kareden 45° döndürülür, balonla aynı zemini kullanır ve balonun 8 px dışına taşar. Altı ok konumu vardır: üst/alt × sol/orta/sağ. Balon zemini surface-default, gölgesi Campaign Card ile aynıdır. Metinler dummy örnektir. Tema: renkler token üzerinden otomatik değişir.`;

const PLACEMENTS: TooltipPlacement[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

const meta = {
  title: "Components/Cards/Tooltip",
  component: Tooltip,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  titleText: string;
  descriptionText: string;
  showTitleToggle: boolean;
  showCloseToggle: boolean;
  placement: TooltipPlacement;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): TooltipProps => ({
  title: a.titleText || undefined,
  description: a.descriptionText || undefined,
  showTitle: a.showTitleToggle,
  showClose: a.showCloseToggle,
  // Storybook `if` ile gizlenen kontrolün değeri boş gelebilir; o zaman varsayılan kullanılır.
  placement: a.placement ?? "top-left",
});

const sayfa = (children: ReactNode) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 24,
      padding: 24,
      background: "var(--odea-background-canvas)",
    }}
  >
    {children}
  </div>
);

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    titleText: "Title",
    descriptionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    showTitleToggle: true,
    showCloseToggle: true,
    placement: "top-left",
  },
  argTypes: {
    ...themeArgTypes,
    titleText: { name: "Title", table: { category: "İçerik" } },
    descriptionText: {
      name: "Description",
      table: { category: "İçerik" },
    },
    showTitleToggle: { name: "Show Title", table: { category: "Görünüm" } },
    showCloseToggle: { name: "Show Close", table: { category: "Görünüm" } },
    placement: {
      name: "Placement",
      control: "select",
      options: PLACEMENTS,
      table: { category: "Görünüm" },
    },
  },
  render: (args) => sayfa(
    <div style={{ maxWidth: 327 }}>
      <Tooltip {...toProps(args)} />
    </div>,
  ),
};

export const OkKonumlari: Story = {
  name: "Ok konumları",
  args: { placement: "top-left" },
  render: () => sayfa(
    PLACEMENTS.map((placement) => (
      <Tooltip
        key={placement}
        placement={placement}
        title={placement}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    )),
  ),
};

export const Basliksiz: Story = {
  name: "Başlıksız",
  args: { showTitle: false },
  render: () => sayfa(
    <Tooltip
      showTitle={false}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />,
  ),
};

export const Kapatmasiz: Story = {
  name: "Kapatmasız",
  args: { showClose: false },
  render: () => sayfa(
    <Tooltip
      showClose={false}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />,
  ),
};

function BilgiIkonuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", height: 200 }}>
      <button
        type="button"
        aria-label="Bilgi"
        aria-expanded={open}
        aria-describedby={open ? "tooltip-kur-bilgisi" : undefined}
        onClick={() => setOpen(!open)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          padding: 0,
          border: 0,
          background: "none",
          color: "var(--odea-text-primary)",
          cursor: "pointer",
        }}
      >
        <Icon set="Security" name="Info" size={16} />
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: 24,
            left: -28,
            width: 327,
            zIndex: 1,
          }}
        >
          <Tooltip
            id="tooltip-kur-bilgisi"
            placement="top-left"
            title="Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            onClose={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

export const BilgiIkonuyla: Story = {
  name: "Bilgi ikonuyla",
  args: {},
  render: () => sayfa(<BilgiIkonuDemo />),
};

const senaryolar: TooltipProps[] = [
  ...PLACEMENTS.map((placement) => ({
    placement,
    title: placement,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  })),
  {
    placement: "top-left" as const,
    showTitle: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    placement: "top-left" as const,
    showClose: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const Senaryolar: Story = {
  args: {},
  render: () => sayfa(
    senaryolar.map((args, i) => <Tooltip key={i} {...args} />),
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
