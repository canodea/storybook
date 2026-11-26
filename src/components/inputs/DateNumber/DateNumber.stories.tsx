import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import DateNumber, { type DateNumberProps, type DateNumberState } from './DateNumber';

const description = `ODEA MOBILE | Number. Takvim günü hücresi (Date Picker içinde kullanılır). 32x32 tam yuvarlak buton; bugün (today) iç kenarlık, seçili (selected) dolu zemin, aktif düz metin, pasif (disabled) soluk metin olarak çizilir.`;

const meta = {
  title: 'Components/Inputs/Primitives/Number',
  component: DateNumber,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof DateNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATES: DateNumberState[] = ['today', 'selected', 'active', 'disabled'];

type PlaygroundArgs = {
  state: DateNumberState;
  day: number;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): DateNumberProps => ({
  state: a.state ?? 'today',
  children: a.day ?? 5,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, state: 'today', day: 5 },
  argTypes: {
    ...themeArgTypes,
    state: { name: 'State', control: 'select', options: STATES, table: { category: 'Durum' } },
    day: { name: 'Day', control: 'number', table: { category: 'Durum' } },
  },
  render: (args) => <DateNumber {...toProps(args)} />,
};

export const Senaryolar: Story = {
  args: { children: 5 },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 24,
      }}
    >
      <DateNumber state="today">5</DateNumber>
      <DateNumber state="selected">14</DateNumber>
      <DateNumber state="active">12</DateNumber>
      <DateNumber state="disabled">30</DateNumber>
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
