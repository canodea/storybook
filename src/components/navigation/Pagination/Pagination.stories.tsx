import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import Pagination, { type PaginationProps, type PaginationStatus } from './Pagination';

const description = `ODEA MOBILE | Pagination. Sayfalama göstergesi. Dot Number kapalıyken üç öğe (aktif olan 24x8 brand pill, diğerleri 8x8 daire); açıkken yalnız iki öğe sağa yaslı gösterilir. Aktif öğenin sırası status ile belirlenir.`;

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATUSES: PaginationStatus[] = ['first', 'second', 'third'];

type PlaygroundArgs = {
  status: PaginationStatus;
  dotNumber: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): PaginationProps => ({
  status: a.status,
  dotNumber: a.dotNumber,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    status: 'first',
    dotNumber: false,
  },
  argTypes: {
    ...themeArgTypes,
    status: { name: 'Status', control: 'select', options: STATUSES, table: { category: 'Durum' } },
    dotNumber: { name: 'Dot Number', table: { category: 'Durum' } },
  },
  render: (args) => <Pagination {...toProps(args)} />,
};

export const UcuncuDotNumber: Story = {
  name: 'Uç durum · Third + Dot Number',
  args: { status: 'third', dotNumber: true },
};

export const Senaryolar: Story = {
  args: { status: 'first' },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
        padding: 24,
        width: 375,
        boxSizing: 'border-box',
      }}
    >
      <Pagination status="first" />
      <Pagination status="second" />
      <Pagination status="third" />
      <Pagination status="first" dotNumber />
      <Pagination status="second" dotNumber />
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
