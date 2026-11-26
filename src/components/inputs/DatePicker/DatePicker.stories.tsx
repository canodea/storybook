import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../../docs-ui/playgroundTheme';
import DatePicker, { type DatePickerProps, type DatePickerType } from './DatePicker';

const description = `ODEA MOBILE | Date Picker. Tarih seçici. default/range gün ızgarası, months ay/yıl listesi gösterir. Ay ve yıl gerçek takvimden hesaplanır; günlere, oklara ve ay başlığına tıklanabilir. range modunda başlangıç ile bitiş arası mavi şeritle vurgulanır, uçlar seçili çizilir. Bottom sheet içinde kullanılır.`;

const meta = {
  title: 'Components/Inputs/Date Picker',
  component: DatePicker,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const TYPES: DatePickerType[] = ['default', 'range', 'months'];

// Storybook date kontrolü timestamp (number) verir.
const DEFAULT_SELECTED = new Date(2021, 10, 14).getTime();
const DEFAULT_RANGE_END = new Date(2021, 10, 23).getTime();
const DEFAULT_TODAY = new Date(2021, 10, 5).getTime();

type PlaygroundArgs = {
  type: DatePickerType;
  selected: number;
  rangeEnd: number;
  today: number;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): DatePickerProps => ({
  type: a.type ?? 'default',
  value: new Date(a.selected ?? DEFAULT_SELECTED),
  rangeEnd: new Date(a.rangeEnd ?? DEFAULT_RANGE_END),
  today: new Date(a.today ?? DEFAULT_TODAY),
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    type: 'default',
    selected: DEFAULT_SELECTED,
    rangeEnd: DEFAULT_RANGE_END,
    today: DEFAULT_TODAY,
  },
  argTypes: {
    ...themeArgTypes,
    type: { name: 'Type', control: 'select', options: TYPES, table: { category: 'Tür' } },
    selected: { name: 'Selected', control: 'date', table: { category: 'İçerik' } },
    rangeEnd: {
      name: 'Range End',
      control: 'date',
      table: { category: 'İçerik' },
      if: { arg: 'type', eq: 'range' },
    },
    today: { name: 'Today', control: 'date', table: { category: 'İçerik' } },
  },
  render: (args) => <DatePicker {...toProps(args)} />,
};

export const Kasim2021: Story = {
  name: 'Kasım 2021',
  args: { type: 'default', value: new Date(2021, 10, 14), today: new Date(2021, 10, 5) },
};

export const AralikSecimi: Story = {
  name: 'Aralık seçimi',
  args: {
    type: 'range',
    value: new Date(2021, 10, 14),
    rangeEnd: new Date(2021, 10, 23),
    today: new Date(2021, 10, 5),
  },
};

export const AySecimi: Story = {
  name: 'Ay seçimi',
  args: { type: 'months' },
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
