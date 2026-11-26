import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import Tabs, { type TabsProps, type TabsSelected } from './Tabs';

const description = `ODEA MOBILE | Tabs. 1–4 sekmeli kontrol (375x48). Seçili sekme birincil renkte ve altında 24x4 ters zemin çubuğu taşır; diğerleri ikincil renktedir. Etiketler sığmazsa satır yatay kaydırılır. Ok tuşlarıyla gezinilebilir (role="tablist"/"tab").`;

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const SELECTED: TabsSelected[] = [1, 2, 3, 4];

type PlaygroundArgs = {
  tabCount: number;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  selectedTab: TabsSelected;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): TabsProps => {
  const count = Math.min(4, Math.max(1, a.tabCount));
  return {
    labels: [a.label1, a.label2, a.label3, a.label4].slice(0, count),
    selected: (Math.min(a.selectedTab, count) || 1) as TabsSelected,
  };
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    tabCount: 4,
    label1: 'Label 1',
    label2: 'Label 2',
    label3: 'Label 3',
    label4: 'Label 4',
    selectedTab: 1,
  },
  argTypes: {
    ...themeArgTypes,
    tabCount: {
      name: 'Tab Count',
      control: { type: 'range', min: 1, max: 4, step: 1 },
      table: { category: 'Sekmeler' },
    },
    label1: { name: 'Tab 1 Label', table: { category: 'Sekmeler' } },
    label2: { name: 'Tab 2 Label', table: { category: 'Sekmeler' } },
    label3: { name: 'Tab 3 Label', table: { category: 'Sekmeler' } },
    label4: { name: 'Tab 4 Label', table: { category: 'Sekmeler' } },
    selectedTab: {
      name: 'Selected Tab',
      control: 'select',
      options: SELECTED,
      table: { category: 'Seçim' },
    },
  },
  render: (args) => <Tabs {...toProps(args)} />,
};

export const DortSekme: Story = {
  name: 'Dört sekme',
  args: { labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'] },
};

export const Kaydirilabilir: Story = {
  name: 'Kaydırılabilir (uzun etiketler)',
  args: {
    labels: ['Label long text 1', 'Label long text 2', 'Label long text 3', 'Label long text 4'],
  },
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
