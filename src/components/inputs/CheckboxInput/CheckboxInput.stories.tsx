import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import CheckboxInput, { type CheckboxInputProps } from "./CheckboxInput";
import type { CheckboxStatus } from "../Checkbox";
import styles from "./CheckboxInput.module.css";

const meta = {
  title: "Components/Inputs/Checkbox Input",
  component: CheckboxInput,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Checkbox Input. Etiketli onay kutusu. Tek satır (kutu + label) ya da çok satır (kutu + başlık/açıklama) olabilir. Tüm satır bir label'dır; satırın herhangi bir yerine tıklamak kutuyu değiştirir.",
      },
    },
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  status: CheckboxStatus;
  enabled: boolean;
  multiLine: boolean;
  labelText: string;
  titleText: string;
  infoText: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CheckboxInputProps => ({
  status: a.status,
  disabled: !a.enabled,
  multiLine: a.multiLine,
  label: a.labelText,
  title: a.titleText,
  info: a.infoText,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    status: "active",
    enabled: true,
    multiLine: false,
    labelText: "Text goes here",
    titleText: "Title",
    infoText: "Sub Text",
  },
  argTypes: {
    ...themeArgTypes,
    status: {
      name: "Status",
      table: { category: "Durum" },
      control: "select",
      options: ["base", "active", "indeterminate"],
    },
    enabled: { name: "Enabled", table: { category: "Durum" } },
    multiLine: { name: "Multi Line", table: { category: "Yapı" } },
    labelText: { name: "Label", table: { category: "Tek satır" }, if: { arg: "multiLine", eq: false } },
    titleText: { name: "Title", table: { category: "Çok satır" }, if: { arg: "multiLine" } },
    infoText: { name: "Info", table: { category: "Çok satır" }, if: { arg: "multiLine" } },
  },
  render: (args) => <CheckboxInput {...toProps(args)} />,
};

export const TekSatir: Story = {
  name: "Tek satır",
  args: { status: "active", label: "Text goes here" },
};

export const CokSatir: Story = {
  name: "Çok satır",
  args: { status: "active", multiLine: true, title: "Title", info: "Sub Text" },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: { status: "base", disabled: true, label: "Text goes here" },
};

const hesapSecenekleri = [
  "Title",
  "Title 2",
  "Title 3",
  "Title 4",
];

function CokluSecimOrnegi() {
  const [selected, setSelected] = useState<boolean[]>(() => hesapSecenekleri.map(() => false));
  const seciliAdet = selected.filter(Boolean).length;
  const tumuStatus: CheckboxStatus =
    seciliAdet === 0 ? "base" : seciliAdet === hesapSecenekleri.length ? "active" : "indeterminate";

  return (
    <div className={styles.stack}>
      <CheckboxInput
        status={tumuStatus}
        label="Label"
        onChange={(checked) => setSelected(hesapSecenekleri.map(() => checked))}
      />
      {hesapSecenekleri.map((label, i) => (
        <CheckboxInput
          key={label}
          status={selected[i] ? "active" : "base"}
          label={label}
          onChange={(checked) =>
            setSelected((prev) => prev.map((value, j) => (j === i ? checked : value)))
          }
        />
      ))}
    </div>
  );
}

export const CokluSecimListesi: Story = {
  name: "Çoklu seçim listesi",
  render: () => <CokluSecimOrnegi />,
};

const cokSatirliSecenekler = [
  { title: "Title", info: "Sub text goes here" },
  { title: "Title 2", info: "Sub text goes here" },
  { title: "Title 3", info: "Sub text goes here" },
];

function CokSatirliListeOrnegi() {
  const [selected, setSelected] = useState<boolean[]>(() => cokSatirliSecenekler.map(() => false));

  return (
    <div className={styles.stack}>
      {cokSatirliSecenekler.map((item, i) => (
        <CheckboxInput
          key={item.title}
          multiLine
          status={selected[i] ? "active" : "base"}
          title={item.title}
          info={item.info}
          onChange={(checked) =>
            setSelected((prev) => prev.map((value, j) => (j === i ? checked : value)))
          }
        />
      ))}
    </div>
  );
}

export const CokSatirliListe: Story = {
  name: "Çok satırlı liste",
  render: () => <CokSatirliListeOrnegi />,
};

const senaryolar: CheckboxInputProps[] = [
  TekSatir.args as CheckboxInputProps,
  CokSatir.args as CheckboxInputProps,
  DevreDisi.args as CheckboxInputProps,
];

export const Senaryolar: Story = {
  args: TekSatir.args,
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {senaryolar.map((args, i) => (
        <CheckboxInput key={i} {...args} />
      ))}
    </div>
  ),
};

Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
