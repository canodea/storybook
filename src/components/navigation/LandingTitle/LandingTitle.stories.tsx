import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import type { IconSet } from '../../../foundations';
import LandingTitle, { type LandingTitleIcon, type LandingTitleProps } from './LandingTitle';

const description = `ODEA MOBILE | Landing Title. Karşılama başlığı (375x100); koyu zemin üzerindedir. Üstte ters durum çubuğu, altta UI Display/LG başlık ve sağda bir veya iki ikon.`;

const meta = {
  title: 'Components/Navigation/Landing Title',
  component: LandingTitle,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof LandingTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

const ICONS = [
  'System|BellSimple',
  'System|MagnifyingGlass',
  'System|Gear',
  'People|User',
  'Communications|Chat - Circle',
  'Games|Heart',
  'Security|Question',
  'Security|Info',
  'Maps|House',
  'Time|Calendar',
  'System|Check',
  'Weather|Star',
] as const;

// Storybook `if` ile gizlenen kontrolün değeri boş gelebilir; o zaman varsayılan kullanılır.
const toIcon = (value: string | undefined, fallback: string): LandingTitleIcon => {
  const [set, name] = (value ?? fallback).split('|');
  return { set: set as IconSet, name };
};

type PlaygroundArgs = {
  title: string;
  icons: 'one' | 'two';
  icon1: (typeof ICONS)[number];
  icon2: (typeof ICONS)[number];
  avatar: boolean;
  initials: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): LandingTitleProps => ({
  title: a.title,
  icons: a.icons,
  icon1: toIcon(a.icon1, 'System|BellSimple'),
  icon2: toIcon(a.icon2, 'System|MagnifyingGlass'),
  avatar: a.avatar,
  initials: a.initials || undefined,
});

const darkWrapper = (children: React.ReactNode) => (
  <div style={{ background: 'var(--odea-neutral-oxford-black)', padding: 0, width: 375 }}>
    {children}
  </div>
);

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    title: 'Title',
    icons: 'one',
    icon1: 'System|BellSimple',
    icon2: 'System|MagnifyingGlass',
    avatar: false,
    initials: 'AB',
  },
  argTypes: {
    ...themeArgTypes,
    title: { name: 'Title', table: { category: 'İçerik' } },
    icons: {
      name: 'Icons',
      control: 'radio',
      options: ['one', 'two'],
      table: { category: 'Görünüm' },
    },
    icon1: {
      name: 'Icon 1',
      control: 'select',
      options: [...ICONS],
      table: { category: 'İkonlar' },
    },
    icon2: {
      name: 'Icon 2',
      control: 'select',
      options: [...ICONS],
      if: { arg: 'icons', eq: 'two' },
      table: { category: 'İkonlar' },
    },
    avatar: { name: 'Avatar', table: { category: 'Görünüm' } },
    initials: {
      name: 'Initials',
      if: { arg: 'avatar' },
      table: { category: 'İçerik' },
    },
  },
  render: (args) => darkWrapper(<LandingTitle {...toProps(args)} />),
};

export const TekIkon: Story = {
  name: 'Tek ikon',
  args: { title: 'Title', icons: 'one' },
  render: (args) => darkWrapper(<LandingTitle {...args} />),
};

export const IkiIkon: Story = {
  name: 'İki ikon',
  args: {
    title: 'Title',
    icons: 'two',
    icon1: { set: 'System', name: 'BellSimple' },
    icon2: { set: 'System', name: 'MagnifyingGlass' },
  },
  render: (args) => darkWrapper(<LandingTitle {...args} />),
};

export const Avatarli: Story = {
  name: 'Avatarlı',
  args: { title: 'Title', avatar: true, initials: 'AB', icons: 'one' },
  render: (args) => darkWrapper(<LandingTitle {...args} />),
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
