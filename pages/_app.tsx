import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import AuthProvider from "./components/AuthProvider";
import { useState } from "react";

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
