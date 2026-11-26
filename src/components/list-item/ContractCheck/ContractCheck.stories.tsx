import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import ContractCheck, { type ContractCheckProps } from "./ContractCheck";

const meta = {
  title: "Components/List Item/Contract Check",
  component: ContractCheck,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Contract Check. Başlık + açıklama + işaretli checkbox bir bütündür. Kutunun işaretli görünmesi hukuki onay sayılmaz; gerçek seçim uygulamada ayrıca doğrulanır. İç Checkbox tek başına kullanılmaz.",
      },
    },
  },
} satisfies Meta<typeof ContractCheck>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  disclosureTitle: string;
  consentDescription: string;
  checked: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ContractCheckProps => ({
  disclosureTitle: a.disclosureTitle,
  consentDescription: a.consentDescription,
  checked: a.checked,
  onChange: () => {},
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    disclosureTitle: "Title",
    consentDescription: "Text goes here",
    checked: true,
  },
  argTypes: {
    ...themeArgTypes,
    disclosureTitle: { name: "Disclosure Title", table: { category: "İçerik" } },
    consentDescription: { name: "Consent Description", table: { category: "İçerik" } },
    checked: { name: "Checked", table: { category: "Durum" } },
  },
  render: (args) => <ContractCheck {...toProps(args)} />,
};

export const Isaretli: Story = {
  name: "İşaretli",
  args: {
    disclosureTitle: "Title",
    consentDescription: "Text goes here",
    checked: true,
  },
};

export const Isaretsiz: Story = {
  name: "İşaretsiz",
  args: {
    disclosureTitle: "Title",
    consentDescription: "Text goes here",
    checked: false,
  },
};

export const UzunBaslik: Story = {
  name: "Uç durum · Uzun başlık",
  args: {
    disclosureTitle:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt",
    consentDescription: "Text goes here",
    checked: true,
  },
};

export const Senaryolar: Story = {
  args: { disclosureTitle: "Title", checked: true },
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
      <ContractCheck
        disclosureTitle="Title"
        consentDescription="Text goes here"
        checked
      />
      <ContractCheck
        disclosureTitle="Title"
        consentDescription="Text goes here"
        checked={false}
      />
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
