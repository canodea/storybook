import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from '../../../docs-ui/playgroundTheme';
import ShortcutLarge, { type ShortcutLargeProps } from './ShortcutLarge';

const meta = {
  title: 'Components/Buttons/Shortcut Large',
  component: ShortcutLarge,
  parameters: {
    docs: {
      description: {
        component:
          'ODEA MOBILE | Shortcut Large. Yalnız hesap IBAN’ını göstermek ve kopyalamak içindir; başka değer için kullanılmaz. Sağdaki kopyalama ikonu panoya IBAN’ı yazar ve kısa bir geri bildirim gösterir.',
      },
    },
  },
} satisfies Meta<typeof ShortcutLarge>;

export default meta;

const actionIcons = {
  Copy: { set: 'Office', name: 'Copy' },
  CopySimple: { set: 'Office', name: 'CopySimple' },
  ClipboardText: { set: 'Office', name: 'ClipboardText' },
} as const;

type PlaygroundArgs = {
  label: string;
  value: string;
  actionIcon: keyof typeof actionIcons;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ShortcutLargeProps => ({
  label: a.label,
  value: a.value,
  actionIcon: actionIcons[a.actionIcon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    label: 'IBAN',
    value: 'TR00 0000 0000 0000 0000 0000 00',
    actionIcon: 'Copy',
  },
  argTypes: {
    ...themeArgTypes,
    label: { name: 'Label', table: { category: 'İçerik' } },
    value: { name: 'Value', table: { category: 'İçerik' } },
    actionIcon: {
      name: 'Action Icon',
      control: 'select',
      options: Object.keys(actionIcons),
      table: { category: 'Aksiyon' },
    },
  },
  render: (args) => <ShortcutLarge {...toProps(args)} />,
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
