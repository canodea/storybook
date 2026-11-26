import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import Indicator, { type IndicatorStatus } from './Indicator';

const description = `ODEA MOBILE | Indicator. Progress içindeki tek parça; 4px yüksekliğinde yatay çubuk. current marka renginde ve tam yuvarlak, completed ters zemin renginde, next açık gri. Tek başına etkileşimli değildir; genişlik esnektir (flex 1).`;

const meta = {
  title: 'Components/Navigation/Primitives/Indicator',
  component: Indicator,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATUSES: IndicatorStatus[] = ['current', 'completed', 'next'];

type PlaygroundArgs = { status: IndicatorStatus } & ThemeArgs;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, status: 'current' },
  argTypes: {
    ...themeArgTypes,
    status: { name: 'Status', control: 'select', options: STATUSES, table: { category: 'Durum' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', width: 176 }}>
      <Indicator status={args.status} />
    </div>
  ),
};

const senaryolar: { status: IndicatorStatus; label: string }[] = [
  { status: 'current', label: 'Current' },
  { status: 'completed', label: 'Completed' },
  { status: 'next', label: 'Next' },
];

export const Senaryolar: Story = {
  args: { status: 'current' },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        width: 375,
        boxSizing: 'border-box',
      }}
    >
      {senaryolar.map(({ status, label }) => (
        <div key={status} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-family-body, 'Inter', sans-serif)",
              fontSize: 12,
              lineHeight: '18px',
              color: 'var(--odea-text-label)',
            }}
          >
            {label}
          </span>
          <div style={{ display: 'flex', width: 176 }}>
            <Indicator status={status} />
          </div>
        </div>
      ))}
    </div>
  ),
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
