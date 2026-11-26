import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import Progress, { type ProgressProps, type ProgressSteps } from './Progress';

const description = `ODEA MOBILE | Progress. Doğrusal aşama göstergesi (375x8). 2–5 adım; current'tan öncekiler completed, current current, sonrakiler next. Tıklanabilir navigasyon değildir; role="progressbar" ile erişilebilirdir.`;

const meta = {
  title: 'Components/Navigation/Progress',
  component: Progress,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = { steps: ProgressSteps; current: number } & ThemeArgs;

const toProps = (a: PlaygroundArgs): ProgressProps => ({ steps: a.steps, current: a.current });

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, steps: 4, current: 1 },
  argTypes: {
    ...themeArgTypes,
    steps: {
      name: 'Steps',
      control: 'select',
      options: [2, 3, 4, 5],
      table: { category: 'Adımlar' },
    },
    current: { name: 'Current', control: 'number', table: { category: 'Adımlar' } },
  },
  render: (args) => <Progress {...toProps(args)} />,
};

export const IkiAdim: Story = {
  name: 'İki adım',
  args: { steps: 2, current: 1 },
};

export const UcAdim: Story = {
  name: 'Üç adım',
  args: { steps: 3, current: 2 },
};

export const DortAdim: Story = {
  name: 'Dört adım',
  args: { steps: 4, current: 3 },
};

export const BesAdim: Story = {
  name: 'Beş adım',
  args: { steps: 5, current: 5 },
};

export const SinirDisi: Story = {
  name: 'Uç durum · Sınır dışı',
  args: { steps: 4, current: 9 },
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
