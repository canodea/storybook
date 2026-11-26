import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import CurrencyAvatar, { type CurrencyAvatarProps, type CurrencyAvatarSize } from './CurrencyAvatar';

const description = `ODEA MOBILE | Currency Avatar. Para birimi ikonu avatanı; iki boy (24/16 px) sunar. Arka plan contrast, ikon on-contrast rengindedir. Varsayılan ikon Currency/Try'dir.`;

const meta = {
  title: 'Components/Avatars/Currency Avatar',
  component: CurrencyAvatar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof CurrencyAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES: CurrencyAvatarSize[] = ['medium', 'small'];

const iconOptions = {
  Try: { set: 'Currency', name: 'Try' },
  Dollar: { set: 'Currency', name: 'Dollar' },
  Eur: { set: 'Currency', name: 'Eur' },
  Btc: { set: 'Currency', name: 'Btc' },
} as const;

type PlaygroundArgs = {
  size: CurrencyAvatarSize;
  icon: keyof typeof iconOptions;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CurrencyAvatarProps => ({
  size: a.size,
  icon: iconOptions[a.icon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: 'medium', icon: 'Try' },
  argTypes: {
    ...themeArgTypes,
    size: { name: 'Size', control: 'select', options: SIZES, table: { category: 'Boyut' } },
    icon: { name: 'Icon', control: 'select', options: Object.keys(iconOptions), table: { category: 'İkon' } },
  },
  render: (args) => <CurrencyAvatar {...toProps(args)} />,
};

export const Senaryolar: Story = {
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
      {SIZES.map((size) => (
        <CurrencyAvatar key={size} size={size} />
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
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
