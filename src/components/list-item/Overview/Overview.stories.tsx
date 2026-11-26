import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import Overview, { type OverviewProps } from './Overview';

const description = `ODEA MOBILE | Overview. Piyasa değeri / toplam varlık özeti. detail, percentage, view ve pendingAmount eksenlerinin yalnız geçerli kombinasyonlarını gösterir; gizli bakiyede "**,**" ve kapalı göz ikonu çizilir. Kimlik doğrulamasız alanda müşteri varlığı gösterilmez.`;

const meta = {
  title: 'Components/List Item/Overview',
  component: Overview,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  sectionLabel: string;
  detail: boolean;
  percentage: boolean;
  view: boolean;
  pendingAmount: boolean;
  currencyAmount: string;
  currency: string;
  changeAmount: string;
  changePercent: string;
  pendingCaption: string;
  pendingAmountValue: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): OverviewProps => ({
  sectionLabel: a.sectionLabel,
  detail: a.detail,
  percentage: a.percentage,
  view: a.view,
  pendingAmount: a.pendingAmount,
  currencyAmount: a.currencyAmount,
  currency: a.currency,
  changeAmount: a.changeAmount,
  changePercent: a.changePercent,
  pendingCaption: a.pendingCaption,
  pendingAmountValue: a.pendingAmountValue,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    sectionLabel: 'label',
    detail: false,
    percentage: false,
    view: true,
    pendingAmount: false,
    currencyAmount: '1.234,56',
    currency: 'EUR',
    changeAmount: '1.234,56 TL',
    changePercent: '1,23%',
    pendingCaption: 'Label:',
    pendingAmountValue: '1.234,56 TL',
  },
  argTypes: {
    ...themeArgTypes,
    sectionLabel: { name: 'Section Label', table: { category: 'İçerik' } },
    detail: { name: 'Detail', table: { category: 'Görünüm' } },
    percentage: { name: 'Percentage', table: { category: 'Görünüm' } },
    view: { name: 'View', table: { category: 'Görünüm' } },
    pendingAmount: { name: 'Pending Amount', table: { category: 'Görünüm' } },
    currencyAmount: { name: 'Currency Amount', table: { category: 'İçerik' } },
    currency: {
      name: 'Currency',
      control: 'select',
      options: ['EUR', 'TL'],
      table: { category: 'İçerik' },
    },
    changeAmount: { name: 'Change Amount', table: { category: 'Değişim' } },
    changePercent: { name: 'Change Percent', table: { category: 'Değişim' } },
    pendingCaption: { name: 'Pending Caption', table: { category: 'Bekleyen' } },
    pendingAmountValue: { name: 'Pending Amount Value', table: { category: 'Bekleyen' } },
  },
  render: (args) => <Overview {...toProps(args)} />,
};

export const FonYatirimlari: Story = {
  name: 'Fon yatırımları',
  args: {
    sectionLabel: 'Title',
    detail: true,
    percentage: true,
    view: true,
    pendingAmount: true,
    currencyAmount: '1.234,56',
    currency: 'EUR',
    changeAmount: '1.234,56 TL',
    changePercent: '1,23%',
    pendingCaption: 'Label',
    pendingAmountValue: '1.234,56 TL',
  },
};

export const GizliBakiye: Story = {
  name: 'Gizli bakiye',
  args: {
    sectionLabel: 'label',
    detail: false,
    percentage: false,
    view: false,
    currencyAmount: '1.234,56',
    currency: 'EUR',
    changeAmount: '1.234,56 TL',
    changePercent: '1,23%',
  },
};

export const SifirBakiye: Story = {
  name: 'Sıfır bakiye',
  args: {
    sectionLabel: 'label',
    detail: false,
    percentage: true,
    view: true,
    currencyAmount: '0,00',
    currency: 'TL',
    changeAmount: '0,00 TL',
  },
};

// Playground yalnız Figma'daki özellikleri gösterir; className burada gizlenir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
