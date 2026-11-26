import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import FlagAvatar, { type FlagAvatarProps, type FlagAvatarSize, type FlagAvatarCountry } from './FlagAvatar';

const description = `ODEA MOBILE | Flag Avatar. Dairesel ülke bayrağı avatanı. Dört boy (40/32/24/16 px) sunar; bayrak görseli boya göre ölçeklenir. Görsel dekoratiftir; ülke adı ayrıca metinle verilir.`;

const meta = {
  title: 'Components/Avatars/Flag Avatar',
  component: FlagAvatar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof FlagAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES: FlagAvatarSize[] = ['large', 'medium', 'base', 'small'];
const COUNTRIES: FlagAvatarCountry[] = ['turkey', 'united-states'];

type PlaygroundArgs = {
  size: FlagAvatarSize;
  country: FlagAvatarCountry;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): FlagAvatarProps => ({
  size: a.size,
  country: a.country,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: 'base', country: 'turkey' },
  argTypes: {
    ...themeArgTypes,
    size: { name: 'Size', control: 'select', options: SIZES, table: { category: 'Boyut' } },
    country: { name: 'Country', control: 'select', options: COUNTRIES, table: { category: 'Ülke' } },
  },
  render: (args) => <FlagAvatar {...toProps(args)} />,
};

export const Senaryolar: Story = {
  args: { country: 'turkey' },
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
      {COUNTRIES.map((country) => (
        <div key={country} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {SIZES.map((size) => (
            <FlagAvatar key={size} size={size} country={country} />
          ))}
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
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
