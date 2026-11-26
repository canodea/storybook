import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import IconAvatar, { type IconAvatarProps, type IconAvatarSize } from './IconAvatar';

const description = `ODEA MOBILE | Icon Avatar. Daire arka planlı ikon avatarı. Altı boy (16/24/32/40/48/56 px) sunar; ikon boyu boya göre ölçeklenir. Arka plan canvas, ikon birincil ikon rengindedir.`;

const meta = {
  title: 'Components/Avatars/Icon Avatar',
  component: IconAvatar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof IconAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES: IconAvatarSize[] = ['small', 'base', 'medium', 'large', 'xlarge', 'xxlarge'];

const iconOptions = {
  Cube: { set: 'Design', name: 'Cube' },
  Triangle: { set: 'Design', name: 'TriangleFull' },
  Coin: { set: 'Commerce', name: 'Coin' },
  Bank: { set: 'Math', name: 'Bank' },
  House: { set: 'Maps', name: 'HouseSimple' },
  Check: { set: 'System', name: 'Check' },
} as const;

type PlaygroundArgs = {
  size: IconAvatarSize;
  icon: keyof typeof iconOptions;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): IconAvatarProps => ({
  size: a.size,
  icon: iconOptions[a.icon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: 'base', icon: 'Cube' },
  argTypes: {
    ...themeArgTypes,
    size: { name: 'Size', control: 'select', options: SIZES, table: { category: 'Boyut' } },
    icon: { name: 'Icon', control: 'select', options: Object.keys(iconOptions), table: { category: 'İkon' } },
  },
  render: (args) => <IconAvatar {...toProps(args)} />,
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
        <IconAvatar key={size} size={size} />
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
