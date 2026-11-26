import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon, { ICON_SETS } from './Icon';
import type { IconProps } from './Icon';

type IconDemoProps = IconProps & { color: string };

function IconDemo({ color, ...icon }: IconDemoProps) {
  return (
    <span style={{ display: 'inline-flex', color }}>
      <Icon {...icon} />
    </span>
  );
}

const meta = {
  title: 'Foundations/Icons/Icon Component',
  component: IconDemo,
  parameters: { layout: 'centered' },
  argTypes: {
    set: { control: 'select', options: ICON_SETS },
    name: { control: 'text' },
    size: { control: 'select', options: [16, 24, 32, 48] },
    color: { control: 'color' },
    title: { control: 'text' },
  },
  args: {
    set: 'Banking',
    name: 'TermDeposit',
    size: 24,
    color: 'var(--odea-icon-color-default)',
    title: 'Vadeli hesap',
  },
} satisfies Meta<typeof IconDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
