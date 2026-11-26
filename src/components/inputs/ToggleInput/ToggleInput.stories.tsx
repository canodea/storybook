import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import ToggleInput, { type ToggleInputProps } from "./ToggleInput";

const meta = {
  title: "Components/Inputs/Toggle Input",
  component: ToggleInput,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Toggle Input. Etiketli açık/kapalı anahtarı. Tek satır (label + toggle) ya da çok satır (avatar + başlık/açıklama + toggle) olabilir. Tüm satır bir label'dır; satırın herhangi bir yerine tıklamak anahtarı değiştirir.",
      },
    },
  },
} satisfies Meta<typeof ToggleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatarIcons = {
  Person: { set: "People", name: "Person" },
  User: { set: "People", name: "User" },
  "User Circle": { set: "People", name: "UserCircle" },
} as const;

type PlaygroundArgs = {
  checked: boolean;
  enabled: boolean;
  multiLine: boolean;
  labelText: string;
  titleText: string;
  infoText: string;
  leadingAvatar: IconChoice<typeof avatarIcons>;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ToggleInputProps => ({
  checked: a.checked,
  disabled: !a.enabled,
  multiLine: a.multiLine,
  label: a.labelText,
  title: a.titleText,
  info: a.infoText,
  leadingAvatar: a.leadingAvatar === NONE ? undefined : avatarIcons[a.leadingAvatar],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    checked: true,
    enabled: true,
    multiLine: false,
    labelText: "Text goes here",
    titleText: "Label",
    infoText: "Sub text goes here",
    leadingAvatar: "Person",
  },
  argTypes: {
    ...themeArgTypes,
    checked: { name: "Checked", table: { category: "Durum" } },
    enabled: { name: "Enabled", table: { category: "Durum" } },
    multiLine: { name: "Multi Line", table: { category: "Yapı" } },
    labelText: { name: "Label", table: { category: "Tek satır" }, if: { arg: "multiLine", eq: false } },
    titleText: { name: "Title", table: { category: "Çok satır" }, if: { arg: "multiLine" } },
    infoText: { name: "Info", table: { category: "Çok satır" }, if: { arg: "multiLine" } },
    leadingAvatar: {
      name: "Leading Avatar",
      table: { category: "Çok satır" },
      control: "select",
      options: withNone(avatarIcons),
      if: { arg: "multiLine" },
    },
  },
  render: (args) => <ToggleInput {...toProps(args)} />,
};

export const TekSatir: Story = {
  name: "Tek satır",
  args: { checked: true, label: "Text goes here" },
};

export const CokSatir: Story = {
  name: "Çok satır",
  args: {
    checked: true,
    multiLine: true,
    title: "Label",
    info: "Sub text goes here",
    leadingAvatar: { set: "People", name: "Person" },
  },
};

export const DevreDisi: Story = {
  name: "Devre dışı",
  args: { checked: false, disabled: true, label: "Text goes here" },
};

const senaryolar: ToggleInputProps[] = [
  TekSatir.args as ToggleInputProps,
  CokSatir.args as ToggleInputProps,
  DevreDisi.args as ToggleInputProps,
];

export const Senaryolar: Story = {
  args: TekSatir.args,
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {senaryolar.map((args, i) => (
        <ToggleInput key={i} {...args} />
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
