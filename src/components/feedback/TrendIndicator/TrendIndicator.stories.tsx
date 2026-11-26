import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import TrendIndicator, { type TrendIndicatorProps, type TrendIndicatorTrend } from './TrendIndicator';

const description = `ODEA MOBILE | Trend Indicator. Değer değişim göstergesi. positive yukarı üçgen + yeşil metin, negative 180° döndürülmüş üçgen + kırmızı metin, fixed ikonsuz ikincil metin. Renk tek başına anlam taşımaz; metin her zaman zorunludur.`;

const meta = {
  title: 'Components/Feedback/Trend Indicator',
  component: TrendIndicator,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof TrendIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const TRENDS: TrendIndicatorTrend[] = ['positive', 'fixed', 'negative'];

type PlaygroundArgs = {
  trend: TrendIndicatorTrend;
  value: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): TrendIndicatorProps => ({
  trend: a.trend,
  value: a.value || undefined,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, trend: 'positive', value: '' },
  argTypes: {
    ...themeArgTypes,
    trend: { name: 'Trend', control: 'select', options: TRENDS, table: { category: 'Yön' } },
    value: { name: 'Value', table: { category: 'Yön' } },
  },
  render: (args) => <TrendIndicator {...toProps(args)} />,
};

export const BuyukDeger: Story = {
  name: 'Uç durum · Büyük değer',
  args: { trend: 'positive', value: '+1.250.000,00%' },
};

export const Senaryolar: Story = {
  args: { trend: 'positive' },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
        padding: 24,
      }}
    >
      <TrendIndicator trend="positive" value="0,36%" />
      <TrendIndicator trend="fixed" value="0%" />
      <TrendIndicator trend="negative" value="-1,24%" />
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; className burada gizlenir.
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
