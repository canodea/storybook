import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import SectionDivider, {
  type SectionDividerProps,
  type SectionDividerType,
} from './SectionDivider';

const description = `ODEA MOBILE | Section Divider. Bölüm başlığı ayırıcısı (375x48). Etiket her zaman büyük harfle yazılır. type ile sağa CTA, pagination, tek/çift ikon ya da etiketin yanına info ikonu eklenir; fullWidth yalnız web içindir.`;

const meta = {
  title: 'Components/Navigation/Section Divider',
  component: SectionDivider,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof SectionDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

const TYPES: SectionDividerType[] = [
  'base',
  'cta',
  'carousel-pagination',
  'single-icon',
  'info',
  'info-cta',
  'double-icon',
];

const PAGINATION_STATUSES = ['first', 'second', 'third'] as const;

type PlaygroundArgs = {
  label: string;
  type: SectionDividerType;
  fullWidth: boolean;
  ctaLabel: string;
  paginationStatus: (typeof PAGINATION_STATUSES)[number];
  tone: 'default' | 'inverse';
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): SectionDividerProps => ({
  label: a.label,
  type: a.type,
  fullWidth: a.fullWidth,
  ctaLabel: a.ctaLabel || undefined,
  paginationStatus: a.paginationStatus,
  tone: a.tone,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    label: 'Label',
    type: 'base',
    fullWidth: false,
    ctaLabel: '',
    paginationStatus: 'first',
    tone: 'default',
  },
  argTypes: {
    ...themeArgTypes,
    label: { name: 'Label', table: { category: 'İçerik' } },
    type: { name: 'Type', control: 'select', options: TYPES, table: { category: 'Görünüm' } },
    fullWidth: { name: 'Full Width', table: { category: 'Görünüm' } },
    ctaLabel: { name: 'CTA Label', table: { category: 'CTA' } },
    paginationStatus: {
      name: 'Pagination Status',
      control: 'select',
      options: [...PAGINATION_STATUSES],
      table: { category: 'Carousel' },
    },
    tone: {
      name: 'Tone',
      control: 'select',
      options: ['default', 'inverse'],
      table: { category: 'Görünüm' },
    },
  },
  render: (args) => <SectionDivider {...toProps(args)} />,
};

export const Base: Story = {
  name: 'Base',
  args: { label: 'Label', type: 'base' },
};

export const Cta: Story = {
  name: 'CTA',
  args: { label: 'Label', type: 'cta', ctaLabel: 'TEXT LINK' },
};

export const CarouselPagination: Story = {
  name: 'Carousel Pagination',
  args: { label: 'Label', type: 'carousel-pagination', paginationStatus: 'first' },
};

export const Info: Story = {
  name: 'Info',
  args: { label: 'Label', type: 'info' },
};

export const TekIkon: Story = {
  name: 'Tek ikon',
  args: { label: 'Label', type: 'single-icon' },
};

export const CiftIkon: Story = {
  name: 'Çift ikon',
  args: { label: 'Label', type: 'double-icon' },
};

export const InfoCta: Story = {
  name: 'Info & CTA',
  args: { label: 'Label', type: 'info-cta', ctaLabel: 'TEXT LINK' },
};

const senaryolar: SectionDividerProps[] = [
  { label: 'Label', type: 'base' },
  { label: 'Label', type: 'cta', ctaLabel: 'TEXT LINK' },
  { label: 'Label', type: 'carousel-pagination', paginationStatus: 'first' },
  { label: 'Label', type: 'info' },
  { label: 'Label', type: 'single-icon' },
  { label: 'Label', type: 'double-icon' },
  { label: 'Label', type: 'info-cta', ctaLabel: 'TEXT LINK' },
];

export const Senaryolar: Story = {
  args: { label: 'Label', type: 'base' },
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '8px 0',
        width: 375,
        boxSizing: 'border-box',
      }}
    >
      {senaryolar.map((args) => (
        <SectionDivider key={`${args.type}-${args.label}`} {...args} />
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
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ).filter((n) => !["Tone"].includes(n)),
  },
};
