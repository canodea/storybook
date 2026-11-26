import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from '../../../docs-ui/playgroundTheme';
import ActionCard, { type ActionCardProps } from './ActionCard';

const meta = {
  title: 'Components/Buttons/Action Card',
  component: ActionCard,
  parameters: {
    docs: {
      description: {
        component:
          'ODEA MOBILE | Action Card. İşlem, ayar veya destek sayfalarına yönlendiren kart. İkon, başlık ve açıklama daima birlikte gösterilir; açıklama en fazla iki satıra sığar.',
      },
    },
  },
} satisfies Meta<typeof ActionCard>;

export default meta;

const icons = {
  Cube: { set: 'Design', name: 'Cube' },
  Cards: { set: 'Office', name: 'Cards' },
  ClipboardText: { set: 'Office', name: 'ClipboardText' },
  Info: { set: 'Security', name: 'Info' },
  Receipt: { set: 'Commerce', name: 'Receipt' },
} as const;

type PlaygroundArgs = {
  title: string;
  info: string;
  actionIcon: keyof typeof icons;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ActionCardProps => ({
  title: a.title,
  info: a.info,
  actionIcon: icons[a.actionIcon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    title: 'Link',
    info: 'Lorem ipsum sit dolorem amet quare id faciam fortasse requiris',
    actionIcon: 'Cube',
  },
  argTypes: {
    ...themeArgTypes,
    title: { name: 'Title', table: { category: 'İçerik' } },
    info: { name: 'Info', table: { category: 'İçerik' } },
    actionIcon: {
      name: 'Action Icon',
      control: 'select',
      options: Object.keys(icons),
      table: { category: 'İkon' },
    },
  },
  render: (args) => <ActionCard {...toProps(args)} />,
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (className vb.) burada gizlenir.
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
