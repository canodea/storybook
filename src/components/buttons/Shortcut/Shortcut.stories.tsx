import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from '../../../docs-ui/playgroundTheme';
import Shortcut, { type ShortcutProps } from './Shortcut';

const meta = {
  title: 'Components/Buttons/Shortcut',
  component: Shortcut,
  parameters: {
    docs: {
      description: {
        component:
          'ODEA MOBILE | Shortcut. Yalnız ana sayfadaki Hızlı İşlemler alanında "More" (İşlemler ekranına gider) için kullanılır. Diğer butonların aksine FULL CAPS kuralı burada geçerli değildir.',
      },
    },
  },
} satisfies Meta<typeof Shortcut>;

export default meta;
type Story = StoryObj<typeof meta>;

const icons = {
  'Squares Four': { set: 'Design', name: 'Squares Four' },
  Cube: { set: 'Design', name: 'Cube' },
  Cards: { set: 'Office', name: 'Cards' },
} as const;

type PlaygroundArgs = {
  label: string;
  icon: keyof typeof icons;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ShortcutProps => ({
  label: a.label,
  icon: icons[a.icon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    label: 'More',
    icon: 'Squares Four',
  },
  argTypes: {
    ...themeArgTypes,
    label: { name: 'Label', table: { category: 'İçerik' } },
    icon: {
      name: 'Icon',
      control: 'select',
      options: Object.keys(icons),
      table: { category: 'İkon' },
    },
  },
  render: (args) => <Shortcut {...toProps(args)} />,
};

export const More: Story = {
  name: 'More',
  args: { label: 'More', icon: { set: 'Design', name: 'Squares Four' } },
};

export const IkiSatir: Story = {
  name: 'Uç durum · İki satırlık label',
  args: { label: 'Lorem ipsum dolor', icon: { set: 'Design', name: 'Squares Four' } },
};

export const UzunLabel: Story = {
  name: 'Uç durum · İki satırı aşan label',
  args: { label: 'Lorem ipsum dolor sit amet consectetur', icon: { set: 'Design', name: 'Squares Four' } },
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
