import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  NONE,
  withNone,
  type IconChoice,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import { useSyncedState } from "../useSyncedState";
import SearchBar, { type SearchBarProps, type SearchBarType } from "./SearchBar";

const meta = {
  title: "Components/Inputs/Search Bar",
  component: SearchBar,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Search Bar. Arama alanı. Yetkili arama/navigasyon alanlarında kullanılır; açık aramada hassas kişisel/hesap sonuçları gösterilmez. Değer varken temizleme ikonu görünür.",
      },
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const searchIcons = {
  "Magnifying Glass": { set: "System", name: "MagnifyingGlass" },
} as const;

const clearIcons = {
  "X Circle": { set: "System", name: "XCircle" },
} as const;

type PlaygroundArgs = {
  placeholder: string;
  searchQuery: string;
  showClear: boolean;
  type: SearchBarType;
  searchIcon: IconChoice<typeof searchIcons>;
  clearIcon: IconChoice<typeof clearIcons>;
} & ThemeArgs;

function InteractiveSearchBar(props: SearchBarProps) {
  const [value, setValue] = useSyncedState(props.searchQuery ?? "");
  return (
    <SearchBar
      {...props}
      searchQuery={value}
      onChange={setValue}
      onClear={() => setValue("")}
    />
  );
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    placeholder: "Search...",
    searchQuery: "Text Goes Here",
    showClear: true,
    type: "filled",
    searchIcon: "Magnifying Glass",
    clearIcon: "X Circle",
  },
  argTypes: {
    ...themeArgTypes,
    placeholder: { name: "Placeholder", table: { category: "İçerik" } },
    searchQuery: { name: "Search Query", table: { category: "İçerik" } },
    showClear: { name: "Show Clear", table: { category: "Temizle" } },
    type: {
      name: "Type",
      table: { category: "Durum" },
      control: "select",
      options: ["default", "focused", "filled"],
    },
    searchIcon: {
      name: "Search Icon",
      table: { category: "İkon" },
      control: "select",
      options: withNone(searchIcons),
    },
    clearIcon: {
      name: "Clear Icon",
      table: { category: "İkon" },
      control: "select",
      options: withNone(clearIcons),
      if: { arg: "showClear" },
    },
  },
  render: (args) => (
    <InteractiveSearchBar
      placeholder={args.placeholder}
      searchQuery={args.searchQuery}
      showClear={args.showClear}
      type={args.type}
      searchIcon={args.searchIcon === NONE ? undefined : searchIcons[args.searchIcon]}
      clearIcon={args.clearIcon === NONE ? undefined : clearIcons[args.clearIcon]}
    />
  ),
};

export const Bos: Story = {
  name: "Pasif · boş",
  args: { placeholder: "Search", searchQuery: "", type: "default" },
};

export const Dolu: Story = {
  name: "Pasif · dolu",
  args: { placeholder: "Search", searchQuery: "Text Goes Here", type: "filled", showClear: true },
};

export const Odakli: Story = {
  name: "Aktif · yazıyor",
  args: { placeholder: "Search", searchQuery: "Text", type: "focused", showClear: true },
};

const senaryolar: SearchBarProps[] = [
  Bos.args as SearchBarProps,
  Odakli.args as SearchBarProps,
  Dolu.args as SearchBarProps,
];

export const Senaryolar: Story = {
  args: Bos.args,
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {senaryolar.map((args, i) => (
        <SearchBar key={i} {...args} />
      ))}
    </div>
  ),
};

Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
