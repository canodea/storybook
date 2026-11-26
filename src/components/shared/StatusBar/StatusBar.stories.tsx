import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import StatusBar from './StatusBar';

const description = `ODEA MOBILE | Status Bar. iOS durum çubuğu; saat 9:41, sinyal, wifi ve pil göstergelerini tek bir görsel olarak 375x44 çizer. Çentik (dynamic island) varsayılan olarak çizilir; Figma Navigation Bar'da zemin rengine karıştığı için Notch kapatılır. Koyu temada görsel invert edilerek beyaza döner. Time, Network Signal, WiFi Signal ve Battery parçaları Figma'da ayrı setlerdir ama tek başına kullanılmaz; ayrı bileşen üretilmez.`;

const meta = {
  title: 'Components/Shared/Status Bar',
  component: StatusBar,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<
  ThemeArgs & { notch: boolean; appearance: 'default' | 'on-dark' }
> = {
  args: { ...themeArgs, notch: true, appearance: 'default' },
  argTypes: {
    ...themeArgTypes,
    appearance: {
      name: 'Appearance',
      control: 'select',
      options: ['default', 'on-dark'],
      table: { category: 'Görünüm' },
    },
    notch: { name: 'Notch', table: { category: 'Görünüm' } },
  },
  render: (args) => <StatusBar notch={args.notch} appearance={args.appearance} />,
};

export const EkranUstu: Story = {
  name: 'Ekranın üstünde',
  render: () => (
    <div style={{ background: 'var(--odea-surface-default)', width: 375 }}>
      <StatusBar />
    </div>
  ),
};
