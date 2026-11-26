import type { Meta, StoryObj } from '@storybook/react-vite';
import { themeArgs, themeArgTypes, type ThemeArgs } from '../../docs-ui/playgroundTheme';
import { paymentMethods, type PaymentMethodName } from '../logos/PaymentMethod';
import type { CardPhysicalType } from '../logos/CardPhysical';
import CardMvpPlus, {
  type CardMvpPlusContainer,
  type CardMvpPlusIcon,
  type CardMvpPlusLeading,
  type CardMvpPlusProps,
  type CardMvpPlusType,
} from './CardMvpPlus';

const cardTypes: CardPhysicalType[] = [
  'gold',
  'private',
  'ayricalikli',
  'platinum',
  'axess',
  'debit',
];

const leadingIcons = {
  Bank: { set: 'Math', name: 'Bank' },
  Money: { set: 'Banking', name: 'Money' },
  Wallet: { set: 'Commerce', name: 'Wallet' },
} as const;

const actionIcons = {
  DotsThree: { set: 'System', name: 'DotsThree' },
  CaretRight: { set: 'Arrows / Caret', name: 'Right' },
} as const;

const description = `ODEA MOBILE | Card MVP+. Leading (Payment Method | Icon | Card Image) ve Container (Flat | Card) eksenleri. Payment Method ve Icon varyantında üst satırda leading + ad, sağda aksiyon ikonu; altında kart numarası ve iki etiket/değer satırı bulunur. Card Image varyantında Card Physical 64×40, ad ve kart numarası sağda durur. Flat padding 16 24 ve köşesizdir; Card padding 16, 8 px köşe ve kart gölgesi taşır. Type ile kart/hesap/kredi hazır ayarları uygulanır; açık verilen prop her zaman kazanır. Metinler dummy örnektir. Tema: Dark Mode varyantı yoktur; renkler token üzerinden otomatik değişir.`;

const meta = {
  title: 'Components/Cards/Card MVP+',
  component: CardMvpPlus,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof CardMvpPlus>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundType = CardMvpPlusType | 'none';

type PlaygroundArgs = {
  type: PlaygroundType;
  leading: CardMvpPlusLeading;
  leadingIconName: keyof typeof leadingIcons;
  container: CardMvpPlusContainer;
  showAction: boolean;
  actionIconName: keyof typeof actionIcons;
  name: string;
  cardNumber: string;
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  paymentMethod: PaymentMethodName;
  cardType: CardPhysicalType;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): CardMvpPlusProps => {
  const presetType = a.type === 'none' ? undefined : a.type;
  const preset = presetType !== undefined;
  return {
    type: presetType,
    // Hazır ayar seçiliyken varsayılanları o belirler; açık prop vermeyiz.
    leading: preset ? undefined : (a.leading ?? 'payment-method'),
    leadingIcon: LEADING_ICON(a.leadingIconName),
    container: a.container,
    showAction: a.showAction,
    actionIcon: ACTION_ICON(a.actionIconName),
    name: a.name || undefined,
    cardNumber: preset ? undefined : a.cardNumber || undefined,
    label1: a.label1 || undefined,
    value1: preset ? undefined : a.value1 || undefined,
    label2: a.label2 || undefined,
    value2: a.value2 || undefined,
    paymentMethod: a.paymentMethod,
    cardType: a.cardType,
  };
};

// `if` ile gizlenen kontrolün değeri boş gelebilir; her zaman varsayılana düş.
function LEADING_ICON(name?: keyof typeof leadingIcons): CardMvpPlusIcon {
  return leadingIcons[name ?? 'Bank'];
}

function ACTION_ICON(name?: keyof typeof actionIcons): CardMvpPlusIcon {
  return actionIcons[name ?? 'DotsThree'];
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    type: 'none',
    leading: 'payment-method',
    leadingIconName: 'Bank',
    container: 'flat',
    showAction: true,
    actionIconName: 'DotsThree',
    name: 'Title',
    cardNumber: '0000 **** **** 0000',
    label1: 'Label',
    value1: '1.234,56 TL',
    label2: 'Label',
    value2: '1.234,56 TL',
    paymentMethod: 'mastercard',
    cardType: 'gold',
  },
  argTypes: {
    ...themeArgTypes,
    type: {
      name: 'Type',
      control: 'select',
      options: ['none', 'card', 'account', 'loan'],
      table: { category: 'Görünüm' },
    },
    leading: {
      name: 'Leading',
      control: 'select',
      options: ['payment-method', 'icon', 'card-image'],
      if: { arg: 'type', eq: 'none' },
      table: { category: 'Görünüm' },
    },
    leadingIconName: {
      name: 'Leading Icon',
      control: 'select',
      options: Object.keys(leadingIcons),
      if: { arg: 'leading', eq: 'icon' },
      table: { category: 'Görsel' },
    },
    container: {
      name: 'Container',
      control: 'select',
      options: ['flat', 'card'],
      table: { category: 'Görünüm' },
    },
    showAction: { name: 'Show Action', table: { category: 'Görünüm' } },
    actionIconName: {
      name: 'Action Icon',
      control: 'select',
      options: Object.keys(actionIcons),
      if: { arg: 'showAction' },
      table: { category: 'Görsel' },
    },
    name: { name: 'Name', table: { category: 'İçerik' } },
    cardNumber: {
      name: 'Card Number',
      if: { arg: 'type', eq: 'none' },
      table: { category: 'İçerik' },
    },
    label1: { name: 'Label 1', table: { category: 'İçerik' } },
    value1: {
      name: 'Value 1',
      if: { arg: 'type', eq: 'none' },
      table: { category: 'İçerik' },
    },
    label2: { name: 'Label 2', table: { category: 'İçerik' } },
    value2: { name: 'Value 2', table: { category: 'İçerik' } },
    paymentMethod: {
      name: 'Payment Method',
      control: 'select',
      options: [...paymentMethods],
      if: { arg: 'leading', eq: 'payment-method' },
      table: { category: 'Görsel' },
    },
    cardType: {
      name: 'Card Type',
      control: 'select',
      options: cardTypes,
      if: { arg: 'leading', eq: 'card-image' },
      table: { category: 'Görsel' },
    },
  },
  render: (args) => (
    <div style={{ width: 375 }}>
      <CardMvpPlus {...toProps(args)} />
    </div>
  ),
};

export const Kart: Story = {
  name: 'Kart',
  args: {
    type: 'card',
    container: 'card',
  },
  render: (args) => (
    <div style={{ width: 375, padding: 24, background: 'var(--odea-background-canvas)' }}>
      <CardMvpPlus {...args} />
    </div>
  ),
};

export const Hesap: Story = {
  name: 'Hesap',
  args: {
    type: 'account',
    container: 'card',
  },
  render: (args) => (
    <div style={{ width: 375, padding: 24, background: 'var(--odea-background-canvas)' }}>
      <CardMvpPlus {...args} />
    </div>
  ),
};

export const Kredi: Story = {
  name: 'Kredi',
  args: {
    type: 'loan',
    container: 'card',
  },
  render: (args) => (
    <div style={{ width: 375, padding: 24, background: 'var(--odea-background-canvas)' }}>
      <CardMvpPlus {...args} />
    </div>
  ),
};

export const AnaSayfaKullanimi: Story = {
  name: 'Ana Sayfa kullanımı',
  args: {
    type: 'card',
    container: 'card',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 375,
        padding: 24,
        background: 'var(--odea-background-canvas)',
      }}
    >
      <CardMvpPlus type="card" container="card" />
      <CardMvpPlus type="account" container="card" />
      <CardMvpPlus type="loan" container="card" />
    </div>
  ),
};

const senaryolar: CardMvpPlusProps[] = (
  ['payment-method', 'icon', 'card-image'] as CardMvpPlusLeading[]
).flatMap((leading) =>
  (['flat', 'card'] as CardMvpPlusContainer[]).map((container) => ({ leading, container })),
);

export const Senaryolar: Story = {
  args: senaryolar[0],
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 24,
        padding: 24,
        background: 'var(--odea-background-canvas)',
      }}
    >
      {senaryolar.map((args, i) => (
        <div key={i} style={{ width: 375 }}>
          <CardMvpPlus {...args} />
        </div>
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
    ),
  },
};
