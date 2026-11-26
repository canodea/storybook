import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import StatusTag, { type StatusTagProps, type StatusTagStatus } from './StatusTag';

const description = `ODEA MOBILE | Status Tag. 16x16 durum göstergesi. success/alarm/pending/unsuccess renkli bir daire içinde beyaz ikon gösterir; bullet ortada 6x6 nötr nokta çizer. Ekran okuyucu için durumu aria-label ile söyler.`;

const meta = {
  title: 'Components/Feedback/Status Tag',
  component: StatusTag,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof StatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATUSES: StatusTagStatus[] = ['success', 'bullet', 'alarm', 'pending', 'unsuccess'];

type PlaygroundArgs = {
  status: StatusTagStatus;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): StatusTagProps => ({ status: a.status });

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, status: 'success' },
  argTypes: {
    ...themeArgTypes,
    status: { name: 'Status', control: 'select', options: STATUSES, table: { category: 'Durum' } },
  },
  render: (args) => <StatusTag {...toProps(args)} />,
};

export const Senaryolar: Story = {
  args: { status: 'success' },
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
      {STATUSES.map((status) => (
        <StatusTag key={status} status={status} />
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
