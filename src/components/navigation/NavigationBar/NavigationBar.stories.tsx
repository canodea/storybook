import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import NavigationBar, {
  type NavigationBarProps,
  type NavigationBarIcon,
} from './NavigationBar';
import type { ProgressSteps } from '../Progress';

const description = `ODEA MOBILE | Navigation Bar. Üst gezinme çubuğu. base ve sheet-view olmak üzere iki görünümü vardır; solda geri oku, ortada başlık (isteğe bağlı alt başlık), sağda kapat/iki ikon/ekle aksiyonları. Altta isteğe bağlı Progress gösterilebilir.`;

const meta = {
  title: 'Components/Navigation/Navigation Bar',
  component: NavigationBar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const STYLES = ['base', 'sheet-view'] as const;
const ICONS = ['zero', 'one', 'two', 'add-icon'] as const;

type PlaygroundArgs = {
  style: (typeof STYLES)[number];
  label: string;
  subtitle: boolean;
  subtitleText: string;
  icon: (typeof ICONS)[number];
  progress: boolean;
  progressSteps: ProgressSteps;
  progressCurrent: number;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): NavigationBarProps => ({
  style: a.style,
  label: a.label,
  subtitle: a.subtitle,
  subtitleText: a.subtitleText,
  icon: a.icon,
  progress: a.progress,
  progressSteps: a.progressSteps,
  progressCurrent: a.progressCurrent,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    style: 'base',
    label: 'Label',
    subtitle: false,
    subtitleText: 'Section',
    icon: 'zero',
    progress: false,
    progressSteps: 4,
    progressCurrent: 1,
  },
  argTypes: {
    ...themeArgTypes,
    style: { name: 'Style', control: 'select', options: [...STYLES], table: { category: 'Görünüm' } },
    label: { name: 'Label', table: { category: 'Başlık' } },
    subtitle: { name: 'Subtitle', table: { category: 'Başlık' } },
    subtitleText: { name: 'Subtitle Text', table: { category: 'Başlık' } },
    icon: { name: 'Icon', control: 'select', options: [...ICONS], table: { category: 'Aksiyon' } },
    progress: { name: 'Progress', table: { category: 'Progress' } },
    progressSteps: {
      name: 'Progress Steps',
      control: 'select',
      options: [2, 3, 4, 5],
      table: { category: 'Progress' },
    },
    progressCurrent: { name: 'Progress Current', control: 'number', table: { category: 'Progress' } },
  },
  render: (args) => <NavigationBar {...toProps(args)} />,
};

const fav: NavigationBarIcon = { set: 'Games', name: 'HeartStraight' };
const alarm: NavigationBarIcon = { set: 'Time', name: 'Alarm' };

export const Base: Story = {
  name: 'Base',
  args: { style: 'base', label: 'Label' },
};

export const AltBaslik: Story = {
  name: 'Alt başlık',
  args: { style: 'base', label: 'Label', subtitle: true, subtitleText: 'Label' },
};

export const Kapat: Story = {
  name: 'Kapat + Progress',
  args: {
    style: 'base',
    label: 'Label',
    icon: 'one',
    progress: true,
    progressSteps: 4,
    progressCurrent: 2,
  },
};

export const IkiIkon: Story = {
  name: 'İki ikon',
  args: {
    style: 'base',
    label: 'Label',
    icon: 'two',
    trailingIcon1: fav,
    trailingIcon2: alarm,
  },
};

export const Ekle: Story = {
  name: 'Ekle',
  args: { style: 'base', label: 'Label', icon: 'add-icon' },
};

export const SheetView: Story = {
  name: 'Sheet view',
  args: { style: 'sheet-view', label: 'Label', icon: 'one' },
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
