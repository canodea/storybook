import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import BottomBar, { type BottomBarItem, type BottomBarProps } from './BottomBar';

const description = `ODEA MOBILE | Bottom Bar. 3–5 sekmeli alt menü (375x90); üstte TabLink'ler, altta Home Indicator. Bu menu Banking/InvestBook'un önceki navigasyonuna aittir; güncel Odea Mobil alt menüsü olarak yeni tasarımlara uygulanmaz.`;

const meta = {
  title: 'Components/Navigation/Bottom Bar (Legacy)',
  component: BottomBar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof BottomBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const iconOptions = {
  'HouseSimple/Maps': { set: 'Maps', name: 'HouseSimple' },
  'Bank/Math': { set: 'Math', name: 'Bank' },
  'ChartBarSimple/Math': { set: 'Math', name: 'ChartBarSimple' },
  'Crosshair/Maps': { set: 'Maps', name: 'Crosshair' },
  'DotsSixVertical/System': { set: 'System', name: 'DotsSixVertical' },
  'House/Maps': { set: 'Maps', name: 'House' },
  'ChartPie/Math': { set: 'Math', name: 'ChartPie' },
  'Bell/System': { set: 'System', name: 'Bell' },
  'HeartStraight/Games': { set: 'Games', name: 'HeartStraight' },
  'Calendar/Time': { set: 'Time', name: 'Calendar' },
} as const;

const ICON_KEYS = Object.keys(iconOptions) as (keyof typeof iconOptions)[];

const DEFAULT_ITEMS: BottomBarItem[] = [
  { icon: iconOptions['HouseSimple/Maps'], label: 'Home' },
  { icon: iconOptions['Bank/Math'], label: 'Banking' },
  { icon: iconOptions['ChartBarSimple/Math'], label: 'Investments' },
  { icon: iconOptions['Crosshair/Maps'], label: 'Goals' },
  { icon: iconOptions['DotsSixVertical/System'], label: 'More' },
];

type PlaygroundArgs = {
  tabCount: number;
  activeTab: number;
  tab1Label: string;
  tab2Label: string;
  tab3Label: string;
  tab4Label: string;
  tab5Label: string;
  tab1Icon: keyof typeof iconOptions;
  tab2Icon: keyof typeof iconOptions;
  tab3Icon: keyof typeof iconOptions;
  tab4Icon: keyof typeof iconOptions;
  tab5Icon: keyof typeof iconOptions;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): BottomBarProps => {
  const count = Math.min(5, Math.max(1, a.tabCount));
  const labels = [a.tab1Label, a.tab2Label, a.tab3Label, a.tab4Label, a.tab5Label].slice(0, count);
  const icons = [a.tab1Icon, a.tab2Icon, a.tab3Icon, a.tab4Icon, a.tab5Icon].slice(0, count);
  return {
    items: labels.map((label, index) => ({ label, icon: iconOptions[icons[index]] })),
    activeIndex: Math.min(a.activeTab, count) - 1,
  };
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    tabCount: 5,
    activeTab: 1,
    tab1Label: 'Home',
    tab2Label: 'Banking',
    tab3Label: 'Investments',
    tab4Label: 'Goals',
    tab5Label: 'More',
    tab1Icon: 'HouseSimple/Maps',
    tab2Icon: 'Bank/Math',
    tab3Icon: 'ChartBarSimple/Math',
    tab4Icon: 'Crosshair/Maps',
    tab5Icon: 'DotsSixVertical/System',
  },
  argTypes: {
    ...themeArgTypes,
    tabCount: {
      name: 'Tab Count',
      control: { type: 'range', min: 3, max: 5, step: 1 },
      table: { category: 'Sekmeler' },
    },
    activeTab: {
      name: 'Active Tab',
      control: 'select',
      options: [1, 2, 3, 4, 5],
      table: { category: 'Seçim' },
    },
    tab1Label: { name: 'Tab 1 Label', table: { category: 'Sekmeler' } },
    tab2Label: { name: 'Tab 2 Label', table: { category: 'Sekmeler' } },
    tab3Label: { name: 'Tab 3 Label', table: { category: 'Sekmeler' } },
    tab4Label: { name: 'Tab 4 Label', table: { category: 'Sekmeler' } },
    tab5Label: { name: 'Tab 5 Label', table: { category: 'Sekmeler' } },
    tab1Icon: { name: 'Tab 1 Icon', control: 'select', options: ICON_KEYS, table: { category: 'Sekmeler' } },
    tab2Icon: { name: 'Tab 2 Icon', control: 'select', options: ICON_KEYS, table: { category: 'Sekmeler' } },
    tab3Icon: { name: 'Tab 3 Icon', control: 'select', options: ICON_KEYS, table: { category: 'Sekmeler' } },
    tab4Icon: { name: 'Tab 4 Icon', control: 'select', options: ICON_KEYS, table: { category: 'Sekmeler' } },
    tab5Icon: { name: 'Tab 5 Icon', control: 'select', options: ICON_KEYS, table: { category: 'Sekmeler' } },
  },
  render: (args) => <BottomBar {...toProps(args)} />,
};

export const UcSekme: Story = {
  name: 'Üç sekme',
  args: { items: DEFAULT_ITEMS.slice(0, 3), activeIndex: 0 },
};

export const DortSekme: Story = {
  name: 'Dört sekme',
  args: { items: DEFAULT_ITEMS.slice(0, 4), activeIndex: 1 },
};

export const AltMenu: Story = {
  name: 'Alt menü',
  args: { items: DEFAULT_ITEMS, activeIndex: 0 },
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
