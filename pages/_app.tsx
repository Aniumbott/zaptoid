// Import Modules
import { useState } from "react";
import type { AppProps } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

// Import Components
import AuthProvider from "./components/AuthProvider";

// Import Styles
import "@/styles/globals.css";

// Export Module
export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          colors: {
            violet: [
              "#BC8CF2",
              "#BA7FF2",
              "#B871F2",
              "#B664F1",
              "#B457F1",
              "#B249F1",
              "#B03CF1",
              "#AE2FF0",
              "#AC21F0",
              "#AA14F0",
            ]
          },
          primaryColor: "violet",
        }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
