import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import TabLink, { type TabLinkProps, type TabLinkTab } from './TabLink';

const description = `ODEA MOBILE | Tab Link. Alt tab bar sekmesi; üstte ikon + gösterge noktası, altta etiket. Sekme seçiliyken (Indicator On) nokta görünür, etiket ve ikon birincil renge döner; seçili değilken nokta gizlenir ve renk ikincile düşer. Bir tab bar içinde yalnızca bir sekme On olur.`;

const meta = {
  title: 'Components/Navigation/Primitives/Tab Link',
  component: TabLink,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof TabLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const TABS: TabLinkTab[] = ['investbook', 'banking', 'investments', 'goals', 'more'];

type PlaygroundArgs = {
  tab: TabLinkTab;
  indicator: boolean;
  label: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): TabLinkProps => ({
  tab: a.tab,
  indicator: a.indicator,
  label: a.label || undefined,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    tab: 'investbook',
    indicator: true,
    label: '',
  },
  argTypes: {
    ...themeArgTypes,
    tab: { name: 'Tab', control: 'select', options: TABS, table: { category: 'Sekme' } },
    indicator: { name: 'Indicator', table: { category: 'Sekme' } },
    label: { name: 'Label', table: { category: 'Sekme' } },
  },
  render: (args) => <TabLink {...toProps(args)} />,
};

export const TabBar: Story = {
  name: 'Tab bar',
  args: { tab: 'investbook' },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        width: 375,
        boxSizing: 'border-box',
      }}
    >
      {TABS.map((tab, index) => (
        <TabLink key={tab} tab={tab} indicator={index === 0} />
      ))}
    </div>
  ),
};

export const SekmeKapali: Story = {
  name: 'Uç durum · Sekme kapalı',
  args: { tab: 'banking', indicator: false },
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
