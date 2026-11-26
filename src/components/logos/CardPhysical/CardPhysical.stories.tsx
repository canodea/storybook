import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import CardPhysical, { type CardPhysicalProps, type CardPhysicalType } from './CardPhysical';

const description = `ODEA MOBILE | Card Physical. Fiziksel kart görseli; altı kart tipi sunar ve 64x40 çizilir. Diji Kart yalnız debit tipinde mümkündür ve dikey (40x64) çizilir. Görsel dekoratiftir.`;

const meta = {
  title: 'Foundations/Logos/Card Physical',
  component: CardPhysical,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof CardPhysical>;

export default meta;
type Story = StoryObj<typeof meta>;

const TYPES: CardPhysicalType[] = ['gold', 'private', 'ayricalikli', 'platinum', 'axess', 'debit'];

type PlaygroundArgs = {
  type: CardPhysicalType;
  dijiKart: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CardPhysicalProps => ({
  type: a.type ?? 'gold',
  dijiKart: a.dijiKart ?? false,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, type: 'gold', dijiKart: false },
  argTypes: {
    ...themeArgTypes,
    type: { name: 'Type', control: 'select', options: TYPES, table: { category: 'Kart' } },
    dijiKart: { name: 'Diji Kart', table: { category: 'Kart' } },
  },
  render: (args) => <CardPhysical {...toProps(args)} />,
};

export const DijiOlmayanDebit: Story = {
  name: 'Uç durum · Diji olmayan debit',
  args: { type: 'debit', dijiKart: false },
};

export const Senaryolar: Story = {
  args: { type: 'gold' },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 16,
        padding: 24,
      }}
    >
      {TYPES.map((type) => (
        <CardPhysical key={type} type={type} />
      ))}
      <CardPhysical type="debit" dijiKart />
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
