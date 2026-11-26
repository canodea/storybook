import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import CompanyAvatar, { type CompanyAvatarProps, type CompanyAvatarSize, type CompanyAvatarCompany } from './CompanyAvatar';

const description = `ODEA MOBILE | Company Avatar. Şirket logosu avatanı; görsel daire olarak kırpılır. Dört boy (16/24/32/40 px) sunar. Varsayılan şirket apple'dır. Görsel dekoratiftir; şirket adı ayrıca metinle verilir.`;

const meta = {
  title: 'Components/Avatars/Company Avatar',
  component: CompanyAvatar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof CompanyAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES: CompanyAvatarSize[] = ['small', 'base', 'medium', 'large'];
const COMPANIES: CompanyAvatarCompany[] = [
  'turkish-airlines',
  'tesla',
  'netflix',
  'turkcell',
  'microsoft',
  'google',
  'apple',
];

type PlaygroundArgs = {
  size: CompanyAvatarSize;
  company: CompanyAvatarCompany;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CompanyAvatarProps => ({
  size: a.size,
  company: a.company,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: 'base', company: 'apple' },
  argTypes: {
    ...themeArgTypes,
    size: { name: 'Size', control: 'select', options: SIZES, table: { category: 'Boyut' } },
    company: { name: 'Company', control: 'select', options: COMPANIES, table: { category: 'Şirket' } },
  },
  render: (args) => <CompanyAvatar {...toProps(args)} />,
};

export const Senaryolar: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--odea-surface-default)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
        padding: 24,
      }}
    >
      {COMPANIES.map((company) => (
        <CompanyAvatar key={company} size="base" company={company} />
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
