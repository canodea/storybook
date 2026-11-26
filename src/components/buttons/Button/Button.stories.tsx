import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from '../../../docs-ui/playgroundTheme';
import Button, {
  type ButtonProps,
  type ButtonPriority,
  type ButtonState,
  type ButtonSize,
  type ButtonContent,
} from './Button';

const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'ODEA MOBILE | Button. Birincil ve ikincil öncelikli buton; durum (enabled/tapped/disabled/hover/focused), boyut (large/small) ve içerik (text, icon+text, icon-only) varyantları vardır. Label her zaman tamamı büyük harfle yazılır. `state` prop’u görsel önizleme için durumu zorlar; gerçek kullanımda `disabled` özniteliği ve :active/:hover/:focus-visible aynı görünümlere bağlanır. Icon-only butonlar erişilebilir ad (aria-label) taşır.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const leadingIcons = {
  House: { set: 'Maps', name: 'House' },
  Car: { set: 'Maps', name: 'Car' },
  Anchor: { set: 'Maps', name: 'Anchor' },
} as const;

const iconOnlyIcons = {
  Plus: { set: 'Math', name: 'Plus' },
  Calculator: { set: 'Math', name: 'Calculator' },
  Divide: { set: 'Math', name: 'Divide' },
} as const;

type PlaygroundArgs = {
  label: string;
  priority: ButtonPriority;
  state: ButtonState;
  size: ButtonSize;
  content: ButtonContent;
  leadingIcon: IconChoice<typeof leadingIcons>;
  icon: IconChoice<typeof iconOnlyIcons>;
  ariaLabel: string;
  fullWidth: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): ButtonProps => ({
  label: a.label,
  priority: a.priority,
  state: a.state,
  size: a.size,
  content: a.content,
  leadingIcon: a.leadingIcon === NONE ? null : leadingIcons[a.leadingIcon],
  icon: a.icon === NONE ? null : iconOnlyIcons[a.icon],
  'aria-label': a.ariaLabel,
  fullWidth: a.fullWidth,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    label: 'BUTTON',
    priority: 'primary',
    state: 'enabled',
    size: 'large',
    content: 'text',
    leadingIcon: 'House',
    icon: 'Plus',
    ariaLabel: 'Ekle',
    fullWidth: false,
  },
  argTypes: {
    ...themeArgTypes,
    label: { name: 'Label', table: { category: 'İçerik' } },
    priority: {
      name: 'Priority',
      control: 'select',
      options: ['primary', 'secondary'],
      table: { category: 'Görünüm' },
    },
    state: {
      name: 'State',
      control: 'select',
      options: ['enabled', 'disabled', 'tapped', 'hover', 'focused'],
      table: { category: 'Durum' },
    },
    size: {
      name: 'Size',
      control: 'inline-radio',
      options: ['large', 'small'],
      table: { category: 'Görünüm' },
    },
    content: {
      name: 'Content',
      control: 'select',
      options: ['text', 'icon-text', 'icon-only'],
      table: { category: 'İçerik' },
    },
    leadingIcon: {
      name: 'Leading Icon',
      control: 'select',
      options: withNone(leadingIcons),
      table: { category: 'İkon' },
      if: { arg: 'content', eq: 'icon-text' },
    },
    icon: {
      name: 'Icon',
      control: 'select',
      options: withNone(iconOnlyIcons),
      table: { category: 'İkon' },
      if: { arg: 'content', eq: 'icon-only' },
    },
    ariaLabel: {
      name: 'Aria Label',
      table: { category: 'Erişilebilirlik' },
      if: { arg: 'content', eq: 'icon-only' },
    },
    fullWidth: { name: 'Full Width', table: { category: 'Görünüm' } },
  },
  render: (args) => <Button {...toProps(args)} />,
};

export const OnaylaVazgec: Story = {
  name: 'Onayla / Vazgeç',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 24, background: "var(--odea-background-canvas)" }}>
      <Button label="BUTTON" priority="primary" size="large" />
      <Button label="BUTTON" priority="secondary" size="large" />
    </div>
  ),
};

export const IkonluButon: Story = {
  name: 'İkonlu buton',
  args: {
    label: 'BUTTON',
    priority: 'primary',
    size: 'large',
    content: 'icon-text',
    leadingIcon: { set: 'Banking', name: 'Money Transfer' },
  },
};

export const IconOnly: Story = {
  name: 'Yalnız ikon',
  args: {
    priority: 'primary',
    size: 'large',
    content: 'icon-only',
    icon: { set: 'Math', name: 'Plus' },
    'aria-label': 'Ekle',
  },
};

export const TamGenislik: Story = {
  name: 'Tam genişlik',
  args: { label: 'BUTTON', priority: 'primary', size: 'large', fullWidth: true },
};

export const UzunLabel: Story = {
  name: 'Uç durum · Uzun label',
  render: () => (
    <div style={{ width: 220, padding: 24, background: "var(--odea-background-canvas)" }}>
      <Button label="LOREM IPSUM DOLOR SIT AMET CONSECTETUR" priority="primary" size="large" fullWidth />
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Uç durum · Disabled',
  args: { label: 'BUTTON', priority: 'primary', size: 'large', state: 'disabled' },
};

const priorities: ButtonPriority[] = ['primary', 'secondary'];
const states: ButtonState[] = ['enabled', 'disabled', 'tapped', 'hover', 'focused'];
const sizes: ButtonSize[] = ['large', 'small'];
const contents: ButtonContent[] = ['text', 'icon-text', 'icon-only'];

export const TumVaryantlar: Story = {
  name: 'Tüm varyantlar',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'flex-end',
        padding: 24,
        background: "var(--odea-background-canvas)",
      }}
    >
      {priorities.flatMap((priority) =>
        states.flatMap((state) =>
          sizes.flatMap((size) =>
            contents.map((content) => (
              <div
                key={`${priority}-${state}-${size}-${content}`}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}
              >
                <Button
                  priority={priority}
                  state={state}
                  size={size}
                  content={content}
                  label="BUTTON"
                  leadingIcon={content === 'icon-text' ? { set: 'Maps', name: 'House' } : null}
                  icon={content === 'icon-only' ? { set: 'Math', name: 'Plus' } : null}
                  aria-label={content === 'icon-only' ? 'Ekle' : undefined}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--odea-text-secondary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {priority}/{state}/{size}/{content}
                </span>
              </div>
            ))
          )
        )
      )}
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (className vb.) burada gizlenir.
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
