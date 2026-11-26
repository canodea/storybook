import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import CurrencySwitcher, { type CurrencySwitcherProps } from './CurrencySwitcher';

const description = `ODEA MOBILE | Currency Switcher. Para birimi kodunu ve aşağı oku tek bir kompakt butonda (55x24) gösterir. Dokunulunca para birimi seçimi açılır; erişilebilirlik için buton seçili kodu bildirir ("Para birimi: TL").`;

const meta = {
  title: 'Components/Navigation/Currency Switcher',
  component: CurrencySwitcher,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof CurrencySwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = { currencyCode: string } & ThemeArgs;

const toProps = (a: PlaygroundArgs): CurrencySwitcherProps => ({ currencyCode: a.currencyCode });

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, currencyCode: 'TL' },
  argTypes: {
    ...themeArgTypes,
    currencyCode: { name: 'Currency Code', table: { category: 'İçerik' } },
  },
  render: (args) => <CurrencySwitcher {...toProps(args)} />,
};

export const TL: Story = {
  name: 'Türk Lirası',
  args: { currencyCode: 'TL' },
};

export const EUR: Story = {
  name: 'Euro',
  args: { currencyCode: 'EUR' },
};

export const USD: Story = {
  name: 'Dolar',
  args: { currencyCode: 'USD' },
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
