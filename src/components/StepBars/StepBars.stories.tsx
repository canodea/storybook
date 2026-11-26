import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import StepBars from "./StepBars";

const description = `ODEA MOBILE | Step Bars. Dört adımlı akışlarda tamamlanan, aktif ve sonraki adımların görsel ilerlemesini sağlar. \`current\` aktif adımı (1-4) belirler; \`labels\` ile dört adımın başlıkları verilir, boş bırakılanlar varsayılan başlığı kullanır. Adımlar ve ilerleme çubuğu bu değerlere göre genel olarak üretilir; ayrı varyant kombinasyonu yoktur.

Step Bars tek başına navigasyon değildir; sırf görsel tıklanma ile adım geçişi varsayma. İlerleme ve VoiceOver/TalkBack duyurusu gerçek kullanıcı akışından gelir. Tema: Dark Mode varyantı yoktur. Koyu tema için instance’ı veya üst frame’i 02 - Renkler - Anlamsal ve 12 - Buton koleksiyonlarında Dark moda al; renkler token üzerinden otomatik değişir.`;

type StepBarsArgs = ThemeArgs & {
  currentStep: number;
  step1Label: string;
  step2Label: string;
  step3Label: string;
  step4Label: string;
};

const meta = {
  title: "Components/Cards/Step Bars",
  parameters: {
    docs: { description: { component: description } },
  },
  args: {
    ...themeArgs,
    currentStep: 2,
    step1Label: "Label 1",
    step2Label: "Label 2",
    step3Label: "Label 3",
    step4Label: "Label 4",
  },
  argTypes: {
    ...themeArgTypes,
    currentStep: {
      name: "Current Step",
      control: { type: "range", min: 1, max: 4, step: 1 },
      description:
        "Aktif adım. Öncekiler otomatik tamamlandı, sonrakiler sırada görünür.",
    },
    step1Label: { name: "Step 1 Label" },
    step2Label: { name: "Step 2 Label" },
    step3Label: { name: "Step 3 Label" },
    step4Label: { name: "Step 4 Label" },
  },
  render: (a) => (
    <StepBars
      current={a.currentStep as 1 | 2 | 3 | 4}
      labels={[a.step1Label, a.step2Label, a.step3Label, a.step4Label]}
    />
  ),
} satisfies Meta<StepBarsArgs>;

export default meta;

export const Playground: StoryObj<StepBarsArgs> = {
  name: "Playground",
};

export const UzunBasliklar: StoryObj<StepBarsArgs> = {
  name: "Uç durum · Uzun adım başlıkları",
  args: {
    step1Label: "Lorem ipsum dolor sit amet consectetur",
    step2Label: "Lorem ipsum dolor sit amet",
    step3Label: "Lorem ipsum dolor sit amet elit",
    step4Label: "Lorem ipsum dolor sit",
  },
};

export const IlkAdim: StoryObj<StepBarsArgs> = {
  name: "Uç durum · İlk adım aktif",
  args: { currentStep: 1 },
};

export const SonAdim: StoryObj<StepBarsArgs> = {
  name: "Uç durum · Son adım aktif",
  args: { currentStep: 4 },
};
