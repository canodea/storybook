import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import HomeIndicator from './HomeIndicator';

const description = `ODEA MOBILE | Home Indicator. iOS ana ekran göstergesi; ortada 134x5 yuvarlak bir çubuk çizer. Ekranın en altına konur. Bileşenin kendi prop'u yoktur (className hariç).`;

const meta = {
  title: 'Components/Shared/Home Indicator',
  component: HomeIndicator,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof HomeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<ThemeArgs> = {
  args: { ...themeArgs },
  argTypes: { ...themeArgTypes },
  render: () => <HomeIndicator />,
};

export const EkranAlti: Story = {
  name: 'Ekranın altında',
  render: () => (
    <div style={{ background: 'var(--odea-surface-default)', width: 375 }}>
      <HomeIndicator />
    </div>
  ),
};
