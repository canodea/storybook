import { useEffect, type ReactNode } from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import "../src/styles/foundation.css";
import "../src/styles/typography.css";
import "../src/styles/tokens.css";
import "../src/styles/colors.css";
import "../src/styles/global.css";
import "./preview-dark.css";

function ThemeProvider({
  dark,
  children,
}: {
  dark: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    return () => {
      delete root.dataset.theme;
    };
  }, [dark]);

  if (!dark) return <>{children}</>;
  return (
    <div style={{ background: "var(--odea-background-canvas)", padding: 0 }}>
      {children}
    </div>
  );
}

const withTheme: Decorator = (Story, context) => (
  <ThemeProvider dark={context.globals.theme === "dark"}>
    <Story />
  </ThemeProvider>
);

/** Playground'daki `Theme` kontrolü: yalnız bu hikâyeyi koyu temada sarar (data-theme alt ağaçta da çalışır). */
const withArgTheme: Decorator = (Story, context) =>
  context.args?.theme === "dark" ? (
    <div
      data-theme="dark"
      style={{
        background: "var(--odea-background-canvas)",
        padding: 24,
        borderRadius: 8,
      }}
    >
      <Story />
    </div>
  ) : (
    <Story />
  );

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [withArgTheme, withTheme],
  globalTypes: {
    theme: {
      description: "Arayüz teması",
      toolbar: {
        title: "Tema",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          "Getting Started",
          ["About", "Kurallar", "Usage", "Contributing", "Changelog"],
          "Foundations",
          [
            "Colors",
            "Typography",
            "Spacing",
            "Size",
            "Radius",
            "Elevation",
            "Icons",
            "Logos",
            "Illustrations",
          ],
          "Components",
          [
            "Buttons",
            "Inputs",
            ["*", "Primitives"],
            "List Item",
            "Dropdown",
            "Cards",
            "Modules",
            "Navigation",
            ["*", "Primitives"],
            "Feedback",
            "Avatars",
            "Shared",
          ],
        ],
      },
    },
    backgrounds: {
      options: {
        canvas: { name: "canvas", value: "#f3f3f3" },
        white: { name: "white", value: "#ffffff" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "canvas" },
    theme: "light",
  },
};

export default preview;
